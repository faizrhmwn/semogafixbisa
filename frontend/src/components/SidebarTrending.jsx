import React, { useState } from "react";
import { Link } from "react-router-dom";
import { allNewsData } from "../data/dummyNews";

export default function SidebarTrending() {
  const [popularNews, setPopularNews] = useState(allNewsData);

  const handleRead = (id) => {
    setPopularNews((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, reads: item.reads + 1 } : item
      )
    );
  };

  return (
    <aside className="trending-sidebar">
      {/* Sering Dibaca */}
      <div className="sidebar-section popular-box">
        <h4 className="sidebar-title">SERING DIBACA</h4>
        <div className="popular-list">
          {popularNews.map((news) => (
            <div
              key={news.id}
              className="popular-item"
              onClick={() => handleRead(news.id)}
              style={{ cursor: "pointer" }}
            >
              <div className="pop-circle"></div>
              <div className="pop-info">
                <span className="reads">
                  {news.reads >= 1000
                    ? `${(news.reads / 1000).toFixed(1)}K`
                    : news.reads}{" "}
                  READS
                </span>
                <Link
                  to={`/news/${news.id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <p>{news.title}</p>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stay Connected */}
      <div className="sidebar-section social-box">
        <h4 className="sidebar-title">STAY CONNECTED</h4>
        <div className="social-icons" style={{ display: "flex", gap: "15px", marginTop: "15px" }}>
          <div className="icon-item">
            <img src="/img/mdi_at.png" alt="At" width={24} height={24} />
          </div>
          <div className="icon-item">
            <img src="/img/ri_rss-fill.png" alt="RSS" width={24} height={24} />
          </div>
          <div className="icon-item">
            <img src="/img/share.png" alt="Share" width={24} height={24} />
          </div>
          <div className="icon-item">
            <img src="/img/comment.png" alt="Chat" width={24} height={24} />
          </div>
        </div>
      </div>
    </aside>
  );
}