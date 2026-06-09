import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function WordDetailPage() {
  const navigate = useNavigate();
  const { wordNo } = useParams();

  const [word, setWord] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetch(`/api/words/${wordNo}`).then((res) => {
        if (!res.ok) {
          throw new Error("단어 상세 조회 실패");
        }

        return res.json();
      })
      .then((data) => {
        setWord(data);
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage("단어 정보를 불러오지 못했습니다.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [wordNo]);

  if (loading) {
    return (
      <div className="phone-page">
        <main className="page-content">
          <p>단어 정보를 불러오는 중입니다...</p>
        </main>
      </div>
    );
  }

  if (errorMessage || !word) {
    return (
      <div className="phone-page">
        <main className="page-content">
          <button className="back-button" type="button" onClick={() => navigate(-1)}>
            ‹ 단어 목록
          </button>

          <p>{errorMessage || "단어를 찾을 수 없습니다."}</p>
        </main>
      </div>
    );
  }

  return (
    <div className="phone-page">
      <main className="page-content">
        <button className="back-button" type="button" onClick={() => navigate(-1)}>
          ‹ 단어 목록
        </button>

        <section className="study-detail-card">
          <span className="detail-label">WORD</span>

          <h1>{word.wordText}</h1>

          <p className="detail-reading">{word.furigana}</p>

          <strong className="detail-meaning">{word.meaningText}</strong>

          <div className="example-box">
            <p>{word.partOfSpeech}</p>
            <span>{word.wordDescription}</span>
          </div>
        </section>
      </main>
    </div>
  );
}

export default WordDetailPage;