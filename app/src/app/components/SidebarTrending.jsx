"use client";
import { useState } from 'react';

export default function SidebarTrending() {
  const [popularNews, setPopularNews] = useState([
    { id: 1, title: "MBG Meresahkan Warga", reads: 34200 },
    { id: 2, title: "Suntik Putih Bikin Autoimun", reads: 28900 },
    { id: 3, title: "Siap WFH 2027", reads: 19500 }
  ]);

  const handleRead = (id) => {
    setPopularNews(prevNews => 
      prevNews.map(item => 
        item.id === id ? { ...item, reads: item.reads + 1 } : item
      )
    );
  };

  return (
    <aside className="trending-sidebar">
      {/* Bagian Sering Dibaca */}
      <div className="sidebar-section popular-box">
        <h4 className="sidebar-title">SERING DIBACA</h4>
        <div className="popular-list">
          {popularNews.map((news) => (
            <div 
              key={news.id} 
              className="popular-item" 
              onClick={() => handleRead(news.id)}
            >
              <div className="pop-circle"></div>
              <div className="pop-info">
                <span className="reads">{(news.reads / 1000).toFixed(1)}K READS</span>
                <p>{news.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bagian Stay Connected dengan Ikon Gambar */}
      <div className="sidebar-section social-box">
        <h4 className="sidebar-title">STAY CONNECTED</h4>
        <div className="social-icons">
          <div className="icon-item">
            <img src="/img/mdi_at.png" alt="At" />
          </div>
          <div className="icon-item">
            <img src="/img/ri_rss-fill.png" alt="RSS" />
          </div>
          <div className="icon-item">
            <img src="/img/share.png" alt="Share" />
          </div>
          <div className="icon-item">
            <img src="/img/comment.png" alt="Chat" />
          </div>
        </div>
      </div>
    </aside>
  );
}