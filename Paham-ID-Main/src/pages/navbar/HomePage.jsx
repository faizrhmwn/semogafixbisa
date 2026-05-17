import React from "react";
import MainTrending from "../../components/news/MainTrending";
import Main from "../../components/news/Main";
import Newsletter from "../../components/Newsletter";
import "../../styles/globals.css";

export default function HomePage() {
  return (
    <main className="main-wrapper">
      <section className="bento-section">
        <Main />
      </section>
      <section className="list-section">
        <MainTrending />
        <Newsletter />
      </section>
    </main>
  );
}