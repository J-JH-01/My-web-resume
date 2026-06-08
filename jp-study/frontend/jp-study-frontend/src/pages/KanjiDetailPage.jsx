import { useNavigate, useParams } from "react-router-dom";
import { kanjiList } from "../data/mockData.js";

function KanjiDetailPage() {
  const navigate = useNavigate();
  const { kanjiNo } = useParams();

  const kanji = kanjiList.find((item) => item.kanjiNo === Number(kanjiNo));

  if (!kanji) {
    return <div className="page-content">한자를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="phone-page">
      <main className="page-content">
        <button className="back-button" type="button" onClick={() => navigate(-1)}>
          ‹ 한자 목록
        </button>

        <section className="study-detail-card">
          <span className="detail-label">KANJI</span>
          <h1>{kanji.kanji}</h1>
          <strong className="detail-meaning">{kanji.meaning}</strong>

          <div className="detail-info-list">
            <div>
              <span>음독</span>
              <strong>{kanji.onyomi}</strong>
            </div>

            <div>
              <span>훈독</span>
              <strong>{kanji.kunyomi}</strong>
            </div>

            <div>
              <span>예문</span>
              <strong>{kanji.example}</strong>
              <p>
                {kanji.exampleReading} / {kanji.exampleMeaning}
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default KanjiDetailPage;