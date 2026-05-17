import React from "react";
import { dummyComments } from "../../data/dummyNews";
import AuthFooter from "../auth/AuthFooter";

export default function CommentSection({ articleId }) {
  return (
    <section className="comment-section">
      {/* Share Section */}
      <div className="share-story-bar">
        <span className="share-label">SHARE THIS STORY:</span>
        <div className="share-actions">
          <button className="icon-btn-round">
            <img src="/img/share.png" alt="Share" />
          </button>
          <button className="icon-btn-round">
            <img src="/img/simpan.png" alt="Simpan" />
          </button>
        </div>
      </div>

      {/* Header Komentar */}
      <div className="comment-header-row">
        <h2 className="comment-title">Komentar</h2>
        <span className="comment-badge">{dummyComments.length} Comments</span>
      </div>

      {/* Input Utama */}
      <div className="comment-input-card">
        <div className="input-row-top">
          <img src="/img/author.png" className="avatar-small" alt="User" />
          <div className="input-field-pill">
            <textarea placeholder="Add to the conversation..."></textarea>
          </div>
        </div>
        <div className="input-row-bottom">
          <button className="btn-post-comment">Post Comment</button>
        </div>
      </div>

      {/* List Komentar */}
      <div className="comments-list">
        {dummyComments.map((comment) => (
          <div key={comment.id} className="comment-item-row">
            <img
              src={comment.avatar || "/img/author.png"}
              className="avatar-small"
              alt={comment.author}
            />
            <div className="comment-capsule">
              <div className="comment-meta-info">
                <span className="comment-user-name">{comment.author}</span>
                <span className="meta-dot">•</span>
                {/* Pakai field `time` sesuai dummyComments */}
                <span className="comment-time-text">{comment.time}</span>
              </div>
              <p className="comment-body-text">{comment.text}</p>
            </div>
          </div>
        ))}
      </div>

      <AuthFooter />
    </section>
  );
}