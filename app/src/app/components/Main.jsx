"use client";
import { useState } from 'react';
import TrendingCard from './TrendingCard';
import SidebarTrending from './SidebarTrending';

export default function Main() {
  const [trendingNews] = useState([
    { 
      id: 1, 
      category: "ENVIRONMENT", 
      title: "Heningnya Udara Hutan Kalimantan Timur Menarik Minat Investor BUMS", 
      excerpt: "Mengulas peran penting hutan lintang tinggi dalam siklus karbon global seiring meningkatnya suhu bumi.",
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e", 
      readTime: "2 MIN READ",
      date: "2 hours ago"
    },
    { 
      id: 2, 
      category: "BUSINESS", 
      title: "Keuangan Terdesentralisasi: Fase Berikutnya", 
      excerpt: "Bagaimana investor institusi mulai menemukan pijakan mereka di dunia manajemen aset digital.",
      image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f",
      readTime: "2 MIN READ",
      date: "4 hours ago"
    },
    { 
      id: 3, 
      category: "DESIGN", 
      title: "Etika Materialitas", 
      excerpt: "Menelusuri asal-usul komponen mewah dan tuntutan konsumen terhadap transparansi yang lebih radikal.",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
      readTime: "2 MIN READ",
      date: "yesterday"
    },
    { 
      id: 4, 
      category: "PHILOSOPHY", 
      title: "Seni Jurnalisme Santai", 
      excerpt: "Mengapa kedalaman dan konteks menjadi semakin berharga di era serba instan.",
      image: "https://images.unsplash.com/photo-1485333374521-9d19dc5a4c69",
      readTime: "2 MIN READ",
      date: "yesterday"
    }
  ]);

  return (
    <div className="main-wrapper">
      {/* --- SECTION ATAS: MAIN HEADER (BENTO GRID) --- */}
      <section className="main-header-grid">
        <div className="bento-main">
          <div className="bento-overlay">
            <span className="cat-label-special">SPECIAL REPORT</span>
            <h1 className="heavitas-font">ARSITEKTUR TERBARU KOTA SEMARANG</h1>
            <p>Semarang kini punya wajah baru yang mantap dan bergizi ea...</p>
            <div className="bento-footer">
               <button className="btn-read">Baca Selengkapnya</button>
               <span className="meta-info">12 MIN READ • BY JOKO ANWAR</span>
            </div>
          </div>
        </div>

        <div className="bento-side">
          <div className="bento-small side-top">
            <span className="cat-label-secondary">TECHNOLOGY</span>
            <h3>The Analog Renaissance</h3>
          </div>
          <div className="bento-small side-bottom">
            <span className="cat-label-secondary">CULTURE</span>
            <h3>A Minimalist Identity</h3>
          </div>
        </div>
      </section>

      {/* --- SECTION BAWAH: TRENDING SECTION --- */}
      <section className="trending-layout">
        <div className="trending-left">
          <div className="trending-header">
            <h2 className="serif-title">Trending News</h2>
            <span className="view-all">VIEW ALL</span>
          </div>
          
          <div className="news-grid">
            {trendingNews.map((news) => (
              <TrendingCard key={news.id} news={news} />
            ))}
          </div>
        </div>

        <SidebarTrending />
      </section>
    </div>
  );
}