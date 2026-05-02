"use client";
import { useState } from 'react';
import TrendingCard from './TrendingCard';
import SidebarTrending from './SidebarTrending';

export default function TrendingSection() {
  // Data dummy disamakan dengan yang kamu buat sebelumnya
  const [newsData] = useState([
    { 
      id: 1, 
      category: "ENVIRONMENT", 
      title: "Heningnya Udara Hutan Kalimantan Timur Menarik Minat Investor BUMS", 
      excerpt: "Mengulas peran penting hutan lintang tinggi dalam siklus karbon global seiring meningkatnya suhu bumi.",
      image: "/images/forest.jpg", // Pastikan gambar ada di public/images
      readTime: "2 MIN READ",
      date: "2 hours ago"
    },
    { 
      id: 2, 
      category: "BUSINESS", 
      title: "Keuangan Terdesentralisasi: Fase Berikutnya", 
      excerpt: "Bagaimana investor institusi mulai menemukan pijakan mereka di dunia manajemen aset digital.",
      image: "/images/finance.jpg",
      readTime: "2 MIN READ",
      date: "4 hours ago"
    },
    { 
      id: 3, 
      category: "DESIGN", 
      title: "Etika Materialitas", 
      excerpt: "Menelusuri asal-usul komponen mewah dan tuntutan konsumen terhadap transparansi yang lebih radikal.",
      image: "/images/watch.jpg",
      readTime: "2 MIN READ",
      date: "yesterday"
    },
    { 
      id: 4, 
      category: "PHILOSOPHY", 
      title: "Seni Jurnalisme Santai", 
      excerpt: "Mengapa kedalaman dan konteks menjadi semakin berharga di era serba instan.",
      image: "/images/typewriter.jpg",
      readTime: "2 MIN READ",
      date: "yesterday"
    }
  ]);

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
            {newsData.map((news) => (
              <TrendingCard key={news.id} news={news} />
            ))}
          </div>
        </div>
        <SidebarTrending />
      </div>
    </section>
  );
}