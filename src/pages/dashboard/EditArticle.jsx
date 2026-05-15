// ─── EditArticle.jsx ──────────────────────────────────────────────────────────
// Page: Edit Article — pre-filled form to edit an existing article.
// Also exports RejectedView for the rejected article detail sub-page.
//
// ── EditArticle props ──────────────────────────────────────────────────────────
//   article     — article object to edit (must already exist with an id)
//   onBack      — () => void              → navigate back (My Articles)
//   onSave      — (updatedArticle) => void → save changes (draft stays draft; published stays published)
//   onSubmit    — (updatedArticle) => void → submit to admin (status → "pending")
//   showToast   — (message, type) => void  → display a toast notification
//   authorMeta  — optional { name, category, date } shown as admin-context row
//
// ── RejectedView props ────────────────────────────────────────────────────────
//   article     — article object (status === "rejected")
//   onEdit      — (article) => void  → navigate to edit form for this article
//   onDelete    — (article, callback) => void → trigger delete modal in App
//   onBack      — () => void          → navigate back to My Articles
//
// Usage in App.jsx:
//   import EditArticle, { RejectedView } from "./EditArticle";
//
//   // Edit form
//   <EditArticle
//     article={editTarget}
//     onBack={() => setPage("myarticles")}
//     onSave={handleSave}
//     onSubmit={handleSubmit}
//     showToast={showToast}
//   />
//
//   // Rejected detail
//   <RejectedView
//     article={rejectedTarget}
//     onEdit={handleEdit}
//     onDelete={(art) => handleDeleteRequest(art, () => setPage("myarticles"))}
//     onBack={() => setPage("myarticles")}
//   />

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { writingTips, CATEGORIES } from "../../data/dummyNews";
import Header from "../../components/layout/Header";
import Sidebar from "../../components/layout/Sidebar";

// ─── CSS ──────────────────────────────────────────────────────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

  .form-page *, .form-page *::before, .form-page *::after,
  .page *, .page *::before, .page *::after { box-sizing: border-box; margin: 0; padding: 0; }

  /* ── Edit Article page ─────────────────────────────────────────────── */
  .form-page {
    font-family: 'Plus Jakarta Sans', sans-serif;
    background: #f8f9fb;
    min-height: calc(100vh - 64px);
    padding: 24px 28px 60px;
  }

  /* Topbar */
  .form-topbar {
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 20px;
  }
  .breadcrumb {
    display: flex; align-items: center; gap: 8px;
    font-size: 13px; color: #64748b;
    font-family: 'Plus Jakarta Sans', sans-serif;
  }
  .breadcrumb-link {
    color: #2347c5; cursor: pointer; background: none; border: none;
    font-family: inherit; font-size: 13px; font-weight: 500; padding: 0;
  }
  .breadcrumb-link:hover { text-decoration: underline; }

  .save-changes-btn {
    padding: 10px 24px; border-radius: 999px; border: none;
    background: #8b9fc4; color: #fff; font-family: inherit;
    font-size: 13px; font-weight: 700; cursor: pointer;
    display: flex; align-items: center; gap: 7px; transition: background 0.15s;
  }
  .save-changes-btn.active, .save-changes-btn:hover { background: #2347c5; }

  /* Author meta row (admin view) */
  .edit-meta-row {
    display: flex; align-items: center; gap: 14px;
    background: #fff; border: 1.5px solid #e2e8f0; border-radius: 12px;
    padding: 10px 16px; margin-bottom: 18px; flex-wrap: wrap;
    font-size: 12.5px; color: #64748b; font-family: 'Plus Jakarta Sans', sans-serif;
  }
  .edit-meta-author { display: flex; align-items: center; gap: 7px; }
  .edit-meta-cat {
    background: #eef2ff; color: #3b5bdb; border-radius: 6px;
    padding: 3px 10px; font-size: 11.5px; font-weight: 600;
  }
  .edit-meta-date { display: flex; align-items: center; gap: 5px; }

  /* Layout */
  .form-layout {
    display: flex; gap: 22px; align-items: flex-start;
  }
  .form-left  { flex: 1; display: flex; flex-direction: column; gap: 14px; min-width: 0; }
  .form-right { width: 260px; flex-shrink: 0; display: flex; flex-direction: column; gap: 14px; }

  /* Cards */
  .form-card {
    background: #fff; border: 1.5px solid #e2e8f0;
    border-radius: 14px; padding: 18px;
  }
  .form-label {
    font-size: 10.5px; font-weight: 800; letter-spacing: 0.08em;
    color: #94a3b8; text-transform: uppercase; margin-bottom: 10px;
  }
  .form-sublabel { font-size: 12px; color: #94a3b8; margin-bottom: 10px; }

  /* Inputs */
  .form-title-input {
    width: 100%; border: none; outline: none; font-family: inherit;
    font-size: 18px; font-weight: 700; color: #1e293b;
    background: transparent; resize: none; line-height: 1.4;
  }
  .form-title-input::placeholder { color: #cbd5e1; font-weight: 600; }
  .form-textarea {
    width: 100%; border: none; outline: none; font-family: inherit;
    font-size: 13px; color: #334155; background: transparent;
    resize: none; line-height: 1.7; min-height: 90px;
  }
  .form-textarea::placeholder { color: #cbd5e1; }
  .form-body-textarea { min-height: 200px; }

  /* Toolbar */
  .form-toolbar {
    display: flex; gap: 4px; margin-bottom: 12px;
    padding-bottom: 10px; border-bottom: 1px solid #f1f3f7;
  }
  .form-tool-btn {
    width: 28px; height: 28px; border: none; background: transparent;
    border-radius: 6px; cursor: pointer; display: flex; align-items: center;
    justify-content: center; font-family: serif; font-size: 13px;
    font-weight: 700; color: #475569; transition: background 0.1s; padding: 0;
  }
  .form-tool-btn:hover { background: #f1f5f9; }

  /* Thumbnail */
  .thumb-preview {
    width: 100%; height: 130px; border-radius: 10px;
    object-fit: cover; display: block; margin-bottom: 8px;
  }
  .thumb-placeholder {
    width: 100%; height: 130px; border-radius: 10px; background: #f8fafc;
    display: flex; flex-direction: column; align-items: center;
    justify-content: center; gap: 6px; color: #94a3b8; font-size: 12px;
    margin-bottom: 8px; border: 2px dashed #cbd5e1; cursor: pointer;
    transition: border-color 0.15s, background 0.15s;
  }
  .thumb-placeholder:hover { border-color: #2347c5; background: #eef1fb; }
  .upload-btn {
    width: 100%; padding: 8px 0; border: 1.5px solid #e2e8f0; border-radius: 8px;
    background: transparent; font-family: inherit; font-size: 12px;
    font-weight: 600; color: #475569; cursor: pointer; text-align: center;
    transition: background 0.1s;
  }
  .upload-btn:hover { background: #f8fafc; }

  /* Category */
  .cat-wrap { display: flex; flex-wrap: wrap; gap: 6px; min-height: 24px; }
  .cat-tag {
    display: inline-flex; align-items: center; gap: 5px;
    background: #eef2ff; color: #3b5bdb; border-radius: 6px;
    padding: 4px 10px; font-size: 11.5px; font-weight: 600;
  }
  .cat-remove {
    background: none; border: none; cursor: pointer;
    color: #6b7280; font-size: 14px; line-height: 1; padding: 0;
  }
  .cat-remove:hover { color: #dc2626; }
  .cat-add-row { display: flex; gap: 6px; margin-top: 8px; }
  .cat-select {
    flex: 1; border: 1.5px solid #e2e8f0; border-radius: 8px;
    font-family: inherit; font-size: 12px; padding: 6px 10px;
    outline: none; color: #475569; background: #f8fafc;
  }
  .cat-add-btn {
    padding: 6px 14px; border: none; border-radius: 8px;
    background: #2347c5; color: #fff; font-family: inherit;
    font-size: 14px; font-weight: 700; cursor: pointer;
  }

  /* Publication check */
  .pub-check-header {
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 12px;
  }
  .wc-row { display: flex; gap: 14px; }
  .wc-col { flex: 1; }
  .wc-label { font-size: 11px; color: #94a3b8; margin-bottom: 2px; }
  .wc-val { font-size: 17px; font-weight: 700; }
  .wc-val.green { color: #16a34a; }
  .wc-val.red   { color: #dc2626; }
  .wc-sub { font-size: 11px; color: #94a3b8; }
  .progress-bar {
    height: 5px; border-radius: 999px; background: #e2e8f0;
    margin-top: 8px; overflow: hidden;
  }
  .progress-fill {
    height: 100%; border-radius: 999px;
    background: #16a34a; transition: width 0.3s ease;
  }
  .progress-fill.red { background: #dc2626; }
  .wc-warn {
    display: flex; align-items: center; gap: 6px;
    background: #fee2e2; color: #dc2626; border-radius: 8px;
    padding: 7px 10px; font-size: 12px; font-weight: 600; margin-top: 10px;
  }

  /* Submit area */
  .form-submit-area { display: flex; flex-direction: column; gap: 8px; margin-top: 14px; }
  .form-primary-btn {
    width: 100%; padding: 11px 0; border-radius: 10px; border: none;
    font-family: inherit; font-size: 13px; font-weight: 700; cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    gap: 7px; transition: opacity 0.15s;
  }
  .form-primary-btn:hover { opacity: 0.88; }
  .form-primary-btn.save-draft { background: #2347c5; color: #fff; }
  .form-primary-btn.submit-btn {
    background: #e2e8f0; color: #94a3b8; cursor: default; pointer-events: none;
  }
  .form-primary-btn.submit-btn.enabled {
    background: #1e293b; color: #fff; cursor: pointer; pointer-events: auto;
  }

  /* Tips */
  .tips-item {
    display: flex; align-items: flex-start; gap: 7px;
    font-size: 11.5px; color: #64748b; line-height: 1.5; margin-bottom: 9px;
    font-family: 'Plus Jakarta Sans', sans-serif;
  }
  .tips-item:last-child { margin-bottom: 0; }
  .tips-check {
    width: 15px; height: 15px; border-radius: 50%; background: #dcfce7;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0; margin-top: 1px; color: #16a34a;
  }

  /* ── Rejected View page ────────────────────────────────────────────── */
  .page {
    font-family: 'Plus Jakarta Sans', sans-serif;
    background: #f8f9fb; min-height: calc(100vh - 64px);
    padding: 24px 28px 60px;
  }

  .rejected-banner {
    display: flex; align-items: center; gap: 10px;
    background: #fef2f2; border: 1.5px solid #fca5a5;
    color: #dc2626; border-radius: 12px;
    padding: 12px 18px; font-size: 13px; font-weight: 600;
    margin-bottom: 20px; animation: rjBannerIn 0.3s ease;
    font-family: 'Plus Jakarta Sans', sans-serif;
  }
  @keyframes rjBannerIn { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }

  .rejected-article-layout {
    display: flex; gap: 22px; align-items: flex-start;
  }
  .rejected-article-main {
    flex: 1; background: #fff; border: 1.5px solid #e2e8f0;
    border-radius: 14px; overflow: hidden; min-width: 0;
  }
  .rejected-article-side {
    width: 260px; flex-shrink: 0;
    display: flex; flex-direction: column; gap: 14px;
  }

  .article-full-img {
    width: 100%; max-height: 300px; object-fit: cover; display: block;
  }
  .article-body-label {
    display: flex; align-items: center; gap: 8px;
    padding: 14px 20px 0;
    font-size: 13px; font-weight: 700; color: #1e293b;
    font-family: 'Plus Jakarta Sans', sans-serif;
  }
  .article-body-text {
    padding: 12px 20px 22px;
    font-size: 13.5px; color: #334155; line-height: 1.8;
    font-family: 'Plus Jakarta Sans', sans-serif;
  }
  .article-body-text p { margin-bottom: 14px; }
  .article-body-text p:last-child { margin-bottom: 0; }

  /* Quick action card */
  .quick-action-card {
    background: #fff; border: 1.5px solid #e2e8f0;
    border-radius: 14px; padding: 18px;
  }
  .qa-title {
    font-size: 13px; font-weight: 700; color: #1e293b;
    margin-bottom: 12px;
    font-family: 'Plus Jakarta Sans', sans-serif;
  }
  .qa-btn {
    width: 100%; padding: 10px 0; border-radius: 10px; border: none;
    font-family: 'Plus Jakarta Sans', sans-serif; font-size: 13px;
    font-weight: 700; cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    gap: 7px; margin-bottom: 8px; transition: opacity 0.15s;
  }
  .qa-btn:last-child { margin-bottom: 0; }
  .qa-btn:hover { opacity: 0.85; }
  .qa-btn.edit-btn   { background: #eef1fb; color: #2347c5; }
  .qa-btn.delete-btn { background: #fee2e2; color: #dc2626; }
`;

const IcSave = () => (
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
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
    <polyline points="17 21 17 13 7 13 7 21" />
    <polyline points="7 3 7 8 15 8" />
  </svg>
);

const IcSend = () => (
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
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

const IcImg = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#94a3b8"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <polyline points="21 15 16 10 5 21" />
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

const IcWarn = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

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
    width="16"
    height="16"
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

const IcCalendar = () => (
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
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
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

function countWords(text) {
  return text.trim() ? text.trim().split(/\s+/).length : 0;
}

// ─── EDIT ARTICLE PAGE ────────────────────────────────────────────────────────
export default function EditArticle({
  article,
  onBack,
  onSave,
  onSubmit,
  showToast,
  authorMeta = null,
}) {
  const [title, setTitle] = useState(article?.title || "");
  const [synopsis, setSynopsis] = useState(article?.synopsis || "");
  const [body, setBody] = useState(article?.body || "");
  const [thumbnail, setThumbnail] = useState(article?.thumbnail || "");
  const [cats, setCats] = useState(article?.category ? [article.category] : []);
  const [selectedCat, setSelectedCat] = useState(CATEGORIES[0]);

  const wc = countWords(synopsis);
  const MAX = 400;
  const over = wc > MAX;
  const pct = Math.min(100, (wc / MAX) * 100);
  const readTime = Math.max(1, Math.ceil(wc / 200));
  const canSubmit = !over && wc >= 30 && title.trim().length > 0;

  const addCat = () => {
    if (!cats.includes(selectedCat)) setCats([...cats, selectedCat]);
  };
  const removeCat = (c) => setCats(cats.filter((x) => x !== c));

  // Build updated payload (preserves original article fields, merges edits)
  const buildPayload = (overrides = {}) => ({
    ...article,
    title,
    synopsis,
    body,
    thumbnail,
    category: cats[0] || "General",
    excerpt: synopsis.slice(0, 120) || article?.excerpt || "",
    wordCount: wc,
    readTime: `${readTime} min`,
    ...overrides,
  });

  const handleSaveDraft = () => {
    onSave(buildPayload());
    showToast("Artikel Berhasil Diperbarui", "updated");
  };

  const handleSubmit = () => {
    if (canSubmit) {
      onSubmit(buildPayload({ status: "pending", rejectionReason: null }));
      showToast("Artikel Berhasil Dikirim", "submitted");
    }
  };

  const navigate = useNavigate();

  return (
    <>
      <style>{css}</style>
      <Header user={{ name: "Faiz Sani", username: "faizgaul12" }} />
      <Sidebar role="user" onLogout={() => navigate("/")} />
      <div style={{ marginLeft: 240, marginTop: 64 }}>
        <div className="form-page">
          {/* Top bar */}
          <div className="form-topbar">
            <div className="breadcrumb">
              {authorMeta ? (
                <>
                  <button className="breadcrumb-link" onClick={onBack}>
                    Manage News
                  </button>
                  <span style={{ color: "#cbd5e1" }}>›</span>
                  <span>Edit News</span>
                </>
              ) : (
                <>
                  <button className="breadcrumb-link" onClick={onBack}>
                    My Articles
                  </button>
                  <span style={{ color: "#cbd5e1" }}>›</span>
                  <span>Edit Article</span>
                </>
              )}
            </div>
            <button
              className={`save-changes-btn${title.trim() ? " active" : ""}`}
              onClick={handleSaveDraft}
            >
              <IcSave /> Save Changes
            </button>
          </div>

          {/* Optional author meta row (admin view) */}
          {authorMeta && (
            <div className="edit-meta-row">
              <div className="edit-meta-author">
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
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <span style={{ fontWeight: 600, color: "#1e293b" }}>
                  {authorMeta.name}
                </span>
              </div>
              <span className="edit-meta-cat">{authorMeta.category}</span>
              <div className="edit-meta-date">
                <IcCalendar />
                <span>{authorMeta.date}</span>
              </div>
            </div>
          )}

          <div className="form-layout">
            {/* ── Left column ── */}
            <div className="form-left">
              {/* Title */}
              <div className="form-card">
                <div className="form-label">Judul Artikel</div>
                <textarea
                  className="form-title-input"
                  rows={2}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Masukkan judul yang menarik..."
                />
              </div>

              {/* Synopsis */}
              <div className="form-card">
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>
                  Ringkasan (Paham 2 Menit)
                </div>
                <div className="form-sublabel">
                  Tulis inti berita untuk pembaca cepat.
                </div>
                <textarea
                  className="form-textarea"
                  rows={5}
                  value={synopsis}
                  onChange={(e) => setSynopsis(e.target.value)}
                  placeholder="Tuliskan ringkasan singkat di sini..."
                />
              </div>

              {/* Body */}
              <div className="form-card">
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>
                  Artikel Lengkap
                </div>
                <div className="form-sublabel">
                  Tuliskan versi lengkap artikel di sini.
                </div>
                <div className="form-toolbar">
                  {[
                    { label: "B", style: { fontWeight: "bold" } },
                    { label: "I", style: { fontStyle: "italic" } },
                    { label: "≡", style: {} },
                    { label: "⇒", style: {} },
                    { label: "❝", style: {} },
                  ].map((t, i) => (
                    <button key={i} className="form-tool-btn" style={t.style}>
                      {t.label}
                    </button>
                  ))}
                </div>
                <textarea
                  className="form-textarea form-body-textarea"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder="Mulai menulis detail berita..."
                />
              </div>
            </div>

            {/* ── Right column ── */}
            <div className="form-right">
              {/* Thumbnail */}
              <div className="form-card">
                <div className="form-label">Gambar Unggulan</div>
                {thumbnail ? (
                  <img
                    src={thumbnail}
                    alt="thumb"
                    className="thumb-preview"
                    onError={(e) => (e.target.style.display = "none")}
                  />
                ) : (
                  <div className="thumb-placeholder">
                    <IcImg />
                    <span>Klik atau seret gambar ke sini</span>
                    <span style={{ fontSize: 10, color: "#cbd5e1" }}>
                      JPG, PNG (Maks. 2MB)
                    </span>
                  </div>
                )}
                <button className="upload-btn">Ganti Gambar</button>
              </div>

              {/* Category */}
              <div className="form-card">
                <div className="form-label">Kategori</div>
                <div className="cat-wrap">
                  {cats.map((c) => (
                    <span key={c} className="cat-tag">
                      {c}
                      <button
                        className="cat-remove"
                        onClick={() => removeCat(c)}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                  {cats.length === 0 && (
                    <span style={{ fontSize: 12, color: "#94a3b8" }}>
                      Belum ada kategori
                    </span>
                  )}
                </div>
                <div className="cat-add-row">
                  <select
                    className="cat-select"
                    value={selectedCat}
                    onChange={(e) => setSelectedCat(e.target.value)}
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                  <button className="cat-add-btn" onClick={addCat}>
                    +
                  </button>
                </div>
              </div>

              {/* Publication Check */}
              <div className="form-card">
                <div className="pub-check-header">
                  <span
                    style={{ fontSize: 13, fontWeight: 700, color: "#1e293b" }}
                  >
                    Pemeriksaan Publikasi {!over && wc > 0 ? "Ringkasan" : ""}
                  </span>
                  {!over && wc > 0 && (
                    <span style={{ color: "#16a34a" }}>
                      <IcCheck />
                    </span>
                  )}
                </div>
                <div className="wc-row">
                  <div className="wc-col">
                    <div className="wc-label">Word Count</div>
                    <div className={`wc-val ${over ? "red" : "green"}`}>
                      {wc} <span className="wc-sub">/ {MAX}</span>
                    </div>
                  </div>
                  <div className="wc-col">
                    <div className="wc-label">Read Time</div>
                    <div className={`wc-val ${over ? "red" : "green"}`}>
                      {wc === 0 ? 0 : readTime}{" "}
                      <span className="wc-sub">min</span>
                    </div>
                  </div>
                </div>
                <div className="progress-bar">
                  <div
                    className={`progress-fill${over ? " red" : ""}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
                {over && (
                  <div className="wc-warn">
                    <IcWarn /> Article exceeds 2-minute reading limit.
                  </div>
                )}
                <div className="form-submit-area">
                  <button
                    className="form-primary-btn save-draft"
                    onClick={handleSaveDraft}
                  >
                    <IcSave /> Save Draft
                  </button>
                  <button
                    className={`form-primary-btn submit-btn${canSubmit ? " enabled" : ""}`}
                    onClick={handleSubmit}
                  >
                    <IcSend /> Submit to Admin
                  </button>
                </div>
              </div>

              {/* Writing Tips */}
              <div className="form-card">
                <div
                  style={{ fontSize: 13, fontWeight: 700, marginBottom: 12 }}
                >
                  Tips Menulis 💡
                </div>
                {writingTips.map((t) => (
                  <div key={t.id} className="tips-item">
                    <div className="tips-check">
                      <IcCheck />
                    </div>
                    <div>
                      <strong>{t.title}:</strong> {t.tip}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// ─── REJECTED VIEW (named export) ────────────────────────────────────────────
// Rendered when the user clicks a rejected article card in My Articles.
export function RejectedView({ article, onEdit, onDelete, onBack }) {
  const navigate = useNavigate();
  return (
    <>
      <style>{css}</style>
      <Header user={{ name: "Faiz Sani", username: "faizgaul12" }} />
      <Sidebar role="user" onLogout={() => navigate("/")} />
      <div style={{ marginLeft: 240, marginTop: 64 }}>
        <div className="page">
          {/* Breadcrumb */}
          <div className="breadcrumb" style={{ marginBottom: 16 }}>
            <button className="breadcrumb-link" onClick={onBack}>
              My Articles
            </button>
            <span style={{ color: "#cbd5e1" }}>›</span>
            <span>Detail Artikel</span>
          </div>

          {/* Rejection reason banner */}
          <div className="rejected-banner">
            <IcWarn /> {article.rejectionReason || "Artikel Ditolak oleh Admin"}
          </div>

          <div className="rejected-article-layout">
            {/* Main content */}
            <div className="rejected-article-main">
              <img
                src={article.thumbnail}
                alt={article.title}
                className="article-full-img"
                onError={(e) => (e.target.style.display = "none")}
              />
              <div className="article-body-label">
                <IcDoc />
                Artikel Lengkap
              </div>
              <div className="article-body-text">
                {(article.body || "").split("\n\n").map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>

            {/* Side panel */}
            <div className="rejected-article-side">
              <div className="quick-action-card">
                <div className="qa-title">Quick Action</div>
                <button
                  className="qa-btn edit-btn"
                  onClick={() => onEdit(article)}
                >
                  <IcPen /> Edit
                </button>
                <button
                  className="qa-btn delete-btn"
                  onClick={() => onDelete(article)}
                >
                  <IcTrash /> Hapus
                </button>
              </div>

              <div className="form-card">
                <div
                  style={{ fontSize: 13, fontWeight: 700, marginBottom: 12 }}
                >
                  Tips Menulis 💡
                </div>
                {writingTips.map((t) => (
                  <div key={t.id} className="tips-item">
                    <div className="tips-check">
                      <IcCheck />
                    </div>
                    <div>
                      <strong>{t.title}:</strong> {t.tip}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
