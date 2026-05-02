"use client";
import React from 'react';
import Link from 'next/link';
import { Mail, Lock } from 'lucide-react';

export default function LoginPage() {
  return (
    <main className="auth-clean-page login-final-container">
      <div className="login-bg-layer"></div>

      <div className="login-content-wrapper">
        {/* LOGO AREA */}
        <div className="login-logo-img-wrapper">
          <img 
            src="/img/logosignin.png" 
            alt="Logo Paham.ID" 
            className="login-custom-logo" 
          />
        </div>

        <h1 className="login-title">Sign In</h1>

        <form className="login-form">
          <div className="login-input-group">
            <label>Email / Username <span className="reg-star">*</span></label>
            <div className="login-input-wrapper">
              <Mail size={20} className="login-icon" />
              <input type="text" placeholder="Enter your email or Usn" required />
            </div>
          </div>

          <div className="login-input-group">
            <label>Password <span className="reg-star">*</span></label>
            <div className="login-input-wrapper">
              <Lock size={20} className="login-icon" />
              <input type="password" placeholder="Enter your password" required />
            </div>
          </div>

          <button type="submit" className="login-btn-submit">
            Sign In
          </button>
        </form>

        <p className="login-footer-text">
          Don’t have an account? <Link href="/register">Register Now</Link>
        </p>
      </div>
    </main>
  );
}