import { useNavigate } from "react-router-dom";

function TopNav({ onMenuClick }) {
  const navigate = useNavigate();

  return (
    <header className="top-nav">
      <button
        className="top-menu-button"
        type="button"
        onClick={onMenuClick}
        aria-label="메뉴 열기"
      >
        ☰
      </button>

      <button
        className="top-logo-button"
        type="button"
        onClick={() => navigate("/")}
      >
        JP STUDY
      </button>

      <button
        className="top-profile-button"
        type="button"
        onClick={() => navigate("/my-page")}
        aria-label="마이페이지"
      >
        <span>J</span>
      </button>
    </header>
  );
}

export default TopNav;