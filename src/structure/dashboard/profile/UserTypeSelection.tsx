import { useState } from 'react'
import { RadioGroup } from '@headlessui/react'

const serviceType = [
  {  name: 'Търся', description: 'Възползвам се от услуги за почистване' },
  { name: 'Предоставям', description: 'Предлагам услуги за почистване' },
]

function classNames(...classes:string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function UserTypeSelection() {
  const [selectedService, setSelectedService] = useState(serviceType[0])

  return (
    <div className="sm:col-span-4">
      <p className="block text-sm font-medium text-blue-gray-900">Предоставяте или търсите услуги за почистване?</p>
    <RadioGroup value={selectedService} onChange={setSelectedService} className="mt-2">
      <RadioGroup.Label className="sr-only"> Choose a memory option </RadioGroup.Label>
      <div className="grid grid-cols-2 gap-3 ">
        {serviceType.map((option) => (
          <RadioGroup.Option
            key={option.name}
            value={option}
            className={({ active, checked }) =>
              classNames(

                checked
                  ? 'bg-indigo-600 border-transparent text-white hover:bg-indigo-700'
                  : 'bg-white border-gray-200 text-gray-900 hover:bg-gray-50',
                'border rounded-md py-3 px-3 flex flex-col text-sm font-medium sm:flex-1 gap-1 cursor-pointer shadow-order'
              )
            }
          >
              <RadioGroup.Label as="span" className="text-base font-medium">{option.name}</RadioGroup.Label>
              <RadioGroup.Description as="span" className="text-xs font-light">{option.description}</RadioGroup.Description>
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  </div>
  )
}
