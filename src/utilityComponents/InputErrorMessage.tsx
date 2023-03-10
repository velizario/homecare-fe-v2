interface Props {
    children: React.ReactNode
}

export default function InputErrorMessage ({children}: Props) {
    return (
        <p className="text-xs text-rose-800 pt-0.5 pl-0.5">{children}</p>
    )
}