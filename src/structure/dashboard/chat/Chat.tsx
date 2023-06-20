import { useState } from "react";
import ChatBuddies from "./ChatBuddies";
import Messages from "./Messages";

export default function Chat() {
  const [chatIsActive, setChatIsActive] = useState(false);

  const toggleChat = () => {
    setChatIsActive(toggle => !toggle);
  };


  return (
    <div className="flex h-[calc(100vh-116px)] overflow-none">
      <ChatBuddies toggleChat={toggleChat} chatIsActive={chatIsActive} />
      <Messages toggleChat={toggleChat} chatIsActive={chatIsActive} />
    </div>
  );
}
