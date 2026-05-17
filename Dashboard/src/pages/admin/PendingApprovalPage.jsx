const css = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

  :root {
    --dashboard-sidebar-width: 260px;
    --dashboard-header-height: 76px;
  }

  .pending-page {
    min-height: calc(100vh - var(--dashboard-header-height));
    margin-left: var(--dashboard-sidebar-width);
    margin-top: var(--dashboard-header-height);
    padding: 32px;
    background: #f7f7f8;
    box-sizing: border-box;
    font-family: 'Plus Jakarta Sans', sans-serif;
  }

  .pending-panel {
    background: #ffffff;
    border: 1px solid #edf1f6;
    border-radius: 10px;
    padding: 32px;
    box-shadow: 0 14px 30px rgba(15, 23, 42, 0.05);
  }

  .pending-panel h1 {
    margin: 0 0 8px;
    color: #0f172a;
    font-size: 22px;
    font-weight: 800;
  }

  .pending-panel p {
    max-width: 620px;
    margin: 0 0 24px;
    color: #64748b;
    font-size: 14px;
    line-height: 1.7;
  }

  .pending-empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
    padding: 48px 0;
    color: #94a3b8;
  }

  .pending-empty-icon {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: #f1f5f9;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .pending-empty p {
    margin: 0;
    color: #94a3b8;
    font-size: 14px;
  }
`;

const IconCheck = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#94a3b8"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 11l3 3L22 4" />
    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
  </svg>
);

export default function PendingApprovalPage() {
  return (
    <>
      <style>{css}</style>
      <main className="pending-page">
        <section className="pending-panel">
          <h1>Pending Approval</h1>
          <p>
            Daftar artikel yang menunggu persetujuan. Pilih artikel untuk
            meninjau dan menyetujui publikasi.
          </p>
          <div className="pending-empty">
            <div className="pending-empty-icon">
              <IconCheck />
            </div>
            <p>Belum ada artikel yang menunggu persetujuan.</p>
          </div>
        </section>
      </main>
    </>
  );
}
