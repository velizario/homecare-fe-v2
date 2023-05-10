import classNames from "../helpers/classNames"

interface Props {
    children: React.ReactNode
}

export default function InputErrorMessage ({children}: Props) {
    return (
        <p className={classNames("text-xs text-rose-800 pl-0.5", children ? "pt-0.5" : "")}>{children}</p>
    )
}