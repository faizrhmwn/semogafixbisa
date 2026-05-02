export default function TrendingCard({ news }) {
  return (
    <article className="trending-card">
      <div className="trending-img-wrapper">
        <img src={news.image} alt={news.title} />
      </div>

      {/* Gunakan class pink di sini */}
      <span className="cat-pink">{news.category}</span>

      <h3>{news.title}</h3>

      <p>{news.excerpt}</p>

      <div className="meta-footer">
        <span className="bold-meta">{news.readTime}</span>
        <span className="dot-divider">•</span>
        <span>{news.date}</span>
      </div>
    </article>
  );
}
