import React from 'react';
import Image from 'next/image';

const NewsCard = ({ image, category, title, desc, time }) => {
  return (
    <div className="news-card">
      {image && (
        <div className="card-image">
          <Image src={image} alt={title} width={400} height={250} style={{ objectFit: 'cover' }} />
        </div>
      )}
      <div className="card-body">
        <span className="card-category">{category}</span>
        <h3 className="card-title">{title}</h3>
        <p className="card-text">{desc}</p>
        <span className="card-time">{time}</span>
      </div>
    </div>
  );
};

export default NewsCard;