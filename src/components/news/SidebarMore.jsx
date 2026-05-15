import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import PopularSidebar from "./PopularSidebar";
import AuthSidebar from "../auth/AuthSidebar";
import CommentSection from "./CommentSection";
import { allNewsData } from "../../data/dummyNews";
import "../../styles/articleDetail.css";

// --- KOMPONEN SIDEBAR MORE (Disederhanakan & Disatukan) ---
function SidebarMore({ category, currentId }) {
  // Filter berita dengan kategori yang sama, tapi jangan tampilkan berita yang sedang dibaca
  const relatedNews = allNewsData
    .filter((item) => item.category === category && item.id !== currentId)
    .slice(0, 3);

  return (
    <div className="sidebar-section more-from">
      <h4 className="sidebar-title">
        <span className="title-dash"></span> MORE FROM {category}
      </h4>
      <div className="more-list">
        {relatedNews.map((item) => (
          <div key={item.id} className="more-item">
            <Link to={`/news/${item.id}`} className="more-link-wrapper">
              <img src={item.image} alt={item.title} className="more-thumb" />
              <div className="more-info">
                <h6 className="more-item-title">{item.title}</h6>
                <small className="more-item-date">{item.date}</small>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SidebarMore;