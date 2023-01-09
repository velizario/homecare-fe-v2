import { useState } from 'react'
import { RadioGroup } from '@headlessui/react'

const serviceType = [
  { id: "client", name: 'Търся', description: 'Възползвам се от услуги за почистване' },
  { id: "provider", name: 'Предоставям', description: 'Предлагам услуги за почистване' },
]

const providerType = [
  { id: "private", name: 'Частно лице', description: 'Профилът Ви ще е представен с име и фамилия' },
  { id: "company", name: 'Фирма', description: 'Профилът Ви ще е представен с име на фирмата' },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function UserTypeSelection() {
  const [service, setService] = useState(serviceType[0])
  const [provider, setProvider] = useState(providerType[0])

  return (
    <div className="sm:col-span-4">
      <p className="block text-sm font-medium text-blue-gray-900">Предоставяте или търсите услуги за почистване?</p>
      <RadioGroup value={service} onChange={setService} className="mt-2">
        <div className="grid grid-cols-2 gap-3 ">
          {serviceType.map((option) => (
            <RadioGroup.Option
              key={option.id}
              value={option}
              className={({ checked }) =>
                classNames(
                  checked
                    ? 'bg-indigo-600 border-transparent text-white hover:bg-indigo-700'
                    : 'bg-white border-gray-200 text-gray-900 hover:bg-gray-50',
                  'border rounded-md py-3 px-3 flex flex-col text-sm font-medium sm:flex-1 gap-1 cursor-pointer shadow-order'
                )
              }
            >
              {({ checked }) =>
                <>
                  <RadioGroup.Label as="span" className="text-base font-medium">{option.name}</RadioGroup.Label>
                  <RadioGroup.Description as="span" className={classNames(checked ? 'text-indigo-200' : 'text-gray-500', "text-xs font-normal")}>{option.description}</RadioGroup.Description>
                </>
              }
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
      <RadioGroup value={provider} onChange={setProvider} className={classNames(service.id === "client" ? "hidden" : "rounded-md bg-white")}>
        <div className="flex flex-col mt-4 gap-2">
          {providerType.map((option, selectionId) => (
            <RadioGroup.Option
              key={option.id}
              value={option}
              className={({ checked }) =>
                classNames(
                  selectionId === 0 ? 'rounded-tl-md rounded-tr-md' : '',
                  selectionId === providerType.length - 1 ? 'rounded-bl-md rounded-br-md' : '',
                  checked ? 'bg-indigo-50 border-indigo-200 z-10' : 'border-gray-200',
                  'relative border p-2 flex cursor-pointer focus:outline-none'
                )
              }
            >
              {({ checked }) => (
                <>
                  <span
                    className={classNames(
                      checked ? 'bg-indigo-600 border-transparent' : 'bg-white border-gray-300',
                      'mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded-full border flex items-center justify-center'
                    )}
                    aria-hidden="true"
                  >
                    <span className="rounded-full bg-white w-1.5 h-1.5" />
                  </span>
                  <span className="ml-3 flex flex-col">
                    <RadioGroup.Label
                      as="span"
                      className={classNames(checked ? 'text-indigo-900' : 'text-gray-900', 'block text-sm font-medium')}
                    >
                      {option.name}
                    </RadioGroup.Label>
                    <RadioGroup.Description
                      as="span"
                      className={classNames(checked ? 'text-indigo-700' : 'text-gray-500', 'text-xs ')}
                    >
                      {option.description}
                    </RadioGroup.Description>
                  </span>
                </>
              )}
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
    </div>
  )
}
