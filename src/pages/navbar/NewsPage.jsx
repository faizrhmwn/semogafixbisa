import { useState } from "react";
import { Link } from "react-router-dom"; // Digunakan untuk navigasi ke detail
import { allNewsData } from "../../data/dummyNews";
import "../../styles/news.css";

const categories = ["ALL", "ENVIRONMENT", "POLITICS", "TECHNOLOGY", "SOCIAL", "ECONOMICS", "EDUCATION"];

export default function NewsPage() {
  const [activeCategory, setActiveCategory] = useState("ALL");
  const isAll = activeCategory === "ALL";

  const filteredData = isAll
    ? allNewsData
    : allNewsData.filter(item => item.category.toUpperCase() === activeCategory);

  return (
    <div className="news-page-wrapper">
      {/* --- CATEGORY BAR (Full Width) --- */}
      <nav className="category-nav-wrapper">
        <div className="category-nav-content">
          <span className="sections-label">SECTIONS:</span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`category-link ${activeCategory === cat ? "active" : ""}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </nav>

      <main className="news-container">
        {isAll ? (
          /* --- TAMPILAN ALL (Grid & Headline) --- */
          <>
            <section className="featured-article">
              {/* Link membungkus gambar dan konten agar bisa diklik ke detail */}
              <Link to={`/news/${filteredData[0]?.id}`} className="featured-link-wrapper">
                <div className="featured-image-wrapper">
                  <img src={filteredData[0]?.image} alt="Headline" className="headline-img-large" />
                </div>
                <div className="featured-content">
                  <span className="category-tag">{filteredData[0]?.category}</span>
                  <h1>{filteredData[0]?.title}</h1>
                  <p>{filteredData[0]?.description}</p>
                  <div className="author-meta">
                    <img src={filteredData[0]?.authorImage} alt="Author" className="author-avatar" />
                    <div className="meta-text">
                      <strong className="author-name">{filteredData[0]?.author}</strong>
                      <p className="post-date">{filteredData[0]?.date} • {filteredData[0]?.readTime}</p>
                    </div>
                  </div>
                </div>
              </Link>
            </section>

            <div className="articles-grid">
              {filteredData.slice(1).map((article) => (
                <article key={article.id} className="article-card">
                  <div className="card-top">
                    <span className="card-cat">{article.category}</span>
                    <span className="lihat-semua" onClick={() => setActiveCategory(article.category.toUpperCase())}>
                      LIHAT SEMUA
                    </span>
                  </div>
                  {/* Navigasi ke detail via gambar dan judul */}
                  <Link to={`/news/${article.id}`}>
                    <img src={article.image} alt={article.title} className="article-img-standard" />
                    <h3 className="article-card-title">{article.title}</h3>
                  </Link>
                  <p className="article-card-desc">{article.description}</p>
                </article>
              ))}
            </div>
          </>
        ) : (
          /* --- TAMPILAN KATEGORI (Vertical List) --- */
          <div className="news-list-vertical">
            {filteredData.map((article) => (
              <div key={article.id} className="category-list-item">
                <Link to={`/news/${article.id}`} className="list-item-link">
                  <div className="list-image-container">
                    <img src={article.image} alt={article.title} className="article-img-standard" />
                  </div>
                  <div className="list-content-container">
                    <span className="list-date">{article.date}</span>
                    <h2 className="list-title">{article.title}</h2>
                    <p className="list-desc">{article.description}</p>
                    <div className="list-footer-meta">
                      <span className="author-name">👤 {article.author}</span>
                      <span className="read-time">🕒 {article.readTime}</span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
            
            {/* Pagination Sejajar Kanan */}
            <div className="pagination-container">
                <button className="page-number active">1</button>
                <button className="page-number">2</button>
                <button className="page-number">3</button>
                <span className="page-dots">...</span>
                <button className="btn-next">BERIKUTNYA →</button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}