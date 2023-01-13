import classNames from "../../../../helpers/classNames"

interface OrderItemProps {
    children: React.ReactNode;
    styles?: string;
    stylesParent?: string;
}

  const OrderItem: React.FC<OrderItemProps> = ({ children, styles, stylesParent }) => {
    return <div className={classNames("z-10 flex md:flex min-w-0 items-center px-2 py-2 h-16 text-sm", stylesParent || "" )}><span className={classNames("min-w-0 line-clamp-2 flex", styles || "")}>{children}</span></div>
}

export default OrderItem;