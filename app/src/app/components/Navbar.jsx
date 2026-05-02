'use client'; 

import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import '@/app/styles/navbar.css';

const Navbar = () => {
  const pathname = usePathname();
  const currentPath = pathname.toLowerCase();
  const isAuthPage = currentPath === '/login' || currentPath === '/register';

  if (isAuthPage) {
    return null;
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        
        {/* LOGO */}
        <div className="navbar-logo">
          <div className="logo-icon">
            <img src="/img/Group2.png" className="logo-img" alt="Logo" />
          </div>
        </div>

        <ul className="navbar-menu">
        <li className={`menu-item ${currentPath === '/' ? 'active' : ''}`}>
          <Link href="/">Home</Link>
        </li>
        
        {/* Menu News sekarang bisa diklik */}
        <li className={`menu-item ${currentPath === '/news' ? 'active' : ''}`}>
          <Link href="/news">News</Link>
        </li>

        <li className={`menu-item ${currentPath === '/trending' ? 'active' : ''}`}>
          <Link href="/trending">Trending</Link>
        </li>

        <li className={`menu-item ${currentPath === '/saved' ? 'active' : ''}`}>
          <Link href="/saved">Saved</Link>
        </li>
      </ul>

        {/* ACTIONS (SEARCH & ICONS) */}
        <div className="navbar-actions">
          <div className="search-container">
            <input type="text" placeholder="Search..." className="search-input" />
            <button type="button" className="search-icon-wrapper" style={{ cursor: 'pointer', border: 'none', background: 'none', display: 'flex', alignItems: 'center' }}>
              <img src="/img/search.png" className="search-icon-img icon-black" alt="search" />
            </button>
          </div>

          <div className="icon-group">
            <button className="icon-btn">
              <img src="/img/notif.png" className="icon-img" alt="notif" />
            </button>

            <button className="icon-btn profile-btn">
              <img src="/img/acc.png" className="icon-img account-img" alt="account" />
            </button>
          </div>
        </div> {/* Penutup navbar-actions */}

      </div> {/* Penutup navbar-container */}
    </nav>
  );
};

export default Navbar;