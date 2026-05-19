// src/pages/admin/PendingApprovalPage.jsx
import { useMemo, useState } from "react";

const ICON_WORD_COUNT =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAKCAYAAABv7tTEAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAOdEVYdFNvZnR3YXJlAEZpZ21hnrGWYwAAAQ9JREFUeAGFkbFNA1EQRGf2zjEuwXRwVAAERmRAYInMJkAyIRUgKrDIyCzHBPhCuvh0cHTg3Hc77DeyMx+brP7ujHb0PseT+czAqYCKwBBgApDkqmm8AXQR71HsN9zN8WZhWML1LbSXjvYsxK+Sk4bPECNEz9zq1KQ7MIyGRZkXhYrF18f7D/4qXd/PkzpMO/mqMC5lcQPcyL0mWZXoqbJE07Z6ICOe1OSe7dZn8i2rAnyhMArhzORD/GeygRLIuMDzgHJySNBnQpvj+Cp6E8pMsDqYukLrq8nTaI88CDZ5LgRy4haDPfKyydNSQjJ47ezWyiRRVEF8ih2wEAdy65QYlxyaxV/oaLLx5LE6tvsF35t05V60pakAAAAASUVORK5CYII=";

const ICON_TARGET =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAOdEVYdFNvZnR3YXJlAEZpZ21hnrGWYwAAAqtJREFUeAGdVV1OWkEUPjN4r7faB3fQ64tI0qSwgsIK6g7EFQhJEZI+VJ8q8iCuANgBrkBcgTRpQiVNZQk8tfx47+n5ZhiKCDbpJHpnzpzf73xnULRi3RVo55Xv5ZVS7+WYlr8Q8mR1ougfa2NZ0Ct5ea3pkkjt0H8svXjol71LrVUDzhRxh5mLsdK7LzlANbQqQzhjUgUiHjLrs+TFpG5vpnRf9tc629r0b/pl7uxVp8W5Q5TpnKmYcsnauAvl175/HCs6oDVr2/NCJg5he3/i30oSbVOylPkZXzEu7tWm3V6FQol8J+dTsk15lhl0oItqjFBRA3KN7OQYArPU+bRphOzfkO3sIFZxblWZ0MF+/2Jch61cCTM2paFafYBipKiFL4TO2a/xViZ1/thZdLjz9xMGvl8wlTFd2yw5q11JUURdm3l8aMuPjzL14fDHiXfonAlOB7t1GuIO54Ri8JRYJ9rWlt7pWTb0VvCwUZQJ4DKLlDqdpyc44ROMHo2uNCNrdUeDmUb4hIfLWNkdL/JsiH/Icp0dHA6w+fkpeGPt2UQPgo20LZ2KVoelVDYd7X3cyM6CGd1+yXNMGICHEIbjSYRuNmNS1xIlrVmDBhl0HvLFzHVCN2bBrgws0DcQ0Fct43ULYUKTAT+YmAlB1oaLLhvDPdlDRjMWzILNbVlxWz2I4mTTezCPgeZ88su01asEoebYcXHVEn7qHJphHxPMPw3kNdrVlgYGJ9RQ/yZ4QBGXgtmRw9ThK7pnlp+jQb8kpZqXCaYW3/n79r3sCePVsWyHcczFVM2Ws26BnzIMdVQm83y1X50WnjhcckoYpyimlgDedRztFYKQvCgLzBwHF509c2iMKoIJm8cipBcXG6hcY9Y6XHKMOZ//BJDtfhfM+D3ZbmI0l+3+AI1TO7HNklc1AAAAAElFTkSuQmCC";

const ICON_TOTAL_PENDING =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAOdEVYdFNvZnR3YXJlAEZpZ21hnrGWYwAAAZlJREFUeAGtVdFRwkAQfXdYACWECsQKjBXovzMCFQgVOFYgVBCgAaUBjRWYDowd2ACJb28vickkAhnfTI7L7u1jd293Y9CGMBpynQKDSyAfcx94TQqYBNjvEM/WbaamhYxE9om7If5GCmSPTWJbJ9uSyEZKlsc0mPEZIZ4Y9yC7UJnoxGuedTZtHjpFPufum0aLrpDaIzFLxHeLilCVkSe7IlmCYxBGzK99U1J6Tic84eZTQ1AhTkHdmZFVgZCZ+GQygbOhrV7ilJcyuFbNfoPeKG1D6+tMoHkTj9XrCodlsf7YcymbwLueVPmQcvCHj5HFs9QTB/U6/AeY8obtWYDX26/Si98XdEim5fPBt5SE22fm8aZXydTIJQXZjiHv31U6mKA3StsXyeEarijzkOGfTuq8o60MC0ZouWjvKpaaj6PJxr6f4SYPimnjcpet4KqdvdmsuVYyiaboY6yK/JvGPy556F5fpJ1cByTlsAijQFbNmQsTSjaZFxRdA/YB1ZTuQuuYM53HHbFhn5vGJyCnt7lUxlrzX8cPDpizWWS+8IMAAAAASUVORK5CYII=";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

  :root {
    --dashboard-sidebar-width: 260px;
    --dashboard-header-height: 76px;
    --pa-blue: #0047ab;
    --pa-dark: #182552;
    --pa-bg: #fbfaf9;
  }

  .pa-page *,
  .pa-page *::before,
  .pa-page *::after {
    box-sizing: border-box;
  }

  .pa-page {
    min-height: calc(100vh - var(--dashboard-header-height));
    margin-left: var(--dashboard-sidebar-width);
    margin-top: var(--dashboard-header-height);
    padding: 28px 54px 56px;
    background: var(--pa-bg);
    font-family: 'Plus Jakarta Sans', sans-serif;
    color: #111827;
  }

  .pa-page button,
  .pa-page input,
  .pa-page textarea {
    font-family: inherit;
  }

  .pa-shell {
    width: 100%;
    max-width: 1040px;
    margin: 0 auto;
  }

  .pa-title {
    margin: 0 0 10px;
    color: #162052;
    font-size: 30px;
    font-weight: 800;
    letter-spacing: -0.02em;
  }

  .pa-subtitle {
    margin: 0 0 38px;
    color: #64748b;
    font-size: 16px;
    line-height: 1.5;
  }

  .pa-stats {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 304px;
    gap: 28px;
    margin-bottom: 44px;
  }

  .pa-stat-card {
    min-height: 110px;
    background: #ffffff;
    border-radius: 12px;
    box-shadow: 0 14px 28px rgba(15, 23, 42, 0.12);
    padding: 30px 32px;
    display: flex;
    align-items: center;
  }

  .pa-pending-icon {
    width: 54px;
    height: 54px;
    border-radius: 9px;
    background: #dbeafe;
    color: #0056d6;
    display: grid;
    place-items: center;
    margin-right: 20px;
    flex-shrink: 0;
  }

  .pa-pending-icon img {
    width: 20px;
    height: 20px;
    display: block;
    object-fit: contain;
  }

  .pa-stat-label {
    color: #64748b;
    font-size: 12px;
    font-weight: 600;
    margin-bottom: 4px;
  }

  .pa-stat-value {
    color: #202124;
    font-size: 24px;
    font-weight: 800;
  }

  .pa-target-card {
    min-height: 110px;
    background: #ffffff;
    border-radius: 12px;
    box-shadow: 0 14px 28px rgba(15, 23, 42, 0.12);
    padding: 24px 24px 24px 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .pa-target-label {
    color: #64748b;
    font-size: 12px;
    font-weight: 600;
    margin-bottom: 4px;
  }

  .pa-target-value {
    color: #202124;
    font-size: 24px;
    font-weight: 800;
  }

  .pa-target-progress {
    width: 136px;
    height: 5px;
    margin-top: 18px;
    border-radius: 999px;
    background: #e5edf7;
    overflow: hidden;
  }

  .pa-target-fill {
    width: 80%;
    height: 100%;
    background: #2563eb;
    border-radius: inherit;
  }

  .pa-target-icon {
    width: 58px;
    height: 58px;
    border-radius: 14px;
    background: #fff7ed;
    color: #f59e0b;
    display: grid;
    place-items: center;
  }

  .pa-target-icon img {
    width: 20px;
    height: 20px;
    display: block;
    object-fit: contain;
  }

  .pa-table-card {
    background: #ffffff;
    border-radius: 12px;
    border: 1px solid #edf1f6;
    overflow: hidden;
    box-shadow: 0 10px 24px rgba(15, 23, 42, 0.04);
  }

  .pa-table-top {
    min-height: 62px;
    padding: 0 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .pa-table-title {
    margin: 0;
    color: #111827;
    font-size: 15px;
    font-weight: 800;
  }

  .pa-search {
    width: 192px;
    height: 30px;
    border: 1px solid #dbe2ec;
    border-radius: 7px;
    padding: 0 12px 0 36px;
    color: #334155;
    font-size: 12px;
    outline: none;
    background: #ffffff;
  }

  .pa-search-wrap {
    position: relative;
  }

  .pa-search-icon {
    position: absolute;
    left: 13px;
    top: 50%;
    transform: translateY(-50%);
    color: #94a3b8;
    pointer-events: none;
  }

  .pa-table-head,
  .pa-row {
    display: grid;
    grid-template-columns: minmax(260px, 1.7fr) 140px 130px 120px 190px;
    align-items: center;
    column-gap: 20px;
  }

  .pa-table-head {
    height: 64px;
    padding: 0 24px;
    border-top: 1px solid #edf1f6;
    border-bottom: 1px solid #edf1f6;
    background: #ffffff;
    color: #64748b;
    font-size: 11px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.07em;
  }

  .pa-row {
    min-height: 96px;
    padding: 0 24px;
    border-bottom: 1px solid #edf1f6;
  }

  .pa-article-cell {
    display: flex;
    align-items: center;
    gap: 14px;
    min-width: 0;
  }

  .pa-thumb {
    width: 40px;
    height: 40px;
    border-radius: 6px;
    object-fit: cover;
    background: #e5e7eb;
    border: 1px solid #9ca3af;
    flex-shrink: 0;
  }

  .pa-article-title {
    color: #111827;
    font: 700 14px/1.35 Georgia, 'Times New Roman', serif;
    max-width: 220px;
  }

  .pa-author {
    color: #111827;
    font-size: 14px;
    font-weight: 800;
  }

  .pa-username {
    margin-top: 3px;
    color: #64748b;
    font-size: 12px;
  }

  .pa-date {
    color: #475569;
    font-size: 14px;
    line-height: 1.4;
  }

  .pa-stat-line {
    display: flex;
    align-items: center;
    gap: 6px;
    color: #475569;
    font-size: 12px;
    margin-bottom: 4px;
  }

  .pa-word-icon {
    width: 13px;
    height: 10px;
    display: inline-block;
    object-fit: contain;
    flex-shrink: 0;
  }

  .pa-actions {
    display: flex;
    align-items: center;
    gap: 8px;
    justify-content: flex-end;
  }

  .pa-view-btn {
    width: 34px;
    height: 34px;
    border: 0;
    border-radius: 7px;
    color: #475569;
    background: #f1f5f9;
    cursor: pointer;
    display: grid;
    place-items: center;
  }

  .pa-approve-btn,
  .pa-reject-btn {
    height: 34px;
    border: 0;
    border-radius: 7px;
    padding: 0 18px;
    font-size: 12px;
    font-weight: 800;
    cursor: pointer;
  }

  .pa-approve-btn {
    background: var(--pa-blue);
    color: #ffffff;
  }

  .pa-reject-btn {
    background: #f1f5f9;
    color: #475569;
  }

  .pa-footer {
    min-height: 58px;
    padding: 0 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #64748b;
    font-size: 12px;
  }

  .pa-pagination {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .pa-page-btn {
    min-width: 30px;
    height: 30px;
    border: 0;
    border-radius: 8px;
    background: transparent;
    color: #1e293b;
    font-size: 12px;
    font-weight: 800;
    cursor: pointer;
  }

  .pa-page-btn.active {
    background: var(--pa-blue);
    color: #ffffff;
  }

  .pa-page-btn:disabled {
    opacity: 0.4;
    cursor: default;
  }

  .pa-show-all {
    border: 0;
    background: transparent;
    color: var(--pa-blue);
    font-size: 12px;
    font-weight: 800;
    cursor: pointer;
    margin-left: 12px;
  }

  .pa-toast {
    position: fixed;
    top: 58px;
    left: 50%;
    z-index: 9999;
    transform: translateX(-50%);
    min-height: 44px;
    padding: 0 28px;
    border-radius: 999px;
    color: #ffffff;
    font-size: 14px;
    font-weight: 800;
    display: inline-flex;
    align-items: center;
    gap: 12px;
    box-shadow: 0 12px 26px rgba(15, 23, 42, 0.2);
  }

  .pa-toast.success {
    background: #10b981;
  }

  .pa-toast.error {
    background: #ef4444;
  }

  .pa-alert {
    margin-bottom: 28px;
    min-height: 46px;
    border-radius: 8px;
    padding: 0 14px;
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 13px;
    font-weight: 700;
  }

  .pa-alert.success {
    background: #ecfdf5;
    border: 1px solid #86efac;
    color: #166534;
  }

  .pa-alert.error {
    background: #fff1f2;
    border: 1px solid #fecaca;
    color: #991b1b;
  }

  .pa-alert-close {
    margin-left: auto;
    border: 0;
    background: transparent;
    color: currentColor;
    cursor: pointer;
  }

  .pa-preview-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 18px;
  }

  .pa-breadcrumb {
    display: flex;
    align-items: center;
    gap: 8px;
    color: #64748b;
    font-size: 14px;
    margin-bottom: 14px;
  }

  .pa-breadcrumb button {
    border: 0;
    background: transparent;
    padding: 0;
    color: #64748b;
    font: inherit;
    cursor: pointer;
  }

  .pa-breadcrumb strong {
    color: #0056d6;
    font-weight: 500;
  }

  .pa-preview-title {
    margin: 0 0 12px;
    font: 700 15px/1.4 Georgia, 'Times New Roman', serif;
    color: #111827;
  }

  .pa-preview-meta {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 14px;
    color: #64748b;
    margin-bottom: 24px;
  }

  .pa-meta-item {
    display: inline-flex;
    align-items: center;
    gap: 7px;
  }

  .pa-meta-chip {
    padding: 7px 16px;
    border-radius: 999px;
    background: #e8eef7;
    color: #64748b;
  }

  .pa-preview-actions {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .pa-preview-reject,
  .pa-preview-approve {
    height: 40px;
    min-width: 104px;
    border-radius: 7px;
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }

  .pa-preview-reject {
    border: 1px solid #ef4444;
    background: #fff1f2;
    color: #b91c1c;
  }

  .pa-preview-approve {
    border: 0;
    background: var(--pa-blue);
    color: #ffffff;
    box-shadow: 0 8px 14px rgba(0, 71, 171, 0.22);
  }

  .pa-preview-grid {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 256px;
    gap: 34px;
    align-items: start;
  }

  .pa-preview-image {
    width: 100%;
    height: 342px;
    border-radius: 10px;
    object-fit: cover;
    display: block;
    margin-bottom: 22px;
  }

  .pa-content-card {
    background: #ffffff;
    border-radius: 12px;
    padding: 24px;
    box-shadow: 0 12px 26px rgba(15, 23, 42, 0.06);
  }

  .pa-content-title {
    margin: 0 0 24px;
    color: #0056d6;
    font-size: 15px;
    font-weight: 700;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .pa-content-card p {
    margin: 0 0 22px;
    color: #1f2937;
    font-size: 15px;
    line-height: 1.75;
  }

  .pa-summary-card {
    background: #172554;
    color: #ffffff;
    border-radius: 12px;
    padding: 22px 22px 24px;
    margin-bottom: 24px;
  }

  .pa-summary-title {
    margin: 0 0 18px;
    font-size: 15px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.03em;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .pa-summary-text {
    margin: 0;
    font-size: 15px;
    line-height: 1.65;
  }

  .pa-metadata-card {
    background: #ffffff;
    border-radius: 12px;
    padding: 22px;
    box-shadow: 0 12px 26px rgba(15, 23, 42, 0.06);
  }

  .pa-metadata-title {
    margin: 0 0 20px;
    color: #111827;
    font-size: 15px;
    font-weight: 600;
  }

  .pa-metadata-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #64748b;
    font-size: 13px;
    margin-bottom: 16px;
  }

  .pa-metadata-row strong {
    color: #111827;
    font-weight: 800;
  }

  .pa-overlay {
    position: fixed;
    inset: 0;
    z-index: 9998;
    background: rgba(15, 23, 42, 0.56);
    backdrop-filter: blur(5px);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .pa-modal {
    width: 448px;
    background: #ffffff;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 28px 70px rgba(15, 23, 42, 0.32);
  }

  .pa-modal-body {
    padding: 28px 24px 24px;
  }

  .pa-modal-title-row {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 18px;
  }

  .pa-modal-title {
    margin: 0;
    color: #111827;
    font-size: 20px;
    font-weight: 800;
  }

  .pa-modal-desc {
    margin: 0 0 26px;
    color: #64748b;
    font-size: 14px;
    line-height: 1.5;
  }

  .pa-modal-label {
    display: block;
    color: #111827;
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 10px;
  }

  .pa-modal-textarea {
    width: 100%;
    height: 114px;
    border: 1px solid #d1d9e6;
    border-radius: 8px;
    padding: 14px;
    outline: none;
    resize: none;
    color: #334155;
    font-size: 14px;
    line-height: 1.5;
  }

  .pa-modal-textarea::placeholder {
    color: #94a3b8;
  }

  .pa-modal-footer {
    min-height: 72px;
    padding: 0 24px;
    background: #f8fafc;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 12px;
  }

  .pa-modal-cancel,
  .pa-modal-confirm {
    height: 40px;
    border-radius: 7px;
    padding: 0 22px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
  }

  .pa-modal-cancel {
    border: 0;
    background: transparent;
    color: #64748b;
  }

  .pa-modal-confirm {
    border: 0;
    background: #c9181f;
    color: #ffffff;
    box-shadow: 0 8px 14px rgba(201, 24, 31, 0.18);
  }

  @media (max-width: 1120px) {
    .pa-page {
      margin-left: 0;
      padding: 24px;
    }

    .pa-stats,
    .pa-preview-grid {
      grid-template-columns: 1fr;
    }

    .pa-table-head,
    .pa-row {
      grid-template-columns: minmax(220px, 1.7fr) 130px 120px 110px 180px;
    }
  }
`;

const REEF_IMAGE =
  "https://images.unsplash.com/photo-1546026423-cc4642628d2b?auto=format&fit=crop&w=1200&q=80";

const INITIAL_PENDING = [
  {
    id: 1,
    title: "Pentingnya Menjaga Ekosistem Laut",
    author: "Budi Santoso",
    username: "@budisukses",
    category: "Lingkungan",
    submitDate: "24 Okt, 14:20",
    fullDate: "24 Okt 2025, 14:20 WIB",
    wordCount: 400,
    readTime: "2 min read",
    assetMedia: "1 Pict",
    image: REEF_IMAGE,
    summary:
      "Upaya konservasi laut yang efektif memerlukan pendekatan multifaset yang menggabungkan perlindungan habitat kritis dengan regulasi aktivitas manusia yang ketat. Melalui restorasi terumbu karang dan pembatasan polusi plastik, kita dapat memperkuat ketahanan ekosistem laut terhadap perubahan iklim. Kesadaran kolektif mengenai peran vital laut sebagai penyerap karbon utama sangat penting untuk menjamin keberlanjutan sumber daya alam dan kesejahteraan generasi mendatang yang bergantung pada kesehatan samudera kita.",
    body: [
      "Lautan menutupi lebih dari 70% permukaan planet kita dan merupakan rumah bagi jutaan spesies yang berbeda. Namun, ekosistem yang rapuh ini menghadapi ancaman yang belum pernah terjadi sebelumnya dari aktivitas manusia, mulai dari polusi plastik hingga perubahan iklim.",
      "Menjaga ekosistem laut bukan hanya soal menyelamatkan keanekaragaman hayati; ini adalah soal kelangsungan hidup manusia. Laut menyediakan separuh dari oksigen dunia dan merupakan penyerap karbon utama yang membantu mengatur iklim bumi. Tanpa laut yang sehat, stabilitas atmosfer kita akan terganggu secara drastis.",
      'Salah satu masalah utama yang kita hadapi adalah degradasi terumbu karang. Terumbu karang sering disebut sebagai "hutan hujan laut" karena kekayaan spesies yang didukungnya. Sayangnya, kenaikan suhu laut menyebabkan pemutihan karang massal yang menghancurkan habitat penting ini.',
      "Langkah-langkah konkret diperlukan segera. Pembentukan kawasan lindung laut, regulasi penangkapan ikan yang lebih ketat, dan pengurangan drastis limbah plastik adalah prioritas yang tidak bisa ditunda. Masyarakat juga memiliki peran penting dengan mengadopsi gaya hidup yang lebih berkelanjutan dan mendukung inisiatif konservasi lokal.",
    ],
  },
  {
    id: 2,
    title: "Masa Depan Jurnalistik Digital",
    author: "Andi Wijaya",
    username: "@andi_error",
    category: "Technology",
    submitDate: "22 Okt, 11:45",
    fullDate: "22 Okt 2025, 11:45 WIB",
    wordCount: 400,
    readTime: "2 min read",
    assetMedia: "1 Pict",
    image:
      "https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=1000&q=80",
    summary:
      "Jurnalisme digital membuka ruang baru bagi penyampaian informasi cepat, interaktif, dan berbasis data.",
    body: [
      "Perkembangan teknologi digital mengubah cara masyarakat mengakses berita. Media tidak lagi hanya menyampaikan informasi, tetapi juga membangun interaksi dengan pembaca.",
      "Transformasi ini menuntut jurnalis untuk memahami data, verifikasi informasi, dan perilaku audiens digital.",
    ],
  },
  {
    id: 3,
    title: "Ketika Cinta Bertasbih",
    author: "Andi Wijaya",
    username: "@andi_error",
    category: "Social",
    submitDate: "22 Okt, 11:45",
    fullDate: "22 Okt 2025, 11:45 WIB",
    wordCount: 400,
    readTime: "2 min read",
    assetMedia: "1 Pict",
    image: "",
    summary:
      "Artikel opini mengenai nilai hubungan sosial dan spiritualitas dalam kehidupan modern.",
    body: [
      "Hubungan manusia semakin kompleks di tengah perubahan sosial. Nilai empati dan kepedulian menjadi penting untuk menjaga kualitas interaksi.",
      "Melalui narasi yang dekat dengan keseharian, tulisan ini mengajak pembaca melihat cinta sebagai tindakan yang bertanggung jawab.",
    ],
  },
  {
    id: 4,
    title: "Anything You Want: Romansa Penuh Histori",
    author: "Andi Wijaya",
    username: "@andi_error",
    category: "Culture",
    submitDate: "04 Okt, 12:08",
    fullDate: "04 Okt 2025, 12:08 WIB",
    wordCount: 400,
    readTime: "2 min read",
    assetMedia: "1 Pict",
    image: "",
    summary:
      "Ulasan budaya populer tentang romansa, ingatan, dan sejarah personal.",
    body: [
      "Romansa dalam budaya populer sering menjadi medium untuk memahami ingatan kolektif.",
      "Artikel ini menyoroti bagaimana kisah personal dapat bersinggungan dengan sejarah yang lebih luas.",
    ],
  },
  {
    id: 5,
    title: "Benci Untuk Mencinta Lagu Populer",
    author: "Andi Wijaya",
    username: "@andi_error",
    category: "Music",
    submitDate: "02 Okt, 11:45",
    fullDate: "02 Okt 2025, 11:45 WIB",
    wordCount: 400,
    readTime: "2 min read",
    assetMedia: "1 Pict",
    image: "",
    summary:
      "Analisis musik populer dan hubungan emosional pendengar dengan lirik lagu.",
    body: [
      "Musik populer sering menjadi cermin emosi masyarakat. Lagu yang sederhana dapat membawa makna yang kuat bagi pendengarnya.",
      "Tulisan ini membahas bagaimana lirik dan melodi membangun kedekatan emosional.",
    ],
  },
  {
    id: 6,
    title: "Menulusuri Sungai Amazon Hilangkan Beban",
    author: "Andi Wijaya",
    username: "@andi_error",
    category: "Travel",
    submitDate: "02 Okt, 11:45",
    fullDate: "02 Okt 2025, 11:45 WIB",
    wordCount: 400,
    readTime: "2 min read",
    assetMedia: "1 Pict",
    image: "",
    summary:
      "Catatan perjalanan tentang alam, refleksi diri, dan pengalaman menyusuri sungai Amazon.",
    body: [
      "Perjalanan ke alam liar sering menghadirkan pengalaman yang mengubah cara pandang manusia terhadap hidup.",
      "Amazon menawarkan ruang refleksi tentang hubungan manusia dengan alam.",
    ],
  },
  {
    id: 7,
    title: "Transformasi UMKM Lewat Pembayaran Digital",
    author: "Siti Aminah",
    username: "@siti_news",
    category: "Economics",
    submitDate: "01 Okt, 09:30",
    fullDate: "01 Okt 2025, 09:30 WIB",
    wordCount: 400,
    readTime: "2 min read",
    assetMedia: "1 Pict",
    image: "",
    summary:
      "Digitalisasi pembayaran membantu UMKM menjangkau pasar lebih luas dan meningkatkan efisiensi transaksi.",
    body: [
      "UMKM mulai memanfaatkan pembayaran digital untuk mempercepat transaksi dan memperluas pasar.",
      "Adopsi teknologi ini membantu pelaku usaha kecil bersaing dalam ekosistem ekonomi digital.",
    ],
  },
  {
    id: 8,
    title: "Pendidikan Inklusif di Era Teknologi",
    author: "Rizky Pratama",
    username: "@rizkyedu",
    category: "Education",
    submitDate: "30 Sep, 15:15",
    fullDate: "30 Sep 2025, 15:15 WIB",
    wordCount: 400,
    readTime: "2 min read",
    assetMedia: "1 Pict",
    image: "",
    summary:
      "Teknologi membuka kesempatan pendidikan yang lebih inklusif bagi berbagai kelompok masyarakat.",
    body: [
      "Pendidikan inklusif menuntut akses yang merata bagi semua peserta didik.",
      "Teknologi dapat menjadi alat penting untuk memperluas jangkauan pembelajaran.",
    ],
  },
  {
    id: 9,
    title: "Kesehatan Mental Pekerja Kreatif",
    author: "Maya Putri",
    username: "@mayaputri",
    category: "Health",
    submitDate: "29 Sep, 10:20",
    fullDate: "29 Sep 2025, 10:20 WIB",
    wordCount: 400,
    readTime: "2 min read",
    assetMedia: "1 Pict",
    image: "",
    summary:
      "Tekanan industri kreatif membuat isu kesehatan mental semakin penting untuk dibahas.",
    body: [
      "Pekerja kreatif menghadapi tekanan produktivitas, ekspektasi publik, dan ketidakpastian ekonomi.",
      "Kesadaran terhadap kesehatan mental perlu menjadi bagian dari budaya kerja.",
    ],
  },
  {
    id: 10,
    title: "Energi Terbarukan untuk Kota Masa Depan",
    author: "Dewi Lestari",
    username: "@dewilestari",
    category: "Environment",
    submitDate: "28 Sep, 08:10",
    fullDate: "28 Sep 2025, 08:10 WIB",
    wordCount: 400,
    readTime: "2 min read",
    assetMedia: "1 Pict",
    image: "",
    summary:
      "Kota masa depan membutuhkan transisi energi yang ramah lingkungan dan berkelanjutan.",
    body: [
      "Energi terbarukan menjadi kunci dalam membangun kota yang lebih hijau.",
      "Perencanaan kota harus mempertimbangkan efisiensi energi, transportasi publik, dan pengurangan emisi.",
    ],
  },
  {
    id: 11,
    title: "Peran Komunitas dalam Literasi Digital",
    author: "Budi Santoso",
    username: "@budisukses",
    category: "Social",
    submitDate: "27 Sep, 13:00",
    fullDate: "27 Sep 2025, 13:00 WIB",
    wordCount: 400,
    readTime: "2 min read",
    assetMedia: "1 Pict",
    image: "",
    summary:
      "Komunitas lokal dapat menjadi motor penting dalam meningkatkan literasi digital masyarakat.",
    body: [
      "Literasi digital tidak hanya soal kemampuan menggunakan perangkat, tetapi juga kemampuan memahami informasi.",
      "Peran komunitas membantu memperluas edukasi digital secara lebih dekat dengan masyarakat.",
    ],
  },
];

const IconCheckCircle = ({ size = 20 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.4"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="9" />
    <path d="m8.5 12.2 2.2 2.2 4.8-5" />
  </svg>
);

const IconSearch = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <circle cx="11" cy="11" r="7" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

const IconEye = () => (
  <svg
    width="17"
    height="17"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M1.5 12s3.8-7 10.5-7 10.5 7 10.5 7-3.8 7-10.5 7S1.5 12 1.5 12Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const IconClock = ({ size = 14 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);

const IconUser = () => (
  <svg
    width="17"
    height="17"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const IconCalendar = () => (
  <svg
    width="17"
    height="17"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <path d="M16 2v4M8 2v4M3 10h18" />
  </svg>
);

const IconArticle = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <path d="M14 2v6h6M8 13h8M8 17h5" />
  </svg>
);

const IconX = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
  >
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);

const IconWarn = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#c9181f"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" />
    <path d="M12 9v4M12 17h.01" />
  </svg>
);

const FallbackThumb = () => <div className="pa-thumb" />;

export default function PendingApprovalPage() {
  const [items, setItems] = useState(INITIAL_PENDING);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [showAll, setShowAll] = useState(false);
  const [toast, setToast] = useState(null);
  const [previewArticle, setPreviewArticle] = useState(null);
  const [rejectTarget, setRejectTarget] = useState(null);
  const [rejectReason, setRejectReason] = useState("");

  const pageSize = showAll ? items.length || 1 : 5;

  const filteredItems = useMemo(() => {
    const cleanQuery = query.trim().toLowerCase();

    if (!cleanQuery) return items;

    return items.filter((item) =>
      [item.title, item.author, item.username, item.category]
        .join(" ")
        .toLowerCase()
        .includes(cleanQuery),
    );
  }, [items, query]);

  const totalPages = Math.max(1, Math.ceil(filteredItems.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const startIndex = (safePage - 1) * pageSize;
  const visibleItems = filteredItems.slice(startIndex, startIndex + pageSize);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    window.setTimeout(() => setToast(null), 2600);
  };

  const removeItem = (id) => {
    setItems((current) => current.filter((item) => item.id !== id));
    setPreviewArticle(null);
    setRejectTarget(null);
    setRejectReason("");
  };

  const handleApprove = (article) => {
    removeItem(article.id);
    showToast("Artikel Berhasil Disetujui & Diterbitkan!", "success");
  };

  const handleOpenReject = (article) => {
    setRejectTarget(article);
    setRejectReason("");
  };

  const handleConfirmReject = () => {
    if (!rejectTarget) return;

    removeItem(rejectTarget.id);
    showToast("Artikel Berhasil Ditolak & Dikembalikan Ke Penulis!", "error");
  };

  const handleSearch = (event) => {
    setQuery(event.target.value);
    setPage(1);
  };

  const renderPagination = () => {
    const numbers = Array.from({ length: totalPages }, (_, index) => index + 1);

    return (
      <div className="pa-pagination">
        <button
          className="pa-page-btn"
          type="button"
          disabled={safePage === 1}
          onClick={() => setPage((current) => Math.max(1, current - 1))}
        >
          ‹
        </button>

        {numbers.map((number) => (
          <button
            key={number}
            className={`pa-page-btn${safePage === number ? " active" : ""}`}
            type="button"
            onClick={() => setPage(number)}
          >
            {number}
          </button>
        ))}

        <button
          className="pa-page-btn"
          type="button"
          disabled={safePage === totalPages}
          onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
        >
          ›
        </button>

        <button
          className="pa-show-all"
          type="button"
          onClick={() => {
            setShowAll((current) => !current);
            setPage(1);
          }}
        >
          {showAll ? "Tampilkan Sedikit" : "Tampilkan Semua"}
        </button>
      </div>
    );
  };

  const ListView = () => (
    <div className="pa-shell">
      <h1 className="pa-title">Persetujuan Artikel</h1>
      <p className="pa-subtitle">
        Tinjau dan validasi kiriman artikel terbaru dari kontributor.
      </p>

      <section className="pa-stats">
        <div className="pa-stat-card">
          <div className="pa-pending-icon">
            <img src={ICON_TOTAL_PENDING} alt="Total Pending" />
          </div>

          <div>
            <div className="pa-stat-label">Total Pending</div>
            <div className="pa-stat-value">{items.length} Artikel</div>
          </div>
        </div>

        <div className="pa-target-card">
          <div>
            <div className="pa-target-label">Target Harian</div>
            <div className="pa-target-value">8/10 Artikel</div>
            <div className="pa-target-progress">
              <div className="pa-target-fill" />
            </div>
          </div>

          <div className="pa-target-icon">
            <img src={ICON_TARGET} alt="Target Harian" />
          </div>
        </div>
      </section>

      <section className="pa-table-card">
        <div className="pa-table-top">
          <h2 className="pa-table-title">Antrean Persetujuan</h2>

          <div className="pa-search-wrap">
            <span className="pa-search-icon">
              <IconSearch />
            </span>
            <input
              className="pa-search"
              value={query}
              onChange={handleSearch}
              placeholder="Cari antrean..."
            />
          </div>
        </div>

        <div className="pa-table-head">
          <span>Judul Artikel</span>
          <span>Penulis</span>
          <span>Tanggal Submit</span>
          <span>Statistik</span>
          <span>Aksi</span>
        </div>

        {visibleItems.map((article) => (
          <div className="pa-row" key={article.id}>
            <div className="pa-article-cell">
              {article.image ? (
                <img className="pa-thumb" src={article.image} alt="" />
              ) : (
                <FallbackThumb />
              )}

              <div className="pa-article-title">{article.title}</div>
            </div>

            <div>
              <div className="pa-author">{article.author}</div>
              <div className="pa-username">{article.username}</div>
            </div>

            <div className="pa-date">{article.submitDate}</div>

            <div>
              <div className="pa-stat-line">
                <img
                  className="pa-word-icon"
                  src={ICON_WORD_COUNT}
                  alt="Word Count"
                />
                {article.wordCount} kata
              </div>
              <div className="pa-stat-line">
                <IconClock /> {article.readTime.replace(" ", "\n")}
              </div>
            </div>

            <div className="pa-actions">
              <button
                type="button"
                className="pa-view-btn"
                onClick={() => setPreviewArticle(article)}
              >
                <IconEye />
              </button>

              <button
                type="button"
                className="pa-approve-btn"
                onClick={() => handleApprove(article)}
              >
                Setujui
              </button>

              <button
                type="button"
                className="pa-reject-btn"
                onClick={() => handleOpenReject(article)}
              >
                Tolak
              </button>
            </div>
          </div>
        ))}

        <div className="pa-footer">
          <span>
            Menampilkan {visibleItems.length} dari {filteredItems.length} artikel masuk
          </span>

          {renderPagination()}
        </div>
      </section>
    </div>
  );

  const PreviewView = ({ article }) => (
    <div className="pa-shell">
      {toast && (
        <div className={`pa-alert ${toast.type}`}>
          <IconCheckCircle size={18} />
          {toast.message}
          <button
            className="pa-alert-close"
            type="button"
            onClick={() => setToast(null)}
          >
            <IconX />
          </button>
        </div>
      )}

      <div className="pa-preview-top">
        <div>
          <div className="pa-breadcrumb">
            <button type="button" onClick={() => setPreviewArticle(null)}>
              Pending Approval
            </button>
            <span>›</span>
            <strong>Article Preview</strong>
          </div>

          <h1 className="pa-preview-title">{article.title}</h1>

          <div className="pa-preview-meta">
            <span className="pa-meta-item">
              <IconUser /> {article.author}
            </span>
            <span>|</span>
            <span className="pa-meta-chip">{article.category}</span>
            <span>|</span>
            <span className="pa-meta-item">
              <IconCalendar /> {article.fullDate}
            </span>
          </div>
        </div>

        <div className="pa-preview-actions">
          <button
            type="button"
            className="pa-preview-reject"
            onClick={() => handleOpenReject(article)}
          >
            <IconX /> Tolak
          </button>

          <button
            type="button"
            className="pa-preview-approve"
            onClick={() => handleApprove(article)}
          >
            <IconCheckCircle size={16} /> Setujui
          </button>
        </div>
      </div>

      <section className="pa-preview-grid">
        <div>
          <img className="pa-preview-image" src={article.image || REEF_IMAGE} alt="" />

          <article className="pa-content-card">
            <h2 className="pa-content-title">
              <IconArticle /> Artikel Lengkap
            </h2>

            {article.body.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </article>
        </div>

        <aside>
          <section className="pa-summary-card">
            <h2 className="pa-summary-title">
              <IconArticle /> Ringkasan Artikel
            </h2>
            <p className="pa-summary-text">{article.summary}</p>
          </section>

          <section className="pa-metadata-card">
            <h2 className="pa-metadata-title">Metadata Status</h2>

            <div className="pa-metadata-row">
              <span>Word Count</span>
              <strong>{article.wordCount} Words</strong>
            </div>

            <div className="pa-metadata-row">
              <span>Read Time</span>
              <strong>{article.readTime.replace(" read", "")}</strong>
            </div>

            <div className="pa-metadata-row">
              <span>Aset Media</span>
              <strong>{article.assetMedia}</strong>
            </div>
          </section>
        </aside>
      </section>
    </div>
  );

  return (
    <>
      <style>{css}</style>

      <main className="pa-page">
        {!previewArticle && toast && (
          <div className={`pa-toast ${toast.type}`}>
            <IconCheckCircle size={18} />
            {toast.message}
          </div>
        )}

        {previewArticle ? (
          <PreviewView article={previewArticle} />
        ) : (
          <ListView />
        )}
      </main>

      {rejectTarget && (
        <div className="pa-overlay" onClick={() => setRejectTarget(null)}>
          <div className="pa-modal" onClick={(event) => event.stopPropagation()}>
            <div className="pa-modal-body">
              <div className="pa-modal-title-row">
                <IconWarn />
                <h2 className="pa-modal-title">Konfirmasi Penolakan</h2>
              </div>

              <p className="pa-modal-desc">
                Harap berikan alasan penolakan agar penulis dapat melakukan
                perbaikan yang diperlukan.
              </p>

              <label className="pa-modal-label">Alasan Penolakan</label>
              <textarea
                className="pa-modal-textarea"
                value={rejectReason}
                onChange={(event) => setRejectReason(event.target.value)}
                placeholder="Contoh: Kualitas gambar kurang baik atau konten memerlukan referensi tambahan..."
              />
            </div>

            <div className="pa-modal-footer">
              <button
                type="button"
                className="pa-modal-cancel"
                onClick={() => setRejectTarget(null)}
              >
                Batal
              </button>

              <button
                type="button"
                className="pa-modal-confirm"
                onClick={handleConfirmReject}
              >
                Konfirmasi Tolak
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}