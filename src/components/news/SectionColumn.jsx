import ArticleCard from "./ArticleCard";

export default function SectionColumn({
  section,
  articles,
  onArticleClick,
  onSeeAll,
}) {
  return (
    <div className="section-column">
      <div className="section-column-header">
        <h3 className="section-column-title">
          {section.charAt(0) + section.slice(1).toLowerCase()}
        </h3>
        <button className="see-all-btn" onClick={onSeeAll}>
          LIHAT SEMUA
        </button>
      </div>
      {articles.map((article) => (
        <ArticleCard
          key={article.id}
          article={article}
          onClick={() => onArticleClick(article.id)}
        />
      ))}
    </div>
  );
}
