import classNames from "../../../../helpers/classNames"

interface OrderItemProps {
    children: React.ReactNode;
    styles?: string;
    hideOnMobile?: boolean;
}

  const OrderItem: React.FC<OrderItemProps> = ({ children, styles, hideOnMobile }) => {
    return <div className={classNames("z-10 flex md:flex min-w-0 items-center px-2 py-2 h-16 text-sm", hideOnMobile && "hidden" || "" )}><span className={classNames("min-w-0 line-clamp-2", styles || "")}>{children}</span></div>
}

export default OrderItem;