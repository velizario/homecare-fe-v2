interface OrderItemProps {
    children: React.ReactNode
}

  const OrderItem: React.FC<OrderItemProps> = ({ children }) => {
    return <div className="relative z-10 flex bg-white overflow-hidden justify-center   px-2 py-2 text-sm ">{children}</div>
}

export default OrderItem;