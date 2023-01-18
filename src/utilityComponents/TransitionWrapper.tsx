import { Transition } from '@headlessui/react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { Fragment, useState } from 'react'
import classNames from '../helpers/classNames';

interface TransitionWrapperProps {
    children: React.ReactNode;
    visible: boolean;
    btnNext?: () => void
}

export default function TransitionWrapper({ children, visible, btnNext }: TransitionWrapperProps) {

    return (
        <Transition
            className="overflow-x-clip px-0.5"
            show={visible}
        >
            <Transition.Child
                enter="transition duration-400 delay-500"
                enterFrom="translate-x-10 opacity-0"
                enterTo="opacity-100 translate-x-0"
                leave="transition  duration-300 delay-200"
                leaveFrom="translate-x-0 opacity-100"
                leaveTo="-translate-x-10 opacity-0"
            >
                {children}
                <div className="flex justify-between mt-5">
                    {/* <button className="ml-2">Назад</button> */}
                    <button
                        type="button"
                        onClick={btnNext}
                        className={classNames("inline-flex w-full justify-center items-center border border-transparent bg-indigo-100 px-4 py-3 text-sm font-medium text-indigo-700 shadow-sm hover:bg-indigo-200 ", !btnNext && "hidden" || "")}
                    >
                        Напред
                    </button>
                </div>
            </Transition.Child>
        </Transition>
    )
}