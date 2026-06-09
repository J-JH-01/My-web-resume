import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader.jsx";
import {
  fetchMyStudyStatusList,
  getStudyStatusClass,
  getStudyStatusText,
  makeStudyStatusKey,
  makeStudyStatusMap,
} from "../utils/studyStatusUtils.js";

function WordListPage() {
  const navigate = useNavigate();

  const [words, setWords] = useState([]);
  const [statusMap, setStatusMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    Promise.all([
      fetch("/api/words").then((res) => {
        if (!res.ok) {
          throw new Error("단어 목록 조회 실패");
        }

        return res.json();
      }),
      fetchMyStudyStatusList(),
    ])
      .then(([wordData, statusData]) => {
        setWords(wordData);
        setStatusMap(makeStudyStatusMap(statusData));
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage("단어 목록을 불러오지 못했습니다.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="phone-page">
        <PageHeader title="단어" />

        <main className="page-content">
          <p>단어를 불러오는 중입니다...</p>
        </main>
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="phone-page">
        <PageHeader title="단어" />

        <main className="page-content">
          <p>{errorMessage}</p>
        </main>
      </div>
    );
  }

  return (
    <div className="phone-page">
      <PageHeader title="단어" />

      <main className="page-content">
        <div className="word-list">
          {words.map((word) => {
            const statusKey = makeStudyStatusKey("WORD", word.wordNo);
            const studyStatus = statusMap[statusKey];

            return (
              <button
                key={word.wordNo}
                className={`word-list-item ${studyStatus ? "studied" : ""}`}
                type="button"
                onClick={() => navigate(`/words/${word.wordNo}`)}
              >
                {studyStatus && (
                  <span
                    className={`study-status-dot ${getStudyStatusClass(studyStatus)}`}
                    title={getStudyStatusText(studyStatus)}
                  />
                )}

                <div>
                  <strong>{word.wordText}</strong>
                  <span>{word.furigana}</span>
                </div>

                <p>{word.meaningText}</p>
              </button>
            );
          })}
        </div>
      </main>
    </div>
  );
}

export default WordListPage;