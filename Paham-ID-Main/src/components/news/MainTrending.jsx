import React from "react";
import { Link } from "react-router-dom";
import TrendingCard from "./TrendingCard";
import SidebarTrending from "./SidebarTrending";
import { allNewsData } from "../../data/dummyNews";
import "../../styles/mainTrending.css";

export default function MainTrending() {
  const trendingNews = allNewsData.slice(0, 4);

  return (
    <div className="main-wrapper">
      <section className="trending-layout">
        <div className="trending-left">
          <div className="trending-header">
            <h2 className="serif-title italic">Trending News</h2>
            <div className="header-divider"></div>
            <Link to="/trending" className="view-all-link">
              <span className="view-all">VIEW ALL</span>
            </Link>
          </div>

          <div className="news-grid">
            {trendingNews.map((news) => (
              <Link to={`/news/${news.id}`} key={news.id} className="card-anchor">
                <TrendingCard news={news} />
              </Link>
            ))}
          </div>
        </div>

        <div className="trending-right">
          <SidebarTrending />
        </div>
      </section>
    </div>
  );
}