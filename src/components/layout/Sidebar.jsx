// components/Sidebar.jsx
import { useLocation, useNavigate } from "react-router-dom";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

  .dh-sidebar {
    width: 240px;
    height: calc(100vh - 64px);
    background: #ffffff;
    border-right: 1.5px solid #e2e8f0;
    position: fixed;
    top: 64px;
    left: 0;
    display: flex;
    flex-direction: column;
    padding: 28px 14px 20px;
    font-family: 'Plus Jakarta Sans', sans-serif;
    box-sizing: border-box;
  }

  .dh-sidebar-title {
    font-size: 11px;
    font-weight: 800;
    color: #1a2b6d;
    letter-spacing: 0.13em;
    text-transform: uppercase;
    padding: 0 10px;
    margin-bottom: 20px;
  }

  .dh-nav {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .dh-nav-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px 12px;
    border-radius: 10px;
    font-size: 13.5px;
    font-weight: 500;
    color: #64748b;
    cursor: pointer;
    transition: background 0.15s, color 0.15s;
    border: none;
    background: none;
    width: 100%;
    text-align: left;
    font-family: 'Plus Jakarta Sans', sans-serif;
    position: relative;
    box-sizing: border-box;
  }

  .dh-nav-item:hover {
    background: #eef1fb;
    color: #1a2b6d;
  }

  .dh-nav-item.active {
    background: #eef1fb;
    color: #1a2b6d;
    font-weight: 700;
  }

  .dh-nav-item.active::after {
    content: '';
    position: absolute;
    right: -14px;
    top: 50%;
    transform: translateY(-50%);
    width: 3px;
    height: 58%;
    border-radius: 8px 0 0 8px;
    background: #2347c5;
  }

  .dh-logout {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 9px;
    padding: 12px 0;
    border-radius: 999px;
    background: linear-gradient(135deg, #1a2b6d 0%, #2347c5 100%);
    color: #fff;
    font-weight: 700;
    font-size: 13.5px;
    border: none;
    cursor: pointer;
    width: 100%;
    margin-top: 16px;
    font-family: 'Plus Jakarta Sans', sans-serif;
    transition: opacity 0.15s;
  }

  .dh-logout:hover { opacity: 0.87; }
`;

const IconGrid = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
    <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
  </svg>
);
const IconFile = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="16" y2="17"/>
  </svg>
);
const IconEdit = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
);
const IconFolder = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
  </svg>
);
const IconCheck = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
  </svg>
);
const IconLogout = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
    <polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
  </svg>
);

const USER_NAV = [
  { key: "dashboard", label: "Dashboard",   icon: <IconGrid />,   path: "/dashboard" },
  { key: "articles",  label: "My Articles", icon: <IconFile />,   path: "/my-articles" },
  { key: "write",     label: "Write News",  icon: <IconEdit />,   path: "/write" },
];

const ADMIN_NAV = [
  { key: "dashboard", label: "Dashboard",        icon: <IconGrid />,   path: "/admin-dashboard" },
  { key: "manage",    label: "Manage News",      icon: <IconFolder />, path: "/manage-news" },
  { key: "pending",   label: "Pending Approval", icon: <IconCheck />,  path: "/pending" },
  { key: "write",     label: "Write News",       icon: <IconEdit />,   path: "/write" },
];

/**
 * Sidebar Component
 *
 * @param {string}   role      - "user" | "admin"  (dari auth context)
 * @param {function} onLogout  - handler logout
 *
 * Aktif item otomatis dideteksi dari URL (useLocation),
 * klik item akan navigate ke path masing-masing.
 */
export default function Sidebar({ role = "user", onLogout = () => {} }) {
  const location = useLocation();
  const navigate = useNavigate();
  const navItems = role === "admin" ? ADMIN_NAV : USER_NAV;

  const isActive = (path) => {
    if (location.pathname === path) return true;
    if (location.pathname.startsWith("/edit-article") && (path === "/my-articles" || path === "/manage-news")) return true;
    return false;
  };

  return (
    <>
      <style>{css}</style>
      <aside className="dh-sidebar">
        <div className="dh-sidebar-title">
          {role === "admin" ? "Dashboard Admin" : "Dashboard User"}
        </div>
        <nav className="dh-nav">
          {navItems.map((it) => (
            <button
              key={it.key}
              className={`dh-nav-item${isActive(it.path) ? " active" : ""}`}
              onClick={() => navigate(it.path)}
            >
              {it.icon}
              {it.label}
            </button>
          ))}
        </nav>
        <button className="dh-logout" onClick={onLogout}>
          <IconLogout /> Logout
        </button>
      </aside>
    </>
  );
}