import { StarIcon } from "@heroicons/react/20/solid";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import classNames from "../../../../helpers/classNames";
import ButtonDefault from "../../../../utilityComponents/CustomButton";
import ProfileAbout from "../../account/profile/ProfileAbout";

const aboutTemplate = { className: "w-[25rem] mt-4", name: "feedback", id: "feedback", label: "Ако желаете, споделете няколко думи:" };

export type TFeedbackForm = {
  feedback: string;
  rating: number;
  id: string;
};

type FeedbackProps = {
  submitModal: (data: TFeedbackForm) => void;
};

export default function Feedback({ submitModal }: FeedbackProps) {
  const { control, handleSubmit, setValue, watch } = useForm<TFeedbackForm>({
    defaultValues: {
      feedback: "",
      rating: 0,
    },
  });

  const userRating = watch("rating");

  return (
    <form onSubmit={handleSubmit(submitModal)} className="p-6">
      <h3 className="text-center text-lg font-semibold">Оценка на посещението</h3>
      <p className="mt-4 text-sm">Доволни ли сте от услугата?</p>
      <div className="mt-1 flex items-center">
        {[1, 2, 3, 4, 5].map((rating) => (
          <StarIcon
            onClick={() => setValue("rating", rating)}
            key={rating}
            className={classNames(
              userRating >= rating ? "text-yellow-400 " : "stroke-gray-300 text-white ",
              "stroke h-7 w-7 flex-shrink-0 cursor-pointer stroke-1"
            )}
            aria-hidden="true"
          />
        ))}
      </div>
      <ProfileAbout {...aboutTemplate} control={control} />
      <ButtonDefault type="submit" category="primary" size="small" className="ml-auto mt-4">
        Изпрати
      </ButtonDefault>
    </form>
  );
}
