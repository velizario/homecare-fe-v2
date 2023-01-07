import classNames from "../helpers/classNames"

interface BadgeProps {
    children: React.ReactNode
    styles?: string
}
const Badge: React.FC<BadgeProps> = ({ children, styles }) => {
    return (
        <span className={classNames("mr-1 last:mr-0 inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800", styles || "")}>
            {children}
        </span>
    )
}
export default Badge;