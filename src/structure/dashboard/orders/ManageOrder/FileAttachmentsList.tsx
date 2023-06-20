import { PaperClipIcon } from "@heroicons/react/20/solid";

const attachments = [
  { name: "resume_front_end_developer.pdf", href: "#" },
  { name: "coverletter_front_end_developer.pdf", href: "#" },
];

export default function FileAttachmentsList() {
  return (
    <>
      <dt className="block text-sm font-normal text-gray-900">Прикачени файлове</dt>
      <dd className="mt-1 text-base font-semibold text-gray-900">
        <ul role="list" className="divide-y divide-gray-200 rounded-md border border-gray-200">
          {attachments.map((attachment) => (
            <li key={attachment.name} className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
              <div className="flex w-0 flex-1 items-center">
                <PaperClipIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                <span className="ml-2 w-0 flex-1 truncate">{attachment.name}</span>
              </div>
              <div className="ml-4 flex-shrink-0">
                <a href={attachment.href} className="font-medium text-blue-600 hover:text-blue-500">
                  Изтегли
                </a>
              </div>
            </li>
          ))}
        </ul>
      </dd>
    </>
  );
}
