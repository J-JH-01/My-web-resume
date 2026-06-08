import { useNavigate, useParams } from "react-router-dom";
import { wordList } from "../data/mockData.js";

function WordDetailPage() {
  const navigate = useNavigate();
  const { wordNo } = useParams();

  const word = wordList.find((item) => item.wordNo === Number(wordNo));

  if (!word) {
    return <div className="page-content">단어를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="phone-page">
      <main className="page-content">
        <button className="back-button" type="button" onClick={() => navigate(-1)}>
          ‹ 단어 목록
        </button>

        <section className="study-detail-card">
          <span className="detail-label">WORD</span>
          <h1>{word.word}</h1>
          <p className="detail-reading">{word.reading}</p>
          <strong className="detail-meaning">{word.meaning}</strong>

          <div className="example-box">
            <p>{word.example}</p>
            <span>{word.exampleMeaning}</span>
          </div>
        </section>
      </main>
    </div>
  );
}

export default WordDetailPage;