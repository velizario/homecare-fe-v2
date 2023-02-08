import { useEffect } from "react";
import classNames from "../../helpers/classNames";
import CreateOrderInput from "./CreateOrderInput";

interface CreateOrderProps {
    inputModalOpened: boolean;
    openInputModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CreateOrder({
    inputModalOpened,
    openInputModal,
}: CreateOrderProps) {
    const dismissModal = (e: MouseEvent) => {
        const clickedInside =
            (e.target as HTMLElement).closest(".create-order-input") !== null;
        if (!clickedInside) openInputModal(false);
    };

    useEffect(() => {
        if (inputModalOpened) document.addEventListener("click", dismissModal);
        return () => {
            document.removeEventListener("click", dismissModal);
        };
    }, [inputModalOpened]);

    console.log(inputModalOpened);

    return (
        <>
            <div
                className={classNames(
                    "animate-backdrop top-0 left-0 z-20 h-full w-full bg-black",
                    inputModalOpened ? "fixed" : "hidden"
                )}
            ></div>
            <div
                className={classNames(
                    "animate-register-form opacity-0 create-order-input left-1/2 top-0 bottom-0 z-30 w-full max-w-xl -translate-x-1/2 overflow-y-scroll overscroll-contain bg-white py-10 sm:mt-10 sm:mb-10 sm:px-10",
                    inputModalOpened ? "absolute" : "hidden"
                )}
            >
                <CreateOrderInput openInputModal={openInputModal}/>
            </div>
        </>
    );
}
