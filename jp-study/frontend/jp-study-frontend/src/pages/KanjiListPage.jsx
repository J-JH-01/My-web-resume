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

function KanjiListPage() {
  const navigate = useNavigate();

  const [kanjiList, setKanjiList] = useState([]);
  const [statusMap, setStatusMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    Promise.all([
      fetch("/api/kanji").then((res) => {
        if (!res.ok) {
          throw new Error("한자 목록 조회 실패");
        }

        return res.json();
      }),
      fetchMyStudyStatusList(),
    ])
      .then(([kanjiData, statusData]) => {
        setKanjiList(kanjiData);
        setStatusMap(makeStudyStatusMap(statusData));
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage("한자 목록을 불러오지 못했습니다.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="phone-page">
        <PageHeader title="한자" />

        <main className="page-content">
          <p>한자를 불러오는 중입니다...</p>
        </main>
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="phone-page">
        <PageHeader title="한자" />

        <main className="page-content">
          <p>{errorMessage}</p>
        </main>
      </div>
    );
  }

  return (
    <div className="phone-page">
      <PageHeader title="한자" />

      <main className="page-content">
        <div className="kanji-card-grid">
          {kanjiList.map((kanji) => {
            const statusKey = makeStudyStatusKey("KANJI", kanji.kanjiNo);
            const studyStatus = statusMap[statusKey];

            return (
              <button
                key={kanji.kanjiNo}
                className={`kanji-list-card ${studyStatus ? "studied" : ""}`}
                type="button"
                onClick={() => navigate(`/kanji/${kanji.kanjiNo}`)}
              >
                {studyStatus && (
                  <span
                    className={`study-status-dot ${getStudyStatusClass(studyStatus)}`}
                    title={getStudyStatusText(studyStatus)}
                  />
                )}

                <strong>{kanji.kanjiText}</strong>
                <span>{kanji.meaningText}</span>
              </button>
            );
          })}
        </div>
      </main>
    </div>
  );
}

export default KanjiListPage;