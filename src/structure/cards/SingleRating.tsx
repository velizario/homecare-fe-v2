import { StarIcon } from "@heroicons/react/20/solid";
import classNames from "../../helpers/classNames";

const userRating = 4;

export default function SingleRating() {
  return (
      
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
  );
}
