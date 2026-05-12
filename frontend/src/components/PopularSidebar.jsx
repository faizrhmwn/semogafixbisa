import React from "react";
import { Link } from "react-router-dom";
import { popularData } from "../data/dummyNews";

export default function PopularSidebar() {
  return (
    <div className="sidebar-section popular-today">
      <h4 className="sidebar-title">
        <span className="title-dash"></span> POPULAR TODAY
      </h4>
      <div className="popular-list">
        {popularData.map((item) => (
          <div key={item.id} className="popular-item">
            <Link to={`/news/${item.id}`} style={{ textDecoration: "none", color: "inherit" }}>
              <span className="popular-category">{item.category}</span>
              <h5 className="popular-item-title">{item.title}</h5>
              <small className="popular-read-time">{item.readTime}</small>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}