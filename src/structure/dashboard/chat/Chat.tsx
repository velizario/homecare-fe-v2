import ChatBuddies from "./ChatBuddies";
import Messages from "./Messages";

export default function Chat() {
    return (
    <div className="flex w-full">
        <ChatBuddies />
        <Messages/>
    </div>)
}