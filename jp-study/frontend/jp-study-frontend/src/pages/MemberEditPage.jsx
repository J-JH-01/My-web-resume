import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader.jsx";

function MemberEditPage({ loginMember, setLoginMember }) {
  const navigate = useNavigate();

  const [memberNickname, setMemberNickname] = useState("");
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [newPwConfirm, setNewPwConfirm] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (loginMember) {
      setMemberNickname(loginMember.memberNickname || "");
    }
  }, [loginMember]);

  const updateMemberInfo = (e) => {
    e.preventDefault();

    setMessage("");

    if (!memberNickname.trim()) {
      setMessage("닉네임을 입력해주세요.");
      return;
    }

    if (newPw || newPwConfirm || currentPw) {
      if (!currentPw.trim()) {
        setMessage("현재 비밀번호를 입력해주세요.");
        return;
      }

      if (!newPw.trim()) {
        setMessage("새 비밀번호를 입력해주세요.");
        return;
      }

      if (newPw !== newPwConfirm) {
        setMessage("새 비밀번호가 일치하지 않습니다.");
        return;
      }
    }

    setLoading(true);

    fetch("/api/members/me", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      credentials: "include",
      body: JSON.stringify({
        memberNickname,
        currentPw,
        newPw,
      }),
    })
      .then(async (res) => {
        const data = await res.text();

        if (res.status === 401) {
          alert("로그인이 필요합니다.");
          navigate("/login");
          return null;
        }

        if (!res.ok) {
          throw new Error(data || "회원정보 수정 실패");
        }

        return JSON.parse(data);
      })
      .then((updatedMember) => {
        if (!updatedMember) return;

        localStorage.setItem("loginMember", JSON.stringify(updatedMember));

        if (setLoginMember) {
          setLoginMember(updatedMember);
        }

        alert("회원정보가 수정되었습니다.");
        navigate("/my-page");
      })
      .catch((error) => {
        console.error(error);
        setMessage(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (!loginMember) {
    return (
      <div className="phone-page">
        <PageHeader title="회원정보 수정" />

        <main className="page-content">
          <section className="my-card">
            <h2>로그인이 필요합니다.</h2>
            <p>회원정보를 수정하려면 로그인해주세요.</p>

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
      <PageHeader title="회원정보 수정" />

      <main className="page-content">
        <form className="auth-form" onSubmit={updateMemberInfo}>
          <label>
            아이디
            <input type="text" value={loginMember.memberId} disabled />
          </label>

          <label>
            닉네임
            <input
              type="text"
              value={memberNickname}
              onChange={(e) => setMemberNickname(e.target.value)}
              placeholder="닉네임을 입력하세요"
            />
          </label>

          <label>
            현재 비밀번호
            <input
              type="password"
              value={currentPw}
              onChange={(e) => setCurrentPw(e.target.value)}
              placeholder="비밀번호 변경 시 입력"
            />
          </label>

          <label>
            새 비밀번호
            <input
              type="password"
              value={newPw}
              onChange={(e) => setNewPw(e.target.value)}
              placeholder="새 비밀번호"
            />
          </label>

          <label>
            새 비밀번호 확인
            <input
              type="password"
              value={newPwConfirm}
              onChange={(e) => setNewPwConfirm(e.target.value)}
              placeholder="새 비밀번호를 다시 입력"
            />
          </label>

          {message && <p className="auth-message">{message}</p>}

          <button type="submit" disabled={loading}>
            {loading ? "수정 중..." : "회원정보 수정"}
          </button>

          <button
            className="auth-sub-button"
            type="button"
            onClick={() => navigate("/my-page")}
          >
            취소
          </button>
        </form>
      </main>
    </div>
  );
}

export default MemberEditPage;