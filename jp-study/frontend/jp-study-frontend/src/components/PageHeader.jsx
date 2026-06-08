import { useNavigate } from "react-router-dom";

function PageHeader({ title, right }) {
  const navigate = useNavigate();

  return (
    <header className="page-header">
      <button type="button" onClick={() => navigate(-1)}>
        ‹
      </button>

      <strong>{title}</strong>

      <button type="button">
        {right || ""}
      </button>
    </header>
  );
}

export default PageHeader;