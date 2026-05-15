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
import Dashboard from "./pages/dashboard/DashboardPage";
import MyArticles from "./pages/dashboard/MyArticle";
import EditArticle, { RejectedView } from "./pages/dashboard/EditArticle";
import WriteNews from "./pages/dashboard/WriteNews";
import { userData, userArticles } from "./data/dummyNews";

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
        <Route path="/dashboard" element={<DashboardRoute />} />
        <Route path="/my-articles" element={<MyArticles />} />
        <Route path="/edit-article/:id" element={<EditArticleRoute />} />
        <Route path="/write-news" element={<WriteNews />} />
        <Route path="/write" element={<WriteNews />} />
      </Routes>
      {!hideFooter && <Footer />}
    </>
  );
}

function DashboardRoute() {
  const navigate = useNavigate();

  const stats = {
    totalArticles: userData.totalArticles,
    likes: userData.totalLikes,
    comments: userData.totalComments,
    drafts: userArticles.filter(
      (a) => String(a.status || "").toLowerCase() === "draft",
    ).length,
    pending: userArticles.filter(
      (a) => String(a.status || "").toLowerCase() === "pending",
    ).length,
    published: userArticles.filter(
      (a) => String(a.status || "").toLowerCase() === "published",
    ).length,
  };

  return (
    <Dashboard
      role="user"
      user={userData}
      articles={userArticles}
      stats={stats}
      onCreateArticle={() => navigate("/write-news")}
      onViewAll={() => navigate("/my-articles")}
      onEditArticle={(article) =>
        navigate(`/edit-article/${article.id}`, { state: { article } })
      }
      onDeleteArticle={(article) => {
        console.log("Delete article", article.id);
      }}
      onLogout={() => navigate("/")}
    />
  );
}

function EditArticleRoute() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const article =
    location.state?.article || userArticles.find((a) => a.id === params.id);
  const viewRejected =
    location.state?.viewRejected === true ||
    String(article?.status || "").toLowerCase() === "rejected";

  if (!article) {
    return <Navigate to="/my-articles" replace />;
  }

  const showToast = (message) => {
    window.alert(message);
  };

  const handleSave = (updatedArticle) => {
    console.log("Saved article", updatedArticle);
    showToast("Artikel Berhasil Diperbarui", "updated");
    navigate("/my-articles");
  };

  const handleSubmit = (updatedArticle) => {
    console.log("Submitted article", updatedArticle);
    showToast("Artikel Berhasil Dikirim", "submitted");
    navigate("/my-articles");
  };

  const handleEditRejected = (art) => {
    navigate(`/edit-article/${art.id}`, { state: { article: art } });
  };

  const handleDeleteRejected = (art) => {
    console.log("Delete rejected article", art);
    navigate("/my-articles");
  };

  if (viewRejected) {
    return (
      <RejectedView
        article={article}
        onEdit={handleEditRejected}
        onDelete={handleDeleteRejected}
        onBack={() => navigate("/my-articles")}
      />
    );
  }

  return (
    <EditArticle
      article={article}
      onBack={() => navigate("/my-articles")}
      onSave={handleSave}
      onSubmit={handleSubmit}
      showToast={showToast}
    />
  );
}

export default App;
