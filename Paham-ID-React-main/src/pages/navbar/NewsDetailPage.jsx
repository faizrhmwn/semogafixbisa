import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { allNewsData, dummyComments } from "../../data/dummyNews";
import "../../styles/articleDetail.css";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80";

const FALLBACK_AVATAR =
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80";

function getImage(article) {
  return article?.image || article?.thumbnail || article?.cover || FALLBACK_IMAGE;
}

function getText(value, fallback) {
  return value && String(value).trim() !== "" ? value : fallback;
}

function PopularSidebar({ currentId }) {
  const popularItems = allNewsData
    .filter((item) => String(item.id) !== String(currentId))
    .slice(0, 3);

  return (
    <section className="detail-sidebar-box popular-today-box">
      <h4 className="detail-sidebar-title">
        <span className="sidebar-title-line" />
        POPULAR TODAY
      </h4>

      <div className="popular-detail-list">
        {popularItems.map((item) => (
          <Link
            key={item.id}
            to={`/news/${item.id}`}
            className="popular-detail-item"
          >
            <span className="popular-detail-category">
              {item.category || "Environment"}
            </span>

            <h5>{item.title}</h5>

            <small>{item.readTime || "2 MIN READ"}</small>
          </Link>
        ))}
      </div>
    </section>
  );
}

function AuthSidebar() {
  return (
    <section className="detail-auth-sidebar">
      <h3>Menyelam Lebih Dalam di Paham.id?</h3>

      <p>Dapatkan pemberitahuan langsung setiap berita baru</p>

      <Link to="/register" className="detail-auth-sidebar-btn">
        DAFTAR SEKARANG
      </Link>
    </section>
  );
}

function SidebarMore({ category, currentId }) {
  const relatedNews = allNewsData
    .filter(
      (item) =>
        String(item.id) !== String(currentId) &&
        item.category?.toLowerCase() === category?.toLowerCase()
    )
    .slice(0, 3);

  const fallbackNews = allNewsData
    .filter((item) => String(item.id) !== String(currentId))
    .slice(0, 3);

  const data = relatedNews.length > 0 ? relatedNews : fallbackNews;

  return (
    <section className="detail-more-section">
      <h4 className="detail-more-label">
        MORE FROM {category || "ENVIRONMENT"}
      </h4>

      <div className="detail-more-list">
        {data.map((item) => (
          <Link
            key={item.id}
            to={`/news/${item.id}`}
            className="detail-more-item"
          >
            <img
              src={getImage(item)}
              alt={item.title}
              onError={(event) => {
                event.currentTarget.src = FALLBACK_IMAGE;
              }}
            />

            <div>
              <h5>{item.title}</h5>
              <span>{item.date || "12 Januari 2026"}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function AuthFooter() {
  return (
    <div className="detail-auth-footer">
      <h3>Want to join the conversation?</h3>

      <div className="detail-auth-footer-actions">
        <Link to="/signin" className="detail-auth-login">
          Login
        </Link>

        <Link to="/register" className="detail-auth-register">
          Register
        </Link>
      </div>
    </div>
  );
}

function CommentSection({ isLoggedIn }) {
  const comments = Array.isArray(dummyComments) ? dummyComments : [];

  return (
    <section className="comment-section">
      <div className="comment-header-row">
        <h2 className="comment-title">Komentar</h2>

        <span className="comment-badge">{comments.length} Comments</span>
      </div>

      <div className="comment-input-card">
        <div className="comment-input-top">
          <img
            src="/img/author.png"
            className="comment-avatar"
            alt="User"
            onError={(event) => {
              event.currentTarget.src = FALLBACK_AVATAR;
            }}
          />

          <textarea
            className="comment-textarea"
            placeholder="Add to the conversation..."
            disabled={!isLoggedIn}
          />
        </div>

        <div className="comment-input-bottom">
          {isLoggedIn ? (
            <button type="button" className="comment-post-btn">
              Post Comment
            </button>
          ) : (
            <Link to="/signin" className="comment-post-btn">
              Login to Comment
            </Link>
          )}
        </div>
      </div>

      <div className="comments-list">
        {comments.map((comment) => (
          <div key={comment.id} className="comment-item-row">
            <img
              src={comment.avatar || "/img/author.png"}
              className="comment-avatar"
              alt={comment.author || "User"}
              onError={(event) => {
                event.currentTarget.src = FALLBACK_AVATAR;
              }}
            />

            <div className="comment-bubble">
              <div className="comment-meta">
                <strong>{comment.author || "User"}</strong>
                <span>•</span>
                <span>{comment.time || "2 hours ago"}</span>
              </div>

              <p>{comment.text || "Komentar belum tersedia."}</p>
            </div>
          </div>
        ))}
      </div>

      {!isLoggedIn && <AuthFooter />}
    </section>
  );
}

export default function NewsDetailPage() {
  const { id } = useParams();
  const [isFullArticle, setIsFullArticle] = useState(false);

  /*
    true  = sudah login, AuthSidebar & AuthFooter hilang
    false = belum login, AuthSidebar & AuthFooter muncul
  */
  const [isLoggedIn] = useState(true);

  const article = useMemo(() => {
    return allNewsData.find((item) => String(item.id) === String(id));
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsFullArticle(false);
  }, [id]);

  if (!article) {
    return (
      <main className="article-detail-wrapper">
        <div className="article-error-box">Artikel Tidak Ditemukan</div>
      </main>
    );
  }

  const reactions = article.reactions || {};

  return (
    <main className="article-detail-wrapper">
      <div className="article-detail-container">
        <section className="article-main-column">
          <article className="article-detail-card">
            <div className="article-hero-box">
              <span className="article-floating-badge">
                {article.category || "Environment"}
              </span>

              <img
                src={getImage(article)}
                alt={article.title}
                className="article-hero-image"
                onError={(event) => {
                  event.currentTarget.src = FALLBACK_IMAGE;
                }}
              />
            </div>

            <h1 className="article-detail-title">
              {getText(
                article.title,
                "Heningnya Udara Hutan Kalimantan Timur Menarik Minat Investor BUMS"
              )}
            </h1>

            <div className="article-meta-row">
              <div className="article-author-box">
                <img
                  src={article.authorImage || "/img/author.png"}
                  alt={article.author || "Author"}
                  className="article-author-avatar"
                  onError={(event) => {
                    event.currentTarget.src = FALLBACK_AVATAR;
                  }}
                />

                <div>
                  <h4 className="article-author-name">
                    {article.author || "Redaksi Paham.ID"}
                  </h4>

                  <p className="article-author-role">
                    {article.role || "Jurnalisme Junior"}
                  </p>
                </div>
              </div>

              <div className="article-date-box">
                <span className="article-date">
                  {article.date || "12 April 2026"}
                </span>

                <span className="article-read-summary">
                  {article.readTime || "2 MIN READ SUMMARY"}
                </span>
              </div>
            </div>

            <div className="article-body">
              <p>
                {article.description ||
                  "Hutan Kalimantan Timur kembali menarik perhatian, bukan hanya karena keanekaragaman hayatinya, tetapi juga kualitas udaranya yang masih alami. Suasana hening dan udara bersih di kawasan ini mulai dilirik oleh investor sebagai peluang baru di sektor ekowisata."}
              </p>

              {isFullArticle && (
                <div className="article-full-text">
                  <p>
                    {article.summary ||
                      "Sejumlah rencana pengembangan mulai bermunculan, seperti pembangunan eco-lodge, jalur trekking terbatas, hingga program edukasi lingkungan. Konsepnya menekankan wisata berkelanjutan, memberi pengalaman dekat dengan alam tanpa merusak ekosistem."}
                  </p>

                  <p>
                    {article.content ||
                      "Pemerintah daerah menyatakan dukungan dengan syarat adanya keseimbangan antara ekonomi dan pelestarian. Kolaborasi antara investor, pemerintah, dan masyarakat lokal dinilai menjadi kunci. Fenomena ini menunjukkan bahwa hutan bukan hanya aset alam, tetapi juga peluang selama dikelola dengan bijak."}
                  </p>
                </div>
              )}

              <div className="article-view-full-wrap">
                <button
                  type="button"
                  className="article-view-full-btn"
                  onClick={() => setIsFullArticle((prev) => !prev)}
                >
                  {isFullArticle ? "SHOW SUMMARY" : "VIEW FULL ARTICLE"}
                </button>
              </div>
            </div>

            <div className="article-interaction-section">
              <div className="article-reactions-row">
                <span className="article-reaction-label">REACTIONS:</span>

                <button type="button" className="article-reaction-pill">
                  👏 {reactions.clap || 142}
                </button>

                <button type="button" className="article-reaction-pill">
                  💡 {reactions.light || 86}
                </button>

                <button type="button" className="article-reaction-pill">
                  🤔 {reactions.think || reactions.idea || 54}
                </button>

                <button type="button" className="article-reaction-pill">
                  💙 {reactions.bookmark || 12}
                </button>

                <button type="button" className="article-reaction-pill">
                  ❤️ {reactions.heart || 210}
                </button>
              </div>
            </div>

            <div className="article-share-section">
              <span className="article-share-label">SHARE THIS STORY:</span>

              <div className="article-share-actions">
                <button type="button" className="article-icon-round">
                  <img src="/img/share.png" alt="Share" />
                </button>

                <button type="button" className="article-icon-round">
                  <img src="/img/simpan.png" alt="Save" />
                </button>
              </div>
            </div>

            <CommentSection isLoggedIn={isLoggedIn} />
          </article>
        </section>

        <aside className="article-sidebar-column">
          <PopularSidebar currentId={article.id} />

          {!isLoggedIn && <AuthSidebar />}

          <SidebarMore category={article.category} currentId={article.id} />
        </aside>
      </div>
    </main>
  );
}