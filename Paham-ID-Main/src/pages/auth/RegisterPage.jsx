import React, { useState } from "react";
import { Link } from "react-router-dom";
import { User, AtSign, Mail, Lock, Eye, EyeOff } from "lucide-react";
import "../../styles/auth.css";

export default function RegisterPage() {
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <main className="register-page">
      <div className="register-bg-full" />

      <div className="register-container">
        {/* SISI KIRI: Tetap branding logo + tulisan gambar */}
        <div className="register-left-branding">
          <div className="branding-stack">
            <img 
              src="/img/logoregist.png" 
              alt="Paham.ID Logo" 
              className="logo-square-style" 
            />
            <img 
              src="/img/tulisanregist.png" 
              alt="Paham.ID Text" 
              className="branding-text-img" 
            />
          </div>
        </div>

        {/* SISI KANAN: Form dengan teks "Create Account" */}
        <div className="register-right-form">
          <div className="register-box">
            {/* Ganti gambar jadi teks biasa */}
            <h1 className="register-header-text">Create Account</h1>
            <p className="register-sub">Please fill the details below</p>

            <form className="form-content" onSubmit={(e) => e.preventDefault()}>
              <div className="input-field-group">
                <label>Full name <span className="req">*</span></label>
                <div className="input-icon-wrap">
                  <User size={18} className="icon-left" />
                  <input type="text" placeholder="Enter your full name" />
                </div>
              </div>

              <div className="input-field-group">
                <label>Username <span className="req">*</span></label>
                <div className="input-icon-wrap">
                  <AtSign size={18} className="icon-left" />
                  <input type="text" placeholder="Enter your username" />
                </div>
              </div>

              <div className="input-field-group">
                <label>Email <span className="req">*</span></label>
                <div className="input-icon-wrap">
                  <Mail size={18} className="icon-left" />
                  <input type="email" placeholder="Enter your email" />
                </div>
              </div>

              <div className="input-field-group">
                <label>Password <span className="req">*</span></label>
                <div className="input-icon-wrap">
                  <Lock size={18} className="icon-left" />
                  <input type={showPass ? "text" : "password"} placeholder="Create a password" />
                  <button type="button" className="eye-toggle" onClick={() => setShowPass(!showPass)}>
                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className="input-field-group">
                <label>Confirm Password <span className="req">*</span></label>
                <div className="input-icon-wrap">
                  <Lock size={18} className="icon-left" />
                  <input type={showConfirm ? "text" : "password"} placeholder="Confirm your password" />
                  <button type="button" className="eye-toggle" onClick={() => setShowConfirm(!showConfirm)}>
                    {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button type="submit" className="submit-btn-orange">Create Account</button>
            </form>

            <p className="login-footer">
              Already have an account? <Link to="/signin" className="signin-link">Sign In</Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}