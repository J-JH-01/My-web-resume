import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader.jsx";

function SignupPage() {
  const navigate = useNavigate();

  const [memberId, setMemberId] = useState("");
  const [memberPw, setMemberPw] = useState("");
  const [memberPwConfirm, setMemberPwConfirm] = useState("");
  const [memberNickname, setMemberNickname] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const signup = (e) => {
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

    if (memberPw !== memberPwConfirm) {
      setMessage("비밀번호가 일치하지 않습니다.");
      return;
    }

    if (!memberNickname.trim()) {
      setMessage("닉네임을 입력해주세요.");
      return;
    }

    setLoading(true);

    fetch("/api/members/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        memberId,
        memberPw,
        memberNickname,
      }),
    })
      .then(async (res) => {
        const text = await res.text();

        if (!res.ok) {
          throw new Error(text || "회원가입 실패");
        }

        return text;
      })
      .then((text) => {
        alert(text || "회원가입이 완료되었습니다.");
        navigate("/");
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
      <PageHeader title="회원가입" />

      <main className="page-content">
        <form className="auth-form" onSubmit={signup}>
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

          <label>
            비밀번호 확인
            <input
              type="password"
              value={memberPwConfirm}
              onChange={(e) => setMemberPwConfirm(e.target.value)}
              placeholder="비밀번호를 다시 입력하세요"
            />
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

          {message && <p className="auth-message">{message}</p>}

          <button type="submit" disabled={loading}>
            {loading ? "가입 중..." : "회원가입"}
          </button>

          <button
            className="auth-sub-button"
            type="button"
            onClick={() => navigate("/login")}
          >
            이미 계정이 있어요
          </button>
        </form>
      </main>
    </div>
  );
}

export default SignupPage;