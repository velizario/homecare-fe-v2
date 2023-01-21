import { StarIcon } from "@heroicons/react/20/solid";
import classNames from "../../helpers/classNames";

const userRating = 4;

export default function SingleRating() {
  return (
    <>
      <img
        className="[aspect-ratio:_1_/_1] w-full rounded-md object-cover"
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        alt=""
      />
      <h2 className="font-medium text-lg text-gray-800 mt-2">Велизар saf asf Стоянов</h2>
      {/* <p className="text-sm text-gray-500">София</p> */}
      <div className="flex flex-col items-center mt-2">
        <div className="flex items-center">
          {[0, 1, 2, 3, 4].map((rating) => (
            <StarIcon
              key={rating}
              className={classNames(
                userRating > rating ? "text-yellow-400" : "text-gray-200",
                "h-5 w-5 flex-shrink-0"
              )}
              aria-hidden="true"
            />
          ))}
        </div>
        <p className="text-xs font-medium text-gray-600 underline underline-offset-2 mt-1 cursor-pointer">
          (52 ревюта)
        </p>
      </div>
    </>
  );
}
