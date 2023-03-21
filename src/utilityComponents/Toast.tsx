import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type MessageType = "success" | "info" | "error" | "warning";

export function toasted(message: string, messageType: MessageType = "info") {
  toast[messageType](message);
}

export default function Toaster() {
  return (
    <>
      <ToastContainer
        position="bottom-left"
        autoClose={4000}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Slide}
      />
    </>
  );
}
