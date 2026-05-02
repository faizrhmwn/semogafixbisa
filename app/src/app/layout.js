import "./styles/globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children} {/* Ini adalah tempat page.js dirender */}
        <Footer />
      </body>
    </html>
  );
}