import { UserType } from "../../../../helpers/types";
import { userState } from "../../../../store/userState";

export interface InputFieldProfileType {
  scope: UserType[];
  children: JSX.Element;
}

const InputFieldProfileToggler = ({
  scope,
  children,
}: InputFieldProfileType) => {
  const roles = userState(state => state.roles);
  const isVisible = roles.length === 0 ? false : scope.find(item => roles.includes(item));
  return <>{isVisible && children}</>;
};

export default InputFieldProfileToggler;
