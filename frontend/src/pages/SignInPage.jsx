import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import "../styles/auth.css";

export default function SignInPage() {
  const [showPass, setShowPass] = useState(false);

  return (
    <main className="signin-page">
      <div className="signin-bg-container" />

      <div className="signin-form-wrapper">
        {/* Kontainer logo dengan class baru untuk styling bulat */}
        <div className="signin-logo-container">
          <img 
            src="/img/logoregist.png" 
            alt="Paham.ID" 
            className="signin-logo-circle-custom" 
          />
        </div>

        <h1 className="signin-title">Sign In</h1>

        <form className="signin-form" onSubmit={(e) => e.preventDefault()}>
          <div className="signin-input-group">
            <label>Email <span className="req">*</span></label>
            <div className="signin-input-wrap">
              <Mail size={18} className="signin-icon" />
              <input type="email" placeholder="Enter your email or Usn" />
            </div>
          </div>

          <div className="signin-input-group">
            <label>Password <span className="req">*</span></label>
            <div className="signin-input-wrap">
              <Lock size={18} className="signin-icon" />
              <input
                type={showPass ? "text" : "password"}
                placeholder="Enter your password"
              />
              <button
                type="button"
                className="signin-eye-btn"
                onClick={() => setShowPass(v => !v)}
              >
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button type="submit" className="signin-btn">Sign In</button>
        </form>

        <p className="signin-footer">
          Don't have an account? <Link to="/register">Register Now</Link>
        </p>
      </div>
    </main>
  );
}