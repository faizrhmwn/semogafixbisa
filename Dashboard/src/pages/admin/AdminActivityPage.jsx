// AdminActivityPage.jsx
// Halaman full Ringkasan Aktivitas — diakses dari tombol "Lihat Semua" di AdminDashboardPage

import { useNavigate } from "react-router-dom";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

  .act-page {
    padding: 40px;
    padding-left: 300px;
    padding-top: 104px;
    min-height: 100vh;
    font-family: 'Plus Jakarta Sans', sans-serif;
  }

  /* Breadcrumb */
  .act-breadcrumb {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 13px;
    color: #94a3b8;
    margin-bottom: 28px;
  }

  .act-breadcrumb-link {
    color: #64748b;
    text-decoration: none;
    font-weight: 500;
    cursor: pointer;
    background: none;
    border: none;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 13px;
    padding: 0;
    transition: color 0.15s;
  }

  .act-breadcrumb-link:hover {
    color: #1e3a8a;
  }

  .act-breadcrumb-sep {
    color: #cbd5e1;
    font-size: 12px;
  }

  .act-breadcrumb-current {
    color: #2347c5;
    font-weight: 600;
  }

  /* Panel */
  .act-panel {
    background: #ffffff;
    border: 1.5px solid #e2e8f0;
    border-radius: 24px;
    padding: 32px;
  }

  .act-panel-title {
    font-size: 22px;
    font-weight: 800;
    color: #0f172a;
    margin-bottom: 24px;
  }

  .act-list {
    display: flex;
    flex-direction: column;
  }

  .act-item {
    display: grid;
    grid-template-columns: 44px 1fr;
    gap: 16px;
    align-items: center;
    padding: 18px 0;
    border-bottom: 1px solid #f1f5f9;
  }

  .act-item:last-child {
    border-bottom: none;
  }

  .act-dot {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    flex-shrink: 0;
  }

  .act-dot-blue   { background: #eef1fb; color: #2347c5; }
  .act-dot-green  { background: #ecfdf5; color: #16a34a; }
  .act-dot-red    { background: #fee2e2; color: #b91c1c; }
  .act-dot-indigo { background: #ede9fe; color: #6d28d9; }

  .act-text {
    font-size: 14px;
    color: #334155;
    line-height: 1.5;
  }

  .act-time {
    font-size: 12px;
    color: #94a3b8;
    margin-top: 3px;
  }

  .act-empty {
    text-align: center;
    padding: 60px 20px;
    color: #94a3b8;
    font-size: 14px;
  }
`;

/* ─── Icons ─── */
const IconWrite = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
);

const IconPublished = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>
);

const IconDelete = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"/>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
  </svg>
);

const IconCategory = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <line x1="12" y1="8" x2="12" y2="16"/>
    <line x1="8" y1="12" x2="16" y2="12"/>
  </svg>
);

/* ─── Dummy Activities (nanti bisa diganti data dari backend) ─── */
const dummyActivities = [
  {
    label: <>Admin mengedit artikel <b>"Tren AI 2026"</b></>,
    time: "Baru saja",
    dotClass: "act-dot-blue",
    Icon: IconWrite,
  },
  {
    label: <>Artikel <b>"Pasar Saham Regional"</b> telah diterbitkan oleh Admin</>,
    time: "12 menit yang lalu",
    dotClass: "act-dot-green",
    Icon: IconPublished,
  },
  {
    label: <>Artikel <b>"Mengapa Jadi Gila"</b> telah dihapus oleh Admin</>,
    time: "45 menit yang lalu",
    dotClass: "act-dot-red",
    Icon: IconDelete,
  },
  {
    label: <>Admin telah menambahkan category baru: <b>Social</b></>,
    time: "2 jam yang lalu",
    dotClass: "act-dot-indigo",
    Icon: IconCategory,
  },
  {
    label: <>Admin telah menambahkan category baru: <b>Education</b></>,
    time: "2 jam yang lalu",
    dotClass: "act-dot-indigo",
    Icon: IconCategory,
  },
  {
    label: <>Admin telah menambahkan category baru: <b>Environtment</b></>,
    time: "2 jam yang lalu",
    dotClass: "act-dot-indigo",
    Icon: IconCategory,
  },
  {
    label: <>Admin telah menambahkan category baru: <b>Politics</b></>,
    time: "2 jam yang lalu",
    dotClass: "act-dot-indigo",
    Icon: IconCategory,
  },
];

export default function AdminActivityPage({ activities = dummyActivities }) {
  const navigate = useNavigate();

  return (
    <>
      <style>{css}</style>

      <div className="act-page">
        {/* Breadcrumb */}
        <div className="act-breadcrumb">
          <button
            className="act-breadcrumb-link"
            onClick={() => navigate("/admin-dashboard")}
          >
            Dashboard
          </button>
          <span className="act-breadcrumb-sep">›</span>
          <span className="act-breadcrumb-current">Ringkasan Aktivitas</span>
        </div>

        {/* Panel */}
        <div className="act-panel">
          <h1 className="act-panel-title">Ringkasan Aktivitas</h1>

          {activities.length === 0 ? (
            <div className="act-empty">Belum ada aktivitas.</div>
          ) : (
            <div className="act-list">
              {activities.map((item, i) => (
                <div key={i} className="act-item">
                  <div className={`act-dot ${item.dotClass}`}>
                    <item.Icon />
                  </div>
                  <div>
                    <div className="act-text">{item.label}</div>
                    <div className="act-time">{item.time}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
