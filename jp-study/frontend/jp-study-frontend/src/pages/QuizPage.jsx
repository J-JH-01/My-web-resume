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

  const [sessionResult, setSessionResult] = useState({
    KNOWN: 0,
    VAGUE: 0,
    UNKNOWN: 0,
  });

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

      setSessionResult((prev) => ({
        ...prev,
        [studyStatus]: prev[studyStatus] + 1,
      }));

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
        <PageHeader title="퀴즈" />

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

            <button type="button" onClick={reloadQuiz}>
              새 문제 풀기
            </button>
          </section>
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