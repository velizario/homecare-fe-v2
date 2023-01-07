import OrderItem from "./OrderItem"
import classNames from "../../../../helpers/classNames"
import ContextMenu from "../../../../utilityComponents/ContextMenu"
import Filters from "../../../../utilityComponents/Filters"

const people = [
  { id: 1, name: 'Lindsay', neighbourhood: "Кръстова Вада", services: 'основно, гладене, прозорци, баня', type: 'subscription', detals: 'Апартамент' },
  { id: 2, name: 'Lindsay Walton', neighbourhood: "Витоша", services: 'основно, хладилник', type: 'onetime', detals: 'Апартамент' },
  { id: 3, name: 'Lindsay Walton', neighbourhood: "Младост 4", services: 'прозорци, баня', type: 'subscription', detals: 'Апартамент' },
  { id: 4, name: 'Lindа сдфсдsay Walton', neighbourhood: "Надежда", services: 'основно, гладене, прозорци', type: 'onetime', detals: 'Апартамент' },
  { id: 5, name: 'Lindсд фсадфsay Walton', neighbourhood: "Изток", services: 'основно, гладене', type: 'onetime', detals: 'Офис' },
  { id: 6, name: 'сдф W alton', neighbourhood: "Кръстова Вада", services: 'основно, прозорци', type: 'onetime', detals: 'Апартамент' },
  { id: 7, name: 'Lindsay Walton', neighbourhood: "Полигона", services: 'основно, печка', type: 'subscription', detals: 'Офис' },
  { id: 8, name: 'Lindsay Walton', neighbourhood: "Дружба", services: 'прозорци', type: 'onetime', detals: 'Офис' },
  { id: 9, name: 'Linds ay Walton', neighbourhood: "Лозенец", services: 'основно, гладене, прозорци', type: 'subscription', detals: 'Къща' },
  { id: 10, name: 'Lindsay Walton', neighbourhood: "Манастирски Ливади", services: 'основно, гладене, прозорци', type: 'subscription', detals: 'Офис' },
  { id: 11, name: 'Lindsay Walton', neighbourhood: "Бояна", services: 'основно', type: 'onetime', detals: 'Апартамент' },
  { id: 12, name: 'Lindsay Walton', neighbourhood: "Малинова Долина", services: 'под, баня', type: 'onetime', detals: 'Къща' },
  // More people...
]

const numCols = 6
const numRows = (people.length / numCols) + ((people.length % numCols) > 0 ? 1 : 0)

export default function OrderlistNew() {
  return (
    <>
      <Filters />
      <div className="mt-8 bg-indigo-50 flex flex-col gap-4 p-6 ">
        <div className="font-semibold grid grid-cols-[2.5rem,1fr,8rem,1fr,1fr,8rem,1rem] auto-rows-fr gap-y-10 px-5 rounded-lg border border-indigo-100 bg-white py-1">
          <OrderItem>#</OrderItem>
          <OrderItem>Име</OrderItem>
          <OrderItem>Помещение</OrderItem>
          <OrderItem>Квартал</OrderItem>
          <OrderItem>Услуги</OrderItem>
          <OrderItem>Вид посещение</OrderItem>
        </div>
        {people.map((person) => {
          return <>
            <div className="text-gray-800 grid grid-cols-[2.5rem,1fr,8rem,1fr,1fr,8rem,1rem] auto-rows-fr gap-y-10 px-5 rounded-lg  border border-indigo-100 bg-white py-1 transition-shadow hover:shadow-order" >
              <OrderItem styles="text-xs text-indigo-500 font-semibold cursor-pointer hover:text-indigo-900">#{person.id}</OrderItem>
              <OrderItem>{person.name}</OrderItem>
              <OrderItem>{person.detals}</OrderItem>
              <OrderItem>{person.neighbourhood}</OrderItem>
              <OrderItem styles="text-xs whitespace-normal line-clamp-3">{person.services}</OrderItem>
              <OrderItem>{<span className={classNames(person.type === 'subscription' ? "bg-green-100 text-green-800" : "bg-purple-100 text-purple-800", "inline-flex items-center rounded-full px-3 py-0.5 text-xs font-medium")}>
                {person.type === "onetime" ? "еднократно" : "абонамент"}
              </span>}</OrderItem>
              <ContextMenu />
            </div>
          </>
        })}

      </div>
    </>
  )
}
