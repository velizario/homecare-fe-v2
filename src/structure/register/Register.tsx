import { Link, useNavigate } from "react-router-dom";
import UserTypeSelection from "../dashboard/account/profile/UserTypeSelection";
import { userState } from "../../store/userState";
import classNames from "../../helpers/classNames";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputErrorMessage from "../../utilityComponents/InputErrorMessage";
import { userSignup } from "../../model/clientModel";
import { useState } from "react";
import { UserType } from "../../types/types";
import InputField from "../../utilityComponents/InputField";
import Toaster, { toasted } from "../../utilityComponents/Toast";

const RegisterInputValues = {
  firstName: {
    className: "",
    name: "firstName",
    id: "first-name",
    label: "Име*",
    autoComplete: "given-name",
  },
  lastName: {
    className: "",
    name: "last-name",
    id: "last-name",
    label: "Фамилия",
    autoComplete: "family-name",
  },
  companyName: {
    className: "",
    name: "company",
    id: "company",
    label: "Име на фирма*",
  },
  email: {
    className: "",
    name: "email-address",
    id: "email-address",
    label: "Имейл адрес*",
    autoComplete: "email",
  },
  password: {
    className: "",
    name: "password",
    id: "password",
    label: "Парола*",
  },
  passwordConfirm: {
    className: "",
    name: "passwordConfirm",
    id: "passwordConfirm",
    label: "Потвърди парола*",
  },
};

export type RegistrationForm = {
  firstName: string;
  lastName: string;
  email: string;
  companyName: string;
  password: string;
  passwordConfirm: string;
};

let BaseValidationSchema = z.object({
  firstName: z
    .string({ required_error: "Required field" })
    .min(2, { message: "Minimum allowed characters are 2" })
    .max(40, { message: "Maximum allowed characters are 40" }),
  lastName: z.string({ required_error: "Required field" }).max(40, "Maximum allowed characters are 40"),
  companyName: z.string().max(40, "Maximum allowed characters are 40").nonempty({ message: "Required field" }),
  email: z.string({ required_error: "Required field" }).email({ message: "Invalid email address" }),
  password: z.string({ required_error: "Required field" }).min(8, "Password should be at least 8 characters long"),
  passwordConfirm: z.string({ required_error: "Required field" }),
});

let DefaultValidationSchema = BaseValidationSchema.omit({
  companyName: true,
}).refine((data) => data.password === data.passwordConfirm, {
  message: "Passwords don't match",
  path: ["passwordConfirm"],
});

let CompanyValidationSchema = BaseValidationSchema.refine((data) => data.password === data.passwordConfirm, {
  message: "Passwords don't match",
  path: ["passwordConfirm"],
});

export default function Register() {
  const [setIsLoggedIn, setUserData] = userState((state) => [state.setIsLoggedIn, state.setUserData]);
  const navigate = useNavigate();
  const [roles, setRoles] = useState<UserType[]>([]);

  const ActiveValidationSchema = roles.includes(UserType.VENDOR_COMPANY)
    ? CompanyValidationSchema
    : DefaultValidationSchema;

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setError,
  } = useForm<RegistrationForm>({
    resolver: zodResolver(ActiveValidationSchema),
  });

  const submitFormHandler = async (data: RegistrationForm) => {
    // add role to the request. Should be of UserType. Cannot be ADMIN
    const dataHydrated = { ...data, roles };
    // reset error message
    const createAttempt = await userSignup(dataHydrated);
    if (createAttempt.status === "success") {
      setIsLoggedIn(true);
      setUserData(createAttempt.data);
      toasted("Регистрирахте се успешно!", "success")
      navigate("/dashboard");
    }
    if (createAttempt.status === "fail" && createAttempt.message.includes("email"))
      setError("email", { message: createAttempt.message });
  };

  return (
    <>
      <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="px-4 sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-2 text-center text-3xl font-bold tracking-tight text-gray-900">Регистрирай се</h2>
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white px-4 pt-4 pb-8 shadow sm:rounded-lg sm:px-10">
            <h4 className="mb-6 block text-sm text-gray-900">1. Предоставяте или търсите услуги за почистване?</h4>
            <UserTypeSelection roles={roles} setRoles={setRoles} />

            <form
              onSubmit={handleSubmit(submitFormHandler)}
              className={classNames("animate-register-form space-y-6", roles.length > 0 ? "block" : "hidden")}
            >
              <h4 className="mt-10 block text-sm text-gray-900">2. Въведете вашите данни</h4>
              <div
                className={classNames(
                  "flex flex-col space-y-6 sm:flex-row sm:justify-between sm:space-y-0 sm:space-x-4"
                )}
              >
                <InputField {...RegisterInputValues.firstName} {...register("firstName")} control={control} />
                <InputField {...RegisterInputValues.lastName} {...register("lastName")} control={control} />
              </div>
              <InputField
                {...RegisterInputValues.companyName}
                {...register("companyName")}
                control={control}
                className={roles.includes(UserType.VENDOR_COMPANY) ? "block" : "hidden"}
              />
              <InputField {...RegisterInputValues.email} {...register("email")} control={control} />

              <InputField
                {...RegisterInputValues.password}
                {...register("password")}
                defaultValue={""}
                control={control}
                type="password"
              />
              <InputField
                {...RegisterInputValues.passwordConfirm}
                {...register("passwordConfirm")}
                defaultValue={""}
                control={control}
                type="password"
              />

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md border border-transparent bg-indigo-700 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Регистрирай се като{" "}
                  {roles.includes(UserType.CLIENT)
                    ? "клиент"
                    : roles.includes(UserType.VENDOR_COMPANY) || roles.includes(UserType.VENDOR_INDIVIDUAL)
                    ? "доставчик"
                    : ""}
                </button>
              </div>
            </form>

            <div className={classNames("mt-6", roles.length > 0 ? "block" : "hidden")}>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-white px-2 text-gray-500">или продължи със</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3">
                <div>
                  <a
                    href="#"
                    className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50"
                  >
                    <span className="sr-only">Sign in with Facebook</span>
                    <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </div>

                <div>
                  <a
                    href="#"
                    className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50"
                  >
                    <span className="sr-only">Sign in with Twitter</span>
                    <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                </div>

                <div>
                  <a
                    href="#"
                    className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50"
                  >
                    <span className="sr-only">Sign in with GitHub</span>
                    <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            <p className="mt-6 text-center text-xs text-gray-600">
              Имаш акаунт?&nbsp;
              <Link to="#" className="font-medium text-indigo-700 hover:text-indigo-500">
                Влез в акаунта си
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
