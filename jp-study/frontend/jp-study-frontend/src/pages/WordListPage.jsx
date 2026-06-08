import { useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader.jsx";
import { wordList } from "../data/mockData.js";

function WordListPage() {
  const navigate = useNavigate();

  return (
    <div className="phone-page">
      <PageHeader title="단어" />

      <main className="page-content">
        <div className="word-list">
          {wordList.map((word) => (
            <button
              key={word.wordNo}
              className="word-list-item"
              type="button"
              onClick={() => navigate(`/words/${word.wordNo}`)}
            >
              <div>
                <strong>{word.word}</strong>
                <span>{word.reading}</span>
              </div>

              <p>{word.meaning}</p>
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}

export default WordListPage;