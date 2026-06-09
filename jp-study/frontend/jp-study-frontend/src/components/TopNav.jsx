import { useNavigate } from "react-router-dom";

function TopNav({ onMenuClick, loginMember }) {
  const navigate = useNavigate();

  const moveProfilePage = () => {
    if (loginMember) {
      navigate("/my-page");
      return;
    }

    navigate("/login");
  };

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
        onClick={moveProfilePage}
        aria-label="프로필"
      >
        <span>
          {loginMember ? loginMember.memberNickname.charAt(0) : "?"}
        </span>
      </button>
    </header>
  );
}

export default TopNav;