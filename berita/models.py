from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.text import slugify

# --- USER CUSTOM ---
class User(AbstractUser):
    nama_lengkap = models.CharField(max_length=255)
    foto_profil = models.ImageField(upload_to='profiles/', null=True, blank=True)
    # Role sesuai diagram: Admin & Penulis (disini pakai 'user' sebagai penulis)
    role = models.CharField(max_length=10, choices=[('admin', 'Admin'), ('user', 'User')], default='user')

# --- KATEGORI ---
class Kategori(models.Model):
    id_kategori = models.AutoField(primary_key=True)
    nama_kategori = models.CharField(max_length=100)
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
    # db_column memastikan nama di MySQL sama dengan diagrammu
    penulis = models.ForeignKey(User, on_delete=models.CASCADE, db_column='id_user')
    kategori = models.ForeignKey(Kategori, on_delete=models.CASCADE, db_column='id_kategori')
    judul = models.CharField(max_length=255)
    isi_ringkas = models.TextField()
    isi_lengkap = models.TextField()
    tgl_dibuat = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='draft')
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
# Newsletter tetap dipertahankan sesuai permintaanmu
class Newsletter(models.Model):
    email = models.EmailField(unique=True)
    tgl_daftar = models.DateTimeField(auto_now_add=True)

class Bookmark(models.Model):
    id_bookmark = models.AutoField(primary_key=True) # Tambahan Primary Key sesuai diagram
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='bookmarks', db_column='id_user')
    berita = models.ForeignKey(Berita, on_delete=models.CASCADE, db_column='id_berita')
    tgl_simpan = models.DateTimeField(auto_now_add=True)
    is_archived = models.BooleanField(default=False)

    class Meta:
        unique_together = ('user', 'berita')

# --- INTERAKSI (KOMENTAR & REAKSI) ---
class Komentar(models.Model):
    id_komentar = models.AutoField(primary_key=True)
    berita = models.ForeignKey(Berita, on_delete=models.CASCADE, related_name='komentar', db_column='id_berita')
    user = models.ForeignKey(User, on_delete=models.CASCADE, db_column='id_user')
    isi_komentar = models.TextField()
    tgl_komentar = models.DateTimeField(auto_now_add=True)

class Reaksi(models.Model):
    id_reaksi = models.AutoField(primary_key=True) # Tambahan Primary Key sesuai diagram
    REACTION_TYPES = [
        ('wow', 'Wow'), ('idea', 'Idea'), ('thinking', 'Thinking'),
        ('sad', 'Sad'), ('down', 'Down'), ('love', 'Love'),
    ]
    berita = models.ForeignKey(Berita, on_delete=models.CASCADE, related_name='reaksi_list', db_column='id_berita')
    user = models.ForeignKey(User, on_delete=models.CASCADE, db_column='id_user')
    tipe_reaksi = models.CharField(max_length=10, choices=REACTION_TYPES)

    class Meta:
        unique_together = ('berita', 'user') 

# --- NOTIFIKASI & LOG AKTIVITAS ---
class Notifikasi(models.Model):
    id_notifikasi = models.AutoField(primary_key=True) # Tambahan Primary Key sesuai diagram
    TIPE_CHOICES = [('berita', 'Berita Baru'), ('komentar', 'Komentar Baru')]
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='notifikasi', db_column='id_user')
    tipe = models.CharField(max_length=10, choices=TIPE_CHOICES)
    judul = models.CharField(max_length=255)
    pesan = models.TextField()
    is_read = models.BooleanField(default=False)
    tgl_notifikasi = models.DateTimeField(auto_now_add=True)
    link_id = models.IntegerField(null=True, blank=True)

class LogAktivitas(models.Model):
    id_log = models.AutoField(primary_key=True) # Tambahan Primary Key sesuai diagram
    user = models.ForeignKey(User, on_delete=models.CASCADE, db_column='id_user')
    aksi = models.CharField(max_length=255)
    icon_type = models.CharField(max_length=20, default='edit')
    waktu = models.DateTimeField(auto_now_add=True)