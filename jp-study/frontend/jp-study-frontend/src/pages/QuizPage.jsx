import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader.jsx";

function QuizPage() {
  const [quizList, setQuizList] = useState([]);
  const [quizIndex, setQuizIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [statusMap, setStatusMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);

  const currentQuiz = quizList[quizIndex];

  useEffect(() => {
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

  const reloadQuiz = () => {
    setLoading(true);
    setErrorMessage("");
    setFlipped(false);
    setQuizIndex(0);
    setStatusMap({});

    fetch("/api/quiz?limit=10")
      .then((res) => {
        if (!res.ok) {
          throw new Error("퀴즈 재조회 실패");
        }

        return res.json();
      })
      .then((data) => {
        setQuizList(data);
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage("퀴즈를 다시 불러오지 못했습니다.");
      })
      .finally(() => {
        setLoading(false);
      });
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