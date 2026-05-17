import React from "react";
import { Link } from "react-router-dom";

export default function AuthSidebar() {
  return (
    <div className="sidebar-cta">
      <p>Menyelam Lebih Dalam di Paham.id?</p>
      <p className="sub-text">Dapatkan pemberitahuan langsung setiap berita baru</p>
      <Link to="/register">
        <button className="btn-signup-cta">DAFTAR SEKARANG</button>
      </Link>
    </div>
  );
}