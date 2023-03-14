import { UserType } from "./types";
import { userState } from "../store/userState";

const checkIfVisible = ( scope : UserType[]) => {
  const roles = userState((state) => state.userData.roles);
  return roles.length === 0
    ? false
    : (scope.find((item) => roles.includes(item)) && true) || false;
};

export default checkIfVisible;
