import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import classNames from "../../../helpers/classNames";

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
    text: "sdgasdgasdga,sadfasdf asd fasdf asdf as df as dg as, dga ,sdg, asdg",
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
];

export default function Messages() {
  return (
    <div className="hidden md:flex flex-col border w-full px-4">
      <div className="relative flex items-center space-x-3 border-b mb-2 py-4 focus-within:ring-2 focus-within:ring-inset focus-within:ring-pink-500 ">
        <img
          className="flex-shrink-0 h-10 w-10 rounded-full"
          src="https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt=""
        />
        <div className="w-44 truncate">
          <a className="focus:outline-none">
            {/* Extend touch target to entire panel */}
            <span className="absolute inset-0" aria-hidden="true" />
            <p className="text-sm font-medium text-gray-900 truncate">
              Leslie Alexand
            </p>
          </a>
        </div>
      </div>
      <div className="flex flex-col">
        {messages.map((message) => {
          return (
            <div
              className={classNames(
                message.type === "out"
                  ? "items-end self-end"
                  : "self-start items-start",
                "flex flex-col gap-1 mb-4 w-full max-w-xs"
              )}
            >
              <p
                className={classNames(
                  message.type === "out"
                    ? "bg-indigo-600 text-gray-200"
                    : "bg-gray-200 text-gray-800",
                  "py-2 px-4 rounded-3xl text-sm max-w-chat md:max-w-chat-md"
                )}
              >
                {message.text}
              </p>
              <p
                className={classNames(
                  message.type === "out" ? "pr-2" : "pl-2",
                  "text-xs text-gray-500"
                )}
              >
                {message.date}
              </p>
            </div>
          );
        })}
      </div>
      <div className="relative flex items-center gap-1">
        <input
          type="text"
          placeholder="Aa"
          className="w-full rounded-full border-indigo-300 border-2 focus:ring-0 focus:border-indigo-500 transition-colors duration-200 text-sm text-gray-700"
        />
        <PaperAirplaneIcon className="h-6 w-6 text-indigo-500"></PaperAirplaneIcon>
      </div>
    </div>
  );
}
