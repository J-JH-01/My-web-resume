import { useState } from "react";
import { Route, Routes } from "react-router-dom";

import "./style/App.css";

import TopNav from "./components/TopNav.jsx";
import MenuDrawer from "./components/MenuDrawer.jsx";

import WordListPage from "./pages/WordListPage.jsx";
import WordDetailPage from "./pages/WordDetailPage.jsx";
import KanjiListPage from "./pages/KanjiListPage.jsx";
import KanjiDetailPage from "./pages/KanjiDetailPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import KanaPage from "./pages/KanaPage.jsx";
import MyPage from "./pages/MyPage.jsx";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="app">
      <TopNav onMenuClick={() => setIsMenuOpen((prev) => !prev)} />

      <MenuDrawer isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      <main className="app-main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          
          <Route path="/hiragana" element={<KanaPage type="hiragana" />} />
          <Route path="/katakana" element={<KanaPage type="katakana" />} />
          <Route path="/kana" element={<KanaPage type="hiragana" />} />

          <Route path="/my-page" element={<MyPage />} />

          <Route path="/words" element={<WordListPage />} />
          <Route path="/words/:wordNo" element={<WordDetailPage />} />

          <Route path="/kanji" element={<KanjiListPage />} />
          <Route path="/kanji/:kanjiNo" element={<KanjiDetailPage />} />

          <Route path="/quiz" element={<div className="temp-page">퀴즈 페이지 준비중</div>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;