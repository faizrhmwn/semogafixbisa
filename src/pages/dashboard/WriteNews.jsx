// src/pages/WriteNews.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/layout/Header";
import Sidebar from "../../components/layout/Sidebar";

// ─── CONSTANTS ────────────────────────────────────────────────────────────────
const CATEGORIES = [
  "Economics",
  "Technology",
  "Environment",
  "Politics",
  "Social",
  "Education",
];
const MAX_WORDS = 400;

const WRITING_TIPS = [
  {
    id: 1,
    title: "Gunakan Kalimat Aktif",
    tip: "Hindari pemborosan kata dengan struktur kalimat yang langsung pada intinya.",
  },
  {
    id: 2,
    title: "Satu Paragraf, Satu Ide",
    tip: "Pastikan setiap paragraf tetap pendek dan fokus agar lebih mudah dipindai pembaca.",
  },
  {
    id: 3,
    title: "Potong Kata yang Tidak Perlu",
    tip: "Hapus kata keterangan atau penghubung yang berlebihan untuk menghemat waktu baca.",
  },
  {
    id: 4,
    title: "Fokus pada Inti Berita",
    tip: "Sampaikan informasi terpenting di awal artikel (metode piramida terbalik).",
  },
];

// ─── HELPERS ─────────────────────────────────────────────────────────────────
const countWords = (text) =>
  text.trim() ? text.trim().split(/\s+/).length : 0;

// ─── CSS ──────────────────────────────────────────────────────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

  .wn-wrap *, .wn-wrap *::before, .wn-wrap *::after { box-sizing: border-box; margin: 0; padding: 0; }
  .wn-wrap { font-family: 'Plus Jakarta Sans', sans-serif; background: #f8f9fb; min-height: 100vh; padding: 24px 28px 60px; }

  /* Dashboard shell offset */
  .wn-content-area { margin-left: 240px; margin-top: 64px; flex: 1; min-width: 0; }

  /* Topbar */
  .wn-topbar { display: flex; align-items: center; justify-content: space-between; margin-bottom: 22px; }
  .wn-breadcrumb { display: flex; align-items: center; gap: 8px; font-size: 14px; font-weight: 700; color: #1e293b; }
  .wn-save-btn { padding: 10px 24px; border-radius: 999px; border: none; background: #8b9fc4; color: #fff; font-family: inherit; font-size: 13px; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 7px; transition: background 0.15s; }
  .wn-save-btn.active, .wn-save-btn:hover { background: #2347c5; }

  /* Layout */
  .wn-layout { display: flex; gap: 22px; align-items: flex-start; }
  .wn-left  { flex: 1; display: flex; flex-direction: column; gap: 14px; min-width: 0; }
  .wn-right { width: 260px; flex-shrink: 0; display: flex; flex-direction: column; gap: 14px; }

  /* Cards */
  .wn-card { background: #fff; border: 1.5px solid #e2e8f0; border-radius: 14px; padding: 18px; }
  .wn-label { font-size: 10.5px; font-weight: 800; letter-spacing: 0.08em; color: #94a3b8; text-transform: uppercase; margin-bottom: 10px; }
  .wn-sublabel { font-size: 12px; color: #94a3b8; margin-bottom: 10px; }

  /* Inputs */
  .wn-title-input { width: 100%; border: none; outline: none; font-family: inherit; font-size: 18px; font-weight: 700; color: #1e293b; background: transparent; resize: none; line-height: 1.4; }
  .wn-title-input::placeholder { color: #cbd5e1; font-weight: 600; }
  .wn-textarea { width: 100%; border: none; outline: none; font-family: inherit; font-size: 13px; color: #334155; background: transparent; resize: none; line-height: 1.7; min-height: 90px; }
  .wn-textarea::placeholder { color: #cbd5e1; }
  .wn-body-area { min-height: 200px; }

  /* Toolbar */
  .wn-toolbar { display: flex; gap: 4px; margin-bottom: 12px; padding-bottom: 10px; border-bottom: 1px solid #f1f3f7; }
  .wn-tool-btn { width: 28px; height: 28px; border: none; background: transparent; border-radius: 6px; cursor: pointer; display: flex; align-items: center; justify-content: center; font-family: serif; font-size: 13px; font-weight: 700; color: #475569; transition: background 0.1s; padding: 0; }
  .wn-tool-btn:hover { background: #f1f5f9; }

  /* Thumbnail */
  .wn-thumb-preview { width: 100%; height: 130px; border-radius: 10px; object-fit: cover; display: block; margin-bottom: 8px; background: #e2e8f0; }
  .wn-thumb-placeholder { width: 100%; height: 130px; border-radius: 10px; background: #f8fafc; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 6px; color: #94a3b8; font-size: 12px; margin-bottom: 8px; border: 2px dashed #cbd5e1; cursor: pointer; transition: border-color 0.15s, background 0.15s; }
  .wn-thumb-placeholder:hover { border-color: #2347c5; background: #eef1fb; }
  .wn-upload-btn { width: 100%; padding: 8px 0; border: 1.5px solid #e2e8f0; border-radius: 8px; background: transparent; font-family: inherit; font-size: 12px; font-weight: 600; color: #475569; cursor: pointer; text-align: center; transition: background 0.1s; }
  .wn-upload-btn:hover { background: #f8fafc; }

  /* Category */
  .wn-cat-wrap { display: flex; flex-wrap: wrap; gap: 6px; min-height: 24px; }
  .wn-cat-tag { display: inline-flex; align-items: center; gap: 5px; background: #eef2ff; color: #3b5bdb; border-radius: 6px; padding: 4px 10px; font-size: 11.5px; font-weight: 600; }
  .wn-cat-remove { background: none; border: none; cursor: pointer; color: #6b7280; font-size: 14px; line-height: 1; padding: 0; }
  .wn-cat-remove:hover { color: #dc2626; }
  .wn-cat-add-row { display: flex; gap: 6px; margin-top: 8px; }
  .wn-cat-select { flex: 1; border: 1.5px solid #e2e8f0; border-radius: 8px; font-family: inherit; font-size: 12px; padding: 6px 10px; outline: none; color: #475569; background: #f8fafc; }
  .wn-cat-add-btn { padding: 6px 14px; border: none; border-radius: 8px; background: #2347c5; color: #fff; font-family: inherit; font-size: 14px; font-weight: 700; cursor: pointer; }

  /* Publication check */
  .wn-pub-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; }
  .wn-wc-row { display: flex; gap: 14px; }
  .wn-wc-col { flex: 1; }
  .wn-wc-label { font-size: 11px; color: #94a3b8; margin-bottom: 2px; }
  .wn-wc-val { font-size: 17px; font-weight: 700; }
  .wn-wc-val.green { color: #16a34a; }
  .wn-wc-val.red   { color: #dc2626; }
  .wn-wc-sub { font-size: 11px; color: #94a3b8; }
  .wn-progress { height: 5px; border-radius: 999px; background: #e2e8f0; margin-top: 8px; overflow: hidden; }
  .wn-progress-fill { height: 100%; border-radius: 999px; background: #16a34a; transition: width 0.3s ease; }
  .wn-progress-fill.red { background: #dc2626; }

  /* Word-over alert banner */
  .wn-over-alert {
    display: flex; align-items: center; gap: 8px;
    background: #fef2f2; border: 1.5px solid #fca5a5;
    color: #dc2626; border-radius: 10px;
    padding: 10px 14px; font-size: 12.5px; font-weight: 600;
    margin-top: 10px; animation: wnAlertIn 0.25s ease;
  }
  @keyframes wnAlertIn { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: translateY(0); } }
  .wn-over-alert svg { flex-shrink: 0; }

  /* Submit area */
  .wn-submit-area { display: flex; flex-direction: column; gap: 8px; margin-top: 14px; }
  .wn-primary-btn { width: 100%; padding: 11px 0; border-radius: 10px; border: none; font-family: inherit; font-size: 13px; font-weight: 700; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 7px; transition: opacity 0.15s, background 0.15s; }
  .wn-primary-btn:hover { opacity: 0.88; }
  .wn-primary-btn.draft  { background: #2347c5; color: #fff; }
  .wn-primary-btn.submit { background: #e2e8f0; color: #94a3b8; cursor: default; pointer-events: none; }
  .wn-primary-btn.submit.on { background: #1e293b; color: #fff; cursor: pointer; pointer-events: auto; }

  /* Tips */
  .wn-tip-item { display: flex; align-items: flex-start; gap: 7px; font-size: 11.5px; color: #64748b; line-height: 1.5; margin-bottom: 9px; }
  .wn-tip-item:last-child { margin-bottom: 0; }
  .wn-tip-check { width: 15px; height: 15px; border-radius: 50%; background: #dcfce7; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 1px; color: #16a34a; }

  /* Toast */
  .wn-toast-wrap { position: fixed; top: 70px; left: 50%; transform: translateX(-50%); z-index: 300; display: flex; flex-direction: column; align-items: center; gap: 8px; pointer-events: none; }
  .wn-toast { display: flex; align-items: center; gap: 9px; padding: 10px 20px; border-radius: 999px; font-size: 13.5px; font-weight: 600; box-shadow: 0 8px 30px rgba(0,0,0,0.14); animation: wnToastIn 0.3s cubic-bezier(0.34,1.56,0.64,1); font-family: 'Plus Jakarta Sans', sans-serif; }
  .wn-toast.saved     { background: #475569; color: #fff; }
  .wn-toast.submitted { background: #2347c5; color: #fff; }
  @keyframes wnToastIn  { from { opacity: 0; transform: translateY(-12px) scale(0.92); } to { opacity: 1; transform: translateY(0) scale(1); } }
  @keyframes wnToastOut { from { opacity: 1; } to { opacity: 0; transform: translateY(-10px) scale(0.95); } }
  .wn-toast.hiding { animation: wnToastOut 0.25s ease forwards; }
`;

// ─── ICONS ────────────────────────────────────────────────────────────────────
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
const IcWrite = () => (
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
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
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

// ─── WRITE NEWS PAGE ──────────────────────────────────────────────────────────
export default function WriteNews() {
  const navigate = useNavigate();
  const { toasts, show: showToast } = useToast();

  const [title, setTitle] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [body, setBody] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [cats, setCats] = useState([]);
  const [selectedCat, setSelectedCat] = useState(CATEGORIES[0]);

  const wc = countWords(synopsis);
  const over = wc > MAX_WORDS;
  const pct = Math.min(100, (wc / MAX_WORDS) * 100);
  const readTime = Math.max(1, Math.ceil(wc / 200));
  const canSubmit = !over && wc >= 30 && title.trim().length > 0;

  const addCat = () => {
    if (!cats.includes(selectedCat)) setCats([...cats, selectedCat]);
  };
  const removeCat = (c) => setCats(cats.filter((x) => x !== c));

  const buildPayload = (status) => ({
    id: `user_${Date.now()}`,
    title,
    synopsis,
    body,
    thumbnail,
    category: cats[0] || "General",
    excerpt:
      synopsis.slice(0, 120) || "Tulis ringkasan singkat artikel di sini",
    wordCount: wc,
    readTime: `${readTime} min`,
    status,
    likes: 0,
    comments: 0,
    rejectionReason: null,
    date: new Date().toLocaleDateString("id-ID"),
  });

  const handleSaveDraft = () => {
    console.log("Draft saved:", buildPayload("draft"));
    showToast("Draft Tersimpan", "saved");
    setTimeout(() => navigate("/my-articles"), 1000);
  };

  const handleSubmit = () => {
    if (!canSubmit) return;
    console.log("Submitted:", buildPayload("pending"));
    showToast("Artikel Berhasil Dikirim", "submitted");
    setTimeout(() => navigate("/my-articles"), 1000);
  };

  return (
    <>
      <style>{css}</style>

      {/* Header & Sidebar */}
      <Header user={{ name: "Faiz Sani", username: "faizgaul12" }} />
      <Sidebar role="user" onLogout={() => navigate("/")} />

      {/* Toast */}
      <div className="wn-toast-wrap">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`wn-toast ${t.type}${t.hiding ? " hiding" : ""}`}
          >
            <IcCheck /> {t.message}
          </div>
        ))}
      </div>

      {/* Content offset from sidebar + header */}
      <div className="wn-content-area">
        <div className="wn-wrap">
          {/* Topbar */}
          <div className="wn-topbar">
            <div className="wn-breadcrumb">
              <IcWrite />
              <span>Write News</span>
            </div>
            <button
              className={`wn-save-btn${title.trim() ? " active" : ""}`}
              onClick={handleSaveDraft}
            >
              <IcSave /> Save Changes
            </button>
          </div>

          {/* Word-over floating alert */}
          {over && (
            <div className="wn-over-alert">
              <IcWarn />
              Ringkasan melebihi batas {MAX_WORDS} kata! Harap kurangi agar
              artikel bisa dikirim ke admin.
            </div>
          )}

          <div className="wn-layout">
            {/* ── Left ── */}
            <div className="wn-left">
              {/* Title */}
              <div className="wn-card">
                <div className="wn-label">Judul Artikel</div>
                <textarea
                  className="wn-title-input"
                  rows={2}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Masukkan judul yang menarik..."
                />
              </div>

              {/* Synopsis */}
              <div className="wn-card">
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>
                  Ringkasan (Paham 2 Menit)
                </div>
                <div className="wn-sublabel">
                  Tulis inti berita untuk pembaca cepat. Maks. {MAX_WORDS} kata.
                </div>
                <textarea
                  className="wn-textarea"
                  rows={5}
                  value={synopsis}
                  onChange={(e) => setSynopsis(e.target.value)}
                  placeholder="Tuliskan ringkasan singkat di sini..."
                  style={over ? { color: "#dc2626" } : {}}
                />
              </div>

              {/* Body */}
              <div className="wn-card">
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>
                  Artikel Lengkap
                </div>
                <div className="wn-sublabel">
                  Tuliskan versi lengkap artikel di sini.
                </div>
                <div className="wn-toolbar">
                  {[
                    { l: "B", s: { fontWeight: "bold" } },
                    { l: "I", s: { fontStyle: "italic" } },
                    { l: "≡", s: {} },
                    { l: "⇒", s: {} },
                    { l: "❝", s: {} },
                  ].map((t, i) => (
                    <button key={i} className="wn-tool-btn" style={t.s}>
                      {t.l}
                    </button>
                  ))}
                </div>
                <textarea
                  className="wn-textarea wn-body-area"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder="Mulai menulis detail berita..."
                />
              </div>
            </div>

            {/* ── Right ── */}
            <div className="wn-right">
              {/* Thumbnail */}
              <div className="wn-card">
                <div className="wn-label">Gambar Unggulan</div>
                {thumbnail ? (
                  <img
                    src={thumbnail}
                    alt="thumb"
                    className="wn-thumb-preview"
                    onError={(e) => (e.target.style.display = "none")}
                  />
                ) : (
                  <div className="wn-thumb-placeholder">
                    <IcImg />
                    <span>Klik atau seret gambar ke sini</span>
                    <span style={{ fontSize: 10, color: "#cbd5e1" }}>
                      JPG, PNG (Maks. 2MB)
                    </span>
                  </div>
                )}
                <button className="wn-upload-btn">Ganti Gambar</button>
              </div>

              {/* Category */}
              <div className="wn-card">
                <div className="wn-label">Kategori</div>
                <div className="wn-cat-wrap">
                  {cats.map((c) => (
                    <span key={c} className="wn-cat-tag">
                      {c}
                      <button
                        className="wn-cat-remove"
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
                <div className="wn-cat-add-row">
                  <select
                    className="wn-cat-select"
                    value={selectedCat}
                    onChange={(e) => setSelectedCat(e.target.value)}
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                  <button className="wn-cat-add-btn" onClick={addCat}>
                    +
                  </button>
                </div>
              </div>

              {/* Publication check */}
              <div className="wn-card">
                <div className="wn-pub-header">
                  <span
                    style={{ fontSize: 13, fontWeight: 700, color: "#1e293b" }}
                  >
                    Pemeriksaan Publikasi{!over && wc > 0 ? " Ringkasan" : ""}
                  </span>
                  {!over && wc > 0 && (
                    <span style={{ color: "#16a34a" }}>
                      <IcCheck />
                    </span>
                  )}
                  {over && (
                    <span style={{ color: "#dc2626" }}>
                      <IcWarn />
                    </span>
                  )}
                </div>
                <div className="wn-wc-row">
                  <div className="wn-wc-col">
                    <div className="wn-wc-label">Word Count</div>
                    <div className={`wn-wc-val ${over ? "red" : "green"}`}>
                      {wc} <span className="wn-wc-sub">/ {MAX_WORDS}</span>
                    </div>
                  </div>
                  <div className="wn-wc-col">
                    <div className="wn-wc-label">Read Time</div>
                    <div className={`wn-wc-val ${over ? "red" : "green"}`}>
                      {wc === 0 ? 0 : readTime}{" "}
                      <span className="wn-wc-sub">min</span>
                    </div>
                  </div>
                </div>
                <div className="wn-progress">
                  <div
                    className={`wn-progress-fill${over ? " red" : ""}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
                {over && (
                  <div
                    style={{
                      background: "#fee2e2",
                      color: "#dc2626",
                      borderRadius: 8,
                      padding: "7px 10px",
                      fontSize: 12,
                      fontWeight: 600,
                      marginTop: 10,
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    <IcWarn /> Article exceeds 2-minute reading limit.
                  </div>
                )}
                <div className="wn-submit-area">
                  <button
                    className="wn-primary-btn draft"
                    onClick={handleSaveDraft}
                  >
                    <IcSave /> Save Draft
                  </button>
                  <button
                    className={`wn-primary-btn submit${canSubmit ? " on" : ""}`}
                    onClick={handleSubmit}
                    disabled={!canSubmit}
                  >
                    <IcSend /> Submit to Admin
                  </button>
                </div>
              </div>

              {/* Tips */}
              <div className="wn-card">
                <div
                  style={{ fontSize: 13, fontWeight: 700, marginBottom: 12 }}
                >
                  Tips Menulis 💡
                </div>
                {WRITING_TIPS.map((t) => (
                  <div key={t.id} className="wn-tip-item">
                    <div className="wn-tip-check">
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
