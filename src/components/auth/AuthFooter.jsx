import React from "react";
import { Link } from "react-router-dom";

export default function AuthFooter() {
  return (
    <div className="auth-footbar-container">
      <h3 className="auth-footbar-title">Want to join the conversation?</h3>
      <div className="auth-footbar-buttons">
        <Link to="/signin">
          <button className="btn-auth-login">Login</button>
        </Link>
        <Link to="/register">
          <button className="btn-auth-register">Register</button>
        </Link>
      </div>
    </div>
  );
}