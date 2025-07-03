import { createContext, useState, useEffect, useCallback, useRef } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    message: "",
  });
  const [invalid, setIsInvalid] = useState(user.message);
  const [loginInfo, setLoginInfo] = useState({ username: "", password: "" });
  const [loged, setLoged] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalMode, setModaleMode] = useState("login");
  const setData = (data) => {
    setUser(data);
    setLoged(true);
    console.log("loged", loged);
  };
  const login = useCallback(async ({ username, password }) => {
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
      const data = await response.json();
      if (data.name) {
        setData(data);
      } else {
        setLoged(false);
        setIsInvalid("Invalid username or password");
      }
      console.log(data);
    } catch (error) {
      setLoged(false);
      console.error(error);
    }
  }, []);
  useEffect(() => {
    if (user.message) {
      setIsInvalid(user.message);
    } else {
      setIsInvalid("");
    }
  }, [user]);
  const register = useCallback(
    async ({ name, lastname, username, password, email, type }) => {
      try {
        const response = await fetch("http://localhost:3000/sign-up", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            lastname,
            username,
            password,
            email,
            type: Number(type),
          }),
        });
        const result = await response.json();
        console.log(result);
      } catch (error) {}
    },
    []
  );
  const logout = useCallback(async () => {
    setUser({ message: "" });
    setLoged(false);
    try {
      const response = await fetch("http://localhost:3000/logout", {
        method: "GET",
        credentials: "include",
      });
      const result = await response.json();
      console.log(result);
    } catch (error) {}
  }, []);
  return (
    <UserContext.Provider
      value={{
        user,
        loged,
        setLoginInfo,
        loginInfo,
        invalid,
        login,
        modalIsOpen,
        setIsOpen,
        setData,
        modalMode,
        setModaleMode,
        register,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
