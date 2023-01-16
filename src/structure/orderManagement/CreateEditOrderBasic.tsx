import InputField from "../../utilityComponents/InputField";
import InputFieldProfile from "../dashboard/account/profile/InputFieldProfile";

const profileInputValues = [
    {
        className: "col-span-2",
        name: "visit-type",
        id: "visit-type",
        label: "Вид посещение*",
    },
    {
        className: "col-span-1",
        name: "date",
        id: "date",
        label: "Дата*",
    },
    {
        className: "col-span-1",
        name: "hour",
        id: "hour",
        label: "Час*",
    },
    {
        className: "col-span-1",
        name: "location-type",
        id: "location-type",
        label: "Вид помещение",
    },
    {
        className: "col-span-1",
        name: "size",
        id: "size",
        label: "Размер*",
    },
    {
        className: "col-span-2",
        name: "services",
        id: "services",
        label: "Услуга*",
    },
    {
        className: "col-span-2",
        name: "comments",
        id: "comments",
        label: "Допълнителна информация*",
    },
    {
        className: "col-span-2",
        name: "price-offer",
        id: "price-offer",
        label: "Предложение за цена",
    },
    {
        className: "col-span-2",
        name: "address",
        id: "address",
        label: "Адрес*",
    },
];

export default function CreateOrderBasic() {
    return (
        <div className="bg-gray-50 p-4">
            <h2 className="mb-4">Заявка за услуга</h2>
            <div className="gap-4 grid grid-cols-2">
                {profileInputValues.map(inputValue => <InputField {...inputValue} />)}
            </div>
        </div>
    )
}