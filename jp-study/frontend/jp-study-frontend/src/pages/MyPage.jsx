import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader.jsx";

function MyPage({ loginMember, setLoginMember }) {
  const navigate = useNavigate();

  const [statusCount, setStatusCount] = useState({
    known: 0,
    vague: 0,
    unknown: 0,
  });

  useEffect(() => {
    if (!loginMember) return;

    fetch("/api/study-status", {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("학습 상태 조회 실패");
        }

        return res.json();
      })
      .then((statusList) => {
        const nextCount = {
          known: 0,
          vague: 0,
          unknown: 0,
        };

        statusList.forEach((status) => {
          if (status.studyStatus === "KNOWN") {
            nextCount.known += 1;
          }

          if (status.studyStatus === "VAGUE") {
            nextCount.vague += 1;
          }

          if (status.studyStatus === "UNKNOWN") {
            nextCount.unknown += 1;
          }
        });

        setStatusCount(nextCount);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [loginMember]);

  const uploadProfileImage = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const formData = new FormData();
    formData.append("profileImage", file);

    try {
      const res = await fetch("/api/members/me/profile-image", {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      const text = await res.text();

      if (res.status === 401) {
        alert("로그인이 필요합니다.");
        navigate("/login");
        return;
      }

      if (!res.ok) {
        throw new Error(text || "프로필 이미지 업로드 실패");
      }

      const updatedMember = JSON.parse(text);

      localStorage.setItem("loginMember", JSON.stringify(updatedMember));

      if (setLoginMember) {
        setLoginMember(updatedMember);
      }

      alert("프로필 이미지가 변경되었습니다.");
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      e.target.value = "";
    }
  };

  const logout = () => {
    fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("로그아웃 실패");
        }

        return res.text();
      })
      .then((text) => {
        localStorage.removeItem("loginMember");

        if (setLoginMember) {
          setLoginMember(null);
        }

        alert(text || "로그아웃되었습니다.");
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
        alert("로그아웃 중 오류가 발생했습니다.");
      });
  };

  if (!loginMember) {
    return (
      <div className="phone-page">
        <PageHeader title="마이페이지" />

        <main className="page-content">
          <section className="my-card">
            <h2>로그인이 필요합니다.</h2>
            <p>학습 기록을 확인하려면 로그인해주세요.</p>

            <button type="button" onClick={() => navigate("/login")}>
              로그인하러 가기
            </button>
          </section>
        </main>
      </div>
    );
  }

  return (
    <div className="phone-page">
      <PageHeader title="마이페이지" />

      <main className="page-content">
        <section className="my-profile-card">
         <div className="my-profile-image-box">
          <label className="my-profile-image-label">
            {loginMember.profileImg ? (
              <img
                src={loginMember.profileImg}
                alt="프로필 이미지"
                className="my-profile-image"
              />
            ) : (
              <div className="my-profile-placeholder">
                {loginMember.memberNickname?.charAt(0) || "?"}
              </div>
            )}

            <span className="profile-image-overlay">변경</span>

            <input
              type="file"
              accept="image/*"
              onChange={uploadProfileImage}
              hidden
            />
          </label>
        </div>

          <div>
            <h2>{loginMember.memberNickname}</h2>
            <p>{loginMember.memberId}</p>
          </div>
        </section>

        <section className="my-section">
          <h3>퀴즈 상태</h3>

          <div className="my-status-grid">
            <div className="my-status-box known-box">
              <span className="study-status-dot known" />
              <strong>{statusCount.known}</strong>
              <p>맞춤</p>
            </div>

            <div className="my-status-box vague-box">
              <span className="study-status-dot vague" />
              <strong>{statusCount.vague}</strong>
              <p>애매함</p>
            </div>

            <div className="my-status-box unknown-box">
              <span className="study-status-dot unknown" />
              <strong>{statusCount.unknown}</strong>
              <p>모름</p>
            </div>
          </div>
        </section>

        <section className="my-section">
          <h3>회원정보</h3>

          <button
            className="my-action-button"
            type="button"
            onClick={() => navigate("/my-page/edit")}
          >
            회원정보 수정
          </button>

          <button className="my-logout-button" type="button" onClick={logout}>
            로그아웃
          </button>
        </section>
      </main>
    </div>
  );
}

export default MyPage;