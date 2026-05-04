from rest_framework import viewsets, permissions, status, generics, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.exceptions import PermissionDenied
from rest_framework.pagination import PageNumberPagination
from django_filters.rest_framework import DjangoFilterBackend
from django.utils import timezone
from datetime import timedelta
from django.contrib.auth import get_user_model
from django.db.models import Count
from rest_framework_simplejwt.views import TokenObtainPairView

from .models import (
    Berita, Kategori, Komentar, Reaksi, Newsletter, 
    Bookmark, Notifikasi, LogAktivitas
)
from .serializers import (
    BeritaSerializer, KategoriSerializer, KomentarSerializer, 
    ReaksiSerializer, NewsletterSerializer, BookmarkSerializer, 
    NotifikasiSerializer, RegisterSerializer, LogAktivitasSerializer
)
from .filters import BeritaFilter

User = get_user_model()

# --- CUSTOM PAGINATION ---
class BeritaPagination(PageNumberPagination):
    page_size = 5 
    page_size_query_param = 'page_size'
    max_page_size = 100

# --- AUTENTIKASI ---
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = RegisterSerializer

class LoginView(TokenObtainPairView):
    permission_classes = [permissions.AllowAny]

# --- DASHBOARD SUMMARY ---
class DashboardSummaryView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user
        
        # LOGIKA ADMIN
        if user.role == 'admin':
            hari_ini = timezone.now().date()
            capaian_hari_ini = Berita.objects.filter(
                status='published', 
                tgl_dibuat__date=hari_ini 
            ).count()

            return Response({
                'stats': {
                    'total_articles': Berita.objects.count(),
                    'pending_articles': Berita.objects.filter(status='pending').count(),
                    'published_articles': Berita.objects.filter(status='published').count(),
                    'total_users': User.objects.count(),
                    'target_harian': {
                        'capaian': capaian_hari_ini,
                        'total_target': 10
                    }
                },
                # Menggunakan serializer yang sudah kita update id-nya
                'recent_activities': LogAktivitasSerializer(LogAktivitas.objects.all()[:5], many=True).data,
                'topics': KategoriSerializer(Kategori.objects.all(), many=True).data
            })
        
        # LOGIKA USER BIASA
        my_berita = Berita.objects.filter(penulis=user)
        total_likes = Reaksi.objects.filter(berita__penulis=user).count()
        total_comments = Komentar.objects.filter(berita__penulis=user).count()
        
        return Response({
            'stats': {
                'total_articles': my_berita.count(),
                'total_likes': total_likes,
                'total_comments': total_comments,
                'breakdown': {
                    'drafts': my_berita.filter(status='draft').count(),
                    'pending': my_berita.filter(status='pending').count(),
                    'published': my_berita.filter(status='published').count(),
                    'rejected': my_berita.filter(status='rejected').count(),
                }
            },
            'recent_articles': BeritaSerializer(my_berita.order_by('-tgl_dibuat')[:3], many=True).data
        })

# --- VIEWSETS FITUR BERITA ---
class BeritaViewSet(viewsets.ModelViewSet):
    serializer_class = BeritaSerializer
    queryset = Berita.objects.all() 
    pagination_class = BeritaPagination
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter, filters.SearchFilter]
    filterset_class = BeritaFilter
    ordering_fields = ['tgl_dibuat', 'judul', 'view_count']
    search_fields = ['judul', 'isi_ringkas']
    ordering = ['-tgl_dibuat']

    def get_queryset(self):
        user = self.request.user
        author_filter = self.request.query_params.get('author')
        status_filter = self.request.query_params.get('status')

        if user.is_authenticated and user.role == 'admin':
            return Berita.objects.all()

        if author_filter == 'me' and user.is_authenticated:
            queryset = Berita.objects.filter(penulis=user)
            if status_filter and status_filter != 'all':
                queryset = queryset.filter(status=status_filter)
            return queryset

        queryset = Berita.objects.filter(status='published')
        id_kategori = self.request.query_params.get('kategori')
        if id_kategori:
            # Tetap menggunakan id_kategori sesuai Primary Key baru
            queryset = queryset.filter(kategori__id_kategori=id_kategori)
        return queryset

    def perform_create(self, serializer):
        status_input = self.request.data.get('status', 'draft')
        if self.request.user.role != 'admin' and status_input == 'published':
            status_input = 'pending'
            
        berita = serializer.save(penulis=self.request.user, status=status_input)
        LogAktivitas.objects.create(
            user=self.request.user,
            aksi=f"menambahkan artikel baru '{berita.judul}'",
            icon_type='add'
        )

    def perform_update(self, serializer):
        instance = self.get_object()
        if self.request.user.role == 'admin' or instance.penulis == self.request.user:
            berita = serializer.save()
            LogAktivitas.objects.create(
                user=self.request.user,
                aksi=f"mengedit artikel '{berita.judul}'",
                icon_type='edit'
            )
        else:
            raise PermissionDenied("Kamu nggak punya izin edit artikel ini!")

    def perform_destroy(self, instance):
        if self.request.user.role == 'admin' or instance.penulis == self.request.user:
            judul = instance.judul
            instance.delete()
            LogAktivitas.objects.create(
                user=self.request.user,
                aksi=f"menghapus artikel '{judul}'",
                icon_type='delete'
            )
        else:
            raise PermissionDenied("Kamu nggak punya izin hapus artikel ini!")

    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def approve_article(self, request, pk=None):
        if request.user.role != 'admin': raise PermissionDenied()
        berita = self.get_object()
        berita.status = 'published'
        berita.save()
        LogAktivitas.objects.create(user=request.user, aksi=f"menerbitkan artikel '{berita.judul}'", icon_type='publish')
        return Response({'status': 'Artikel terbit!'})

    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def reject_article(self, request, pk=None):
        if request.user.role != 'admin': 
            raise PermissionDenied("Hanya admin yang bisa menolak artikel.")
            
        berita = self.get_object()
        alasan = request.data.get('alasan_penolakan')
        
        if not alasan:
            return Response({'error': 'Alasan penolakan wajib diisi'}, status=400)
            
        berita.status = 'rejected'
        berita.feedback_admin = alasan
        berita.save()
        
        LogAktivitas.objects.create(
            user=request.user, 
            aksi=f"menolak artikel '{berita.judul}'", 
            icon_type='reject'
        )
        
        return Response({'status': 'Artikel ditolak dan dikembalikan ke penulis'})

    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def submit_to_admin(self, request, pk=None):
        berita = self.get_object()
        if berita.status in ['draft', 'rejected']:
            berita.status = 'pending'
            berita.save()
            return Response({'status': 'Artikel diajukan ke admin'})
        return Response({'error': 'Status tidak valid'}, status=400)

# --- VIEWSETS LAINNYA ---
class LogAktivitasViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = LogAktivitasSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        if self.request.user.role == 'admin':
            return LogAktivitas.objects.all().order_by('-waktu')
        return LogAktivitas.objects.none()

class KategoriViewSet(viewsets.ModelViewSet):
    queryset = Kategori.objects.all()
    serializer_class = KategoriSerializer
    pagination_class = BeritaPagination 
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        kat = serializer.save()
        LogAktivitas.objects.create(
            user=self.request.user, 
            aksi=f"menambahkan kategori baru: {kat.nama_kategori}",
            icon_type='category'
        )

    def perform_update(self, serializer):
        kat = serializer.save()
        LogAktivitas.objects.create(
            user=self.request.user, 
            aksi=f"memperbarui kategori: {kat.nama_kategori}",
            icon_type='edit'
        )

    def perform_destroy(self, instance):
        nama = instance.nama_kategori
        instance.delete()
        LogAktivitas.objects.create(
            user=self.request.user, 
            aksi=f"menghapus kategori: {nama}",
            icon_type='delete'
        )

class BookmarkViewSet(viewsets.ModelViewSet):
    serializer_class = BookmarkSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        queryset = Bookmark.objects.filter(user=self.request.user)
        if self.request.query_params.get('tab') == 'archived':
            return queryset.filter(is_archived=True)
        return queryset.filter(is_archived=False)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class KomentarViewSet(viewsets.ModelViewSet):
    queryset = Komentar.objects.all()
    serializer_class = KomentarSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        komentar = serializer.save(user=self.request.user)
        Notifikasi.objects.create(
            user=komentar.berita.penulis,
            tipe='komentar',
            judul=f"Komentar Baru: {komentar.berita.judul}",
            pesan=f"{self.request.user.nama_lengkap}: {komentar.isi_komentar[:30]}...",
            link_id=komentar.berita.id_berita # Sudah sinkron menggunakan id_berita
        )

class ReaksiViewSet(viewsets.ModelViewSet):
    queryset = Reaksi.objects.all()
    serializer_class = ReaksiSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        Reaksi.objects.update_or_create(
            user=self.request.user,
            berita_id=self.request.data.get('berita'),
            defaults={'tipe_reaksi': self.request.data.get('tipe_reaksi')}
        )

class NotifikasiViewSet(viewsets.ModelViewSet):
    serializer_class = NotifikasiSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Notifikasi.objects.filter(user=self.request.user)

class NewsletterViewSet(viewsets.ModelViewSet):
    queryset = Newsletter.objects.all()
    serializer_class = NewsletterSerializer
    permission_classes = [permissions.AllowAny]