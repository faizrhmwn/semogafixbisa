import django_filters
from .models import Berita

class BeritaFilter(django_filters.FilterSet):
    # Filter pencarian nama penulis (icontains = tidak peduli huruf besar/kecil)
    penulis = django_filters.CharFilter(field_name='penulis__nama_lengkap', lookup_expr='icontains')
    
    # Filter rentang tanggal (Sesuai desain: mm/dd/yyyy)
    tgl_awal = django_filters.DateFilter(field_name='tgl_dibuat', lookup_expr='gte')
    tgl_akhir = django_filters.DateFilter(field_name='tgl_dibuat', lookup_expr='lte')

    class Meta:
        model = Berita
        fields = ['penulis', 'tgl_awal', 'tgl_akhir', 'status']