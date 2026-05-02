"use client";
import React, { useState } from 'react';

export default function TrendingPage() {
  const [filter, setFilter] = useState('TODAY');

  const trendingNews = [
    {
      id: 1,
      category: "ECONOMICS",
      title: "Transformasi Ekonomi Hijau: Bagaimana Indonesia Memimpin Arus Asia Tenggara",
      desc: "Langkah berani dalam dekarbonisasi industri menempatkan nusantara di garis depan revolusi industri berkelanjutan.",
      img: "/img/trending1.jpg",
      isFirst: true
    },
    {
      id: 2,
      category: "TECHNOLOGY",
      title: "Kedaulatan Data: Membangun Infrastruktur Digital yang Mandiri di Jakarta",
      desc: "Pembangunan pusat data nasional menandai era baru dalam perlindungan privasi warga dan efisiensi birokrasi digital.",
      img: "/img/trending2.jpg"
    }
    // Tambahkan data lainnya sesuai gambar
  ];

  return (
    <main className="trending-container">
      <h1 className="trending-headline">What's Trending Now?</h1>

      {/* Time Filter Tabs */}
      <div className="time-filter-bar">
        {['TODAY', 'THIS WEEK', 'THIS MONTH'].map((t) => (
          <button 
            key={t}
            className={`filter-btn ${filter === t ? 'active' : ''}`}
            onClick={() => setFilter(t)}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Trending List */}
      <div className="trending-list">
        {trendingNews.map((news) => (
          <div key={news.id} className="trending-card">
            <div className="trending-img-wrapper">
              {news.isFirst && <span className="rank-badge">#1 TRENDING</span>}
              <img src={news.img} alt={news.title} />
            </div>
            
            <div className="trending-info">
              <span className="trending-category">{news.category}</span>
              <h2 className="trending-title">{news.title}</h2>
              <p className="trending-desc">{news.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="load-more-wrapper">
        <button className="load-more-btn">Load More</button>
      </div>
    </main>
  );
}