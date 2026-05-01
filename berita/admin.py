from django.contrib import admin
from .models import User, Kategori, Berita, Newsletter, Bookmark, Komentar, Reaksi

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('username', 'nama_lengkap', 'role', 'is_staff')
    search_fields = ('username', 'nama_lengkap')

@admin.register(Kategori)
class KategoriAdmin(admin.ModelAdmin):
    list_display = ('nama_kategori', 'slug')
    prepopulated_fields = {'slug': ('nama_kategori',)}

@admin.register(Berita)
class BeritaAdmin(admin.ModelAdmin):
    # Menampilkan share_count agar kamu bisa pantau berita mana yang viral
    list_display = ('judul', 'penulis', 'kategori', 'status', 'is_featured', 'view_count', 'share_count')
    list_filter = ('status', 'kategori', 'is_featured')
    search_fields = ('judul', 'isi_lengkap')
    # share_count dijadikan readonly agar tidak dimanipulasi manual
    readonly_fields = ('view_count', 'share_count')

    actions = ['make_published', 'make_featured']

    @admin.action(description="Terbitkan berita yang dipilih (Published)")
    def make_published(self, request, queryset):
        updated = queryset.update(status='published')
        self.message_user(request, f"{updated} berita berhasil diubah statusnya menjadi Published.")

    @admin.action(description="Tandai sebagai Berita Utama (Featured)")
    def make_featured(self, request, queryset):
        updated = queryset.update(is_featured=True)
        self.message_user(request, f"{updated} berita berhasil dijadikan Featured.")

@admin.register(Komentar)
class KomentarAdmin(admin.ModelAdmin):
    list_display = ('user', 'berita', 'tgl_komentar', 'isi_pendek')
    list_filter = ('berita', 'tgl_komentar')
    search_fields = ('isi_komentar', 'user__username', 'berita__judul')

    def isi_pendek(self, obj):
        return obj.isi_komentar[:50] + "..." if len(obj.isi_komentar) > 50 else obj.isi_komentar
    isi_pendek.short_description = 'Komentar'

# --- KODE BARU: Admin untuk Reaksi ---
@admin.register(Reaksi)
class ReaksiAdmin(admin.ModelAdmin):
    # Memudahkan kamu melihat siapa yang memberi reaksi apa di berita mana
    list_display = ('user', 'berita', 'tipe_reaksi')
    list_filter = ('tipe_reaksi', 'berita')
    search_fields = ('user__username', 'berita__judul')

# Register model lainnya
admin.site.register(Newsletter)
admin.site.register(Bookmark)