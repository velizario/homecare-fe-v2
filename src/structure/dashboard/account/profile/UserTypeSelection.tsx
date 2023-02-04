import { type UserProviders, type UserServices, userServiceType, userProviderType } from '../../../../store/userTypeStore'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

const serviceMode = [
  { id: "client", name: 'Търся', description: 'Възползвам се от услуги за почистване' },
  { id: "provider", name: 'Предоставям', description: 'Предлагам услуги за почистване' },
]

const providerMode = [
  { id: "private", name: 'Частно лице', description: 'Профилът Ви ще е представен с име и фамилия' },
  { id: "company", name: 'Фирма', description: 'Профилът Ви ще е представен с име на фирмата' },
]

export default function UserTypeSelection() {
  const serviceType = userServiceType();
  const providerType = userProviderType();

  return (
    <>
      <div className="">
        <div className="">
          <div className="grid grid-cols-2 gap-3">
            {serviceMode.map((option) => (
              <div
                key={option.id}
                onClick={() => { userServiceType.setState(option.id as UserServices); }}
                className={classNames(
                  serviceType === option.id
                    ? 'bg-indigo-100 border-indigo-200'
                    : 'bg-white  hover:bg-gray-50 border-gray-200',
                  'border  font-medium rounded-md py-3 px-3 flex flex-col text-sm text-gray-800 sm:flex-1 gap-1 cursor-pointer shadow-order'
                )
                }
              >
                <span className="flex justify-center text-sm">{option.name}</span>
                {/* <span className={classNames(serviceType === option.id ? 'text-indigo-100' : 'text-gray-500', "text-xs")}>{option.description}</span> */}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={classNames(serviceType !== "provider" ? "hidden" : "rounded-md bg-white sm:col-span-4")}>
        <div className="flex flex-col mt-4 ">
          {providerMode.map((option, selectionId) => (
            <div
              key={option.id}
              onClick={() => { userProviderType.setState(option.id as UserProviders); }}
              className={classNames(
                selectionId === 0 ? 'rounded-tl-md rounded-tr-md' : '',
                selectionId === providerMode.length - 1
                  ? 'rounded-bl-md rounded-br-md'
                  : '',
                providerType === option.id
                  ? 'bg-indigo-50 border-indigo-200 z-10'
                  : 'border-gray-200',
                'relative border p-2 flex cursor-pointer focus:outline-none items-center'
              )
              }
            >
              <span className={classNames(providerType === option.id
                ? 'bg-indigo-600 border-transparent'
                : 'bg-white border-gray-300',
                'mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded-full border flex items-center justify-center'
              )}
                aria-hidden="true"
              >
                <span className="rounded-full bg-white w-1.5 h-1.5" />
              </span>
              <span className="ml-3 flex flex-col">
                <span className={classNames('block text-sm font-medium text-gray-800')}>{option.name}</span>
                <span className={classNames('text-xs ')}>{option.description}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
