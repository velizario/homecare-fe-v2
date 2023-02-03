import classNames from "../helpers/classNames";

interface InputFieldProps {
    label: string;
    name: string;
    id: string;
    autoComplete?: string;
    className: string;
    defaultValue?: string;
    include?: boolean;
}

export default function InputField({ label, name, id, autoComplete, className, defaultValue, include }: InputFieldProps) {
    return (
        <div className={classNames(include === undefined && (typeof include !== "undefined") ? "hidden" : "", className)}>
            <label htmlFor={name} className="block text-sm font-normal text-gray-900">
                {label}
            </label>
            <input
                
                type="text"
                name={name}
                id={id}
                defaultValue={defaultValue}
                autoComplete={autoComplete}
                className=" mt-1 block w-full rounded-md border-gray-300 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />

        </div>
    )
}