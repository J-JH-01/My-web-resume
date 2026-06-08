import { useNavigate } from "react-router-dom";
import { profileImage } from "../data/mockData.js";

function MyPage() {
  const navigate = useNavigate();

  return (
    <div className="phone-page">
      <section className="my-hero">
        <button type="button" onClick={() => navigate(-1)}>
          ‹
        </button>

        <div className="my-profile">
          <img src={profileImage} alt="프로필" />
          <div>
            <h1>홍길동</h1>
            <p>
              Lv.7 <span>학습자</span>
            </p>
          </div>
        </div>
      </section>

      <main className="my-content">
        <section className="white-card">
          <h2>나의 학습 통계</h2>

          <dl>
            <div>
              <dt>총 학습일</dt>
              <dd>12일</dd>
            </div>
            <div>
              <dt>총 학습 단어</dt>
              <dd>320개</dd>
            </div>
            <div>
              <dt>총 학습 한자</dt>
              <dd>85개</dd>
            </div>
            <div>
              <dt>연속 학습</dt>
              <dd>3일</dd>
            </div>
          </dl>
        </section>

        <section className="white-card">
          <h2>퀴즈 상태</h2>

          <div className="quiz-status-grid">
            <div className="known">
              <span>알았어요</span>
              <strong>7</strong>
            </div>
            <div className="vague">
              <span>헷갈려요</span>
              <strong>2</strong>
            </div>
            <div className="unknown">
              <span>몰라요</span>
              <strong>1</strong>
            </div>
          </div>
        </section>

        <section className="my-menu-card">
          <button type="button">
            <span>★</span>
            즐겨찾기
            <em>›</em>
          </button>
          <button type="button">
            <span>⚙</span>
            회원정보 수정
            <em>›</em>
          </button>
        </section>
      </main>
    </div>
  );
}

export default MyPage;