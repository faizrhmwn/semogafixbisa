"use client";
import React from 'react';
import TrendingCard from './TrendingCard';
import SidebarTrending from './SidebarTrending';
// 1. Import data dari file pusat
import { allNewsData } from "../../data/dummyNews";

export default function TrendingSection() {
  // 2. Kita ambil 4 berita pertama untuk ditampilkan di bagian Trending
  const trendingNews = allNewsData.slice(0, 4);

  return (
    <section className="trending-section">
      <div className="trending-container">
        <div className="trending-content">
          <div className="trending-header">
            <h2 className="serif-title">Trending News</h2>
            <span className="header-line"></span>
            <span className="view-all">VIEW ALL</span>
          </div>
          
          <div className="news-list-grid">
            {/* 3. Map data dari dummyNews */}
            {trendingNews.map((news) => (
              <TrendingCard key={news.id} news={news} />
            ))}
          </div>
        </div>
        
        {/* Sidebar pendamping di sebelah kanan */}
        <SidebarTrending />
      </div>
    </section>
  );
}