// components/Header.jsx

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

  .dh-header {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 200;
    height: 64px;
    background: #ffffff;
    border-bottom: 1.5px solid #e2e8f0;
    display: flex;
    align-items: center;
    padding: 0 28px;
    justify-content: space-between;
    font-family: 'Plus Jakarta Sans', sans-serif;
  }

  .dh-logo img {
    height: 38px;
    object-fit: contain;
    display: block;
  }

  .dh-header-right {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .dh-user-info { text-align: right; }
  .dh-user-name   { font-size: 13.5px; font-weight: 600; color: #1e293b; }
  .dh-user-handle { font-size: 12px; color: #94a3b8; }

  .dh-avatar {
    width: 38px;
    height: 38px;
    border-radius: 50%;
    background: #1a2b6d;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-weight: 700;
    font-size: 14px;
    flex-shrink: 0;
    overflow: hidden;
  }
  .dh-avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

/**
 * Header Component
 *
 * @param {object} user - { name: string, username: string, avatar?: string }
 */
export default function Header({
  user = { name: "User", username: "username" },
}) {
  return (
    <>
      <style>{css}</style>
      <header className="dh-header">
        <div className="dh-logo">
          <img src="/img/Group2.png" alt="Paham.ID" />
        </div>
        <div className="dh-header-right">
          <div className="dh-user-info">
            <div className="dh-user-name">{user.name}</div>
            <div className="dh-user-handle">@{user.username}</div>
          </div>
          <div className="dh-avatar">
            {user.avatar ? (
              <img src={user.avatar} alt={user.name} />
            ) : (
              user.name.charAt(0).toUpperCase()
            )}
          </div>
        </div>
      </header>
    </>
  );
}
