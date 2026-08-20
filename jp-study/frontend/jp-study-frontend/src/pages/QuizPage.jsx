import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader.jsx";

function QuizPage() {
  const navigate = useNavigate();

  const [quizList, setQuizList] = useState([]);
  const [quizIndex, setQuizIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [complete, setComplete] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // 퀴즈 전체 결과 개수
  const [sessionResult, setSessionResult] = useState({
    KNOWN: 0,
    VAGUE: 0,
    UNKNOWN: 0,
  });

  // 각 문제별 결과 기록
  const [quizResults, setQuizResults] = useState([]);

  const currentQuiz = quizList[quizIndex];

  const reloadQuiz = () => {
    setLoading(true);
    setErrorMessage("");
    setFlipped(false);
    setComplete(false);
    setQuizIndex(0);

    setSessionResult({
      KNOWN: 0,
      VAGUE: 0,
      UNKNOWN: 0,
    });

    // 이전 퀴즈 결과 초기화
    setQuizResults([]);

    fetch("/api/quiz?limit=10")
      .then((res) => {
        if (!res.ok) {
          throw new Error("퀴즈 조회 실패");
        }

        return res.json();
      })
      .then((data) => {
        setQuizList(data);
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage("퀴즈를 불러오지 못했습니다.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    reloadQuiz();
  }, []);

  const saveStatusAndNext = async (studyStatus) => {
    if (!currentQuiz || saving) return;

    setSaving(true);

    try {
      const res = await fetch("/api/study-status", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        credentials: "include",
        body: JSON.stringify({
          contentType: currentQuiz.quizType,
          contentNo: currentQuiz.itemNo,
          studyStatus,
        }),
      });

      const text = await res.text();

      if (res.status === 401) {
        alert("로그인이 필요합니다.");
        navigate("/login");
        return;
      }

      if (!res.ok) {
        throw new Error(text || "학습 상태 저장 실패");
      }

      // 상태별 개수 증가
      setSessionResult((prev) => ({
        ...prev,
        [studyStatus]: prev[studyStatus] + 1,
      }));

      // 현재 문제 + 사용자가 선택한 결과 저장
      setQuizResults((prev) => [
        ...prev,
        {
          ...currentQuiz,
          studyStatus,
        },
      ]);

      setFlipped(false);

      if (quizIndex + 1 >= quizList.length) {
        setComplete(true);
        return;
      }

      setQuizIndex((prev) => prev + 1);
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setSaving(false);
    }
  };

  const getStatusText = (studyStatus) => {
    if (studyStatus === "KNOWN") return "맞춤";
    if (studyStatus === "VAGUE") return "애매함";
    if (studyStatus === "UNKNOWN") return "모름";

    return "";
  };

  const getStatusClass = (studyStatus) => {
    if (studyStatus === "KNOWN") return "known";
    if (studyStatus === "VAGUE") return "vague";
    if (studyStatus === "UNKNOWN") return "unknown";

    return "";
  };

  if (loading) {
    return (
      <div className="phone-page">
        <PageHeader title="퀴즈" />

        <main className="page-content">
          <p>퀴즈를 불러오는 중입니다...</p>
        </main>
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="phone-page">
        <PageHeader title="퀴즈" />

        <main className="page-content">
          <p>{errorMessage}</p>

          <button type="button" onClick={reloadQuiz}>
            다시 불러오기
          </button>
        </main>
      </div>
    );
  }

  if (complete) {
    return (
      <div className="phone-page">
        <PageHeader title="퀴즈 결과" />

        <main className="page-content">
          <section className="quiz-complete-card">
            <span>COMPLETE</span>

            <h2>퀴즈 완료</h2>

            <p>{quizList.length}개 문제를 모두 확인했습니다.</p>

            <div className="quiz-result-grid">
              <div className="known-result">
                <strong>{sessionResult.KNOWN}</strong>
                <p>맞춤</p>
              </div>

              <div className="vague-result">
                <strong>{sessionResult.VAGUE}</strong>
                <p>애매함</p>
              </div>

              <div className="unknown-result">
                <strong>{sessionResult.UNKNOWN}</strong>
                <p>모름</p>
              </div>
            </div>
          </section>

          <section className="quiz-result-section">
            <div className="quiz-result-title-row">
              <h3>문제별 결과</h3>

              <span>{quizResults.length}문제</span>
            </div>

            <div className="quiz-result-list">
              {quizResults.map((result, index) => (
                <article
                  className={`quiz-result-item ${getStatusClass(
                    result.studyStatus
                  )}`}
                  key={`${result.quizType}-${result.itemNo}-${index}`}
                >
                  <div className="quiz-result-item-top">
                    <div>
                      <span className="quiz-result-number">
                        {index + 1}
                      </span>

                      <span className="quiz-result-type">
                        {result.quizType === "KANJI" ? "KANJI" : "WORD"}
                      </span>
                    </div>

                    <span
                      className={`quiz-result-status ${getStatusClass(
                        result.studyStatus
                      )}`}
                    >
                      {getStatusText(result.studyStatus)}
                    </span>
                  </div>

                  <div className="quiz-result-question">
                    <strong>{result.questionText}</strong>

                    {result.readingText && (
                      <p className="quiz-result-reading">
                        {result.readingText}
                      </p>
                    )}
                  </div>

                  <div className="quiz-result-answer">
                    <span>정답</span>

                    <strong>{result.answerText}</strong>

                    {result.description && (
                      <p>{result.description}</p>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </section>

          <div className="quiz-result-actions">
            <button
              className="quiz-retry-button"
              type="button"
              onClick={reloadQuiz}
            >
              새 문제 풀기
            </button>

            <button
              className="quiz-home-button"
              type="button"
              onClick={() => navigate("/")}
            >
              홈으로
            </button>
          </div>
        </main>
      </div>
    );
  }

  if (!currentQuiz) {
    return (
      <div className="phone-page">
        <PageHeader title="퀴즈" />

        <main className="page-content">
          <p>퀴즈 데이터가 없습니다.</p>
        </main>
      </div>
    );
  }

  return (
    <div className="phone-page">
      <PageHeader title="퀴즈" />

      <main className="page-content">
        <div className="quiz-top-row">
          <span>
            {quizIndex + 1} / {quizList.length}
          </span>

          <button type="button" onClick={reloadQuiz}>
            새로 뽑기
          </button>
        </div>

        <button
          className={`quiz-flip-card ${flipped ? "flipped" : ""}`}
          type="button"
          onClick={() => setFlipped((prev) => !prev)}
        >
          {!flipped ? (
            <div>
              <span className="quiz-type">
                {currentQuiz.quizType === "KANJI" ? "KANJI" : "WORD"}
              </span>

              <strong>{currentQuiz.questionText}</strong>

              <p>{currentQuiz.readingText}</p>
            </div>
          ) : (
            <div>
              <span className="quiz-type">MEANING</span>

              <strong>{currentQuiz.answerText}</strong>

              <p>{currentQuiz.description}</p>
            </div>
          )}
        </button>

        <div className="quiz-status-buttons">
          <button
            className="known"
            type="button"
            disabled={saving}
            onClick={() => saveStatusAndNext("KNOWN")}
          >
            맞춤
          </button>

          <button
            className="vague"
            type="button"
            disabled={saving}
            onClick={() => saveStatusAndNext("VAGUE")}
          >
            애매함
          </button>

          <button
            className="unknown"
            type="button"
            disabled={saving}
            onClick={() => saveStatusAndNext("UNKNOWN")}
          >
            모름
          </button>
        </div>
      </main>
    </div>
  );
}

export default QuizPage;