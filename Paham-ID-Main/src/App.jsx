import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate,
  useParams,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import HomePage from "./pages/navbar/HomePage";
import NewsPage from "./pages/navbar/NewsPage";
import NewsDetailPage from "./pages/navbar/NewsDetailPage";
import TrendingPage from "./pages/navbar/TrendingPage";
import SignInPage from "./pages/auth/SignInPage";
import RegisterPage from "./pages/auth/RegisterPage";
import SavedPage from "./pages/navbar/SavedPage";
import ContactPage from "./pages/footer/ContactPage";
import AboutPage from "./pages/footer/AboutPage";
import PrivacyPages from "./pages/footer/PrivacyPages";
import NotificationPages from "./pages/navbar/NotificationPages";

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();
  const hideNavbar =
    location.pathname === "/dashboard" ||
    location.pathname === "/admin-dashboard" ||
    location.pathname === "/my-articles" ||
    location.pathname.startsWith("/edit-article") ||
    location.pathname === "/write-news" ||
    location.pathname === "/write" ||
    location.pathname === "/manage-news" ||
    location.pathname === "/pending" ||
    location.pathname === "/admin-activity";
  const hideFooter = hideNavbar;

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/news/:id" element={<NewsDetailPage />} />
        <Route path="/trending" element={<TrendingPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/saved" element={<SavedPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/privacy" element={<PrivacyPages />} />
        <Route path="/notifications" element={<NotificationPages />} />
      </Routes>
      {!hideFooter && <Footer />}
    </>
  );
}

export default App;
