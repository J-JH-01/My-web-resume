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
          onClick={() => navigate(loginMember ? "/my-page" : "/login")}
        >
          {loginMember?.profileImg ? (
            <img
              src={loginMember.profileImg}
              alt="프로필 이미지"
              className="top-profile-image"
            />
          ) : (
            <span>
              {loginMember?.memberNickname?.charAt(0) || "?"}
            </span>
          )}
        </button>
    </header>
  );
}

export default TopNav;