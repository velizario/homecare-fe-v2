import { StarIcon } from "@heroicons/react/20/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import classNames from "../../../../helpers/classNames";
import ButtonDefault from "../../../../utilityComponents/CustomButton";
import InputErrorMessage from "../../../../utilityComponents/InputErrorMessage";
import ProfileAbout from "../../account/profile/ProfileAbout";

const aboutTemplate = { className: "w-[25rem] mt-4", name: "feedback", id: "feedback", label: "Ако желаете, споделете няколко думи:" };

export type TFeedbackForm = {
  feedback: string;
  rating: number | null;
  id: string;
};

type FeedbackProps = {
  submitModal: (data: TFeedbackForm) => void;
};

let ValidationSchema = z.object({
  feedback: z.string().min(2, { message: "Минимум 2 символа" }).max(40, { message: "Maximum allowed characters are 100" }).or(z.literal("")),
  rating: z.number({ invalid_type_error: "Въведете цяло число за цена" }),
});

export default function Feedback({ submitModal }: FeedbackProps) {
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    trigger
  } = useForm<TFeedbackForm>({
    defaultValues: {
      feedback: "",
      rating: null,
    },
    resolver: zodResolver(ValidationSchema),
  });

  const userRating = watch("rating");

   return (
    <form onSubmit={handleSubmit(submitModal)} className="p-6">
      <h3 className="text-center text-lg font-semibold">Оценка на посещението</h3>
      <p className="mt-4 text-sm">Доволни ли сте от услугата?</p>
      <div className="mt-1 flex items-center">
        {[1, 2, 3, 4, 5].map((rating) => (
          <StarIcon
            onClick={() => {setValue("rating", rating), trigger(["rating"])}}
            key={rating}
            className={classNames(
              userRating && userRating >= rating ? "text-yellow-400 " : "stroke-gray-300 text-white ",
              "stroke h-7 w-7 flex-shrink-0 cursor-pointer stroke-1"
            )}
            aria-hidden="true"
          />
        ))}
      </div>
      <InputErrorMessage>{errors.rating?.message}</InputErrorMessage>
      <ProfileAbout {...aboutTemplate} control={control} />
      <ButtonDefault type="submit" category="primary" size="small" className="ml-auto mt-4">
        Изпрати
      </ButtonDefault>
    </form>
  );
}
