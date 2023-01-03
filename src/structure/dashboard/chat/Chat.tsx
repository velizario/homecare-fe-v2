import { useState } from "react";
import ChatBuddies from "./ChatBuddies";
import Messages from "./Messages";

export default function Chat() {
  const [chatIsActive, setChatIsActive] = useState(false);

  const toggleChat = () => {
    setChatIsActive(toggle => !toggle);
  };

  console.log(chatIsActive)

  return (
    <div className="flex">
      <ChatBuddies toggleChat={toggleChat} chatIsActive={chatIsActive} />
      <Messages toggleChat={toggleChat} chatIsActive={chatIsActive} />
    </div>
  );
}
