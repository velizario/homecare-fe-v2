import { useState } from "react";
import { UserRole } from "../../../../types/types";
import { userState } from "../../../../store/userState";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const serviceMode = [
  {
    id: 0,
    name: "Търся",
    description: "Възползвам се от услуги за почистване",
  },
  {
    id: 1,
    name: "Предоставям",
    description: "Предлагам услуги за почистване",
  },
];

const providerMode = [
  {
    id: UserRole.VENDOR_INDIVIDUAL,
    name: "Частно лице",
    description: "Профилът Ви ще е представен с име и фамилия",
  },
  {
    id: UserRole.VENDOR_COMPANY,
    name: "Фирма",
    description: "Профилът Ви ще е представен с име на фирмата",
  },
];

type UserTypeSelectionProps = {
  roles: UserRole[];
  setRoles: (roles: UserRole[]) => void;
};

export default function UserTypeSelection({ roles, setRoles }: UserTypeSelectionProps) {
  const [selection, setSelection] = useState<number | null>(null);

  return (
    <>
      <div className="">
        <div className="">
          <div className="grid grid-cols-2 gap-3">
            {serviceMode.map((option) => (
              <div
                key={option.id}
                onClick={() => {
                  setSelection(option.id);
                  option.id === 0 && setRoles([UserRole.CLIENT]);
                  option.id === 1 && setRoles([]);
                }}
                className={classNames(
                  selection === option.id
                    ? "border-indigo-200 bg-indigo-100"
                    : "border-gray-200  bg-white hover:bg-gray-50",
                  "flex  cursor-pointer flex-col gap-1 rounded-md border py-3 px-3 text-sm font-medium text-gray-800 shadow-order sm:flex-1"
                )}
              >
                <span className="flex justify-center text-sm">{option.name}</span>
                {/* <span className={classNames(serviceType === option.id ? 'text-indigo-100' : 'text-gray-500', "text-xs")}>{option.description}</span> */}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={classNames(selection === 1 ? "rounded-md bg-white sm:col-span-4" : "hidden")}>
        <div className="mt-4 flex flex-col ">
          {providerMode.map((option, selectionId) => (
            <div
              key={option.id}
              onClick={() => {
                setRoles([option.id as UserRole]);
              }}
              className={classNames(
                selectionId === 0 ? "rounded-tl-md rounded-tr-md" : "",
                selectionId === providerMode.length - 1 ? "rounded-bl-md rounded-br-md" : "",
                roles.includes(option.id) ? "z-10 border-indigo-200 bg-indigo-50" : "border-gray-200",
                "relative flex cursor-pointer items-center border p-2 focus:outline-none"
              )}
            >
              <span
                className={classNames(
                  roles.includes(option.id) ? "border-transparent bg-indigo-600" : "border-gray-300 bg-white",
                  "mt-0.5 flex h-4 w-4 shrink-0 cursor-pointer items-center justify-center rounded-full border"
                )}
                aria-hidden="true"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
              </span>
              <span className="ml-3 flex flex-col">
                <span className={classNames("block text-sm font-medium text-gray-800")}>{option.name}</span>
                <span className={classNames("text-xs ")}>{option.description}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
