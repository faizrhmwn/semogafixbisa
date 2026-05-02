"use client";
import { useState } from 'react';

export default function MainHeader({ 
  // Props untuk Main Box (Kiri)
  mainCategory = "SPECIAL REPORT", 
  mainTitle = "ARSITEKTUR TERBARU KOTA SEMARANG", 
  mainExcerpt = "Semarang kini punya wajah baru yang mantap dan bergizi...", 
  mainInitialRead = 12,
  mainAuthor = "JOKO ANWAR",
  
  // Props untuk Side Box Top (Kanan Atas)
  sideTopCategory = "TECHNOLOGY",
  sideTopTitle = "The Analog Renaissance",
  
  // Props untuk Side Box Bottom (Kanan Bawah)
  sideBottomCategory = "CULTURE",
  sideBottomTitle = "A Minimalist Identity"
}) {
  const [readCount, setReadCount] = useState(mainInitialRead);

  return (
    <section className="header-container">
      <div className="bento-grid">
        {/* KOLOM KIRI UTAMA */}
        <div 
          className="bento-main" 
          style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.85)), url('/images/semarang.jpg')" }}
        >
          <div className="bento-overlay">
            <span className="cat-label-special">{mainCategory}</span>
            <h1 className="heavitas-font">{mainTitle}</h1>
            <p>{mainExcerpt}</p>
            <div className="bento-footer">
               <button 
                 className="btn-read" 
                 onClick={() => setReadCount(prev => prev + 1)}
               >
                 Baca Selengkapnya
               </button>
               <span className="meta-info">{readCount} MIN READ • BY {mainAuthor}</span>
            </div>
          </div>
        </div>

        {/* KOLOM KANAN (BENTO SIDE) */}
        <div className="bento-side">
          {/* Kotak Atas */}
          <div className="bento-small side-top">
            <span className="cat-label-secondary">{sideTopCategory}</span>
            <h3>{sideTopTitle}</h3>
          </div>
          
          {/* Kotak Bawah */}
          <div className="bento-small side-bottom">
            <span className="cat-label-secondary">{sideBottomCategory}</span>
            <h3>{sideBottomTitle}</h3>
          </div>
        </div>
      </div>
    </section>
  );
}