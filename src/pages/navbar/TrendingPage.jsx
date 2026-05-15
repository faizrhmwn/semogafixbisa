import React, { useState } from "react";
import { Link } from "react-router-dom";
import { allNewsData } from "../../data/dummyNews";
import "../../styles/globals.css";

export default function TrendingPage() {
  const [timeFilter, setTimeFilter] = useState("TODAY");
  // State untuk kontrol berapa banyak berita yang tampil
  const [visibleCount, setVisibleCount] = useState(4);

  const getFilteredData = () => {
    let filtered = allNewsData;
    if (timeFilter === "TODAY") filtered = allNewsData.slice(0, 8); // Contoh filter data hari ini
    if (timeFilter === "THIS WEEK") filtered = allNewsData.slice(2, 12);
    
    // Kembalikan data sesuai jumlah yang boleh tampil (Load More logic)
    return filtered.slice(0, visibleCount);
  };

  const filteredNews = getFilteredData();

  // Fungsi buat nambahin data pas diklik
  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 4); // Tambah 4 berita setiap klik
  };

  // Reset jumlah tampilan kalau user ganti kategori/filter waktu
  const handleFilterChange = (filter) => {
    setTimeFilter(filter);
    setVisibleCount(4); 
  };

  return (
    <div className="trending-page-container">
      <div className="trending-content-wrapper">
        
        <header className="trending-page-header">
          <h1 className="trending-main-title">What's Trending Now?</h1>

          <div className="trending-filter-row">
            {["TODAY", "THIS WEEK", "THIS MONTH"].map((filter) => (
              <button
                key={filter}
                className={`filter-pill ${timeFilter === filter ? "active" : ""}`}
                onClick={() => handleFilterChange(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
        </header>

        <main className="trending-news-list">
          {filteredNews.map((item, index) => (
            <Link key={item.id} to={`/news/${item.id}`} className="trending-card-link">
              <article className="trending-news-card">
                
                <div className="trending-image-box">
                  {timeFilter === "TODAY" && index === 0 && (
                    <span className="badge-trending">#1 TRENDING</span>
                  )}
                  <img src={item.image} alt={item.title} className="trending-img" />
                </div>

                <div className="trending-text-box">
                  <span className="trending-news-category">
                    {item.category?.toUpperCase()}
                  </span>
                  <h2 className="trending-news-headline">{item.title}</h2>
                  <p className="trending-news-summary">
                    {item.excerpt || item.description}
                  </p>
                </div>
              </article>
            </Link>
          ))}
          
          {/* Tombol Load More hanya muncul kalau masih ada data sisa */}
          {visibleCount < allNewsData.length && (
            <div className="load-more-wrapper">
              <button className="load-more-btn" onClick={handleLoadMore}>
                Load More
              </button>
            </div>
          )}
        </main>

      </div>
    </div>
  );
}