import { InformationCircleIcon } from "@heroicons/react/20/solid";
import { format, parseJSON } from "date-fns";
import { FormEventHandler, useState } from "react";
import { Link } from "react-router-dom";
import classNames from "../../../../helpers/classNames";
import { BACKEND_URL } from "../../../../helpers/envVariables";
import { createFullName, dateFormatted, sortObjArrAsc } from "../../../../helpers/helperFunctions";
import { OrderComment } from "../../../../types/types";

type OrderCommentsProps = {
  orderComment: OrderComment[];
  addComment: (commentText: string) => void;
};

export default function OrderComments({ orderComment, addComment }: OrderCommentsProps) {
  const [textareaError, setTextareaError] = useState(false);
  const [textarea, setTextarea] = useState("");

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextarea(e.target.value);
    setTextareaError(false);
  };

  const handleAddComment: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!textarea) {
      setTextareaError(true);
      return;
    }
    setTextarea("");
    addComment(textarea);
  };

  return (
    <section aria-labelledby="notes-title">
      <div className="bg-white shadow sm:overflow-hidden sm:rounded-lg">
        <div className="divide-y divide-gray-200">
          <div className="px-4 py-5 sm:px-6">
            <h2 id="notes-title" className="text-lg font-medium text-gray-900">
              Въпроси и коментари
            </h2>
          </div>
          <div className={classNames("px-4 sm:px-6", orderComment.length > 0 ? "py-6" : "")}>
            <ul role="list" className="space-y-8">
              {sortObjArrAsc(orderComment).map((comment) => (
                <li key={comment.id}>
                  <div className="flex space-x-3">
                    <div className="flex-shrink-0">
                      <img className="h-10 w-10 rounded-full" src={`${BACKEND_URL}/users/public/${comment.user.imageUrl || "defaultImage.png"}`} alt="" />
                    </div>
                    <div>
                      <div className="text-sm">
                        <a href="#" className="font-medium text-gray-900">
                          {createFullName(comment.user)}
                        </a>
                      </div>
                      <div className="mt-1 text-sm text-gray-700">
                        <p>{comment.comment}</p>
                      </div>
                      <div className="mt-2 space-x-2 text-sm">
                        <time dateTime={comment.createdAt} className="font-medium text-gray-500">
                          {dateFormatted(comment.createdAt)}
                        </time>{" "}
                        <span className="font-medium text-gray-500">&middot;</span>{" "}
                        <button type="button" className="font-medium text-gray-900">
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-6 sm:px-6">
          <div className="flex space-x-3">
            <div className="min-w-0 flex-1">
              <form onSubmit={handleAddComment}>
                <div>
                  <label htmlFor="comment" className="sr-only">
                    About
                  </label>
                  <textarea
                    id="comment"
                    name="comment"
                    rows={3}
                    className="block w-full rounded-md border-0 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:py-1.5 sm:text-sm sm:leading-6"
                    placeholder="Добави коментар"
                    value={textarea}
                    onChange={handleTextareaChange}
                  />
                </div>
                {textareaError && <p>Попълнете полето за коментар</p>}
                <div className="mt-3 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                  <div className="inline-flex items-start space-x-2 text-sm text-gray-500">
                    <InformationCircleIcon className="-mr-1 h-5 w-5 flex-shrink-0 pb-0.5 text-gray-400" aria-hidden="true" />
                    <p>
                      Записки по поръчката. За чат, отиди{" "}
                      <Link to="/dashboard/chat" className="font-medium text-gray-900">
                        тук
                      </Link>
                    </p>
                  </div>
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                  >
                    Добави коментар
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
