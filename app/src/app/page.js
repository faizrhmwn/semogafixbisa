"use client";
import React, { useState } from "react";
// Import komponen dari folder baru yang sudah kita rapikan
import MainTrending from "./components/MainTrending";
import TrendingSection from "./components/TrendingSection";
import Newsletter from "./components/Newsletter";

export default function HomePage() {
  // Data dummy untuk konten utama
  const [newsData] = useState([
    {
      id: 1,
      category: "ENVIRONMENT",
      title:
        "Heningnya Udara Hutan Kalimantan Timur Menarik Minat Investor BUMS",
      excerpt:
        "Mengulas peran penting hutan lintang tinggi dalam siklus karbon global seiring meningkatnya suhu bumi.",
      image: "/images/forest.jpg",
      readTime: "2 MIN READ",
      date: "2 hours ago",
    },
    {
      id: 2,
      category: "BUSINESS",
      title: "Keuangan Terdesentralisasi: Fase Berikutnya",
      excerpt:
        "Bagaimana investor institusi mulai menemukan pijakan mereka di dunia manajemen aset digital.",
      image: "/images/finance.jpg",
      readTime: "2 MIN READ",
      date: "4 hours ago",
    },
    {
      id: 3,
      category: "DESIGN",
      title: "Etika Materialitas",
      excerpt:
        "Menelusuri asal-usul komponen mewah dan tuntutan konsumen terhadap transparansi yang lebih radikal.",
      image: "/images/watch.jpg",
      readTime: "2 MIN READ",
      date: "yesterday",
    },
  ]);

  return (
    // Pastikan pakai class wrapper agar tidak melebar ke seluruh layar
    <main className="main-wrapper">
      {/* 1. Area Highlight (Bento Grid) */}
      <section className="bento-section">
        <MainTrending />
      </section>

      {/* 2. Area Trending List */}
      <section className="list-section">
        <TrendingSection />
        <Newsletter />
      </section>
    </main>
  );
}
