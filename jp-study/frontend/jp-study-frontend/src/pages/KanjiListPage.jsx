import { useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader.jsx";
import { kanjiList } from "../data/mockData.js";

function KanjiListPage() {
  const navigate = useNavigate();

  return (
    <div className="phone-page">
      <PageHeader title="한자" />

      <main className="page-content">
        <div className="kanji-card-grid">
          {kanjiList.map((kanji) => (
            <button
              key={kanji.kanjiNo}
              className="kanji-list-card"
              type="button"
              onClick={() => navigate(`/kanji/${kanji.kanjiNo}`)}
            >
              <strong>{kanji.kanji}</strong>
              <span>{kanji.meaning}</span>
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}

export default KanjiListPage;