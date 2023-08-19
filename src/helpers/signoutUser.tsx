import { userState } from "../store/userState";
import { User } from "../types/types";

export const SignOutUser = () => {
    localStorage.setItem("token", "");
    userState.setState({ isLoggedIn: false, userData: {} as User });
  };