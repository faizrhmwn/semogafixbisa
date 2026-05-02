"use client";
import React from 'react';
import Link from 'next/link';
import { Mail, Lock, User, KeyRound, UserCheck } from 'lucide-react'; 

export default function RegisterPage() {
  return (
    <div className="reg-final-container">
      <div className="reg-bg-layer"></div>

      <div className="reg-content-split">
        {/* Sisi Kiri */}
        <div className="reg-left-side">
          <div className="reg-logo-stack">
            <img src="/img/logoregist.png" alt="Paham.id Icon" className="reg-main-icon" />
            <img src="/img/tulisanregist.png" alt="Paham.ID" className="reg-main-text" />
          </div>
        </div>

        {/* Sisi Kanan */}
        <div className="reg-right-side">
          <div className="reg-form-container">
            <h1 className="reg-title">Create Account</h1>
            <p className="reg-subtitle">Please fill the details below</p>

            <form className="reg-actual-form">
              {/* Full Name */}
              <div className="reg-input-group">
                <label>Full name <span className="reg-star">*</span></label>
                <div className="reg-input-wrapper">
                  <User size={18} className="reg-icon" />
                  <input type="text" placeholder="Enter your full name" required />
                </div>
              </div>

              {/* Username (Komponen yang tadi ketinggalan) */}
              <div className="reg-input-group">
                <label>Username <span className="reg-star">*</span></label>
                <div className="reg-input-wrapper">
                  <UserCheck size={18} className="reg-icon" />
                  <input type="text" placeholder="Enter your username" required />
                </div>
              </div>

              {/* Email */}
              <div className="reg-input-group">
                <label>Email <span className="reg-star">*</span></label>
                <div className="reg-input-wrapper">
                  <Mail size={18} className="reg-icon" />
                  <input type="email" placeholder="Enter your email" required />
                </div>
              </div>

              {/* Password */}
              <div className="reg-input-group">
                <label>Password <span className="reg-star">*</span></label>
                <div className="reg-input-wrapper">
                  <Lock size={18} className="reg-icon" />
                  <input type="password" placeholder="Create a password" required />
                </div>
              </div>

              {/* Confirm Password */}
              <div className="reg-input-group">
                <label>Confirm Password <span className="reg-star">*</span></label>
                <div className="reg-input-wrapper">
                  <KeyRound size={18} className="reg-icon" />
                  <input type="password" placeholder="Confirm your password" required />
                </div>
              </div>

              <button type="submit" className="reg-btn-submit">
                Create Account
              </button>
            </form>

            <p className="reg-footer-link">
              Already have an account? <Link href="/signin">Sign In</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}