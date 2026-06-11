import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader.jsx";

const LEVEL_LIST = ["N5", "N4", "N3", "N2", "N1"];
const PAGE_SIZE = 15;

function AdminStudyItemPage({ loginMember }) {
  const navigate = useNavigate();

  const [contentType, setContentType] = useState("WORD");
  const [level, setLevel] = useState("N5");
  const [checkMode, setCheckMode] = useState(false);
  const [selectedItemNoList, setSelectedItemNoList] = useState([]);
  const [searchKey, setSearchKey] = useState("reading");
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(1);

  const [wordList, setWordList] = useState([]);
  const [kanjiList, setKanjiList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    Promise.all([
      fetch("/api/words").then((res) => {
        if (!res.ok) {
          throw new Error("단어 목록 조회 실패");
        }

        return res.json();
      }),
      fetch("/api/kanji").then((res) => {
        if (!res.ok) {
          throw new Error("한자 목록 조회 실패");
        }

        return res.json();
      }),
    ])
      .then(([words, kanji]) => {
        setWordList(words);
        setKanjiList(kanji);
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage("관리자 목록을 불러오지 못했습니다.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setSearchKey("reading");
    setKeyword("");
    setSelectedItemNoList([]);
    setCheckMode(false);
    setPage(1);
  }, [contentType]);

  useEffect(() => {
    setSelectedItemNoList([]);
    setPage(1);
  }, [level]);

  const normalizedItemList = useMemo(() => {
    if (contentType === "WORD") {
      return wordList.map((word) => ({
        itemNo: word.wordNo,
        itemText: word.wordText,
        readingText: word.furigana || "",
        meaningText: word.meaningText || "",
        jlptLevel: word.jlptLevel || "N5",
        searchText: word.wordText || "",
        searchReading: word.furigana || "",
        searchMeaning: word.meaningText || "",
      }));
    }

    return kanjiList.map((kanji) => ({
      itemNo: kanji.kanjiNo,
      itemText: kanji.kanjiText,
      readingText: [
        kanji.onReading ? `음독: ${kanji.onReading}` : "",
        kanji.kunReading ? `훈독: ${kanji.kunReading}` : "",
      ]
        .filter(Boolean)
        .join(" / "),
      meaningText: kanji.meaningText || "",
      jlptLevel: kanji.jlptLevel || "N5",
      searchText: kanji.kanjiText || "",
      searchReading: `${kanji.onReading || ""} ${kanji.kunReading || ""}`,
      searchMeaning: kanji.meaningText || "",
    }));
  }, [contentType, wordList, kanjiList]);

  const filteredItemList = useMemo(() => {
    const trimKeyword = keyword.trim().toLowerCase();

    return normalizedItemList.filter((item) => {
      if (item.jlptLevel !== level) {
        return false;
      }

      if (!trimKeyword) {
        return true;
      }

      const text = item.searchText.toLowerCase();
      const reading = item.searchReading.toLowerCase();
      const meaning = item.searchMeaning.toLowerCase();

      if (searchKey === "reading") {
        return reading.includes(trimKeyword);
      }

      if (searchKey === "word" || searchKey === "kanji") {
        return text.includes(trimKeyword);
      }

      if (searchKey === "meaning") {
        return meaning.includes(trimKeyword);
      }

      return (
        text.includes(trimKeyword) ||
        reading.includes(trimKeyword) ||
        meaning.includes(trimKeyword)
      );
    });
  }, [normalizedItemList, level, keyword, searchKey]);

  const totalPage = Math.max(Math.ceil(filteredItemList.length / PAGE_SIZE), 1);
  const currentPage = Math.min(page, totalPage);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const currentItemList = filteredItemList.slice(
    startIndex,
    startIndex + PAGE_SIZE
  );

  const changeContentType = (nextType) => {
    if (contentType === nextType) return;

    setContentType(nextType);
  };

  const toggleCheckMode = () => {
    setCheckMode((prev) => !prev);
    setSelectedItemNoList([]);
  };

  const toggleSelectedItem = (itemNo) => {
    setSelectedItemNoList((prev) => {
      if (prev.includes(itemNo)) {
        return prev.filter((selectedNo) => selectedNo !== itemNo);
      }

      return [...prev, itemNo];
    });
  };

  const handleItemClick = (itemNo) => {
    if (checkMode) {
      toggleSelectedItem(itemNo);
      return;
    }

    navigate(`/admin/study-items/${contentType}/${itemNo}`);
  };

  const searchItems = (e) => {
    e.preventDefault();
    setPage(1);
  };

  const deleteSelectedItems = () => {
    if (selectedItemNoList.length === 0) return;

    alert(
      `${contentType === "WORD" ? "단어" : "한자"} ${
        selectedItemNoList.length
      }개 선택 삭제 API는 다음 단계에서 연결합니다.`
    );
  };

  if (!loginMember || loginMember.memberRole !== "ADMIN") {
    return (
      <div className="admin-page">
        <PageHeader title="관리자" />

        <main className="admin-main">
          <section className="admin-card">
            <h2>접근 권한이 없습니다.</h2>
            <p>관리자 계정으로 로그인해야 합니다.</p>

            <button type="button" onClick={() => navigate("/")}>
              홈으로 이동
            </button>
          </section>
        </main>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <PageHeader title="학습자료 관리" />

      <main className="admin-main">
        <section className="admin-toolbar-card">
          <div className="admin-level-tabs">
            {LEVEL_LIST.map((levelItem) => (
              <button
                key={levelItem}
                className={level === levelItem ? "active" : ""}
                type="button"
                onClick={() => setLevel(levelItem)}
              >
                {levelItem}
              </button>
            ))}
          </div>

          <div className="admin-control-row">
            <div className="admin-left-controls">
              <div className="admin-type-toggle">
                <button
                  className={contentType === "WORD" ? "active" : ""}
                  type="button"
                  onClick={() => changeContentType("WORD")}
                >
                  단어
                </button>

                <button
                  className={contentType === "KANJI" ? "active" : ""}
                  type="button"
                  onClick={() => changeContentType("KANJI")}
                >
                  한자
                </button>
              </div>

              <button
                className={`admin-check-toggle ${checkMode ? "active" : ""}`}
                type="button"
                onClick={toggleCheckMode}
              >
                {checkMode ? "체크 ON" : "체크 OFF"}
              </button>

              {checkMode && (
                <button
                  className="admin-delete-selected-button"
                  type="button"
                  disabled={selectedItemNoList.length === 0}
                  onClick={deleteSelectedItems}
                >
                  선택 삭제
                  {selectedItemNoList.length > 0 &&
                    ` (${selectedItemNoList.length})`}
                </button>
              )}
            </div>

            <form className="admin-search-area" onSubmit={searchItems}>
              <select
                value={searchKey}
                onChange={(e) => {
                  setSearchKey(e.target.value);
                  setPage(1);
                }}
              >
                {contentType === "WORD" ? (
                  <>
                    <option value="reading">발음</option>
                    <option value="word">단어</option>
                    <option value="meaning">뜻</option>
                    <option value="all">전체</option>
                  </>
                ) : (
                  <>
                    <option value="reading">발음</option>
                    <option value="kanji">한자</option>
                    <option value="meaning">뜻</option>
                    <option value="all">전체</option>
                  </>
                )}
              </select>

              <input
                type="text"
                value={keyword}
                onChange={(e) => {
                  setKeyword(e.target.value);
                  setPage(1);
                }}
                placeholder={
                  contentType === "WORD"
                    ? "예: な, はなす, 말하다"
                    : "예: ニチ, ひ, 날"
                }
              />

              <button type="submit">검색</button>
            </form>
          </div>
        </section>

        <section className="admin-card">
          <div className="admin-title-row">
            <div>
              <h2>{contentType === "WORD" ? "단어 목록" : "한자 목록"}</h2>
              <p>
                {level} · 총 {filteredItemList.length}개 · {currentPage} /{" "}
                {totalPage}페이지
              </p>
            </div>

            <button
              type="button"
              onClick={() => alert("등록 페이지는 다음 단계에서 만듭니다.")}
            >
              {contentType === "WORD" ? "단어 등록" : "한자 등록"}
            </button>
          </div>
        </section>

        {loading && <p className="admin-message">목록을 불러오는 중입니다...</p>}

        {errorMessage && <p className="admin-message">{errorMessage}</p>}

        {!loading && !errorMessage && (
          <>
            <section
              className={`admin-table-card ${checkMode ? "check-mode" : ""}`}
            >
              <div className="admin-table-head">
                {checkMode && <span>선택</span>}
                <span>자료</span>
                <span>발음</span>
                <span>뜻</span>
              </div>

              <div className="admin-table-body">
                {currentItemList.length === 0 ? (
                  <div className="admin-empty-row">조회된 자료가 없습니다.</div>
                ) : (
                  currentItemList.map((item) => {
                    const checked = selectedItemNoList.includes(item.itemNo);

                    return (
                      <button
                        key={`${contentType}-${item.itemNo}`}
                        className={`admin-table-row ${
                          checked ? "selected" : ""
                        }`}
                        type="button"
                        onClick={() => handleItemClick(item.itemNo)}
                      >
                        {checkMode && (
                          <span className="admin-check-cell">
                            <span
                              className={`admin-checkbox ${
                                checked ? "checked" : ""
                              }`}
                            >
                              {checked ? "✓" : ""}
                            </span>
                          </span>
                        )}

                        <span className="admin-item-text">{item.itemText}</span>
                        <span>{item.readingText || "-"}</span>
                        <span>{item.meaningText || "-"}</span>
                      </button>
                    );
                  })
                )}
              </div>
            </section>

            <div className="admin-pagination">
              <button
                type="button"
                disabled={currentPage <= 1}
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              >
                이전
              </button>

              <span>
                {currentPage} / {totalPage}
              </span>

              <button
                type="button"
                disabled={currentPage >= totalPage}
                onClick={() => setPage((prev) => Math.min(prev + 1, totalPage))}
              >
                다음
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default AdminStudyItemPage;