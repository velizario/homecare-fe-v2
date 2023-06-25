import { FaceSmileIcon, ArrowSmallLeftIcon } from "@heroicons/react/24/outline";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import classNames from "../../../helpers/classNames";
import data from "@emoji-mart/data/sets/14/native.json";
import Picker from "@emoji-mart/react";
import throttle from "lodash.throttle";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import ContextMenu from "./ContextMenu";
import MessagesOrderDetails, { messageOrderOpenState } from "./MessagesOrderDetails";
import ButtonDefault from "../../../utilityComponents/CustomButton";

const messages = [
  {
    id: 1,
    text: "sdgasdgasdga, asdg as,dga ,sdg, asdg",
    date: "12:35 AM",
    type: "in",
  },
  {
    id: 2,
    text: "sdgasdgasd ga, asdg as,dga ,sdg sad fas df as df asd f asdf asdf asdf asdf sd , asdg",
    date: "2:35 AM",
    type: "out",
  },
  {
    id: 3,
    text: `sdgasdgasdga,sadfasdf asd fasdf asdf as df as dg as, dga ,sdg, asdg `,
    date: "2:35 AM",
    type: "in",
  },
  {
    id: 4,
    text: "sdgasdgasdga, asdga sdfasdf asdfa sdfasd  as,dga ,sdg, asdg",
    date: "2:35 PM",
    type: "in",
  },
  {
    id: 5,
    text: "sdgasdgasdga, asdg as,dga ,sdg, asdg",
    date: "5:45 PM",
    type: "in",
  },
  {
    id: 6,
    text: "sdgasdgasdga, asdg as,dga ,sdg, asdg",
    date: "2:35 AM",
    type: "out",
  },
  {
    id: 7,
    text: "sdgasdgasdga, asdg as,dga ,sdg, asdg",
    date: "2:35 AM",
    type: "out",
  },
  {
    id: 8,
    text: "!!!!sdgasdgasdga, asdg as,dga ,sdg, asdg",
    date: "2:35 AM",
    type: "out",
  },
  {
    id: 9,
    text: "!!!!sdgasdgasdga, asdg as,dga ,sdg, asdg",
    date: "2:35 AM",
    type: "in",
  },
  {
    id: 10,
    text: "!!!!sdgasdgasdga, asdg as,dga ,sdg, asdg",
    date: "2:35 AM",
    type: "out",
  },
  {
    id: 11,
    text: "!!!!sdga12312 123123123 12sd 😆😀😅🤣😂🙂😅😅🥶🥶 gasdga, asdg as,dga ,sdg, asdg",
    date: "2:35 AM",
    type: "in",
  },
  {
    id: 12,
    text: "😀",
    date: "2:35 AM",
    type: "in",
  },
];

interface MessagesProps {
  toggleChat: () => void;
  chatIsActive: boolean;
}

interface Emojis {
  id: string;
  keywords: string[];
  name: string;
  native: string;
  shortcodes: string;
  unified: string;
}

export default function Messages({ toggleChat, chatIsActive }: MessagesProps) {
  const [emojiActive, setEmojiActive] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [chatContent, setChatContent] = useState(messages);
  const [isOpen, setIsOpen] = messageOrderOpenState((state) => [state.isOpen, state.setIsOpen]);
  const inputRef = useRef<null | HTMLTextAreaElement>(null);
  const formRef = useRef<null | HTMLFormElement>(null);
  const chatRef = useRef<null | HTMLUListElement>(null);
  const emojiRE = /(\p{Emoji_Presentation}|\p{Extended_Pictographic}|\p{Emoji_Presentation}|\u{FE0F}|\u{200d})/gu;

  const scrollChatToBottom = () => {
    if (chatRef.current == null) return;
    chatRef.current.scrollTo({
      left: 0,
      top: chatRef.current.scrollHeight,
    });
  };

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    inputRef.current?.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) return;
        // avoids leaving enter in input element after form is submitted
        e.preventDefault();
        // submits form on enter for desktop
        formRef.current?.requestSubmit();
      }
    });
  }, []);

  useEffect(() => {
    // chatRef.current.scrollTop = chatRef.current.scrollHeight;
    scrollChatToBottom();
  }, [chatContent]);

  useLayoutEffect(() => {
    // adjust automatically chat input height and keep chat window scrolled at the end
    if (inputRef.current == null || chatRef.current == null) return;
    let scrollTo;
    // detect scrolled position of chat window
    const atBottom = chatRef.current?.scrollHeight - chatRef.current?.clientHeight - chatRef.current?.scrollTop;
    // save chatwindow height if it is scrolled at the bottom
    if (atBottom < 10) scrollTo = chatRef.current?.scrollHeight;
    // set automatically input height based on the text inside. Minimum height is 36px
    inputRef.current.style.height = "36px";
    inputRef.current.style.height = inputRef.current.scrollHeight.toString() + "px";
    // push chat window if it was at the bottom, in case input height has changed
    if (atBottom < 10)
      chatRef.current.scrollTo({
        left: 0,
        top: scrollTo,
      });
  }, [messageText]);

  const handleChat: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setMessageText(e.target.value);
  };

  const addMessage = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    if (messageText.length === 0) return;
    const newId = chatContent[chatContent.length - 1].id + 1;
    setChatContent((chat) => [
      ...chat,
      {
        id: newId,
        text: messageText,
        date: "12:35 AM",
        type: "in",
      },
    ]);
    setMessageText("");
  };

  const toggleEmoji = throttle(
    (toggle: "on" | "off" | "toggle") => {
      // use throttle as toggleEmoji is called also by onClickOutside and is potentially executed two times
      setEmojiActive((active) => (toggle === "off" ? false : toggle === "on" ? true : toggle === "toggle" && !active));
    },
    50,
    { trailing: false }
  );

  const selectEmoji = (data: Emojis) => {
    setMessageText((text) => text + data.native);
    // inputRef.current?.focus()
  };

  return (
    // TODO fix the view for mobile - right now using fixed as workaround. Remove the stuff like headers and footers and such.
    <div className={classNames(!chatIsActive ? "hidden" : "z-50 flex ", "w-full flex-col  pl-2 md:flex messages")}>
      {/* Selected person for chat */}
      <div className={classNames("mb-4 rounded-t-lg border bg-neutral-50 p-4")}>
        <MessagesOrderDetails></MessagesOrderDetails>
      </div>
      {/* Chat window */}
      <ul
        ref={chatRef}
        className={classNames(
          "message-container flex-col overflow-y-auto bg-neutral-50 p-2 transition-opacity duration-500 ",
          isOpen ? "pointer-events-none  opacity-0" : "opacity-100"
        )}
      >
        {chatContent.map((message) => {
          return (
            <li
              key={message.id}
              className={classNames(message.type === "out" ? "items-end self-end" : "items-start self-start", "mb-4 flex w-full flex-col gap-1")}
            >
              <div className="group flex items-end gap-1">
                <img
                  className={classNames(message.type === "out" ? "hidden" : "h-7 w-7 flex-shrink-0 rounded-full")}
                  src="https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
                <p
                  className={classNames(
                    message.type === "out" ? "order-2 bg-indigo-600 text-gray-50" : "bg-gray-200 text-gray-800",
                    message.text.replace(emojiRE, "").length === 0
                      ? "bg-transparent p-0 text-4xl"
                      : "w-full max-w-sm whitespace-pre-line break-words rounded-2xl px-4 py-2 text-sm shadow-sm",
                    "personal-message"
                  )}
                >
                  {message.text}
                </p>
                <ContextMenu target=".message-container" className="flex cursor-pointer self-center text-transparent group-hover:text-gray-800">
                  <ContextMenu.Button>
                    <EllipsisVerticalIcon className="h-6 w-6 rounded-full p-1 transition-colors hover:bg-gray-100" />
                  </ContextMenu.Button>
                  <ContextMenu.Content>
                    <a className="block cursor-pointer rounded px-2 py-1.5 text-xs font-medium hover:bg-gray-100">Редактирай</a>
                    <a className="block cursor-pointer rounded px-2 py-1.5 text-xs font-medium hover:bg-gray-100">Изтрий</a>
                  </ContextMenu.Content>
                </ContextMenu>
              </div>

              <p className={classNames(message.type === "out" ? "pr-2" : "pl-2", "text-xs text-gray-500 ")}>{message.date}</p>
            </li>
          );
        })}

        {/* <ScrollIntoView messageAdded={messageAdded} /> */}
      </ul>
      {/* Chat input */}
      <div
        className={classNames(
          "flex items-end gap-2 bg-neutral-50 px-4 pb-4 transition-opacity duration-500",
          isOpen ? "pointer-events-none  opacity-0" : "opacity-100"
        )}
      >
        <form ref={formRef} onSubmit={addMessage} className="flex w-full items-end gap-2">
          <div className="relative flex h-10 items-center">
            <FaceSmileIcon onClick={() => toggleEmoji("toggle")} className="h-7 w-7 cursor-pointer text-indigo-500" />
            <div className={classNames(emojiActive ? "block" : "hidden", "absolute bottom-0 -translate-y-11 transform")}>
              {/* <EmojiPicker onEmojiClick={selectEmoji} /> */}
              <Picker set="native" onClickOutside={() => toggleEmoji("off")} data={data} onEmojiSelect={selectEmoji} />
            </div>
          </div>
          <div className="flex w-full items-center overflow-hidden rounded-2xl border-2 border-indigo-300 bg-white pr-4  text-sm text-gray-700 transition-colors duration-200 focus:border-indigo-500">
            <textarea
              id="textarea"
              value={messageText}
              ref={inputRef}
              onChange={handleChat}
              placeholder="Aa"
              className="h-9 max-h-28 min-h-[36px] w-full resize-none overflow-auto border-none py-1 pt-1.5 focus:outline-none focus:ring-0"
            />
          </div>
          <button type="submit" className="h-10">
            <PaperAirplaneIcon className="h-9 w-9 cursor-pointer p-1 text-indigo-500"></PaperAirplaneIcon>
          </button>
        </form>
      </div>
    </div>
  );
}
