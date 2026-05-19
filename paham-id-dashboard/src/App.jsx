import {
  BrowserRouter as Router,
  Navigate,
  Outlet,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

import Header from "./component/Header";
import Sidebar from "./component/Sidebar";

import Dashboard from "./pages/user/DashboardPage";
import EditArticle, { RejectedView } from "./pages/user/EditArticle";
import MyArticles from "./pages/user/MyArticle";
import WriteNews from "./pages/user/WriteNews";

import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import ManageNewsPage from "./pages/admin/ManageNewsPage";
import PendingApprovalPage from "./pages/admin/PendingApprovalPage";
import EditNews from "./pages/admin/EditNews";

import {
  INIT_ARTICLES,
  userArticles,
  userDashboardData,
} from "./data/dummyNews";

const adminUser = {
  name: "Ven",
  username: "@venanan",
  avatar: "",
};

const adminPathPrefixes = [
  "/admin",
  "/admin-dashboard",
  "/manage-news",
  "/pending",
  "/edit-news",
];

function DashboardLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const stateRole = String(location.state?.role || "").toLowerCase();

  const isAdminPath = adminPathPrefixes.some(
    (path) =>
      location.pathname === path || location.pathname.startsWith(`${path}/`),
  );

  const currentRole = stateRole === "admin" || isAdminPath ? "admin" : "user";

  const headerUser =
    currentRole === "admin" ? adminUser : userDashboardData.profile;

  const handleLogout = () => {
    navigate("/dashboard");
  };

  return (
    <div
      className="dashboard-app-container"
      style={{ minHeight: "100vh", background: "#f7f7f8" }}
    >
      <Header user={headerUser} />
      <Sidebar role={currentRole} onLogout={handleLogout} />
      <Outlet />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route element={<DashboardLayout />}>
          {/* User */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/my-articles" element={<MyArticles />} />
          <Route path="/edit-article/:id" element={<EditArticleRoute />} />
          <Route path="/write" element={<WriteNews />} />
          <Route path="/write-news" element={<WriteNews />} />

          {/* Admin */}
          <Route path="/admin-dashboard" element={<AdminDashboardRoute />} />

          <Route path="/admin/manage-news" element={<ManageNewsPage />} />
          <Route path="/manage-news" element={<ManageNewsPage />} />

          <Route path="/admin/edit-news/:id" element={<EditNews />} />
          <Route path="/edit-news/:id" element={<EditNews />} />

          <Route path="/admin/pending" element={<PendingApprovalRoute />} />
          <Route path="/pending" element={<PendingApprovalRoute />} />

          <Route path="/admin/write" element={<WriteNews />} />
          <Route path="/admin/write-news" element={<WriteNews />} />
        </Route>

        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
}

function AdminDashboardRoute() {
  const navigate = useNavigate();

  const stats = {
    totalArticles: 1284,
    pending: 28,
    published: 1256,
    totalUsers: 8492,
  };

  return (
    <AdminDashboardPage
      user={adminUser}
      stats={stats}
      onWriteNews={() => navigate("/admin/write")}
      onPendingApproval={() => navigate("/admin/pending")}
      onManageNews={() => navigate("/admin/manage-news")}
      onLogout={() => navigate("/dashboard")}
    />
  );
}

function PendingApprovalRoute() {
  return <PendingApprovalPage />;
}

function EditArticleRoute() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();

  const article =
    location.state?.article ||
    INIT_ARTICLES.find((item) => String(item.id) === String(params.id)) ||
    userArticles.find((item) => String(item.id) === String(params.id));

  if (!article) {
    return <Navigate to="/my-articles" replace />;
  }

  const articleStatus = String(article?.status || "").toLowerCase();

  /*
    FLOW REJECTED:

    1. My Articles klik artikel rejected:
       navigate("/edit-article/:id", {
         state: {
           article,
           viewRejected: true,
           forceEdit: false,
         }
       })

       Hasil: tampil RejectedView / Detail Artikel.

    2. Dari RejectedView klik Edit:
       handleEditRejected()
       navigate("/edit-article/:id", {
         state: {
           article,
           viewRejected: false,
           forceEdit: true,
         }
       })

       Hasil: tampil form EditArticle.

    3. Dari RejectedView klik Hapus:
       balik ke My Articles dengan deletedArticleId.

    4. Dari form edit klik breadcrumb/back:
       kalau artikel rejected, balik ke RejectedView dulu.
  */

  const shouldShowRejectedDetail =
    location.state?.viewRejected === true &&
    location.state?.forceEdit !== true;

  const showToast = () => {};

  const handleSave = (updatedArticle) => {
    navigate("/my-articles", {
      state: {
        toastType: "updated",
        updatedArticle,
      },
    });
  };

  const handleSubmit = (updatedArticle) => {
    navigate("/my-articles", {
      state: {
        toastType: "submitted",
        updatedArticle: {
          ...updatedArticle,
          status: "pending",
          rejectionReason: null,
        },
      },
    });
  };

  const handleEditRejected = (selectedArticle) => {
    navigate(`/edit-article/${selectedArticle.id}`, {
      replace: true,
      state: {
        article: selectedArticle,
        viewRejected: false,
        forceEdit: true,
      },
    });
  };

  const handleDeleteRejected = (selectedArticle) => {
    navigate("/my-articles", {
      state: {
        toastType: "deleted",
        deletedArticleId: selectedArticle?.id,
      },
    });
  };

  const handleBackFromEdit = () => {
    if (articleStatus === "rejected") {
      navigate(`/edit-article/${article.id}`, {
        replace: true,
        state: {
          article,
          viewRejected: true,
          forceEdit: false,
        },
      });

      return;
    }

    navigate("/my-articles");
  };

  if (shouldShowRejectedDetail) {
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
      onBack={handleBackFromEdit}
      onSave={handleSave}
      onSubmit={handleSubmit}
      showToast={showToast}
    />
  );
}