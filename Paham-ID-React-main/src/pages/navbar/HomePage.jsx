import React from "react";
import Main from "../../components/news/Main";
import MainTrending from "../../components/news/MainTrending";
import Newsletter from "../../components/Newsletter";
import "../../styles/mainTrending.css";

export default function HomePage() {
  return (
    <main className="homepage">
      <Main />

      <section className="homepage-content">
        <MainTrending />
      </section>

      <section className="homepage-newsletter">
        <Newsletter />
      </section>
    </main>
  );
}