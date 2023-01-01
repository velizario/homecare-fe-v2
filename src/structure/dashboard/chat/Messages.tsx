import classNames from "../../../helpers/classNames"

const messages = [
    {
        id: 1,
        text: "sdgasdgasdga, asdg as,dga ,sdg, asdg",
        date: "12:35 AM",
        type: "in"
    },
    {
        id: 2,
        text: "sdgasdgasdga, asdg as,dga ,sdg, asdg",
        date: "2:35 AM",
        type: "out"
    },
    {
        id: 3,
        text: "sdgasdgasdga, asdg as,dga ,sdg, asdg",
        date: "2:35 AM",
        type: "in"
    },
    {
        id: 4,
        text: "sdgasdgasdga, asdg as,dga ,sdg, asdg",
        date: "2:35 PM",
        type: "in"
    },
    {
        id: 5,
        text: "sdgasdgasdga, asdg as,dga ,sdg, asdg",
        date: "5:45 PM",
        type: "in"
    },
    {
        id: 6,
        text: "sdgasdgasdga, asdg as,dga ,sdg, asdg",
        date: "2:35 AM",
        type: "out"
    },
]

export default function Messages() {
    return (
        <div className="p-4 border max-w-4xl w-full flex flex-col"> 
            {messages.map(message=> {
                return (
                    <div className={classNames(message.type === "out" ? "items-end self-end": "self-start items-start" ,"flex flex-col gap-1 mb-4 w-full max-w-xs")}>
                        <p className={classNames(message.type === "out" ? "bg-indigo-500 text-gray-100" : "bg-gray-200 text-gray-800","py-2 px-4 rounded-3xl text-sm")}>{message.text}</p>
                        <p className={classNames(message.type === "out" ? "pr-2" : "pl-2", "text-xs text-gray-500")}>{message.date}</p>
                    </div>
                )
            })}
        </div>)
}