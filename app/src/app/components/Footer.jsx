"use client";
import React from "react";
import { usePathname } from "next/navigation";
import '@/app/styles/footer.css';

const Footer = () => {
  const pathname = usePathname();
  if (pathname?.toLowerCase().includes("register")) return null;

  return (
    <footer className="footer-container-custom">
      <div className="footer-content-wrapper">
        <div className="footer-logo-box">
          <img
            src="/img/logoregist.png"
            className="footer-icon-final"
            alt="Icon"
          />
          <img
            src="/img/Group 2.png"
            className="footer-text-final"
            alt="Paham.ID"
          />
        </div>

        <div className="footer-links-row">
          <a href="/about">ABOUT US</a>
          <a href="/privacy">PRIVACY POLICY</a>
          <a href="/contact">CONTACT</a>
        </div>

        <p className="footer-copyright-text">
          © 2026 THE EDITORIAL AUTHORITY. ALL RIGHTS RESERVED.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
