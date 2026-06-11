import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader.jsx";
import { fetchMyStudyStatusList } from "../utils/studyStatusUtils.js";

function HomePage() {
  const navigate = useNavigate();

  const [summary, setSummary] = useState({
    totalCount: 0,
    studiedCount: 0,
    progressRate: 0,
    knownCount: 0,
    vagueCount: 0,
    unknownCount: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/words").then((res) => {
        if (!res.ok) {
          throw new Error("단어 목록 조회 실패");
        }

        return res.json();
      }),

      fetch("/api/kanji").then((res) => {
        if (!res.ok) {
          throw new Error("한자 목록 조회 실패");
        }

        return res.json();
      }),

      fetchMyStudyStatusList(),
    ])
      .then(([wordList, kanjiList, statusList]) => {
        const totalCount = wordList.length + kanjiList.length;
        const studiedCount = statusList.length;

        const knownCount = statusList.filter(
          (status) => status.studyStatus === "KNOWN"
        ).length;

        const vagueCount = statusList.filter(
          (status) => status.studyStatus === "VAGUE"
        ).length;

        const unknownCount = statusList.filter(
          (status) => status.studyStatus === "UNKNOWN"
        ).length;

        const progressRate =
          totalCount === 0 ? 0 : Math.round((studiedCount / totalCount) * 100);

        setSummary({
          totalCount,
          studiedCount,
          progressRate,
          knownCount,
          vagueCount,
          unknownCount,
        });
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const progressDegree = summary.progressRate * 3.6;

  return (
    <div className="phone-page">
      <PageHeader title="홈" />

      <main className="page-content">
        <section className="home-card">
          <div className="home-card-title">
            <strong>전체 학습 진행률</strong>
            <span>
              {loading
                ? "학습 정보를 불러오는 중입니다."
                : `${summary.studiedCount} / ${summary.totalCount}개 학습 완료`}
            </span>
          </div>

          <div className="main-progress">
            <div
              className="donut"
              style={{
                background: `conic-gradient(#6d56e9 ${progressDegree}deg, #dcdde4 0deg)`,
              }}
            >
              <div>
                <strong>{loading ? "-" : summary.progressRate}%</strong>
                <span>진행률</span>
              </div>
            </div>
          </div>

          <div className="mini-progress-grid">
            <div>
              <strong>{summary.knownCount}</strong>
              <span>맞춤</span>
            </div>

            <div>
              <strong>{summary.vagueCount}</strong>
              <span>애매함</span>
            </div>

            <div>
              <strong>{summary.unknownCount}</strong>
              <span>모름</span>
            </div>

            <div>
              <strong>{summary.totalCount - summary.studiedCount}</strong>
              <span>미학습</span>
            </div>
          </div>
        </section>

        <section className="home-shortcut-grid">
          <button type="button" onClick={() => navigate("/quiz")}>
            <strong>퀴즈 풀기</strong>
            <span>랜덤 문제로 복습하기</span>
          </button>

          <button type="button" onClick={() => navigate("/words")}>
            <strong>단어 목록</strong>
            <span>단어 학습 상태 확인</span>
          </button>

          <button type="button" onClick={() => navigate("/kanji")}>
            <strong>한자 목록</strong>
            <span>한자 학습 상태 확인</span>
          </button>
        </section>
      </main>
    </div>
  );
}

export default HomePage;