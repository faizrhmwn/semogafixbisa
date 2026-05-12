import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/globals.css";

export default function SavedPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [hasSavedNews] = useState(false);

  // --- KONDISI 1: BELUM LOGIN ---
  if (!isLoggedIn) {
    return (
      <main className="saved-empty-container">
        <div className="saved-cta-card">
          <h1 className="cta-title">Ingin Menambahkan Daftar Bacaan?</h1>
          <div className="cta-button-group">
            <button className="btn-login" onClick={() => setIsLoggedIn(true)}>Login</button>
            <Link to="/register">
              <button className="btn-register">Register</button>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // --- KONDISI 2: SUDAH LOGIN TAPI KOSONG ---
  if (!hasSavedNews) {
    return (
      <main className="saved-logged-empty">
        <div className="empty-content-wrapper">
          <img src="/img/Oooopsss!!.png" alt="Oops" className="oooops-img" />
          <img src="/img/tangan.png" alt="Tangan" className="tangan-img" />
          <h2 className="empty-msg">Anda Belum Memiliki Daftar Bacaan</h2>
          <button className="btn-tambah-gradient">Tambah</button>
        </div>
      </main>
    );
  }

  // --- KONDISI 3: ADA DAFTAR BACAAN ---
  return (
    <main className="saved-has-content">
      <h1 className="saved-page-title">Daftar Bacaan Saya</h1>
      {/* Konten saved articles nanti di sini */}
    </main>
  );
}