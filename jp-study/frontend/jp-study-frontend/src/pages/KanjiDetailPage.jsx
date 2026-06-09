import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function KanjiDetailPage() {
  const navigate = useNavigate();
  const { kanjiNo } = useParams();

  const [kanji, setKanji] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetch(`/api/kanji/${kanjiNo}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("한자 상세 조회 실패");
        }

        return res.json();
      })
      .then((data) => {
        setKanji(data);
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage("한자 정보를 불러오지 못했습니다.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [kanjiNo]);

  if (loading) {
    return (
      <div className="phone-page">
        <main className="page-content">
          <p>한자 정보를 불러오는 중입니다...</p>
        </main>
      </div>
    );
  }

  if (errorMessage || !kanji) {
    return (
      <div className="phone-page">
        <main className="page-content">
          <button className="back-button" type="button" onClick={() => navigate(-1)}>
            ‹ 한자 목록
          </button>
          <p>{errorMessage || "한자를 찾을 수 없습니다."}</p>
        </main>
      </div>
    );
  }

  return (
    <div className="phone-page">
      <main className="page-content">
        <button className="back-button" type="button" onClick={() => navigate(-1)}>
          ‹ 한자 목록
        </button>

        <section className="study-detail-card">
          <span className="detail-label">KANJI</span>
          <h1>{kanji.kanjiText}</h1>
          <strong className="detail-meaning">{kanji.meaningText}</strong>

          <div className="detail-info-list">
            <div>
              <span>음독</span>
              <strong>{kanji.onReading}</strong>
            </div>

            <div>
              <span>훈독</span>
              <strong>{kanji.kunReading}</strong>
            </div>

            <div>
              <span>설명</span>
              <strong>{kanji.description}</strong>
            </div>

            {kanji.exampleText && (
              <div>
                <span>예문</span>
                <strong>{kanji.exampleText}</strong>
                <p>
                  {kanji.exampleReading} / {kanji.exampleMeaning}
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default KanjiDetailPage;