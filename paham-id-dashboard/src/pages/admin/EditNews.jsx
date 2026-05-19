// src/pages/admin/EditNews.jsx
import { useMemo, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { writingTips, CATEGORIES, INIT_ARTICLES } from "../../data/dummyNews";

const MAX_WORDS = 400;

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

  :root {
    --dashboard-sidebar-width: 260px;
    --dashboard-header-height: 76px;
  }

  .en-page *,
  .en-page *::before,
  .en-page *::after {
    box-sizing: border-box;
  }

  .en-page {
    min-height: calc(100vh - var(--dashboard-header-height));
    margin-left: var(--dashboard-sidebar-width);
    margin-top: var(--dashboard-header-height);
    padding: 28px 42px 64px 38px;
    background: #f8f9fb;
    font-family: 'Plus Jakarta Sans', sans-serif;
    color: #0f172a;
  }

  .en-topbar {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 24px;
    margin-bottom: 22px;
  }

  .en-breadcrumb {
    display: flex;
    align-items: center;
    gap: 8px;
    color: #64748b;
    font-size: 12px;
    font-weight: 600;
    margin-bottom: 24px;
  }

  .en-breadcrumb button {
    border: 0;
    background: transparent;
    padding: 0;
    color: #64748b;
    font: inherit;
    cursor: pointer;
  }

  .en-breadcrumb strong {
    color: #0f172a;
    font-weight: 800;
  }

  .en-meta {
    display: flex;
    align-items: center;
    gap: 18px;
    color: #64748b;
    font-size: 13px;
    font-weight: 600;
  }

  .en-meta-item {
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }

  .en-meta-sep {
    width: 1px;
    height: 22px;
    background: #e2e8f0;
  }

  .en-meta-pill {
    min-height: 28px;
    padding: 0 14px;
    border-radius: 999px;
    background: #e8eef8;
    color: #64748b;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: 700;
  }

  .en-save-top {
    min-width: 198px;
    height: 52px;
    border: 0;
    border-radius: 999px;
    background: #8ea4ed;
    color: #ffffff;
    font: 800 15px/1 'Plus Jakarta Sans', sans-serif;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 9px;
    cursor: pointer;
    box-shadow: 0 10px 22px rgba(47, 75, 200, 0.14);
  }

  .en-save-top:hover {
    background: #3155f6;
  }

  .en-layout {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 306px;
    gap: 32px;
    align-items: start;
  }

  .en-left,
  .en-right {
    display: flex;
    flex-direction: column;
    gap: 22px;
  }

  .en-card {
    background: #ffffff;
    border: 1px solid #dce3ef;
    border-radius: 14px;
    padding: 24px;
    box-shadow: 0 8px 22px rgba(15, 23, 42, 0.04);
  }

  .en-card.compact {
    padding: 22px;
    box-shadow: 0 10px 24px rgba(15, 23, 42, 0.08);
  }

  .en-title-card {
    min-height: 136px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .en-synopsis-card {
    min-height: 250px;
  }

  .en-body-card {
    min-height: 455px;
  }

  .en-label {
    margin: 0 0 12px;
    color: #94a3b8;
    font-size: 11px;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .en-title-input {
    width: 100%;
    min-height: 52px;
    border: 0;
    outline: 0;
    resize: none;
    background: transparent;
    color: #071426;
    font: 800 24px/1.2 'Plus Jakarta Sans', sans-serif;
  }

  .en-section-title {
    margin: 0 0 4px;
    color: #020617;
    font-size: 16px;
    font-weight: 800;
  }

  .en-section-subtitle {
    margin: 0 0 18px;
    color: #8b98ad;
    font-size: 13px;
    font-weight: 500;
  }

  .en-textarea {
    width: 100%;
    border: 0;
    outline: 0;
    resize: none;
    background: transparent;
    color: #142033;
    font: 500 16px/1.7 'Plus Jakarta Sans', sans-serif;
  }

  .en-title-input::placeholder,
  .en-textarea::placeholder {
    color: #cbd5e1;
  }

  .en-synopsis-box {
    width: 100%;
    min-height: 142px;
    border: 1px solid #e6ebf3;
    border-radius: 10px;
    padding: 18px 16px;
    background: #ffffff;
  }

  .en-synopsis-box .en-textarea {
    min-height: 104px;
  }

  .en-body-textarea {
    min-height: 260px;
  }

  .en-toolbar {
    height: 42px;
    margin: 8px 0 18px;
    padding: 0 12px;
    border-top: 1px solid #eef2f7;
    border-bottom: 1px solid #eef2f7;
    background: #fbfcfe;
    display: flex;
    align-items: center;
    gap: 14px;
  }

  .en-tool-btn {
    width: 22px;
    height: 22px;
    border: 0;
    background: transparent;
    color: #64748b;
    font-size: 14px;
    font-weight: 800;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .en-thumb {
    width: 100%;
    height: 104px;
    border-radius: 10px;
    object-fit: cover;
    display: block;
    margin-bottom: 18px;
    cursor: pointer;
  }

  .en-thumb-placeholder {
    width: 100%;
    height: 104px;
    border: 2px dashed #cbd5e1;
    border-radius: 10px;
    background: #f8fafc;
    margin-bottom: 18px;
    color: #94a3b8;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 6px;
    font-family: inherit;
    font-size: 12px;
    cursor: pointer;
  }

  .en-file-input {
    display: none;
  }

  .en-category-list {
    min-height: 28px;
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .en-category-tag {
    min-height: 26px;
    padding: 0 10px;
    border-radius: 7px;
    background: #e7edff;
    color: #2447d8;
    font-size: 11px;
    font-weight: 700;
    display: inline-flex;
    align-items: center;
    gap: 7px;
  }

  .en-category-remove {
    border: 0;
    background: transparent;
    color: #64748b;
    cursor: pointer;
    padding: 0;
    font-size: 13px;
    line-height: 1;
  }

  .en-category-form {
    display: flex;
    gap: 8px;
    margin-top: 12px;
  }

  .en-category-select {
    width: 100%;
    height: 38px;
    border: 1px solid #dce3ef;
    border-radius: 8px;
    background: #f8fafc;
    color: #334155;
    padding: 0 12px;
    font: 500 13px/1 'Plus Jakarta Sans', sans-serif;
    outline: none;
  }

  .en-check-title {
    margin: 0 0 18px;
    color: #020617;
    font-size: 15px;
    font-weight: 800;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .en-check-ok {
    color: #22c55e;
    display: inline-flex;
  }

  .en-metric-row {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
    margin-bottom: 10px;
  }

  .en-metric-label {
    color: #8b98ad;
    font-size: 11px;
    font-weight: 500;
    margin-bottom: 4px;
  }

  .en-metric-value {
    color: #22c55e;
    font-size: 26px;
    font-weight: 800;
    line-height: 1;
  }

  .en-metric-value.red {
    color: #dc2626;
  }

  .en-metric-sub {
    color: #64748b;
    font-size: 13px;
    font-weight: 500;
  }

  .en-progress {
    height: 6px;
    border-radius: 999px;
    background: #dbe3ef;
    overflow: hidden;
  }

  .en-progress-fill {
    height: 100%;
    border-radius: 999px;
    background: #22c55e;
  }

  .en-progress-fill.red {
    background: #dc2626;
  }

  .en-warning {
    margin-top: 10px;
    padding: 8px 10px;
    border-radius: 8px;
    background: #fee2e2;
    color: #dc2626;
    font-size: 12px;
    font-weight: 700;
    display: flex;
    align-items: center;
    gap: 7px;
  }

  .en-tips-title {
    margin: 0 0 14px;
    color: #111827;
    font-size: 16px;
    font-weight: 800;
  }

  .en-tip {
    display: grid;
    grid-template-columns: 16px 1fr;
    gap: 8px;
    color: #4b5563;
    font-size: 11px;
    line-height: 1.35;
    margin-bottom: 11px;
  }

  .en-tip:last-child {
    margin-bottom: 0;
  }

  .en-tip-icon {
    width: 15px;
    height: 15px;
    border: 1.8px solid #2563eb;
    color: #2563eb;
    border-radius: 50%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-top: 1px;
  }

  .en-toast-wrap {
    position: fixed;
    top: 88px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 9999;
    pointer-events: none;
  }

  .en-toast {
    min-width: 220px;
    padding: 12px 18px;
    border-radius: 999px;
    background: #294bd6;
    color: #ffffff;
    font-size: 13px;
    font-weight: 800;
    text-align: center;
    box-shadow: 0 10px 28px rgba(15, 23, 42, 0.18);
  }

  @media (max-width: 1120px) {
    .en-page {
      margin-left: 0;
      padding: 24px;
    }

    .en-layout {
      grid-template-columns: 1fr;
    }

    .en-right {
      width: 100%;
    }
  }
`;

const IcSave = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
    <polyline points="17 21 17 13 7 13 7 21" />
    <polyline points="7 3 7 8 15 8" />
  </svg>
);

const IcImg = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <polyline points="21 15 16 10 5 21" />
  </svg>
);

const IcCheck = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const IcWarn = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

const IcUser = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21a8 8 0 0 0-16 0" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const IcCalendar = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

function countWords(text) {
  return text?.trim() ? text.trim().split(/\s+/).length : 0;
}

function findArticleById(id) {
  if (!id || !Array.isArray(INIT_ARTICLES)) return null;

  return INIT_ARTICLES.find((item) => String(item.id) === String(id)) || null;
}

function normalizeArticle(article, id) {
  return {
    id: article?.id || id || `news_${Date.now()}`,
    author: article?.author || "Budi Santoso",
    title:
      article?.title ||
      "Transformasi Digital UMKM di Indonesia Meningkat Pesat, Didukung Platform Online dan Pembayaran Digital",
    synopsis:
      article?.synopsis ||
      article?.excerpt ||
      "Transformasi digital di kalangan pelaku Usaha Mikro, Kecil, dan Menengah (UMKM) di Indonesia menunjukkan peningkatan signifikan dalam beberapa tahun terakhir. Perk",
    body:
      article?.body ||
      "Transformasi digital di kalangan pelaku Usaha Mikro, Kecil, dan Menengah (UMKM) di Indonesia menunjukkan peningkatan signifikan dalam beberapa tahun terakhir. Perkembangan ini didorong oleh kemudahan akses terhadap platform online serta meningkatnya penggunaan sistem pembayaran digital di berbagai daerah.\n\nBanyak pelaku UMKM mulai memanfaatkan marketplace dan media sosial untuk memasarkan produk mereka secara lebih luas. Dengan strategi pemasaran digital, usaha kecil dapat menjangkau konsumen baru tanpa harus memiliki toko fisik.",
    thumbnail: article?.thumbnail || article?.image || "",
    image: article?.image || article?.thumbnail || "",
    category: article?.category || "Economics",
    excerpt: article?.excerpt || article?.synopsis || "",
    wordCount: article?.wordCount || 0,
    readTime: article?.readTime || "2 min",
    status: article?.status || "draft",
    date: article?.date || "24 Okt 2025, 14:20 WIB",
  };
}

function useToast() {
  const [toast, setToast] = useState("");

  const showToast = (message) => {
    setToast(message);

    setTimeout(() => {
      setToast("");
    }, 2200);
  };

  return { toast, showToast };
}

export default function EditNews() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const fileInputRef = useRef(null);
  const { toast, showToast } = useToast();

  const articleFromRoute = location.state?.article;
  const articleFromDummy = findArticleById(id);

  const sourceArticle = useMemo(() => {
    return normalizeArticle(articleFromRoute || articleFromDummy, id);
  }, [articleFromRoute, articleFromDummy, id]);

  const [title, setTitle] = useState(sourceArticle.title);
  const [synopsis, setSynopsis] = useState(sourceArticle.synopsis);
  const [body, setBody] = useState(sourceArticle.body);
  const [thumbnail, setThumbnail] = useState(sourceArticle.thumbnail);
  const [selectedCat, setSelectedCat] = useState(sourceArticle.category);
  const [hasCategory, setHasCategory] = useState(Boolean(sourceArticle.category));

  const wc = countWords(synopsis);
  const over = wc > MAX_WORDS;
  const pct = Math.min(100, (wc / MAX_WORDS) * 100);
  const readTime = wc === 0 ? 0 : Math.max(1, Math.ceil(wc / 200));

  const handlePickImage = () => {
    fileInputRef.current?.click();
  };

  const validateAndSetImage = (file) => {
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    const maxSize = 2 * 1024 * 1024;

    if (!allowedTypes.includes(file.type)) {
      showToast("Format gambar harus JPG atau PNG");
      return;
    }

    if (file.size > maxSize) {
      showToast("Ukuran gambar maksimal 2MB");
      return;
    }

    setThumbnail(URL.createObjectURL(file));
  };

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];

    validateAndSetImage(file);
    event.target.value = "";
  };

  const handleImageDrop = (event) => {
    event.preventDefault();
    validateAndSetImage(event.dataTransfer.files?.[0]);
  };

  const removeCategory = () => {
    setHasCategory(false);
  };

  const handleCategoryChange = (event) => {
    setSelectedCat(event.target.value);
    setHasCategory(true);
  };

  const buildPayload = () => ({
    ...sourceArticle,
    title,
    synopsis,
    body,
    thumbnail,
    image: thumbnail,
    category: hasCategory ? selectedCat : "General",
    excerpt: synopsis.slice(0, 120),
    wordCount: wc,
    readTime: `${readTime} min`,
    status: sourceArticle.status || "draft",
    updatedAt: new Date().toISOString(),
  });

  const handleSaveChanges = () => {
    const updatedArticle = buildPayload();

    console.log("Save changes:", updatedArticle);
    showToast("Perubahan berhasil disimpan");

    setTimeout(() => {
      navigate("/manage-news", {
        state: {
          toastType: "updated",
          updatedArticle,
        },
      });
    }, 800);
  };

  return (
    <>
      <style>{css}</style>

      {toast && (
        <div className="en-toast-wrap">
          <div className="en-toast">{toast}</div>
        </div>
      )}

      <main className="en-page">
        <div className="en-topbar">
          <div>
            <div className="en-breadcrumb">
              <button type="button" onClick={() => navigate("/manage-news")}>
                Manage News
              </button>
              <span>›</span>
              <strong>Edit News</strong>
            </div>

            <div className="en-meta">
              <span className="en-meta-item">
                <IcUser />
                {sourceArticle.author}
              </span>

              <span className="en-meta-sep" />

              <span className="en-meta-pill">
                {hasCategory ? selectedCat : "General"}
              </span>

              <span className="en-meta-sep" />

              <span className="en-meta-item">
                <IcCalendar />
                {sourceArticle.date}
              </span>
            </div>
          </div>

          <button
            className="en-save-top"
            type="button"
            onClick={handleSaveChanges}
          >
            <IcSave />
            Save Changes
          </button>
        </div>

        <div className="en-layout">
          <section className="en-left">
            <div className="en-card en-title-card">
              <p className="en-label">Judul Artikel</p>
              <textarea
                className="en-title-input"
                rows={2}
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Masukkan judul yang menarik..."
              />
            </div>

            <div className="en-card en-synopsis-card">
              <h2 className="en-section-title">Ringkasan (Paham 2 Menit)</h2>
              <p className="en-section-subtitle">
                Tulis inti berita untuk pembaca cepat.
              </p>

              <div className="en-synopsis-box">
                <textarea
                  className="en-textarea"
                  value={synopsis}
                  onChange={(event) => setSynopsis(event.target.value)}
                  placeholder="Tuliskan ringkasan singkat di sini..."
                  style={over ? { color: "#dc2626" } : {}}
                />
              </div>
            </div>

            <div className="en-card en-body-card">
              <h2 className="en-section-title">Artikel Lengkap</h2>
              <p className="en-section-subtitle">
                Tuliskan versi lengkap artikel di sini.
              </p>

              <div className="en-toolbar">
                <button className="en-tool-btn" type="button" style={{ fontWeight: 800 }}>
                  B
                </button>
                <button className="en-tool-btn" type="button" style={{ fontStyle: "italic" }}>
                  I
                </button>
                <button className="en-tool-btn" type="button">
                  ≡
                </button>
                <button className="en-tool-btn" type="button">
                  🔗
                </button>
                <button className="en-tool-btn" type="button">
                  ❞
                </button>
              </div>

              <textarea
                className="en-textarea en-body-textarea"
                value={body}
                onChange={(event) => setBody(event.target.value)}
                placeholder="Mulai menulis detail berita..."
              />
            </div>
          </section>

          <aside className="en-right">
            <div className="en-card compact">
              <p className="en-label">Gambar Unggulan</p>

              <input
                ref={fileInputRef}
                className="en-file-input"
                type="file"
                accept="image/jpeg,image/jpg,image/png"
                onChange={handleImageChange}
              />

              {thumbnail ? (
                <img
                  className="en-thumb"
                  src={thumbnail}
                  alt={title}
                  onClick={handlePickImage}
                />
              ) : (
                <button
                  className="en-thumb-placeholder"
                  type="button"
                  onClick={handlePickImage}
                  onDragOver={(event) => event.preventDefault()}
                  onDrop={handleImageDrop}
                >
                  <IcImg />
                  <span>Klik atau seret gambar ke sini</span>
                  <span style={{ fontSize: 10, color: "#cbd5e1" }}>
                    JPG, PNG (Maks. 2MB)
                  </span>
                </button>
              )}

              <p className="en-label" style={{ marginTop: 18 }}>
                Kategori
              </p>

              <div className="en-category-list">
                {hasCategory ? (
                  <span className="en-category-tag">
                    {selectedCat}
                    <button
                      className="en-category-remove"
                      type="button"
                      onClick={removeCategory}
                    >
                      ×
                    </button>
                  </span>
                ) : (
                  <span style={{ fontSize: 12, color: "#94a3b8" }}>
                    Belum ada kategori
                  </span>
                )}
              </div>

              <div className="en-category-form">
                <select
                  className="en-category-select"
                  value={selectedCat}
                  onChange={handleCategoryChange}
                >
                  {CATEGORIES.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="en-card compact">
              <h2 className="en-check-title">
                Pemeriksaan Publikasi
                {!over && wc > 0 && (
                  <span className="en-check-ok">
                    <IcCheck />
                  </span>
                )}
              </h2>

              <div className="en-metric-row">
                <div>
                  <div className="en-metric-label">Word Count</div>
                  <div className={`en-metric-value${over ? " red" : ""}`}>
                    {wc} <span className="en-metric-sub">/ {MAX_WORDS}</span>
                  </div>
                </div>

                <div>
                  <div className="en-metric-label">Read Time</div>
                  <div className={`en-metric-value${over ? " red" : ""}`}>
                    {readTime} <span className="en-metric-sub">min</span>
                  </div>
                </div>
              </div>

              <div className="en-progress">
                <div
                  className={`en-progress-fill${over ? " red" : ""}`}
                  style={{ width: `${pct}%` }}
                />
              </div>

              {over && (
                <div className="en-warning">
                  <IcWarn />
                  Article exceeds 2-minute reading limit.
                </div>
              )}
            </div>

            <div className="en-card compact">
              <h2 className="en-tips-title">Tips Menulis 💡</h2>

              {writingTips.map((tip) => (
                <div className="en-tip" key={tip.id}>
                  <span className="en-tip-icon">
                    <IcCheck />
                  </span>
                  <div>
                    <strong>{tip.title}:</strong> {tip.tip}
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}