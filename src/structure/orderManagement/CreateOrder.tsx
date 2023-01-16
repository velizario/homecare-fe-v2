import { useState } from "react";
import { SelectionOption } from "../../helpers/types";
import ComboSelect from "../../utilityComponents/ComboSelect";
import TransitionWrapper from "../../utilityComponents/TransitionWrapper";
import Header from "../header/Header";
import CardChoice from "./CardChoice";



const serviceTypeChoices: SelectionOption[] = [
    { id: "1", name: 'Стандартно почистване' },
    { id: "3", name: 'Миене на мека мебел' },
    { id: "4", name: 'Почистване след ремонт' },
]

const additionalServiceChoices: { [key: string]: SelectionOption[] } = {
    "1": [
        { id: "1", name: 'Миене на печка' },
        { id: "4", name: 'Миене на хладилник' },
        { id: "3", name: 'Миене на тераса' },
        { id: "2", name: 'Миене на прозорци' },
    ]
}

const serviceModeChoices: SelectionOption[] = [
    { id: "1", name: 'Еднократно' },
    { id: "2", name: 'Седмично' },
    { id: "3", name: 'На 2 седмици' },
    { id: "4", name: 'На 4 седмици' },
]

const serviceDayChoices: SelectionOption[] = [
    { id: "1", name: 'Понеделник' },
    { id: "2", name: 'Вторник' },
    { id: "3", name: 'Сряда' },
    { id: "4", name: 'Четвъртък' },
    { id: "5", name: 'Петък' },
    { id: "6", name: 'Събота' },
    { id: "7", name: 'Неделя' },
]

const areaSizeChoices: SelectionOption[] = [
    { id: "1", name: '< 50' },
    { id: "2", name: '51 - 70' },
    { id: "3", name: '71 - 90' },
    { id: "4", name: '91 - 110' },
    { id: "5", name: '111 - 130' },
    { id: "6", name: '131 - 150' },
    { id: "7", name: '> 150' },
]


const districtChoices: SelectionOption[] = [
    { id: "1", name: 'Leslie Alexander' },
    { id: "2", name: 'saf Alexander' },
    { id: "3", name: 'Lessaglie Alefjxander' },
    { id: "4", name: 'edfh Alexander' },
    { id: "5", name: 'Ledsadie Alefjxander' },
    { id: "6", name: 'Ledfhsljie Alexander' },
    { id: "7", name: 'Ledfhstfjjslie Alexander' },
    { id: "8", name: 'Ledfhssdglie Alexander' },
    { id: "9", name: 'Ledfhslie Alexander' },
    { id: "10", name: 'Ledfhdjslie Alexanjfder' },
    { id: "11", name: 'Ledfhslie Alexandfer' },
    { id: "12", name: 'Ledfhfgdjslie Alexander' },
    { id: "13", name: 'Ledfhfgjfslie Alejxandfgjer' },
    { id: "14", name: 'Ledfhslie Alefgjxander' },
    { id: "15", name: 'Ledfhslie Alexander' },
    // More users...
]


const ServiceHourChoices: SelectionOption[] = [
    { id: "1", name: '08:00' },
    { id: "2", name: '08:30' },
    { id: "3", name: '09:00' },
    { id: "4", name: '10:00' },
    { id: "5", name: '10:30' },
    { id: "6", name: '11:00' },
    { id: "7", name: '11:30' },
    { id: "8", name: '12:00' },
    { id: "9", name: '12:30' },
    { id: "10", name: '13:00' },
    { id: "11", name: '13:30' },
    { id: "12", name: '14:00' },
    { id: "13", name: '14:30' },
    { id: "14", name: '15:00' },
    { id: "16", name: '15:30' },
    { id: "17", name: '16:00' },
    { id: "18", name: '16:30' },
    { id: "19", name: '17:00' },
    { id: "20", name: '17:30' },
    { id: "21", name: '18:00' },
    { id: "22", name: '18:30' },
    // More users...
]

export default function CreateOrder() {
    const [active, setActive] = useState(1);
    const [serviceMode, setServiceMode] = useState<string | undefined>()
    const [additionalServices, setAdditionalServices] = useState<string | undefined>()
    const [serviceType, setServiceType] = useState<string | undefined>()
    const [areaSize, setareaSize] = useState<string | undefined>()
    const [serviceDays, setServiceDays] = useState<Set<string>>(new Set())
    const [serviceHours, setServiceHours] = useState<Set<string>>(new Set())
    const [district, setDistrict] = useState<SelectionOption[] | {}[]>([])

    // useEffect(() => {
    //     nextStep()
    // }, [serviceMode, serviceType, areaSize, serviceDays, serviceHours, district])

    const toggleSelection = (selection: string, setSelection: React.Dispatch<React.SetStateAction<Set<string>>>) => {
        setSelection((current) => {
            const updated = new Set(current)
            updated.has(selection) ? updated.delete(selection) : updated.add(selection)
            return updated;
        })
    }

    const nextStep = () => {
        setActive((current) => current + 1)
    }

    const handleServiceMode: React.MouseEventHandler<HTMLDivElement> = (e) => {
        setServiceMode(e.currentTarget.dataset.id)
        nextStep()
    }

    const handleAdditionalServices: React.MouseEventHandler<HTMLDivElement> = (e) => {
        setAdditionalServices(e.currentTarget.dataset.id)
        nextStep()
    }

    const handleServiceType: React.MouseEventHandler<HTMLDivElement> = (e) => {
        setServiceType(e.currentTarget.dataset.id)
        nextStep()
    }

    const handleAreaSize: React.MouseEventHandler<HTMLDivElement> = (e) => {
        setareaSize(e.currentTarget.dataset.id)
        nextStep()
    }

    const handleServiceDays: React.MouseEventHandler<HTMLDivElement> = (e) => {
        const selection = e.currentTarget.dataset.id;
        if (!selection) return;
        toggleSelection(selection, setServiceDays)
    }

    const handleServiceHours: React.MouseEventHandler<HTMLDivElement> = (e) => {
        const selection = e.currentTarget.dataset.id;
        if (!selection) return;
        toggleSelection(selection, setServiceHours)
    }

    const handleDistrict: React.Dispatch<React.SetStateAction<SelectionOption[] | {}[]>> = (e) => {
        // setDistrict(e.currentTarget.dataset.id)
        nextStep()
    }

    return (
        <div className="my-10 py-2 border-t">
            <div className='px-4 flex flex-col gap-8'>
                <TransitionWrapper visible={active === 1}>
                    <div>
                        <p className="block text-sm font-normal text-gray-900">Каква услуга търсите?</p>
                        <CardChoice options={serviceTypeChoices} onClick={handleServiceType} activeId={serviceType} styles="grid"></CardChoice>
                    </div>
                </TransitionWrapper>
                <TransitionWrapper visible={active === 2}>
                    <div>
                        <p className="block text-sm font-normal text-gray-900">Детайли за услугата</p>
                        <CardChoice options={additionalServiceChoices[serviceType || "1"]} onClick={handleAdditionalServices} activeId={additionalServices} styles="grid"></CardChoice>
                    </div>
                </TransitionWrapper>
                <TransitionWrapper visible={active === 3}>
                    <div>
                        <p className="block text-sm font-normal text-gray-900">Колко е голямо мястото (кв. м.)?</p>
                        <CardChoice options={areaSizeChoices} onClick={handleAreaSize} activeId={areaSize} styles="grid grid-cols-2"></CardChoice>
                    </div>
                </TransitionWrapper>
                <TransitionWrapper visible={active === 4}>
                    <div>
                        <p className="block text-sm font-normal text-gray-900">Къде ще почистваме?</p>
                        <ComboSelect options={districtChoices} selection={district} handleChange={handleDistrict}></ComboSelect>
                    </div>
                </TransitionWrapper>
                <TransitionWrapper visible={active === 5}>
                    <div>
                        <p className="block text-sm text-gray-900">Колко често ще са посещенията?</p>
                        <CardChoice options={serviceModeChoices} onClick={handleServiceMode} activeId={serviceMode} styles="grid"></CardChoice>
                    </div>
                </TransitionWrapper>
                <TransitionWrapper visible={active === 6} btnNext={nextStep}>
                    <div>
                        <p className="block text-sm text-gray-900">В кои дни искате да са посещенията?</p>
                        <CardChoice options={serviceDayChoices} onClick={handleServiceDays} activeId={serviceDays} styles="grid grid-cols-2"></CardChoice>
                    </div>
                </TransitionWrapper>
                <TransitionWrapper visible={active === 7} btnNext={nextStep}>
                    <div>
                        <p className="block text-sm text-gray-900">В кои дни часове искате да са посещенията?</p>
                        <CardChoice options={ServiceHourChoices} onClick={handleServiceHours} activeId={serviceHours}></CardChoice>
                    </div>
                </TransitionWrapper>
            </div>
        </div>)
}