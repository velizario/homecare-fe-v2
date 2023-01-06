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

      <div className="mt-8 overflow-hidden bg-gray-100">
        <div className="grid grid-cols-[repeat(6,minmax(0,1fr))] auto-rows-fr gap-y-10 px-5">
          <div className="px-2 bg-indigo-200 border border-gray-500 flex justify-center">Клиент</div>
          <div className="px-2 bg-indigo-200 border border-gray-500 flex justify-center">Квартал</div>
          <div className="px-2 bg-indigo-200 border border-gray-500 flex justify-center">Място</div>
          <div className="px-2 bg-indigo-200 border border-gray-500 flex justify-center">Вид посещение</div>
          <div className="px-2 bg-indigo-200 border border-gray-500 flex justify-center">Включени услуги</div>
          <div className="px-2 bg-indigo-200 border border-gray-500 flex justify-center">Редактиране</div>
        </div>
      </div>
    </>
  )
}
