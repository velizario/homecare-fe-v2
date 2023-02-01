import { PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { type SelectionOption } from "../../helpers/types";
import ComboSelect from "../../utilityComponents/ComboSelect";
import RadioGroup from "../../utilityComponents/RadioGroup";
import CardChoice from "../../utilityComponents/TagSelectGroup";
import RangeSlider from "./RangeSlider";
import Toggle from "./ToggleInput";

const serviceTypeChoices: SelectionOption[] = [
    {
        id: "1",
        name: "Стандартно почистване",
        description: "Почистване на гъз, глава, и тем подобни",
    },
    {
        id: "2",
        name: "Миене на мека мебел",
        description: "Почистване на фотьойли и изхвърляне на котки",
    },
    {
        id: "3",
        name: "Почистване след ремонт",
        description: "Рязане на кабели и промиване с чист спирт",
    },
];

const additionalServiceChoices: Record<string, SelectionOption[]> = {
    "1": [
        { id: "1", name: "Миене на печка" },
        { id: "4", name: "Миене на хладилник" },
        { id: "3", name: "Миене на тераса" },
        { id: "2", name: "Миене на прозорци" },
    ],
};

const serviceModeChoices: SelectionOption[] = [
    { id: "1", name: "Еднократно" },
    { id: "2", name: "Седмично" },
    { id: "3", name: "На 2 седмици" },
    { id: "4", name: "На 4 седмици" },
];

const serviceDayChoices: SelectionOption[] = [
    { id: "1", name: "Понеделник" },
    { id: "2", name: "Вторник" },
    { id: "3", name: "Сряда" },
    { id: "4", name: "Четвъртък" },
    { id: "5", name: "Петък" },
    { id: "6", name: "Събота" },
    { id: "7", name: "Неделя" },
];

const areaSizeChoices: SelectionOption[] = [
    { id: "1", name: "< 50 кв/м" },
    { id: "2", name: "51 - 70 кв/м" },
    { id: "3", name: "71 - 90 кв/м" },
    { id: "4", name: "91 - 110 кв/м" },
    { id: "5", name: "111 - 130 кв/м" },
    { id: "6", name: "131 - 150 кв/м" },
    { id: "7", name: "> 150 кв/м" },
];

const districtChoices: SelectionOption[] = [
    { id: "1", name: "Leslie Alexander" },
    { id: "2", name: "saf Alexander" },
    { id: "3", name: "Lessaglie Alefjxander" },
    { id: "4", name: "edfh Alexander" },
    { id: "5", name: "Ledsadie Alefjxander" },
    { id: "6", name: "Ledfhsljie Alexander" },
    { id: "7", name: "Ledfhstfjjslie Alexander" },
    { id: "8", name: "Ledfhssdglie Alexander" },
    { id: "9", name: "Ledfhslie Alexander" },
    { id: "10", name: "Ledfhdjslie Alexanjfder" },
    { id: "11", name: "Ledfhslie Alexandfer" },
    { id: "12", name: "Ledfhfgdjslie Alexander" },
    { id: "13", name: "Ledfhfgjfslie Alejxandfgjer" },
    { id: "14", name: "Ledfhslie Alefgjxander" },
    { id: "15", name: "Ledfhslie Alexander" },
    // More users...
];

const ServiceHourChoices: SelectionOption[] = [
    { id: "1", name: "08:00" },
    { id: "2", name: "08:30" },
    { id: "3", name: "09:00" },
    { id: "4", name: "10:00" },
    { id: "5", name: "10:30" },
    { id: "6", name: "11:00" },
    { id: "7", name: "11:30" },
    { id: "8", name: "12:00" },
    { id: "9", name: "12:30" },
    { id: "10", name: "13:00" },
    { id: "11", name: "13:30" },
    { id: "12", name: "14:00" },
    { id: "13", name: "14:30" },
    { id: "14", name: "15:00" },
    { id: "16", name: "15:30" },
    { id: "17", name: "16:00" },
    { id: "18", name: "16:30" },
    { id: "19", name: "17:00" },
    { id: "20", name: "17:30" },
    { id: "21", name: "18:00" },
    { id: "22", name: "18:30" },
    // More users...
];

export default function CreateOrder() {
    const [serviceMode, setServiceMode] = useState<string | undefined>();
    const [additionalServices, setAdditionalServices] = useState<Set<string>>(
        new Set()
    );
    const [serviceType, setServiceType] = useState<string | undefined>();
    const [areaSize, setareaSize] = useState<string | undefined>();
    const [serviceDays, setServiceDays] = useState<Set<string>>(new Set());
    const [serviceHours, setServiceHours] = useState<Set<string>>(new Set());
    const [district, setDistrict] = useState<
        SelectionOption[] | Array<Record<string, any>>
    >([]);

    const toggleSelection = (
        selection: string | undefined,
        setSelection: React.Dispatch<React.SetStateAction<Set<string>>>
    ) => {
        if (typeof selection === "undefined") return;
        setSelection((current) => {
            const updated = new Set(current);
            updated.has(selection)
                ? updated.delete(selection)
                : updated.add(selection);
            return updated;
        });
    };

    const handleServiceMode = (e: string) => {
        setServiceMode(e);
    };

    const handleAdditionalServices: React.MouseEventHandler<HTMLElement> = (
        e
    ) => {
        toggleSelection(e.currentTarget.dataset.id, setAdditionalServices);
    };

    const handleServiceType = (e: string) => {
        setServiceType(e);
    };

    const handleAreaSize = (e: string) => {
        setareaSize(e);
    };

    const handleServiceDays: React.MouseEventHandler<HTMLDivElement> = (e) => {
        toggleSelection(e.currentTarget.dataset.id, setServiceDays);
    };

    const handleServiceHours: React.MouseEventHandler<HTMLDivElement> = (e) => {
        toggleSelection(e.currentTarget.dataset.id, setServiceHours);
    };

    const handleServiceHoursMultiple: React.MouseEventHandler<
        HTMLButtonElement
    > = (e) => {
        // let newSet = new Set(["1","2","3","4","5","6","7"])
        const filterWord = e.currentTarget.dataset.id;
        if (filterWord === "clear") {
            setServiceHours(new Set([]));
            return;
        }
        const btnChoices = new Set(
            ServiceHourChoices.filter((choice) => {
                switch (filterWord) {
                    case "morning":
                        return choice.name <= "12:00";
                    case "afternoon":
                        return choice.name >= "12:30";
                    // case "all":
                    //     return true;
                    default:
                        return false;
                }
            }).map((hour) => hour.id)
        );
        setServiceHours((currentHours) => {
            const updatedHours = new Set([...btnChoices, ...currentHours]);
            return updatedHours;
        });
    };

    const handleDistrict: React.Dispatch<
        React.SetStateAction<SelectionOption[] | Array<Record<string, any>>>
    > = (e) => {
        setDistrict(e);
    };

    return (
        <div className="relative my-10 mx-auto flex max-w-2xl flex-col border-t py-2 px-4">
            <h2 id="step-1" className="mt-10 text-xl text-gray-900">
                Каква услуга търсите?
            </h2>
            {/* <CardChoice options={serviceTypeChoices} onClick={handleServiceType} activeId={serviceType} styles="grid"></CardChoice> */}
            <RadioGroup
                options={serviceTypeChoices}
                activeId={serviceType}
                onClick={handleServiceType}
            />
            <h2 id="step-2" className="mt-10 text-xl text-gray-900">
                Ще имате ли нужда от?
            </h2>
            <Toggle
                options={additionalServiceChoices[serviceType ?? "1"]}
                onClick={handleAdditionalServices}
                activeId={additionalServices}
            />
            <h2 id="step-3" className="mt-10 text-xl text-gray-900">
                Колко често ще са посещенията?
            </h2>
            <RadioGroup
                options={serviceModeChoices}
                onClick={handleServiceMode}
                activeId={serviceMode}
            ></RadioGroup>
            <h2 id="step-4" className="mt-10 text-xl text-gray-900">
                В кои дни искате да са посещенията?
            </h2>
            <p className="text-xs text-gray-600">
                (Изберете повече варианти, ако ви устройват)
            </p>
            <CardChoice
                options={serviceDayChoices}
                onClick={handleServiceDays}
                activeId={serviceDays}
                styles="grid grid-cols-2"
            ></CardChoice>
            <h2 id="step-5" className="mt-10 text-xl text-gray-900">
                В кои часове искате да са посещенията?
            </h2>
            <p className="text-xs text-gray-600">
                (Изберете повече варианти, ако ви устройват)
            </p>
            <div className="mt-3 flex max-w-md justify-between px-2">
                <button
                    className="inline-flex items-center rounded bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
                    data-id="morning"
                    onClick={handleServiceHoursMultiple}
                >
                    <PlusIcon className="-ml-1 mr-0.5 mt-0.5 h-3 w-3" /> преди
                    обяд
                </button>
                <button
                    className="inline-flex items-center rounded bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
                    data-id="afternoon"
                    onClick={handleServiceHoursMultiple}
                >
                    <PlusIcon className="-ml-1 mr-0.5 mt-0.5 h-3 w-3" />
                    след обяд
                </button>
                <button
                    className="inline-flex items-center rounded bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
                    data-id="clear"
                    onClick={handleServiceHoursMultiple}
                >
                    <XMarkIcon className="-ml-1 mr-0.5 mt-0.5 h-3 w-3" />
                    изчисти
                </button>
            </div>
            <CardChoice
                options={ServiceHourChoices}
                onClick={handleServiceHours}
                activeId={serviceHours}
                styles="grid grid-cols-3"
            ></CardChoice>
            <h2 id="step-6" className="mt-10 text-xl text-gray-900">
                Каква площ ще почистваме (кв. м.)?
            </h2>
            <RangeSlider/>

            {/* <RadioGroup
                options={areaSizeChoices}
                onClick={handleAreaSize}
                activeId={areaSize}
            ></RadioGroup> */}
            <h2 id="step-7" className="mt-10 text-xl text-gray-900">
                Къде ще почистваме?
            </h2>
            <p className="text-xs text-gray-600">(Ориентировъчна локация)</p>
            <ComboSelect
                options={districtChoices}
                selection={district}
                handleChange={handleDistrict}
            ></ComboSelect>
        </div>
    );
}
