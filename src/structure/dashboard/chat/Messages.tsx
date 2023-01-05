import { FaceSmileIcon, ArrowSmallLeftIcon } from "@heroicons/react/24/outline";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import classNames from "../../../helpers/classNames";
import data from '@emoji-mart/data/sets/14/native.json'
import Picker from '@emoji-mart/react'
import throttle from 'lodash.throttle'
import React from "react";

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
  }, {
    id: 9,
    text: "!!!!sdgasdgasdga, asdg as,dga ,sdg, asdg",
    date: "2:35 AM",
    type: "in",
  }, {
    id: 10,
    text: "!!!!sdgasdgasdga, asdg as,dga ,sdg, asdg",
    date: "2:35 AM",
    type: "out",
  }, {
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

type MessagesProps = {
  toggleChat: () => void;
  chatIsActive: boolean;
};

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
  const [messageAdded, setMessageAdded] = useState(1);
  const [chatContent, setChatContent] = useState(messages);
  const inputRef = useRef<null | HTMLTextAreaElement>(null);
  const formRef = useRef<null | HTMLFormElement>(null);
  const chatRef = useRef<null | HTMLUListElement>(null);
  let emojiRE = /(\p{Emoji_Presentation}|\p{Extended_Pictographic}|\p{Emoji_Presentation}|\u{FE0F}|\u{200d})/gu;
  
  const scrollChatToBottom = () => {
    if (!chatRef.current) return;
    chatRef.current.scrollTo({
      left: 0,
      top: chatRef.current.scrollHeight,
    })
  }

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
    inputRef.current?.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) return
        // avoids leaving enter in input element after form is submitted
        e.preventDefault()
        // submits form on enter for desktop
        formRef.current?.requestSubmit();
      }
    })
  }, [])
  
  useEffect(() => {
    // chatRef.current.scrollTop = chatRef.current.scrollHeight;
    scrollChatToBottom()
  }, [chatContent])

  
  useLayoutEffect(() => {
    // adjust automatically chat input height and keep chat window scrolled at the end
    if (!inputRef.current || !chatRef.current) return;
    let scrollTo;
    // detect scrolled position of chat window 
    let atBottom = chatRef.current?.scrollHeight - chatRef.current?.clientHeight - chatRef.current?.scrollTop
    // save chatwindow height if it is scrolled at the bottom
    if (atBottom < 10) scrollTo = chatRef.current?.scrollHeight
    // set automatically input height based on the text inside. Minimum height is 36px
    inputRef.current.style.height = '36px';
    inputRef.current.style.height = inputRef.current.scrollHeight + 'px';;
    // push chat window if it was at the bottom, in case input height has changed
    if (atBottom < 10)
      chatRef.current.scrollTo({
        left: 0,
        top: scrollTo,
      })
  }, [messageText])

  const handleChat: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setMessageText(e.target.value)
  }

  const addMessage = () => {
    if (messageText.length === 0) return;
    let newId = chatContent[chatContent.length - 1].id + 1;
    setChatContent(chat =>
      [...chat, {
        id: newId,
        text: messageText,
        date: "12:35 AM",
        type: "in",
      }]);
    setMessageText("")
    setMessageAdded(count => count + 1)
  }

  const toggleEmoji = throttle((toggle: "on" | "off" | "toggle") => {
    // use throttle as toggleEmoji is called also by onClickOutside and is potentially executed two times
    setEmojiActive(active => (
      toggle === "off" ? false :
        toggle === "on" ? true :
          toggle === "toggle" && !active
    ))
  }, 50, { trailing: false })

  const selectEmoji = (data: Emojis) => {
    setMessageText(text => text + data.native);
    console.log(data)
    // inputRef.current?.focus()
  }



  return (
    // TODO fix the view for mobile - right now using fixed as workaround. Remove the stuff like headers and footers and such.
    <div className={classNames(!chatIsActive ? "hidden" : "flex z-50 bg-white", "md:flex flex-col border w-full pb-4 h-[calc(100dvh-88px)]")}>
      {/* Selected person for chat */}
      <div className="relative flex items-center space-x-3 border-b mb-2 md:py-4 py-1 justify-between md:justify-end focus-within:ring-2 focus-within:ring-inset focus-within:ring-pink-500  px-4">
        <ArrowSmallLeftIcon onClick={() => { toggleChat() }} className="md:hidden h-6 w-6 text-indigo-500" />
        <div className="flex items-center gap-2">
          <img
            className="flex-shrink-0 h-10 w-10 rounded-full"
            src="https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
          />
          <p className="text-sm font-medium text-gray-900 truncate">
            Leslie Alexand
          </p>
        </div>
      </div>
      {/* Chat window */}
      <ul ref={chatRef} className="flex flex-col overflow-y-auto  px-4">
        {chatContent.map((message) => {
          return (
            <li
              key={message.id}
              className={classNames(
                message.type === "out"
                  ? "items-end self-end"
                  : "self-start items-start",
                "flex flex-col gap-1 mb-4 w-full max-w-xs"
              )}
            >
              <div className="flex items-end gap-1">
                <img
                  className={classNames(message.type === "out" ? "hidden" : "flex-shrink-0 h-7 w-7 rounded-full")}
                  src="https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
                <p
                  className={classNames(
                    message.type === "out"
                      ? "bg-indigo-600 text-gray-200"
                      : "bg-gray-200 text-gray-800",
                    message.text.replace(emojiRE, '').length === 0 ? "text-4xl bg-transparent p-0" :
                      "py-2 px-4 rounded-2xl text-sm max-w-chat md:max-w-chat-md break-words whitespace-pre-line shadow-md",
                  )}
                >
                  {message.text}
                </p>
              </div>

              <p
                className={classNames(
                  message.type === "out" ? "pr-2" : "pl-2",
                  "text-xs text-gray-500"
                )}
              >
                {message.date}
              </p>
            </li>
          );
        })}

        {/* <ScrollIntoView messageAdded={messageAdded} /> */}
      </ul>
      {/* Chat input */}
      <div className="flex items-end gap-2 px-4">
        <form ref={formRef} onSubmit={() => addMessage()} className="flex w-full gap-2 items-end">
          <div className="h-10 flex items-center relative">
            <FaceSmileIcon onClick={() => toggleEmoji("toggle")} className="cursor-pointer h-7 w-7 text-indigo-500" />
            <div className={classNames(emojiActive ? "block" : "hidden", "absolute transform bottom-0 -translate-y-11")} >
              {/* <EmojiPicker onEmojiClick={selectEmoji} /> */}
              <Picker set="native" onClickOutside={() => toggleEmoji("off")} data={data} onEmojiSelect={selectEmoji} />
            </div>
          </div>
          <div className="w-full flex items-center overflow-hidden pr-4 rounded-2xl border-indigo-300 border-2  focus:border-indigo-500 transition-colors duration-200 text-sm text-gray-700">
            <textarea
              id="textarea"
              value={messageText}
              ref={inputRef}
              onChange={handleChat}
              placeholder="Aa"
              className="resize-none min-h-[36px] py-1 pt-1.5 h-9 max-h-28 overflow-auto w-full border-none focus:outline-none focus:ring-0"
            />
          </div>
          <button type="submit" className="h-10">
            <PaperAirplaneIcon onClick={() => addMessage()} className="h-9 w-9 p-1 text-indigo-500 cursor-pointer"></PaperAirplaneIcon>
          </button>
        </form>
      </div>
    </div>
  );
}
