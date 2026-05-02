export default function NewsPage() {
  const sections = [
    "ALL", "ENVIRONMENT", "POLITICS", "TECHNOLOGY", 
    "SOCIAL", "ECONOMICS", "EDUCATION"
  ];

  return (
    <div className="news-page-container">
      {/* Sections Bar */}
      <nav className="news-sections-bar">
        <span className="section-label">SECTIONS:</span>
        <div className="section-nav-list">
          {sections.map((item, index) => (
            <a 
              key={index} 
              href={`#${item.toLowerCase()}`} 
              className={`section-item ${item === "ALL" ? "active" : ""}`}
            >
              {item}
            </a>
          ))}
        </div>
      </nav>

      {/* Konten Utama Berita (Hero Section) */}
      <section className="hero-news-section">
        {/* Masukkan gambar perpustakaan dan tulisan Navigasi Arus Intelektual di sini */}
      </section>

      {/* Grid Berita di bawahnya */}
      <div className="news-grid-container">
        {/* Section Environment, Politics, dll */}
      </div>
    </div>
  );
}