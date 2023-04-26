import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ApiError } from "../../../../types/types";
import { userPasswordChange } from "../../../../model/clientModel";
import { userState } from "../../../../store/userState";
import InputField from "../../../../utilityComponents/InputField";
import { zodResolver } from "@hookform/resolvers/zod";
import { toasted } from "../../../../utilityComponents/Toast";

const ProfileInputValues = {
  email: {
    className: "sm:col-span-6",
    name: "email-address",
    id: "email-address",
    label: "Имейл адрес",
    autoComplete: "email",
  },
  password: {
    className: "col-start-1 sm:col-end-7",
    name: "password",
    id: "password",
    label: "Нова парола",
  },
  passwordConfirm: {
    className: "col-start-1 sm:col-end-7",
    name: "passwordConfirm",
    id: "passwordConfirm",
    label: "Потвърди парола",
  },
};

export type SecurityForm = {
  email: string;
  password: string;
  passwordConfirm: string;
};

let ValidationSchema = z
  .object({
    email: z.string({ required_error: "Required field" }).email({ message: "Invalid email address" }),
    password: z.string({ required_error: "Required field" }).min(8, "Password should be at least 8 characters long"),
    passwordConfirm: z.string({ required_error: "Required field" }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords don't match",
    path: ["passwordConfirm"],
  });

export default function Security() {
  const [userData, setUserData] = userState((state) => [state.userData, state.setUserData]);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
    setError,
  } = useForm<SecurityForm>({ resolver: zodResolver(ValidationSchema) });

  const submitFormHandler = async (data: SecurityForm) => {
    const { passwordConfirm, ...dataStripped } = data;
    const editedUser = await userPasswordChange(dataStripped);
    console.log("!!!!!", editedUser);
    if (!editedUser) {
      console.log("Apperror in Profile.tsx - could not update Profile. Possibly DB constraints not met.");
      return;
    }
    if (editedUser.hasOwnProperty("message")) {
      setError("email", { message: (editedUser as ApiError).message });
      return;
    }

    setUserData(editedUser);
    toasted("Промените са записани")
  };

  useEffect(() => {
    reset({ email: userData.email });
  }, [userData]);

  return (
    <>
      <div className="flex-1 py-4">
        <form onSubmit={handleSubmit(submitFormHandler)} className="max-w-3xl space-y-8 divide-y">
          <div className="flex flex-col gap-4">
            <p className="text-sm text-gray-500 sm:col-span-6">Промяна на мейл, парола и т.н.</p>
            <InputField
              {...ProfileInputValues.email}
              {...register("email")}
              control={control}
              defaultValue={userData.email}
            />
            <InputField
              {...ProfileInputValues.password}
              {...register("password")}
              defaultValue={""}
              control={control}
              type="password"
            />
            <InputField
              {...ProfileInputValues.passwordConfirm}
              {...register("passwordConfirm")}
              defaultValue={""}
              control={control}
              type="password"
            />
          </div>

          <div className="flex justify-end gap-4 pt-8">
            <button
              type="submit"
              className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 "
            >
              Запиши
            </button>
            <button
              type="button"
              className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-900 shadow-sm hover:bg-gray-50 "
            >
              Отмени
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
