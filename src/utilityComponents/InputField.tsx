interface InputFieldProps {
    label : string;
    name: string;
    id: string;
    autoComplete?: string;
    className: string;
    defaultValue?: string;
}

export default function InputField ({label, name, id, autoComplete, className, defaultValue}: InputFieldProps) {
    return (
        <div className={className}>
            <label htmlFor={name} className="block text-sm font-medium text-blue-gray-900">
            {label}
            </label>
            <input
            type="text"
            name={name}
            id={id}
            defaultValue={defaultValue}
            autoComplete={autoComplete}
            className="mt-1 block w-full rounded-md border-blue-gray-300 text-blue-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
        </div>  
    )
}