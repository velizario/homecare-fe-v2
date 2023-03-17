import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { userPasswordChange } from "../../../../model/clientModel";
import { userState } from "../../../../store/userState";
import InputField from "../../../../utilityComponents/InputField";

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
  } = useForm<SecurityForm>();
  
  const submitFormHandler = async (data: SecurityForm) => {
    const {passwordConfirm, ...dataStripped} = data;
    const editedUser = await userPasswordChange(dataStripped);
    if (editedUser.hasOwnProperty("id")) setUserData(editedUser) 
    else console.log("Apperror in Profile.tsx - could not update Profile. Possibly DB constraints not met.")
  }

  useEffect(() => {
    reset(userData);
  }, [userData]);



  return (
    <>
      <div className="flex-1 py-4 px-4 md:px-6 lg:px-8">
        <form onSubmit={handleSubmit(submitFormHandler)} className="max-w-3xl space-y-8 divide-y">
          <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-6">
            <p className="text-sm text-gray-500 sm:col-span-6">Промяна на мейл, парола и т.н.</p>

            <InputField {...ProfileInputValues.email} {...register("email")} control={control} defaultValue={userData.email} />
            <InputField {...ProfileInputValues.password} {...register("password")} control={control} type="password" />
            <InputField {...ProfileInputValues.passwordConfirm} {...register("passwordConfirm")} control={control} type="password" />
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
