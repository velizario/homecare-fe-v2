import OrderItem from "./OrderItem"

const people = [
  { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
  { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
  { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
  { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
  { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
  { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
  { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
  { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
  { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
  { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
  { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
  { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
  // More people...
]

export default function OrderlistNew() {
  return (
    <>

      <div className="mt-8 overflow-hidden">
        <div className="grid grid-cols-[repeat(6,minmax(0,1fr))] auto-rows-fr gap-y-10 px-5">
          <div className="col-span-6 grid grid-cols-[subgrid] h-max shadow-md">
            <OrderItem>Клиент</OrderItem>
            <OrderItem>Квартал</OrderItem>
            <OrderItem>Място</OrderItem>
            <OrderItem>Вид посещение</OrderItem>
            <OrderItem>Включени услуги</OrderItem>
            <OrderItem>Редактиране</OrderItem>
          </div>
          <div className="bg-red col-span-6 grid ">
            <OrderItem>Включени услуги</OrderItem>
            <OrderItem>Редактиране</OrderItem>
            <OrderItem>Включени услуги</OrderItem>
            <OrderItem>Редактиране</OrderItem>
            <OrderItem>Включени услуги</OrderItem>
            <OrderItem>Редактиране</OrderItem>
          </div>
        </div>
      </div>
    </>
  )
}
