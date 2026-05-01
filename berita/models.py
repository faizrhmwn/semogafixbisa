from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.text import slugify

# --- USER CUSTOM ---
class User(AbstractUser):
    nama_lengkap = models.CharField(max_length=255)
    foto_profil = models.ImageField(upload_to='profiles/', null=True, blank=True)
    role = models.CharField(max_length=10, choices=[('admin', 'Admin'), ('user', 'User')], default='user')

# --- KATEGORI (Update untuk Manage Categories) ---
class Kategori(models.Model):
    id_kategori = models.AutoField(primary_key=True)
    nama_kategori = models.CharField(max_length=100)
    # Slug diatur blank=True agar bisa otomatis terisi via fungsi save()
    slug = models.SlugField(unique=True, blank=True)
    deskripsi = models.TextField(blank=True, null=True) 
    icon = models.CharField(max_length=50, default='bi-tag') 
    urutan_tampil = models.IntegerField(default=1) 
    tgl_diperbarui = models.DateTimeField(auto_now=True) 

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.nama_kategori)
        super().save(*args, **kwargs)

    class Meta:
        ordering = ['urutan_tampil', 'nama_kategori']

    def __str__(self):
        return self.nama_kategori

# --- PILIHAN STATUS BERITA ---
STATUS_CHOICES = [
    ('draft', 'Draft'),
    ('pending', 'Pending'),
    ('published', 'Published'),
    ('rejected', 'Rejected'),
    ('archived', 'Archived'),
]

# --- BERITA ---
class Berita(models.Model):
    id_berita = models.AutoField(primary_key=True)
    penulis = models.ForeignKey(User, on_delete=models.CASCADE, db_column='id_user')
    kategori = models.ForeignKey(Kategori, on_delete=models.CASCADE, db_column='id_kategori')
    judul = models.CharField(max_length=255)
    isi_ringkas = models.TextField()
    isi_lengkap = models.TextField()
    tgl_dibuat = models.DateTimeField(auto_now_add=True)
    status = models.CharField(
        max_length=10, 
        choices=STATUS_CHOICES, 
        default='draft'
    )
    gambar_url = models.ImageField(upload_to='news/')
    feedback_admin = models.TextField(null=True, blank=True) 
    is_featured = models.BooleanField(default=False)
    view_count = models.IntegerField(default=0)
    read_time = models.CharField(max_length=50, default="2 min read")
    share_count = models.IntegerField(default=0)

    class Meta:
        ordering = ['-tgl_dibuat']

    def __str__(self):
        return self.judul

# --- NEWSLETTER & BOOKMARK ---
class Newsletter(models.Model):
    email = models.EmailField(unique=True)
    tgl_daftar = models.DateTimeField(auto_now_add=True)

class Bookmark(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='bookmarks')
    berita = models.ForeignKey(Berita, on_delete=models.CASCADE)
    tgl_simpan = models.DateTimeField(auto_now_add=True)
    is_archived = models.BooleanField(default=False)

    class Meta:
        unique_together = ('user', 'berita')

# --- INTERAKSI (KOMENTAR & REAKSI) ---
class Komentar(models.Model):
    id_komentar = models.AutoField(primary_key=True)
    berita = models.ForeignKey(Berita, on_delete=models.CASCADE, related_name='komentar')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    isi_komentar = models.TextField()
    tgl_komentar = models.DateTimeField(auto_now_add=True)

class Reaksi(models.Model):
    REACTION_TYPES = [
        ('wow', 'Wow'), ('idea', 'Idea'), ('thinking', 'Thinking'),
        ('sad', 'Sad'), ('down', 'Down'), ('love', 'Love'),
    ]
    berita = models.ForeignKey(Berita, on_delete=models.CASCADE, related_name='reaksi_list')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    tipe_reaksi = models.CharField(max_length=10, choices=REACTION_TYPES)

    class Meta:
        unique_together = ('berita', 'user') 

# --- NOTIFIKASI & LOG AKTIVITAS ---
class Notifikasi(models.Model):
    TIPE_CHOICES = [('berita', 'Berita Baru'), ('komentar', 'Komentar Baru')]
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='notifikasi')
    tipe = models.CharField(max_length=10, choices=TIPE_CHOICES)
    judul = models.CharField(max_length=255)
    pesan = models.TextField()
    is_read = models.BooleanField(default=False)
    tgl_notifikasi = models.DateTimeField(auto_now_add=True)
    link_id = models.IntegerField(null=True, blank=True)

    class Meta:
        ordering = ['-tgl_notifikasi']

class LogAktivitas(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    aksi = models.CharField(max_length=255)
    icon_type = models.CharField(max_length=20, default='edit')
    waktu = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-waktu']