import { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader.jsx";
import {
  hiraganaRows,
  katakanaRows,
  kanaColumnHeaders,
} from "../data/mockData.js";

function KanaPage({ type = "hiragana" }) {
  const [mode, setMode] = useState(type);

  useEffect(() => {
    setMode(type);
  }, [type]);

  const rows = mode === "hiragana" ? hiraganaRows : katakanaRows;

  return (
    <div className="phone-page">
      <PageHeader title={mode === "hiragana" ? "히라가나" : "가타카나"} />

      <main className="page-content">
        <div className="segment-control">
          <button
            className={mode === "hiragana" ? "active" : ""}
            type="button"
            onClick={() => setMode("hiragana")}
          >
            히라가나
          </button>

          <button
            className={mode === "katakana" ? "active" : ""}
            type="button"
            onClick={() => setMode("katakana")}
          >
            가타카나
          </button>
        </div>

        <div className="kana-table">
          <div className="kana-row kana-header-row">
            <div className="kana-row-label"></div>

            {kanaColumnHeaders.map((header) => (
              <div className="kana-header-cell" key={header}>
                {header}
              </div>
            ))}
          </div>

          {rows.map((row) => (
            <div className="kana-row" key={row.rowLabel}>
              <div className="kana-row-label">{row.rowLabel}</div>

              {row.cells.map((kana, index) =>
                kana ? (
                  <button
                    className="kana-cell"
                    type="button"
                    key={`${row.rowLabel}-${kana}-${index}`}
                  >
                    {kana}
                  </button>
                ) : (
                  <span
                    className="kana-cell empty"
                    key={`${row.rowLabel}-empty-${index}`}
                  />
                )
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default KanaPage;