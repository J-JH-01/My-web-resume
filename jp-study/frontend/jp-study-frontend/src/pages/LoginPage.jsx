import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader.jsx";

function LoginPage() {
  const navigate = useNavigate();

  const [memberId, setMemberId] = useState("");
  const [memberPw, setMemberPw] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const login = (e) => {
    e.preventDefault();

    setMessage("");

    if (!memberId.trim()) {
      setMessage("아이디를 입력해주세요.");
      return;
    }

    if (!memberPw.trim()) {
      setMessage("비밀번호를 입력해주세요.");
      return;
    }

    setLoading(true);

    fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      credentials: "include",
      body: JSON.stringify({
        memberId,
        memberPw,
      }),
    })
      .then(async (res) => {
        const data = await res.text();

        if (!res.ok) {
          throw new Error(data || "로그인 실패");
        }

        return JSON.parse(data);
      })
      .then((loginMember) => {
        localStorage.setItem("loginMember", JSON.stringify(loginMember));

        alert(`${loginMember.memberNickname}님, 로그인되었습니다.`);
        window.location.href = "/";
        })
      .catch((error) => {
        console.error(error);
        setMessage(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="phone-page">
      <PageHeader title="로그인" />

      <main className="page-content">
        <form className="auth-form" onSubmit={login}>
          <label>
            아이디
            <input
              type="text"
              value={memberId}
              onChange={(e) => setMemberId(e.target.value)}
              placeholder="아이디를 입력하세요"
            />
          </label>

          <label>
            비밀번호
            <input
              type="password"
              value={memberPw}
              onChange={(e) => setMemberPw(e.target.value)}
              placeholder="비밀번호를 입력하세요"
            />
          </label>

          {message && <p className="auth-message">{message}</p>}

          <button type="submit" disabled={loading}>
            {loading ? "로그인 중..." : "로그인"}
          </button>

          <button
            className="auth-sub-button"
            type="button"
            onClick={() => navigate("/signup")}
          >
            회원가입
          </button>
        </form>
      </main>
    </div>
  );
}

export default LoginPage;