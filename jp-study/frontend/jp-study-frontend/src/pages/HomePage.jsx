function HomePage() {
  return (
    <div className="phone-page">
      <main className="page-content">
        <section className="home-card">
          <div className="home-card-title">
            <strong>오늘의 학습</strong>
            <span>월요일, 12 Sep</span>
          </div>

          <div className="main-progress">
            <div className="donut">
              <div>
                <strong>25%</strong>
                <span>Completed</span>
              </div>
            </div>

            <p>
              <strong>8 / 32</strong> 학습 완료
            </p>
          </div>

          <div className="mini-progress-grid">
            <div>
              <strong>단어</strong>
              <span>8 / 20</span>
            </div>
            <div>
              <strong>문자</strong>
              <span>3 / 12</span>
            </div>
            <div>
              <strong>히라가나</strong>
              <span>35 / 46</span>
            </div>
            <div>
              <strong>가타카나</strong>
              <span>12 / 46</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default HomePage;