import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const DUMMY_ARTICLES = [
  {
    id: 1,
    title: "Inovasi Teknologi AI di Sektor...",
    category: "Technology",
    readTime: "2 Menit Baca",
    author: "Budi Santoso",
    status: "Published",
    date: "24 Okt 2025",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=80&q=60",
  },
  {
    id: 2,
    title: "Strategi Ekonomi Pasca Pandemi:...",
    category: "Economics",
    readTime: "2 Menit Baca",
    author: "Siti Aminah",
    status: "Pending",
    date: "24 Okt 2025",
    image: "https://images.unsplash.com/photo-1611974714158-f899019b5a92?w=80&q=60",
  },
  {
    id: 3,
    title: "Inovasi Teknologi AI di Sektor...",
    category: "Technology",
    readTime: "2 Menit Baca",
    author: "Budi Santoso",
    status: "Published",
    date: "24 Okt 2025",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=80&q=60",
  },
  {
    id: 4,
    title: "Strategi Ekonomi Pasca Pandemi:...",
    category: "Economics",
    readTime: "2 Menit Baca",
    author: "Siti Aminah",
    status: "Pending",
    date: "24 Okt 2025",
    image: "https://images.unsplash.com/photo-1611974714158-f899019b5a92?w=80&q=60",
  },
  {
    id: 5,
    title: "Inovasi Teknologi AI di Sektor...",
    category: "Technology",
    readTime: "2 Menit Baca",
    author: "Budi Santoso",
    status: "Published",
    date: "24 Okt 2025",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=80&q=60",
  },
];

const INIT_CATEGORIES = [
  "Technology",
  "Economics",
  "Environment",
  "Politics",
  "Social",
  "Education",
];

const s = {
  page: {
    marginLeft: 260,
    marginTop: 72,
    padding: "32px 40px",
    background: "#f8fafc",
    minHeight: "calc(100vh - 72px)",
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
  topRow: {
    display: "flex",
    gap: 20,
    marginBottom: 24,
    alignItems: "stretch",
  },
  statsCard: {
    flex: 1,
    background: "#fff",
    border: "1px solid #e8edf5",
    borderRadius: 18,
    padding: "24px 28px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  catCard: {
    width: 280,
    background: "linear-gradient(135deg, #1a2b6d 0%, #2347c5 100%)",
    borderRadius: 18,
    padding: 24,
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    gap: 8,
  },
  catBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    background: "#fff",
    color: "#1a2b6d",
    fontWeight: 700,
    fontSize: 13,
    padding: "10px 20px",
    borderRadius: 10,
    border: "none",
    cursor: "pointer",
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
  panel: {
    background: "#fff",
    border: "1px solid #e8edf5",
    borderRadius: 18,
    overflow: "hidden",
  },
  tabBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 24px",
    background: "#1a2b6d",
    borderRadius: "18px 18px 0 0",
  },
  tabLeft: {
    display: "flex",
    gap: 0,
  },
  tab: (active) => ({
    padding: "14px 22px",
    fontSize: 13,
    fontWeight: 600,
    color: active ? "#fff" : "rgba(255,255,255,0.6)",
    background: active ? "rgba(255,255,255,0.15)" : "transparent",
    border: "none",
    cursor: "pointer",
    borderRadius: active ? "999px" : 0,
    margin: "8px 2px",
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  }),
  tabRight: {
    display: "flex",
    gap: 8,
  },
  filterBtn: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    background: "rgba(255,255,255,0.12)",
    border: "1px solid rgba(255,255,255,0.2)",
    borderRadius: 10,
    padding: "8px 16px",
    color: "#fff",
    fontSize: 12,
    fontWeight: 600,
    cursor: "pointer",
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
  thRow: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr 100px 100px 80px",
    gap: 8,
    padding: "14px 24px",
    borderBottom: "1px solid #f1f5f9",
    fontSize: 11,
    fontWeight: 700,
    color: "#94a3b8",
    textTransform: "uppercase",
    letterSpacing: "0.06em",
  },
  row: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr 100px 100px 80px",
    gap: 8,
    padding: "16px 24px",
    borderBottom: "1px solid #f1f5f9",
    alignItems: "center",
    fontSize: 13,
  },
  articleCell: {
    display: "flex",
    alignItems: "center",
    gap: 12,
  },
  thumb: {
    width: 44,
    height: 44,
    borderRadius: 10,
    objectFit: "cover",
  },
  authorCell: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  authorAvatar: {
    width: 28,
    height: 28,
    borderRadius: "50%",
    background: "#e2e8f0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  statusBadge: (st) => ({
    fontSize: 12,
    fontWeight: 700,
    padding: "4px 12px",
    borderRadius: 999,
    background: st === "Published" ? "#dcfce7" : "#fff7ed",
    color: st === "Published" ? "#15803d" : "#ea580c",
  }),
  actionBtn: {
    width: 32,
    height: 32,
    border: "none",
    background: "transparent",
    color: "#94a3b8",
    cursor: "pointer",
    borderRadius: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  pagination: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "16px 24px",
    fontSize: 13,
    color: "#64748b",
  },
  pageBtn: (active) => ({
    width: 32,
    height: 32,
    borderRadius: 8,
    border: active ? "2px solid #2563eb" : "1px solid #e2e8f0",
    background: active ? "#eff6ff" : "#fff",
    color: active ? "#2563eb" : "#64748b",
    fontWeight: active ? 700 : 500,
    fontSize: 13,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  }),
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0,0,0,0.4)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 999,
  },
  modal: {
    background: "#fff",
    borderRadius: 20,
    padding: 32,
    width: 420,
    maxHeight: "80vh",
    overflow: "auto",
    boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
  },
  toast: {
    position: "fixed",
    top: 90,
    left: "50%",
    transform: "translateX(-50%)",
    background: "#ef4444",
    color: "#fff",
    padding: "10px 28px",
    borderRadius: 999,
    fontWeight: 600,
    fontSize: 14,
    display: "flex",
    alignItems: "center",
    gap: 8,
    zIndex: 1000,
    boxShadow: "0 4px 20px rgba(239,68,68,0.3)",
  },
  toastSuccess: {
    position: "fixed",
    top: 90,
    left: "50%",
    transform: "translateX(-50%)",
    background: "#16a34a",
    color: "#fff",
    padding: "10px 28px",
    borderRadius: 999,
    fontWeight: 600,
    fontSize: 14,
    display: "flex",
    alignItems: "center",
    gap: 8,
    zIndex: 1000,
  },
  input: {
    width: "100%",
    padding: "10px 14px",
    border: "1px solid #e2e8f0",
    borderRadius: 10,
    fontSize: 13,
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    boxSizing: "border-box",
  },
  dropdown: {
    position: "absolute",
    right: 0,
    top: "100%",
    marginTop: 4,
    background: "#fff",
    border: "1px solid #e8edf5",
    borderRadius: 14,
    padding: 8,
    boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
    zIndex: 50,
    minWidth: 200,
  },
  dropItem: {
    padding: "10px 16px",
    fontSize: 13,
    color: "#334155",
    cursor: "pointer",
    borderRadius: 8,
    border: "none",
    background: "transparent",
    width: "100%",
    textAlign: "left",
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
};

const IconEdit = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

const IconTrash = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </svg>
);

const IconUser = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const IconCat = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <rect x="3" y="3" width="7" height="7" rx="1.5" />
    <rect x="14" y="3" width="7" height="7" rx="1.5" />
    <rect x="3" y="14" width="7" height="7" rx="1.5" />
    <rect x="14" y="14" width="7" height="7" rx="1.5" />
  </svg>
);

export default function ManageNewsPage() {
  const navigate = useNavigate();

  const [articles, setArticles] = useState(DUMMY_ARTICLES);
  const [categories, setCategories] = useState(INIT_CATEGORIES);
  const [tab, setTab] = useState("All");
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [toast, setToast] = useState(null);
  const [showFilter, setShowFilter] = useState(false);
  const [showSort, setShowSort] = useState(false);
  const [showCatModal, setShowCatModal] = useState(false);
  const [newCat, setNewCat] = useState("");
  const [editCatIdx, setEditCatIdx] = useState(null);
  const [editCatVal, setEditCatVal] = useState("");
  const [sortBy, setSortBy] = useState("Terbaru");
  const [filterAuthor, setFilterAuthor] = useState("");
  const [page, setPage] = useState(1);

  const filtered = articles.filter((article) => {
    if (tab !== "All" && article.status !== tab) return false;

    if (
      filterAuthor &&
      !article.author.toLowerCase().includes(filterAuthor.toLowerCase())
    ) {
      return false;
    }

    return true;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "Terlama") return a.id - b.id;
    if (sortBy === "Judul (A-Z)") return a.title.localeCompare(b.title);
    if (sortBy === "Judul (Z-A)") return b.title.localeCompare(a.title);

    return b.id - a.id;
  });

  const totalArticles = 1284;

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });

    setTimeout(() => {
      setToast(null);
    }, 2500);
  };

  const handleEditNews = (article) => {
    navigate(`/admin/edit-news/${article.id}`, {
      state: {
        article: {
          ...article,
          thumbnail: article.image,
          image: article.image,
          synopsis:
            article.synopsis ||
            article.excerpt ||
            "Transformasi digital di kalangan pelaku Usaha Mikro, Kecil, dan Menengah (UMKM) di Indonesia menunjukkan peningkatan signifikan dalam beberapa tahun terakhir. Perk",
          body:
            article.body ||
            "Transformasi digital di kalangan pelaku Usaha Mikro, Kecil, dan Menengah (UMKM) di Indonesia menunjukkan peningkatan signifikan dalam beberapa tahun terakhir. Perkembangan ini didorong oleh kemudahan akses terhadap platform online serta meningkatnya penggunaan sistem pembayaran digital di berbagai daerah.\n\nBanyak pelaku UMKM mulai memanfaatkan marketplace dan media sosial untuk memasarkan produk mereka secara lebih luas. Dengan strategi pemasaran digital, usaha kecil dapat menjangkau konsumen baru tanpa harus memiliki toko fisik.",
          date: `${article.date}, 14:20 WIB`,
        },
      },
    });
  };

  const handleDelete = () => {
    if (!deleteTarget) return;

    setArticles((prev) =>
      prev.filter((article) => article.id !== deleteTarget.id),
    );

    setDeleteTarget(null);
    showToast("Artikel Berhasil Dihapus", "error");
  };

  const handleAddCategory = () => {
    const value = newCat.trim();

    if (!value || categories.includes(value)) return;

    setCategories([...categories, value]);
    setNewCat("");
  };

  const handleSaveEditCat = () => {
    const value = editCatVal.trim();

    if (!value) return;

    setCategories((prev) =>
      prev.map((category, index) =>
        index === editCatIdx ? value : category,
      ),
    );

    setEditCatIdx(null);
    setEditCatVal("");
  };

  const handleDeleteCat = (idx) => {
    setCategories((prev) => prev.filter((_, index) => index !== idx));
  };

  return (
    <div style={s.page}>
      {toast && (
        <div style={toast.type === "error" ? s.toast : s.toastSuccess}>
          ✓ {toast.msg}
        </div>
      )}

      <div style={s.topRow}>
        <div style={s.statsCard}>
          <div>
            <div
              style={{
                fontSize: 11,
                fontWeight: 800,
                color: "#0f172a",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              Total Publikasi
            </div>

            <div style={{ fontSize: 14, color: "#2563eb", fontWeight: 600 }}>
              {totalArticles.toLocaleString()} Artikel
            </div>
          </div>

          <div style={{ display: "flex", gap: 40 }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 11, color: "#94a3b8", fontWeight: 600 }}>
                Published
              </div>
              <div style={{ fontSize: 32, fontWeight: 800, color: "#0f172a" }}>
                {1266}
              </div>
            </div>

            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 11, color: "#94a3b8", fontWeight: 600 }}>
                Menunggu
              </div>
              <div style={{ fontSize: 32, fontWeight: 800, color: "#f59e0b" }}>
                {18}
              </div>
            </div>
          </div>
        </div>

        <div style={s.catCard}>
          <div style={{ fontSize: 16, fontWeight: 700 }}>
            Organize News Categories
          </div>

          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.7)" }}>
            Create and manage news categories easily
          </div>

          <button style={s.catBtn} onClick={() => setShowCatModal(true)}>
            <IconCat /> Manage Categories
          </button>
        </div>
      </div>

      <div style={s.panel}>
        <div style={s.tabBar}>
          <div style={s.tabLeft}>
            {["All", "Pending", "Published"].map((item) => (
              <button
                key={item}
                style={s.tab(tab === item)}
                onClick={() => setTab(item)}
              >
                {item}
              </button>
            ))}
          </div>

          <div style={s.tabRight}>
            <div style={{ position: "relative" }}>
              <button
                style={s.filterBtn}
                onClick={() => {
                  setShowFilter(!showFilter);
                  setShowSort(false);
                }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                </svg>
                Filter Lanjut
              </button>

              {showFilter && (
                <div style={s.dropdown}>
                  <div
                    style={{
                      padding: "8px 12px",
                      fontSize: 14,
                      fontWeight: 700,
                      color: "#0f172a",
                    }}
                  >
                    Filter Lanjut
                  </div>

                  <div
                    style={{
                      padding: "4px 12px",
                      fontSize: 11,
                      fontWeight: 600,
                      color: "#94a3b8",
                      textTransform: "uppercase",
                    }}
                  >
                    Penulis
                  </div>

                  <div style={{ padding: "4px 12px" }}>
                    <input
                      style={s.input}
                      placeholder="Nama penulis..."
                      value={filterAuthor}
                      onChange={(event) => setFilterAuthor(event.target.value)}
                    />
                  </div>

                  <div
                    style={{
                      padding: "8px 12px",
                      display: "flex",
                      gap: 8,
                      justifyContent: "flex-end",
                    }}
                  >
                    <button
                      style={{ ...s.dropItem, width: "auto", color: "#64748b" }}
                      onClick={() => {
                        setFilterAuthor("");
                        setShowFilter(false);
                      }}
                    >
                      Reset
                    </button>

                    <button
                      style={{
                        padding: "8px 16px",
                        background: "#1a2b6d",
                        color: "#fff",
                        border: "none",
                        borderRadius: 8,
                        fontSize: 12,
                        fontWeight: 600,
                        cursor: "pointer",
                      }}
                      onClick={() => setShowFilter(false)}
                    >
                      Terapkan Filter
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div style={{ position: "relative" }}>
              <button
                style={s.filterBtn}
                onClick={() => {
                  setShowSort(!showSort);
                  setShowFilter(false);
                }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M3 6h18M3 12h12M3 18h6" />
                </svg>
                Urutkan
              </button>

              {showSort && (
                <div style={s.dropdown}>
                  {["Terbaru", "Terlama", "Judul (A-Z)", "Judul (Z-A)"].map(
                    (option) => (
                      <button
                        key={option}
                        style={{
                          ...s.dropItem,
                          fontWeight: sortBy === option ? 700 : 400,
                          color: sortBy === option ? "#2563eb" : "#334155",
                        }}
                        onClick={() => {
                          setSortBy(option);
                          setShowSort(false);
                        }}
                      >
                        {option}
                      </button>
                    ),
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <div style={s.thRow}>
          <span>Judul Artikel</span>
          <span>Penulis</span>
          <span>Status</span>
          <span>Tanggal</span>
          <span>Aksi</span>
        </div>

        {sorted.map((article) => (
          <div key={article.id} style={s.row}>
            <div style={s.articleCell}>
              <img src={article.image} alt="" style={s.thumb} />

              <div>
                <div style={{ fontWeight: 600, color: "#1e293b" }}>
                  {article.title}
                </div>

                <div style={{ fontSize: 11, color: "#94a3b8" }}>
                  {article.category} • {article.readTime}
                </div>
              </div>
            </div>

            <div style={s.authorCell}>
              <div style={s.authorAvatar}>
                <IconUser />
              </div>

              <span style={{ fontWeight: 500, color: "#334155" }}>
                {article.author}
              </span>
            </div>

            <span style={s.statusBadge(article.status)}>{article.status}</span>

            <span style={{ fontSize: 13, color: "#64748b" }}>
              {article.date}
            </span>

            <div style={{ display: "flex", gap: 4 }}>
              <button
                style={s.actionBtn}
                title="Edit"
                onClick={() => handleEditNews(article)}
              >
                <IconEdit />
              </button>

              <button
                style={{ ...s.actionBtn, color: "#ef4444" }}
                title="Hapus"
                onClick={() => setDeleteTarget(article)}
              >
                <IconTrash />
              </button>
            </div>
          </div>
        ))}

        <div style={s.pagination}>
          <span>
            Menampilkan 1-5 dari {totalArticles.toLocaleString()} artikel
          </span>

          <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
            <button
              style={s.pageBtn(false)}
              onClick={() => setPage(Math.max(1, page - 1))}
            >
              &lt;
            </button>

            {[1, 2, 3].map((item) => (
              <button
                key={item}
                style={s.pageBtn(page === item)}
                onClick={() => setPage(item)}
              >
                {item}
              </button>
            ))}

            <span style={{ padding: "0 4px", color: "#94a3b8" }}>...</span>

            <button style={s.pageBtn(false)} onClick={() => setPage(257)}>
              257
            </button>

            <button style={s.pageBtn(false)} onClick={() => setPage(page + 1)}>
              &gt;
            </button>
          </div>
        </div>
      </div>

      {deleteTarget && (
        <div style={s.overlay} onClick={() => setDeleteTarget(null)}>
          <div style={s.modal} onClick={(event) => event.stopPropagation()}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 16,
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  background: "#fee2e2",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#ef4444",
                }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <line x1="9" y1="9" x2="15" y2="15" />
                  <line x1="15" y1="9" x2="9" y2="15" />
                </svg>
              </div>

              <h3
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: "#0f172a",
                  margin: 0,
                }}
              >
                Hapus Artikel?
              </h3>
            </div>

            <p
              style={{
                fontSize: 14,
                color: "#64748b",
                lineHeight: 1.6,
                margin: "0 0 24px",
              }}
            >
              Apakah Anda yakin ingin menghapus artikel ini? Tindakan ini tidak
              dapat dibatalkan.
            </p>

            <div
              style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}
            >
              <button
                style={{
                  padding: "10px 24px",
                  border: "1px solid #e2e8f0",
                  borderRadius: 10,
                  background: "#fff",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                  color: "#334155",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}
                onClick={() => setDeleteTarget(null)}
              >
                Batal
              </button>

              <button
                style={{
                  padding: "10px 24px",
                  border: "none",
                  borderRadius: 10,
                  background: "#ef4444",
                  color: "#fff",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}
                onClick={handleDelete}
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}

      {showCatModal && (
        <div style={s.overlay} onClick={() => setShowCatModal(false)}>
          <div
            style={{ ...s.modal, width: 480 }}
            onClick={(event) => event.stopPropagation()}
          >
            <h3
              style={{
                fontSize: 20,
                fontWeight: 700,
                color: "#0f172a",
                margin: "0 0 20px",
              }}
            >
              Manage Categories
            </h3>

            <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
              <input
                style={{ ...s.input, flex: 1 }}
                placeholder="Nama kategori baru..."
                value={newCat}
                onChange={(event) => setNewCat(event.target.value)}
                onKeyDown={(event) =>
                  event.key === "Enter" && handleAddCategory()
                }
              />

              <button
                style={{
                  padding: "10px 20px",
                  background: "#1a2b6d",
                  color: "#fff",
                  border: "none",
                  borderRadius: 10,
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}
                onClick={handleAddCategory}
              >
                + Add
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {categories.map((category, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "10px 14px",
                    background: "#f8fafc",
                    borderRadius: 10,
                    border: "1px solid #f1f5f9",
                  }}
                >
                  {editCatIdx === index ? (
                    <input
                      style={{ ...s.input, flex: 1, marginRight: 8 }}
                      value={editCatVal}
                      onChange={(event) => setEditCatVal(event.target.value)}
                      onKeyDown={(event) =>
                        event.key === "Enter" && handleSaveEditCat()
                      }
                      autoFocus
                    />
                  ) : (
                    <span
                      style={{
                        fontSize: 14,
                        fontWeight: 500,
                        color: "#1e293b",
                      }}
                    >
                      {category}
                    </span>
                  )}

                  <div style={{ display: "flex", gap: 4 }}>
                    {editCatIdx === index ? (
                      <>
                        <button
                          style={{ ...s.actionBtn, color: "#16a34a" }}
                          onClick={handleSaveEditCat}
                        >
                          ✓
                        </button>

                        <button
                          style={{ ...s.actionBtn, color: "#94a3b8" }}
                          onClick={() => setEditCatIdx(null)}
                        >
                          ✕
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          style={s.actionBtn}
                          onClick={() => {
                            setEditCatIdx(index);
                            setEditCatVal(category);
                          }}
                        >
                          <IconEdit />
                        </button>

                        <button
                          style={{ ...s.actionBtn, color: "#ef4444" }}
                          onClick={() => handleDeleteCat(index)}
                        >
                          <IconTrash />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div
              style={{
                marginTop: 20,
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <button
                style={{
                  padding: "10px 28px",
                  background: "#1a2b6d",
                  color: "#fff",
                  border: "none",
                  borderRadius: 10,
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}
                onClick={() => setShowCatModal(false)}
              >
                Selesai
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}