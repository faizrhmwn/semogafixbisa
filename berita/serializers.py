from rest_framework import serializers
from .models import User, Kategori, Berita, Komentar, Newsletter, Reaksi, Bookmark, Notifikasi, LogAktivitas
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'nama_lengkap', 'foto_profil', 'role']

# --- KATEGORI (Versi Detail) ---
class KategoriSerializer(serializers.ModelSerializer):
    jumlah_artikel = serializers.SerializerMethodField()

    class Meta:
        model = Kategori
        fields = [
            'id_kategori', 'nama_kategori', 'slug', 
            'deskripsi', 'icon', 'urutan_tampil', 
            'tgl_diperbarui', 'jumlah_artikel'
        ]

    def get_jumlah_artikel(self, obj):
        return obj.berita_set.count()

# --- LOG AKTIVITAS (Update id -> id_log) ---
class LogAktivitasSerializer(serializers.ModelSerializer):
    user_detail = UserSerializer(source='user', read_only=True)
    
    class Meta:
        model = LogAktivitas
        fields = ['id_log', 'user', 'user_detail', 'aksi', 'icon_type', 'waktu']

class NewsletterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Newsletter
        fields = ['id', 'email', 'tgl_daftar']

# --- REAKSI (Update id -> id_reaksi) ---
class ReaksiSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reaksi
        fields = ['id_reaksi', 'user', 'berita', 'tipe_reaksi']

class KomentarSerializer(serializers.ModelSerializer):
    user_detail = UserSerializer(source='user', read_only=True)

    class Meta:
        model = Komentar
        fields = ['id_komentar', 'user', 'user_detail', 'isi_komentar', 'tgl_komentar']

class NotifikasiSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notifikasi
        fields = ['id_notifikasi', 'user', 'tipe', 'judul', 'pesan', 'is_read', 'tgl_notifikasi', 'link_id']

class BeritaSerializer(serializers.ModelSerializer):
    penulis_detail = UserSerializer(source='penulis', read_only=True)
    kategori_detail = KategoriSerializer(source='kategori', read_only=True)
    komentar = KomentarSerializer(many=True, read_only=True)
    reaksi_summary = serializers.SerializerMethodField()

    class Meta:
        model = Berita
        fields = [
            'id_berita', 'judul', 'isi_ringkas', 'isi_lengkap', 
            'tgl_dibuat', 'status', 'gambar_url', 'view_count', 
            'share_count', 'read_time', 'is_featured', 
            'penulis', 'kategori', 'penulis_detail', 
            'kategori_detail', 'komentar', 'reaksi_summary',
            'feedback_admin'
        ]
        read_only_fields = ['view_count', 'share_count']

    def get_reaksi_summary(self, obj):
        from django.db.models import Count
        counts = obj.reaksi_list.values('tipe_reaksi').annotate(total=Count('tipe_reaksi'))
        return {item['tipe_reaksi']: item['total'] for item in counts}

# --- BOOKMARK (Update id -> id_bookmark) ---
class BookmarkSerializer(serializers.ModelSerializer):
    berita_detail = BeritaSerializer(source='berita', read_only=True)

    class Meta:
        model = Bookmark
        fields = ['id_bookmark', 'user', 'berita', 'berita_detail', 'tgl_simpan', 'is_archived']
        read_only_fields = ['user']

class RegisterSerializer(serializers.ModelSerializer):
    full_name = serializers.CharField(source='nama_lengkap') 
    confirm_password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['full_name', 'email', 'username', 'password', 'confirm_password']
        extra_kwargs = {'password': {'write_only': True}}

    def validate(self, data):
        if data['password'] != data.pop('confirm_password'):
            raise serializers.ValidationError({"password": "Password tidak cocok!"})
        return data

    def create(self, validated_data):
        nama_lengkap = validated_data.pop('nama_lengkap')
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            nama_lengkap=nama_lengkap,
            password=make_password(validated_data['password'])
        )
        return user