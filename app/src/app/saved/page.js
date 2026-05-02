"use client";
import React, { useState } from 'react';

export default function SavedPage() {
  // Simulasi status login (nanti bisa diganti dengan logic auth beneran)
  const [isLoggedIn, setIsLoggedIn] = useState(true); 
  const [hasSavedNews, setHasSavedNews] = useState(false);

  // --- KONDISI 1: BELUM LOGIN ---
  if (!isLoggedIn) {
    return (
      <main className="saved-empty-container">
        <div className="saved-cta-card">
          <h1 className="cta-title">Ingin Menambahkan Daftar Bacaan?</h1>
          <div className="cta-button-group">
            <button className="btn-login" onClick={() => setIsLoggedIn(true)}>Login</button>
            <button className="btn-register">Register</button>
          </div>
        </div>
      </main>
    );
  }

  // --- KONDISI 2: SUDAH LOGIN TAPI KOSONG ---
  if (isLoggedIn && !hasSavedNews) {
    return (
      <main className="saved-logged-empty">
        <div className="empty-content-wrapper">
          <img src="/img/Oooopsss!!.png" alt="Oooopsss" className="oooops-img" />
          <img src="/img/tangan.png" alt="Tangan" className="tangan-img" />
          
          <h2 className="empty-msg">Anda Belum Memiliki Daftar Bacaan</h2>
          
          <button className="btn-tambah-gradient">
            Tambah
          </button>
        </div>
      </main>
    );
  }

  return (
    <main>
      {/* Tampilan jika sudah ada daftar bacaan */}
    </main>
  );
}