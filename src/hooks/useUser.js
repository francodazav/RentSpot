import { UserContext } from "../userContext/userContext";
import { useContext } from "react";

export const useUser = () => {
  const {
    user,
    loged,
    setLoginInfo,
    invalid,
    login,
    modalIsOpen,
    setIsOpen,
    modalMode,
    setModaleMode,
    register,
    logout,
  } = useContext(UserContext);
  if (user === undefined) {
    throw new Error("UserContext must be used within a UserProvider");
  }
  return {
    user,
    loged,
    setLoginInfo,
    invalid,
    login,
    modalIsOpen,
    setIsOpen,
    modalMode,
    setModaleMode,
    register,
    logout,
  };
};
