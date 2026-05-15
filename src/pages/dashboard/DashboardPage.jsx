// pages/Dashboard.jsx
import Header from "../../components/layout/Header";
import Sidebar from "../../components/layout/Sidebar";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: 'Plus Jakarta Sans', sans-serif;
    background: #f8f9fb;
    color: #1e293b;
  }

  .dh-layout {
    display: flex;
    margin-top: 64px;
    min-height: calc(100vh - 64px);
  }

  .dh-main {
    margin-left: 240px;
    flex: 1;
    padding: 24px 28px 48px;
  }

  /* ── Stat Cards ── */
  .dh-stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    margin-bottom: 18px;
  }

  .dh-stat-card {
    background: #ffffff;
    border: 1.5px solid #e2e8f0;
    border-radius: 14px;
    padding: 20px 22px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .dh-stat-label {
    font-size: 13px;
    color: #64748b;
    margin-bottom: 7px;
  }

  .dh-stat-value {
    font-size: 28px;
    font-weight: 800;
    color: #2347c5;
    line-height: 1;
  }

  .dh-stat-icon {
    width: 46px;
    height: 46px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .dh-stat-icon.blue { background: #eef1fb; }
  .dh-stat-icon.red  { background: #fde8e8; }

  /* ── Banner ── */
  .dh-banner {
    background: linear-gradient(135deg, #1a2b6d 0%, #2448c6 55%, #3b6cf7 100%);
    border-radius: 16px;
    padding: 30px 32px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 18px;
    color: #fff;
    gap: 20px;
  }

  .dh-banner-left { flex: 1; }

  .dh-banner-left h2 {
    font-size: 19px;
    font-weight: 800;
    margin-bottom: 10px;
  }

  .dh-banner-left p {
    font-size: 13px;
    opacity: 0.82;
    line-height: 1.65;
    max-width: 320px;
    margin-bottom: 20px;
  }

  .dh-create-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 10px 24px;
    border-radius: 999px;
    background: #fff;
    color: #1a2b6d;
    font-weight: 700;
    font-size: 13.5px;
    border: none;
    cursor: pointer;
    font-family: 'Plus Jakarta Sans', sans-serif;
    transition: opacity 0.15s;
  }
  .dh-create-btn:hover { opacity: 0.9; }

  .dh-banner-stats {
    background: rgba(255,255,255,0.15);
    backdrop-filter: blur(8px);
    border: 1px solid rgba(255,255,255,0.22);
    border-radius: 13px;
    padding: 16px 28px;
    display: flex;
    gap: 32px;
    flex-shrink: 0;
  }

  .dh-bstat { text-align: center; }
  .dh-bstat-label { font-size: 11.5px; opacity: 0.75; margin-bottom: 5px; }
  .dh-bstat-value { font-size: 22px; font-weight: 800; }

  /* ── Recent Articles ── */
  .dh-card {
    background: #ffffff;
    border: 1.5px solid #e2e8f0;
    border-radius: 14px;
    padding: 20px 22px;
  }

  .dh-card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 4px;
  }

  .dh-card-title { font-size: 15px; font-weight: 700; }

  .dh-view-all {
    font-size: 13px;
    font-weight: 600;
    color: #2347c5;
    cursor: pointer;
  }

  .dh-article-row {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 14px 0;
    border-bottom: 1px solid #f1f3f7;
  }
  .dh-article-row:last-child { border-bottom: none; }

  .dh-article-thumb {
    width: 72px;
    height: 56px;
    border-radius: 8px;
    object-fit: cover;
    flex-shrink: 0;
    background: #e2e8f0;
  }

  .dh-article-meta {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 5px;
  }

  .dh-badge {
    display: inline-block;
    padding: 2px 10px;
    border-radius: 999px;
    font-size: 11.5px;
    font-weight: 600;
  }
  .dh-badge.tech { background: #e0eaff; color: #2347c5; }
  .dh-badge.econ { background: #fff0e0; color: #b45309; }
  .dh-badge.env  { background: #e0f9ec; color: #16a34a; }

  .dh-article-date  { font-size: 11.5px; color: #94a3b8; text-transform: uppercase; }
  .dh-article-title { font-size: 14px; font-weight: 600; color: #1e293b; line-height: 1.45; }

  .dh-article-right {
    margin-left: auto;
    display: flex;
    align-items: center;
    gap: 14px;
    flex-shrink: 0;
  }

  .dh-status {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 13px;
    font-weight: 500;
  }

  .dh-status-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    flex-shrink: 0;
  }
  .dh-status-dot.published { background: #22c55e; }
  .dh-status-dot.pending   { background: #f59e0b; }
  .dh-status-dot.draft     { background: #94a3b8; }

  .dh-icon-btn {
    background: none;
    border: none;
    cursor: pointer;
    color: #94a3b8;
    padding: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: color 0.15s;
  }
  .dh-icon-btn:hover { color: #475569; }

  .dh-empty {
    text-align: center;
    padding: 44px 0;
    color: #94a3b8;
  }
  .dh-empty-icon { margin-bottom: 10px; }
  .dh-empty-text { font-size: 13.5px; }
`;

/* ── Inline SVG Icons ── */
const IconFile = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2347c5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="16" y2="17"/>
  </svg>
);
const IconHeart = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2347c5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);
const IconMsg = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#e05555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
  </svg>
);
const IconPen = ({ color = "#1a2b6d", size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/>
  </svg>
);
const IconTrash = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"/>
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
    <path d="M10 11v6"/><path d="M14 11v6"/>
    <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
  </svg>
);
const IconDoc = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="12" y2="17"/>
  </svg>
);

const STATUS_CONFIG = {
  published: { label: "Published", dot: "published", color: "#22c55e" },
  pending:   { label: "Pending",   dot: "pending",   color: "#f59e0b" },
  draft:     { label: "Draft",     dot: "draft",     color: "#94a3b8" },
};

const BADGE_CLASS = {
  technology: "tech",
  economics:  "econ",
  environment: "env",
};

/**
 * Dashboard Page
 *
 * @param {string}   role            - "user" | "admin"  (dari auth context)
 * @param {object}   user            - { name, username, avatar? }
 * @param {array}    articles        - array artikel dari API  []
 * @param {object}   stats           - { totalArticles, likes, comments, drafts, pending, published }
 * @param {function} onCreateArticle - navigate ke halaman write
 * @param {function} onEditArticle   - handler edit (menerima object artikel)
 * @param {function} onDeleteArticle - handler delete (menerima object artikel)
 * @param {function} onViewAll       - navigate ke halaman my-articles
 * @param {function} onLogout        - handler logout
 */
export default function Dashboard({
  role            = "user",
  user            = { name: "User", username: "username" },
  articles        = [],
  stats           = { totalArticles: 0, likes: 0, comments: 0, drafts: 0, pending: 0, published: 0 },
  onCreateArticle = () => {},
  onEditArticle   = () => {},
  onDeleteArticle = () => {},
  onViewAll       = () => {},
  onLogout        = () => {},
}) {
  return (
    <>
      <style>{css}</style>

      <Header user={user} />

      <div className="dh-layout">
        <Sidebar role={role} onLogout={onLogout} />

        <main className="dh-main">
          {/* Stat Cards */}
          <div className="dh-stats">
            <div className="dh-stat-card">
              <div>
                <div className="dh-stat-label">Total Articles</div>
                <div className="dh-stat-value">{stats.totalArticles}</div>
              </div>
              <div className="dh-stat-icon blue"><IconFile /></div>
            </div>
            <div className="dh-stat-card">
              <div>
                <div className="dh-stat-label">Likes</div>
                <div className="dh-stat-value">{stats.likes}</div>
              </div>
              <div className="dh-stat-icon blue"><IconHeart /></div>
            </div>
            <div className="dh-stat-card">
              <div>
                <div className="dh-stat-label">Comments</div>
                <div className="dh-stat-value">{stats.comments}</div>
              </div>
              <div className="dh-stat-icon red"><IconMsg /></div>
            </div>
          </div>

          {/* Banner */}
          <div className="dh-banner">
            <div className="dh-banner-left">
              <h2>Start Writing Your Next Big Story</h2>
              <p>
                Bring the latest insights to your readers. Use our advanced
                editor for a distraction-free experience.
              </p>
              <button className="dh-create-btn" onClick={onCreateArticle}>
                <IconPen /> Create Article
              </button>
            </div>
            <div className="dh-banner-stats">
              <div className="dh-bstat">
                <div className="dh-bstat-label">Drafts</div>
                <div className="dh-bstat-value">{stats.drafts}</div>
              </div>
              <div className="dh-bstat">
                <div className="dh-bstat-label">Pending</div>
                <div className="dh-bstat-value">{stats.pending}</div>
              </div>
              <div className="dh-bstat">
                <div className="dh-bstat-label">Published</div>
                <div className="dh-bstat-value">{stats.published}</div>
              </div>
            </div>
          </div>

          {/* Recent Articles */}
          <div className="dh-card">
            <div className="dh-card-header">
              <span className="dh-card-title">Recent Articles</span>
              <span className="dh-view-all" onClick={onViewAll}>View all ›</span>
            </div>

            {articles.length === 0 ? (
              <div className="dh-empty">
                <div className="dh-empty-icon"><IconDoc /></div>
                <div className="dh-empty-text">Belum ada artikel.</div>
              </div>
            ) : (
              articles.map((art) => {
                const statusKey = String(art.status || "").toLowerCase();
                const s  = STATUS_CONFIG[statusKey] ?? STATUS_CONFIG.draft;
                const bc = BADGE_CLASS[String(art.category || "").toLowerCase()] ?? "tech";
                return (
                  <div key={art.id} className="dh-article-row">
                    <img
                      src={art.thumbnail || art.image}
                      alt={art.title}
                      className="dh-article-thumb"
                      onError={(e) => { e.target.style.background = "#e2e8f0"; }}
                    />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div className="dh-article-meta">
                        <span className={`dh-badge ${bc}`}>{art.category}</span>
                        <span className="dh-article-date">• {art.date}</span>
                      </div>
                      <div className="dh-article-title">{art.title}</div>
                    </div>
                    <div className="dh-article-right">
                      <div className="dh-status" style={{ color: s.color }}>
                        <span className={`dh-status-dot ${s.dot}`} />
                        {s.label}
                      </div>
                      <button className="dh-icon-btn" onClick={() => onEditArticle(art)}>
                        <IconPen color="currentColor" size={16} />
                      </button>
                      <button className="dh-icon-btn" onClick={() => onDeleteArticle(art)}>
                        <IconTrash />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </main>
      </div>
    </>
  );
}