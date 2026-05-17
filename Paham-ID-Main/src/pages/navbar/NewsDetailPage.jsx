import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PopularSidebar from "../../components/news/PopularSidebar";
import SidebarMore from "../../components/news/SidebarMore";
import AuthSidebar from "../../components/auth/AuthSidebar";
import CommentSection from "../../components/news/CommentSection";
import { allNewsData } from "../../data/dummyNews";
import "../../styles/articleDetail.css";

export default function NewsDetailPage() {
  const { id } = useParams();
  const [isFullArticle, setIsFullArticle] = useState(false);

  // id dari URL adalah string, data juga sudah string — cocok
  const article = allNewsData.find((item) => item.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsFullArticle(false); // Reset tombol 'View Full' ke posisi awal
  }, [id]);

  if (!article) return <div className="error-msg">Artikel Tidak Ditemukan</div>;

  return (
    <div className="article-detail-wrapper">
      <div className="container-custom">
        <main className="main-content">
          <article className="article-card">

            {/* Hero Image & Category Badge */}
            <div className="hero-section">
              <span className="floating-badge">{article.category}</span>
              <img src={article.image} alt={article.title} className="hero-img-full" />
            </div>

            {/* Headline */}
            <h1 className="article-title-main">{article.title}</h1>

            {/* Meta Penulis & Tanggal */}
            <div className="author-meta-row">
              <div className="author-info">
                <img
                  src={article.authorImage || "/img/author.png"}
                  alt={article.author}
                  className="author-avatar"
                />
                <div className="author-details">
                  <span className="author-name">{article.author}</span>
                  <span className="author-role">{article.role || "Jurnalis"}</span>
                </div>
              </div>
              <div className="article-date-meta">
                <span className="publish-date">{article.date}</span>
                <span className="read-summary-badge">{article.readTime}</span>
              </div>
            </div>

            {/* Konten Artikel */}
            <div className="article-content-body">
              <p className="summary-paragraph">{article.description}</p>

              {!isFullArticle ? (
                <div className="view-full-section">
                  <button
                    className="btn-view-full-article"
                    onClick={() => setIsFullArticle(true)}
                  >
                    VIEW FULL ARTICLE
                  </button>
                </div>
              ) : (
                <div className="full-text-animation">
                  <p>{article.summary}</p>
                  <p>{article.content || "Konten lengkap artikel tersedia untuk dibaca lebih lanjut..."}</p>
                </div>
              )}
            </div>

            {/* Bar Reaksi */}
            <div className="article-footer-interaction">
              <div className="reactions-pill-group">
                <span className="react-label">REACTIONS:</span>
                {article.reactions && (
                  <>
                    <div className="pill-item">👏 {article.reactions.clap}</div>
                    <div className="pill-item">💡 {article.reactions.light}</div>
                    <div className="pill-item">🤔 {article.reactions.think ?? article.reactions.idea ?? 0}</div>
                    <div className="pill-item">❤️ {article.reactions.heart ?? 0}</div>
                  </>
                )}
              </div>
            </div>

            {/* Comment Section */}
            <CommentSection articleId={article.id} />

          </article>
        </main>

        <aside className="sidebar">
          <PopularSidebar />
          <AuthSidebar />
          <SidebarMore category={article.category} currentId={article.id} />
        </aside>
      </div>
    </div>
  );
}