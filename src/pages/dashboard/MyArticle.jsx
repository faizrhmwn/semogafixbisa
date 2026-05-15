// src/pages/MyArticles.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/layout/Header";
import Sidebar from "../../components/layout/Sidebar";

// ─── CONSTANTS ────────────────────────────────────────────────────────────────
const TABS = ["All", "Draft", "Pending", "Published", "Rejected"];

const INIT_ARTICLES = [
  {
    id: "user_1",
    title:
      "Transformasi Digital UMKM di Indonesia Meningkat Pesat, Didukung Platform Online dan Pembayaran Digital",
    category: "ECONOMICS",
    status: "published",
    date: "24 Okt 2025, 16:20 WIB",
    wordCount: 400,
    readTime: "2 min",
    thumbnail:
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=80",
    excerpt:
      "UMKM mulai memanfaatkan teknologi digital untuk meningkatkan jangkauan pasar mereka",
    synopsis:
      "Transformasi digital di kalangan pelaku Usaha Mikro, Kecil, dan Menengah (UMKM) di Indonesia menunjukkan peningkatan signifikan.",
    body: "Transformasi digital di kalangan pelaku Usaha Mikro, Kecil, dan Menengah (UMKM) di Indonesia menunjukkan peningkatan signifikan dalam beberapa tahun terakhir.\n\nBanyak pelaku UMKM mulai memanfaatkan marketplace dan media sosial untuk memasarkan produk mereka secara lebih luas.",
    likes: 45,
    comments: 12,
    rejectionReason: null,
  },
  {
    id: "user_2",
    title: "Quantum Computing: Batas Baru bagi Semakin Direkrut",
    category: "TECHNOLOGY",
    status: "draft",
    date: "23 Okt 2025, 14:50 WIB",
    wordCount: 0,
    readTime: "0 min",
    thumbnail:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&q=80",
    excerpt: "Tulis ringkasan singkat artikel di sini",
    synopsis: "",
    body: "",
    likes: 0,
    comments: 0,
    rejectionReason: null,
  },
  {
    id: "user_3",
    title: "Teknologi Hijau: Startup yang Memimpin Perlombaan Net Zero",
    category: "ENVIRONMENT",
    status: "pending",
    date: "22 Okt 2025, 11:30 WIB",
    wordCount: 425,
    readTime: "2 min",
    thumbnail:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&q=80",
    excerpt: "Dari penangkapan karbon hingga baterai solid-state",
    synopsis:
      "Dari penangkapan karbon hingga baterai solid-state, kami mengulas startup yang mengubah cara kita berbisnis.",
    body: "Dari penangkapan karbon hingga baterai solid-state, kami mengulas startup yang mengubah cara kita berbisnis dengan target net zero.",
    likes: 23,
    comments: 8,
    rejectionReason: null,
  },
  {
    id: "user_4",
    title: "Ekosistem Laut: Mengapa Kita Harus Peduli",
    category: "ENVIRONMENT",
    status: "rejected",
    date: "20 Okt 2025, 09:00 WIB",
    wordCount: 620,
    readTime: "3 min",
    thumbnail:
      "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=600&q=80",
    excerpt: "Lautan menutupi lebih dari 70% permukaan planet kita",
    synopsis:
      "Lautan menutupi lebih dari 70% permukaan planet kita dan merupakan rumah bagi jutaan spesies.",
    body: "Lautan menutupi lebih dari 70% permukaan planet kita dan merupakan rumah bagi jutaan spesies yang berbeda.\n\nMenjaga ekosistem laut bukan hanya soal menyelamatkan keanekaragaman hayati; ini adalah soal kelangsungan hidup manusia.\n\nLangkah-langkah konkret diperlukan segera.",
    likes: 0,
    comments: 0,
    rejectionReason: "Artikel Terlalu Panjang Dan Bertele-tele",
  },
];

// ─── CSS ──────────────────────────────────────────────────────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

  .ma-wrap *, .ma-wrap *::before, .ma-wrap *::after { box-sizing: border-box; margin: 0; padding: 0; }
  .ma-wrap { font-family: 'Plus Jakarta Sans', sans-serif; background: #f8f9fb; min-height: 100vh; padding: 28px; }

  .ma-dashboard-shell { display: flex; min-height: 100vh; }
  .ma-content-area { margin-left: 240px; margin-top: 64px; flex: 1; min-width: 0; }

  .ma-page-header { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 20px; gap: 14px; flex-wrap: wrap; }
  .ma-page-title { font-size: 17px; font-weight: 700; color: #1e293b; margin-bottom: 3px; }
  .ma-page-sub { font-size: 13px; color: #64748b; }

  .ma-tabs { display: flex; background: #fff; border: 1.5px solid #e2e8f0; border-radius: 999px; padding: 4px; gap: 2px; flex-shrink: 0; }
  .ma-tab { padding: 7px 18px; border-radius: 999px; border: none; font-family: inherit; font-size: 13px; font-weight: 500; color: #64748b; cursor: pointer; background: transparent; transition: background 0.12s, color 0.12s; white-space: nowrap; }
  .ma-tab:hover { color: #1a2b6d; }
  .ma-tab.active { background: #1a2b6d; color: #fff; font-weight: 700; }

  .ma-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
  @media (max-width: 900px) { .ma-grid { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 580px) { .ma-grid { grid-template-columns: 1fr; } }

  .ma-card { background: #fff; border: 1.5px solid #e2e8f0; border-radius: 14px; overflow: hidden; display: flex; flex-direction: column; }
  .ma-card-thumb { position: relative; width: 100%; height: 165px; overflow: hidden; background: #e2e8f0; flex-shrink: 0; }
  .ma-card-thumb img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .ma-badge { position: absolute; top: 10px; right: 10px; padding: 3px 10px; border-radius: 999px; font-size: 10px; font-weight: 800; letter-spacing: 0.06em; text-transform: uppercase; }
  .ma-badge.draft     { background: #e2e8f0; color: #475569; }
  .ma-badge.published { background: #dcfce7; color: #16a34a; }
  .ma-badge.pending   { background: #fef3c7; color: #b45309; }
  .ma-badge.rejected  { background: #fee2e2; color: #dc2626; }
  .ma-card-body { padding: 14px 14px 12px; display: flex; flex-direction: column; flex: 1; }
  .ma-card-title { font-size: 13.5px; font-weight: 700; color: #1e293b; line-height: 1.45; margin-bottom: 6px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
  .ma-card-excerpt { font-size: 12px; color: #64748b; line-height: 1.6; margin-bottom: 10px; flex: 1; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
  .ma-card-meta { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; }
  .ma-meta-item { display: flex; align-items: center; gap: 4px; font-size: 12px; color: #94a3b8; }
  .ma-card-footer { display: flex; align-items: center; justify-content: space-between; padding-top: 10px; border-top: 1px solid #f1f3f7; }
  .ma-footer-actions { display: flex; align-items: center; gap: 5px; }

  .ma-icon-btn { width: 30px; height: 30px; border-radius: 7px; border: none; background: none; cursor: pointer; display: flex; align-items: center; justify-content: center; color: #94a3b8; transition: background 0.12s, color 0.12s; }
  .ma-icon-btn:hover { background: #f1f3f7; color: #475569; }
  .ma-icon-btn.danger:hover { background: #fee2e2; color: #dc2626; }

  .ma-status-btn { padding: 6px 14px; border-radius: 8px; border: none; font-family: inherit; font-size: 12px; font-weight: 600; cursor: pointer; transition: opacity 0.15s; }
  .ma-status-btn.submit { background: #2347c5; color: #fff; }
  .ma-status-btn.live { background: #f1f3f7; color: #1e293b; cursor: default; }
  .ma-status-btn.reviewing { background: #f1f3f7; color: #64748b; cursor: default; }

  .ma-card-new { border: 2px dashed #cbd5e1; border-radius: 14px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px; padding: 36px 20px; cursor: pointer; transition: border-color 0.15s, background 0.15s; background: transparent; min-height: 180px; width: 100%; }
  .ma-card-new:hover { border-color: #2347c5; background: #eef1fb; }
  .ma-new-icon { width: 44px; height: 44px; border-radius: 50%; background: #e2e8f0; display: flex; align-items: center; justify-content: center; color: #64748b; transition: background 0.15s, color 0.15s; }
  .ma-card-new:hover .ma-new-icon { background: #2347c5; color: #fff; }

  .ma-empty { grid-column: 1 / -1; text-align: center; padding: 50px 0; color: #94a3b8; }

  /* Modal */
  .ma-modal-overlay { position: fixed; inset: 0; background: rgba(15,23,42,0.45); backdrop-filter: blur(2px); z-index: 100; display: flex; align-items: center; justify-content: center; animation: maFadeIn 0.18s ease; }
  @keyframes maFadeIn { from { opacity: 0; } to { opacity: 1; } }
  .ma-modal { background: #fff; border-radius: 18px; padding: 30px 26px 26px; width: 100%; max-width: 400px; box-shadow: 0 20px 60px rgba(15,23,42,0.18); animation: maPopIn 0.22s cubic-bezier(0.34,1.56,0.64,1); }
  @keyframes maPopIn { from { opacity: 0; transform: scale(0.88) translateY(12px); } to { opacity: 1; transform: scale(1) translateY(0); } }
  .ma-modal-icon { width: 50px; height: 50px; border-radius: 14px; background: #fee2e2; display: flex; align-items: center; justify-content: center; margin-bottom: 14px; color: #dc2626; }
  .ma-modal-actions { display: flex; gap: 10px; justify-content: flex-end; margin-top: 22px; }
  .ma-modal-btn { padding: 9px 22px; border-radius: 9px; border: none; font-family: inherit; font-size: 13px; font-weight: 600; cursor: pointer; }
  .ma-modal-btn.cancel { background: #f1f5f9; color: #475569; border: 1.5px solid #e2e8f0; }
  .ma-modal-btn.cancel:hover { background: #e2e8f0; }
  .ma-modal-btn.del { background: #dc2626; color: #fff; }

  /* Toast */
  .ma-toast-wrap { position: fixed; top: 70px; left: 50%; transform: translateX(-50%); z-index: 200; display: flex; flex-direction: column; align-items: center; gap: 8px; pointer-events: none; }
  .ma-toast { display: flex; align-items: center; gap: 9px; padding: 10px 20px; border-radius: 999px; font-size: 13.5px; font-weight: 600; box-shadow: 0 8px 30px rgba(0,0,0,0.14); animation: maToastIn 0.3s cubic-bezier(0.34,1.56,0.64,1); font-family: 'Plus Jakarta Sans', sans-serif; pointer-events: all; }
  .ma-toast.deleted   { background: #dc2626; color: #fff; }
  .ma-toast.submitted { background: #2347c5; color: #fff; }
  @keyframes maToastIn { from { opacity: 0; transform: translateY(-12px) scale(0.92); } to { opacity: 1; transform: translateY(0) scale(1); } }
  @keyframes maToastOut { from { opacity: 1; } to { opacity: 0; transform: translateY(-10px) scale(0.95); } }
  .ma-toast.hiding { animation: maToastOut 0.25s ease forwards; }
`;

// ─── ICONS ────────────────────────────────────────────────────────────────────
const IcPen = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4z" />
  </svg>
);
const IcTrash = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
    <path d="M10 11v6" />
    <path d="M14 11v6" />
    <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
  </svg>
);
const IcHeart = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);
const IcMsg = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);
const IcPlus = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
  >
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);
const IcCheck = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
const IcDoc = () => (
  <svg
    width="34"
    height="34"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#cbd5e1"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="8" y1="13" x2="16" y2="13" />
    <line x1="8" y1="17" x2="12" y2="17" />
  </svg>
);

// ─── TOAST HOOK ───────────────────────────────────────────────────────────────
function useToast() {
  const [toasts, setToasts] = useState([]);
  const show = (message, type) => {
    const id = Date.now();
    setToasts((p) => [...p, { id, message, type, hiding: false }]);
    setTimeout(() => {
      setToasts((p) =>
        p.map((t) => (t.id === id ? { ...t, hiding: true } : t)),
      );
      setTimeout(() => setToasts((p) => p.filter((t) => t.id !== id)), 300);
    }, 2800);
  };
  return { toasts, show };
}

// ─── STATUS BUTTON ────────────────────────────────────────────────────────────
function StatusButton({ status, onSubmit }) {
  if (status === "draft")
    return (
      <button className="ma-status-btn submit" onClick={onSubmit}>
        Submit to Admin
      </button>
    );
  if (status === "published")
    return <button className="ma-status-btn live">Live on Site</button>;
  if (status === "pending" || status === "rejected")
    return <button className="ma-status-btn reviewing">Reviewing</button>;
  return null;
}

// ─── ARTICLE CARD ─────────────────────────────────────────────────────────────
function ArticleCard({
  article,
  onEdit,
  onDeleteRequest,
  onSubmit,
  onViewRejected,
}) {
  return (
    <div className="ma-card">
      <div
        className="ma-card-thumb"
        onClick={() => article.status === "rejected" && onViewRejected(article)}
        style={{
          cursor: article.status === "rejected" ? "pointer" : "default",
        }}
      >
        <img
          src={article.thumbnail}
          alt={article.title}
          onError={(e) => {
            e.target.style.display = "none";
          }}
        />
        <span className={`ma-badge ${article.status}`}>{article.status}</span>
      </div>
      <div className="ma-card-body">
        <div className="ma-card-title">{article.title}</div>
        <div className="ma-card-excerpt">{article.excerpt}</div>
        <div className="ma-card-meta">
          <span className="ma-meta-item">
            <IcHeart /> {article.likes}
          </span>
          <span className="ma-meta-item">
            <IcMsg /> {article.comments}
          </span>
        </div>
        <div className="ma-card-footer">
          <div className="ma-footer-actions">
            <button className="ma-icon-btn" onClick={() => onEdit(article)}>
              <IcPen />
            </button>
            <button
              className="ma-icon-btn danger"
              onClick={() => onDeleteRequest(article)}
            >
              <IcTrash />
            </button>
          </div>
          <StatusButton
            status={article.status}
            onSubmit={() => onSubmit(article)}
          />
        </div>
      </div>
    </div>
  );
}

// ─── MY ARTICLES PAGE ─────────────────────────────────────────────────────────
export default function MyArticles() {
  const navigate = useNavigate();
  const [articles, setArticles] = useState(INIT_ARTICLES);
  const [activeTab, setActiveTab] = useState("All");
  const [deleteTarget, setDeleteTarget] = useState(null);
  const { toasts, show: showToast } = useToast();

  const filtered =
    activeTab === "All"
      ? articles
      : articles.filter((a) => a.status === activeTab.toLowerCase());

  // Navigate to EditArticle with article data via router state
  const handleEdit = (art) =>
    navigate(`/edit-article/${art.id}`, { state: { article: art } });

  // Navigate to EditArticle in "rejected view" mode
  const handleViewRejected = (art) =>
    navigate(`/edit-article/${art.id}`, {
      state: { article: art, viewRejected: true },
    });

  const handleDeleteConfirm = () => {
    setArticles((prev) => prev.filter((a) => a.id !== deleteTarget.id));
    setDeleteTarget(null);
    showToast("Artikel Berhasil Dihapus", "deleted");
  };

  // Quick submit from card (draft → pending)
  const handleCardSubmit = (art) => {
    setArticles((prev) =>
      prev.map((a) => (a.id === art.id ? { ...a, status: "pending" } : a)),
    );
    showToast("Artikel Berhasil Dikirim", "submitted");
  };

  return (
    <>
      <style>{css}</style>
      <Header user={{ name: "Faiz Sani", username: "faizgaul12" }} />
      <Sidebar role="user" onLogout={() => navigate("/")} />

      {/* Toast notifications */}
      <div className="ma-toast-wrap">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`ma-toast ${t.type}${t.hiding ? " hiding" : ""}`}
          >
            <IcCheck /> {t.message}
          </div>
        ))}
      </div>

      {/* Delete confirmation modal */}
      {deleteTarget && (
        <div className="ma-modal-overlay" onClick={() => setDeleteTarget(null)}>
          <div className="ma-modal" onClick={(e) => e.stopPropagation()}>
            <div className="ma-modal-icon">
              <IcTrash />
            </div>
            <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>
              Hapus Artikel?
            </div>
            <div style={{ fontSize: 13, color: "#64748b", lineHeight: 1.6 }}>
              Apakah Anda yakin ingin menghapus artikel ini?
              <br />
              Tindakan ini tidak dapat dibatalkan.
            </div>
            <div className="ma-modal-actions">
              <button
                className="ma-modal-btn cancel"
                onClick={() => setDeleteTarget(null)}
              >
                Batal
              </button>
              <button
                className="ma-modal-btn del"
                onClick={handleDeleteConfirm}
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="ma-content-area">
        <div className="ma-wrap">
          {/* Page header */}
          <div className="ma-page-header">
            <div>
              <div className="ma-page-title">My Articles</div>
              <div className="ma-page-sub">
                Manage and track your editorial contributions.
              </div>
            </div>
            <div className="ma-tabs">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  className={`ma-tab${activeTab === tab ? " active" : ""}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Article grid */}
          <div className="ma-grid">
            {filtered.length === 0 ? (
              <div className="ma-empty">
                <IcDoc />
                <div style={{ fontSize: 13, marginTop: 8 }}>
                  Tidak ada artikel di kategori ini.
                </div>
              </div>
            ) : (
              filtered.map((art) => (
                <ArticleCard
                  key={art.id}
                  article={art}
                  onEdit={handleEdit}
                  onDeleteRequest={setDeleteTarget}
                  onSubmit={handleCardSubmit}
                  onViewRejected={handleViewRejected}
                />
              ))
            )}

            {/* Write new card */}
            <button
              className="ma-card-new"
              onClick={() => navigate("/write-news")}
            >
              <div className="ma-new-icon">
                <IcPlus />
              </div>
              <div
                style={{ fontSize: 13.5, fontWeight: 700, color: "#1e293b" }}
              >
                Write New Article
              </div>
              <div
                style={{ fontSize: 12, color: "#94a3b8", textAlign: "center" }}
              >
                Draft a fresh story and reach your audience today.
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
