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
            className="absolute left-0 right-0 px-[inherit]"
            show={visible}
            enter="transition transform duration-400 delay-500"
            enterFrom="translate-x-10 opacity-0"
            enterTo="opacity-100 translate-x-0"
            leave="transition transform duration-300 delay-200"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-10 opacity-0"
        >
            {children}
            <div className="flex justify-between mt-5">
                {/* <button className="ml-2">Назад</button> */}
                <button
                    type="button"
                    onClick={btnNext}
                    className={classNames("inline-flex w-full justify-center items-center border border-transparent bg-indigo-600 px-4 py-3 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2", !btnNext && "hidden" || "")}
                >
                    Напред
                </button>
            </div>
        </Transition>
    )
}