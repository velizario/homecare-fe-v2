import { Transition } from '@headlessui/react'
import classNames from '../helpers/classNames';

interface TransitionWrapperProps {
    children: React.ReactNode;
    visible: boolean;
    btnNext?: () => void
}

export default function TransitionWrapper({ children, visible, btnNext }: TransitionWrapperProps) {

    return (
        <Transition
            className="overflow-x-clip px-0.5 mx-auto absolute w-full left-0 top-0"
            show={visible}
        >
            <Transition.Child
                enter="transition duration-400 delay-300"
                enterFrom="translate-x-10 opacity-0"
                enterTo="opacity-100 translate-x-0"
                leave="transition duration-300"
                leaveFrom="translate-x-0 opacity-100"
                leaveTo="-translate-x-10 opacity-0"
            >
                {children}
                <div className="flex justify-between mt-5">
                    {/* <button className="ml-2">Назад</button> */}
                    <button
                        type="button"
                        onClick={btnNext}
                        className={classNames("inline-flex justify-center w-full max-w-sm sm:max-w-xs items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2", (btnNext == null) ? "hidden" : "")}
                    >
                        Напред
                    </button>
                </div>
            </Transition.Child>
        </Transition>
    )
}