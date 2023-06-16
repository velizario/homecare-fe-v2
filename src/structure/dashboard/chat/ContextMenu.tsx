import React, { createContext, SetStateAction, useContext, useEffect, useState } from "react";
import create from "zustand";
import classNames from "../../../helpers/classNames";

// RFC props
type contextMenuProps = {
  target: string;
  children: React.ReactNode;
  className: string;
};

// Menu context

type TMenuContext = {
  menuActive: boolean;
  setMenuActive: React.Dispatch<SetStateAction<boolean>>;
};
const MenuContext = createContext({} as TMenuContext);

// Menu state
// type TMenuState = {
//   displayMenu: boolean;
//   setDisplayMenu: (toState: boolean) => void;
// };

// const useMenuState = create<TMenuState>((set) => ({
//   displayMenu: false,
//   setDisplayMenu: (toState: boolean) => set({ displayMenu: toState }),
// }));

const innerHtml = `
<a class="text-xs font-medium block cursor-pointer px-2 py-1.5 rounded hover:bg-gray-100">Редактирай</a>
<a class="text-xs font-medium block cursor-pointer px-2 py-1.5 rounded hover:bg-gray-100">Изтрий</a>
`;

const contextMenuEl = document.createElement("div");
let activeMenuContainer = null as null | HTMLButtonElement;
// let activeMenuContainer = null as null | HTMLButtonElement;
contextMenuEl.className = "absolute p-2 bg-white transition-opacity rounded-lg border min-w-[6rem] text-gray-800";
contextMenuEl.innerHTML = innerHtml;

export default function ContextMenu({ target, children, className }: contextMenuProps) {
  function contextMenuHandler(ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    console.log(ev.target);
    // ev.stopPropagation();
    // activeMenuContainer?.classList.add("text-transparent");
    // ev.currentTarget.classList.remove("text-transparent");
    // activeMenuContainer = ev.currentTarget;
    // contextMenuEl.classList.remove("opacity-100");
    // contextMenuEl.classList.add("opacity-0");
    // activeMenuContainer.append(contextMenuEl);
    // createRoot(activeMenuContainer).render(children)
    const containerWidth = document.querySelector(target)?.clientWidth;
    const containerHeight = (document.querySelector(target)?.clientHeight || 0) + (document.querySelector(target)?.scrollTop || 0);
    const menuRightPosition = activeMenuContainer?.offsetLeft;
    const menuBottomPosition = activeMenuContainer?.offsetTop;
    const menuWidth = contextMenuEl.offsetWidth;
    const menuHeight = contextMenuEl.offsetHeight;
    console.log(containerWidth, menuRightPosition, menuWidth);
    const menuPositionLeft = containerWidth && menuRightPosition && containerWidth - menuRightPosition < menuWidth ? `${-menuWidth + 10}px` : "10px";
    const menuPositionTop = containerHeight && menuBottomPosition && containerHeight - menuBottomPosition < menuHeight ? `${-menuHeight}px` : "20px";
    contextMenuEl.style.left = menuPositionLeft;
    contextMenuEl.style.top = menuPositionTop;
    // contextMenuEl.classList.add("opacity-100");
  }

  // Remove menu on click and escape
  const removeMenu = () => {
    console.log("removing menu");
    setMenuActive(false);
  };

  useEffect(() => {
    document.body.addEventListener("click", removeMenu);
    document.body.addEventListener("keydown", (e) => {
      if (e.key === "Escape") removeMenu();
    });

    return () => {
      console.log("removing listeners");
      document.body.removeEventListener("click", removeMenu);
      document.body.removeEventListener("keydown", removeMenu);
    };
  }, []);
  
  const [menuActive, setMenuActive] = useState(false);

  return (
    <MenuContext.Provider value={{ menuActive, setMenuActive }}>
      <div className={className}>{children}</div>
    </MenuContext.Provider>
  );
}

// Subcomponent Props
type SubComponentProps = {
  children: React.ReactNode;
  className?: string;
};

// Content Subcomponent
const Content: React.FC<SubComponentProps> = ({ children, className }) => {
  const menuActive = useContext(MenuContext).menuActive;
  return (
    <>
      {" "}
      {menuActive && (
        <div className={classNames(className, "absolute min-w-[6rem] rounded-lg border bg-white p-2 text-gray-800 transition-opacity")}>{children}</div>
      )}
    </>
  );
};
ContextMenu.Content = Content;

// Button Subcomponent
const Button: React.FC<SubComponentProps> = ({ children, className }) => {
  const setMenuActive = useContext(MenuContext).setMenuActive;
  return (
    <button
      className={classNames(className, "relative")}
      onClick={(e) => {
        e.stopPropagation();
        setMenuActive(true);
      }}
    >
      {children}
    </button>
  );
};
ContextMenu.Button = Button;
