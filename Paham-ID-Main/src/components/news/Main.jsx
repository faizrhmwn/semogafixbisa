import React from "react";
import { Link } from "react-router-dom";
import { allNewsData } from "../../data/dummyNews";
// CSS yang sebelumnya tidak diimport — ini penyebab tampilan MainTrending rusak
import "../../styles/mainTrending.css";

export default function Main() {
  const mainArticle = allNewsData[0];
  const sideTopArticle = allNewsData[1];
  const sideBottomArticle = allNewsData[2];

  if (!mainArticle) return null;

  return (
    <section className="header-container">
      <div className="bento-grid">

        {/* KOLOM KIRI UTAMA (Berita #1) */}
        <Link to={`/news/${mainArticle.id}`} className="bento-link">
          <div
            className="bento-main"
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.85)), url('${mainArticle.image}')`,
            }}
          >
            <div className="bento-overlay">
              <span className="cat-label-special">{mainArticle.category}</span>
              <h1 className="heavitas-font">{mainArticle.title}</h1>
              <p>{mainArticle.excerpt || mainArticle.description}</p>
              <div className="bento-footer">
                <button className="btn-read">Baca Selengkapnya</button>
                <span className="meta-info">
                  {mainArticle.readTime} • BY {mainArticle.author.toUpperCase()}
                </span>
              </div>
            </div>
          </div>
        </Link>

        {/* KOLOM KANAN (Bento Side) */}
        <div className="bento-side">

          {sideTopArticle && (
            <Link to={`/news/${sideTopArticle.id}`} className="bento-small-link">
              <div
                className="bento-small side-top"
                style={{
                  backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('${sideTopArticle.image}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <span className="cat-label-secondary">{sideTopArticle.category}</span>
                <h3>{sideTopArticle.title}</h3>
              </div>
            </Link>
          )}

          {sideBottomArticle && (
            <Link to={`/news/${sideBottomArticle.id}`} className="bento-small-link">
              <div
                className="bento-small side-bottom"
                style={{
                  backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('${sideBottomArticle.image}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <span className="cat-label-secondary">{sideBottomArticle.category}</span>
                <h3>{sideBottomArticle.title}</h3>
              </div>
            </Link>
          )}

        </div>
      </div>
    </section>
  );
}