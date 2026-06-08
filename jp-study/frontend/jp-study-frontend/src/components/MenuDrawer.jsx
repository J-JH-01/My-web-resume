import { useNavigate } from "react-router-dom";

function MenuDrawer({ isOpen, onClose }) {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const menuList = [
    { label: "히라가나", icon: "あ", path: "/hiragana", color: "blue" },
    { label: "가타카나", icon: "ア", path: "/katakana", color: "pink" },
    { label: "단어", icon: "単", path: "/words", color: "green" },
    { label: "한자", icon: "漢", path: "/kanji", color: "orange" },
    { label: "퀴즈", icon: "Q", path: "/quiz", color: "red" },
  ];

  const movePage = (path) => {
    navigate(path);
    onClose();
  };

  return (
    <div className="menu-layer" onClick={onClose}>
      <aside className="menu-popover" onClick={(e) => e.stopPropagation()}>
        {menuList.map((menu) => (
          <button
            key={menu.path}
            className="menu-popover-item"
            type="button"
            onClick={() => movePage(menu.path)}
          >
            <span className={`menu-popover-icon ${menu.color}`}>{menu.icon}</span>
            <span>{menu.label}</span>
          </button>
        ))}
      </aside>
    </div>
  );
}

export default MenuDrawer;