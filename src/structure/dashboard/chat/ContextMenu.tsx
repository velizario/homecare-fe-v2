import React, { createContext, SetStateAction, useContext, useEffect,  useRef, useState } from "react";
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
  target: string;
};
const MenuContext = createContext({} as TMenuContext);

export default function ContextMenu({ target, children, className }: contextMenuProps) {
  const [menuActive, setMenuActive] = useState(false);

  const ref = useRef<null | HTMLDivElement>(null);

  // Remove menu on click and escape
  const removeMenu = () => {
    setMenuActive(false);
    removeListeners();
  };

  const handleEscapeButton = (e: KeyboardEvent) => e.key === "Escape" && removeMenu();
  const handleClickButton = (e: MouseEvent) => ref.current && !ref.current.contains(e.target as Node) && removeMenu();

  const removeListeners = () => {
    document.body.removeEventListener("click", handleClickButton);
    document.body.removeEventListener("keydown", handleEscapeButton);
  };

  useEffect(() => {
    if (!menuActive) return;
    document.body.addEventListener("click", handleClickButton);
    document.body.addEventListener("keydown", handleEscapeButton);

    return () => removeListeners();
  }, [menuActive]);
  // End Remove menu on click and escape

  return (
    <MenuContext.Provider value={{ menuActive, setMenuActive, target }}>
      <div ref={ref} className={classNames(className, "menu-container")}>
        {children}
      </div>
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
  const {menuActive, target} = useContext(MenuContext);
  
  const ref = useRef<null | HTMLDivElement>(null);

  // adjust menu position when getting out of parent container(target)
  useEffect(() => {
    const menuContainer = ref.current?.closest(".menu-container");
    if (!menuActive || !ref.current || !menuContainer) return;
    // remove relative position from parent to calculate 'offsetLeft' properly from the message container
    menuContainer.classList.remove("relative")
    ref.current.classList.add("opacity-0")
    const menuButtonWidth = ref.current.parentElement?.querySelector(".menu-button")?.clientWidth || 0;
    const menuButtonHeight = ref.current.parentElement?.querySelector(".menu-button")?.clientHeight || 0;
    const containerWidth = document.querySelector(target)?.clientWidth;
    const containerHeight = (document.querySelector(target)?.clientHeight || 0) + (document.querySelector(target)?.scrollTop || 0);
    const menuRightPosition = ref.current.offsetLeft;
    const menuBottomPosition = ref.current.offsetTop;
    const menuWidth = ref.current.offsetWidth;
    const menuHeight = ref.current.offsetHeight;
    console.log(containerWidth, menuRightPosition, menuWidth);
    menuContainer.classList.add("relative")
    const menuPositionLeft = containerWidth && menuRightPosition && containerWidth - menuRightPosition < menuWidth ? `${-menuWidth+menuButtonWidth/2}px` : `${menuButtonWidth/2}px`; //better to take 10px size from button via queryselector(button class)
    const menuPositionTop = containerHeight && menuBottomPosition && containerHeight - menuBottomPosition < menuHeight ? `${-menuHeight+menuButtonHeight}px` : `${menuButtonHeight}px`; //same
    ref.current.style.left = menuPositionLeft;
    ref.current.style.top = menuPositionTop;
    ref.current.classList.add("opacity-100")

  }, [menuActive, ref.current, children]);

  return (
    <>
      {menuActive && (
        <div ref={ref} className={classNames(className, "z-50 absolute min-w-[6rem] rounded-lg border bg-white py-1 text-gray-800 transition-opacity shadow-lg")}>
          {children}
        </div>
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
      className={classNames(className, "menu-button")}
      onClick={(e) => {
        setMenuActive(state => !state);
      }}
    >
      {children}
    </button>
  );
};
ContextMenu.Button = Button;
