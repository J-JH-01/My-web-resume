import { useEffect, useState } from "react";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

import "./style/App.css";

import TopNav from "./components/TopNav.jsx";
import MenuDrawer from "./components/MenuDrawer.jsx";

import HomePage from "./pages/HomePage.jsx";
import KanaPage from "./pages/KanaPage.jsx";
import MyPage from "./pages/MyPage.jsx";
import WordListPage from "./pages/WordListPage.jsx";
import WordDetailPage from "./pages/WordDetailPage.jsx";
import KanjiListPage from "./pages/KanjiListPage.jsx";
import KanjiDetailPage from "./pages/KanjiDetailPage.jsx";
import QuizPage from "./pages/QuizPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import MemberEditPage from "./pages/MemberEditPage.jsx";
import AdminStudyItemPage from "./pages/AdminStudyItemPage.jsx";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 로그인 회원 정보
  const [loginMember, setLoginMember] = useState(null);

  // /api/auth/me 확인이 끝났는지 여부
  const [authLoading, setAuthLoading] = useState(true);

  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin");

  useEffect(() => {
    fetch("/api/auth/me", {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) {
          setLoginMember(null);
          return null;
        }

        return res.json();
      })
      .then((data) => {
        if (data) {
          setLoginMember(data);
        }
      })
      .catch((error) => {
        console.error("로그인 상태 확인 실패:", error);
        setLoginMember(null);
      })
      .finally(() => {
        setAuthLoading(false);
      });
  }, []);

  // 로그인 필요한 페이지 보호
  const ProtectedRoute = ({ children }) => {
    // 세션 확인 중에는 아무것도 판단하지 않음
    if (authLoading) {
      return <div>로딩 중...</div>;
    }

    // 로그인 안 되어 있으면 로그인 페이지로 이동
    if (!loginMember) {
      return <Navigate to="/login" replace />;
    }

    return children;
  };

  return (
    <div className="app">
      <TopNav
        loginMember={loginMember}
        onMenuClick={() => setIsMenuOpen((prev) => !prev)}
      />

      <MenuDrawer
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />

      <main className={isAdminPage ? "app-main admin-app-main" : "app-main"}>
        <Routes>
          {/* 공개 페이지 */}
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />

          <Route
            path="/hiragana"
            element={<KanaPage type="hiragana" />}
          />

          <Route
            path="/katakana"
            element={<KanaPage type="katakana" />}
          />

          {/* 로그인 필요 - 마이페이지 */}
          <Route
            path="/my-page"
            element={
              <ProtectedRoute>
                <MyPage
                  loginMember={loginMember}
                  setLoginMember={setLoginMember}
                />
              </ProtectedRoute>
            }
          />

          <Route
            path="/my-page/edit"
            element={
              <ProtectedRoute>
                <MemberEditPage
                  loginMember={loginMember}
                  setLoginMember={setLoginMember}
                />
              </ProtectedRoute>
            }
          />

          {/* 로그인 필요 - 단어 */}
          <Route
            path="/words"
            element={
              <ProtectedRoute>
                <WordListPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/words/:wordNo"
            element={
              <ProtectedRoute>
                <WordDetailPage />
              </ProtectedRoute>
            }
          />

          {/* 로그인 필요 - 한자 */}
          <Route
            path="/kanji"
            element={
              <ProtectedRoute>
                <KanjiListPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/kanji/:kanjiNo"
            element={
              <ProtectedRoute>
                <KanjiDetailPage />
              </ProtectedRoute>
            }
          />

          {/* 로그인 필요 - 퀴즈 */}
          <Route
            path="/quiz"
            element={
              <ProtectedRoute>
                <QuizPage />
              </ProtectedRoute>
            }
          />

          {/* 관리자 */}
          <Route
            path="/admin/study-items"
            element={
              <ProtectedRoute>
                <AdminStudyItemPage loginMember={loginMember} />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;