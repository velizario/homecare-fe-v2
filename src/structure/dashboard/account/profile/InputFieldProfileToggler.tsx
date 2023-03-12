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
  const roles = userState(state => state.userData.roles);
  const test = scope.find(item => roles.includes(item))
  const isVisible = roles.length === 0 ? false : scope.find(item => roles.includes(item));
  console.log(typeof roles[0], typeof scope[0], isVisible)
  return <>{isVisible && children}</>;
};

export default InputFieldProfileToggler;
