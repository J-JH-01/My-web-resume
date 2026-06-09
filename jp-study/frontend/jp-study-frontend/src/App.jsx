import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

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


function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loginMember, setLoginMember] = useState(null);

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
        console.error(error);
        setLoginMember(null);
      });
  }, []);

  return (
    <div className="app">
      <TopNav
        loginMember={loginMember}
        onMenuClick={() => setIsMenuOpen((prev) => !prev)}
      />

      <MenuDrawer isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      <main className="app-main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />

          <Route path="/hiragana" element={<KanaPage type="hiragana" />} />
          <Route path="/katakana" element={<KanaPage type="katakana" />} />
          <Route
            path="/my-page"
            element={<MyPage loginMember={loginMember} setLoginMember={setLoginMember} />}
          />

          <Route path="/words" element={<WordListPage />} />
          <Route path="/words/:wordNo" element={<WordDetailPage />} />

          <Route path="/kanji" element={<KanjiListPage />} />
          <Route path="/kanji/:kanjiNo" element={<KanjiDetailPage />} />

          <Route path="/quiz" element={<QuizPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;