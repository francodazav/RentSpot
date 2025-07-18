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
  const [myReservations, setMyReservations] = useState(null);
  const [ownerSpots, setOwnerSpots] = useState([]);
  const [ownerReady, setOwnerReady] = useState(false);
  const setData = (data) => {
    setUser(data);
    setLoged(true);
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
    } catch (error) {
      setLoged(false);
      console.error(error);
    }
  }, []);
  useEffect(() => {
    if (user.type === 1) {
      getHotels();
    } else {
      getMyReservations();
    }
  }, [user]);
  const getHotels = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:3000/my-hotels", {
        method: "GET",
        credentials: "include",
      });
      const userSpots = await response.json();
      setOwnerSpots(userSpots);
    } catch (error) {}
  }, []);

  useEffect(() => {
    if (user.message) {
      setIsInvalid(user.message);
    } else {
      setIsInvalid("");
    }
  }, [user]);
  useEffect(() => {
    console.log(ownerSpots);
    setOwnerReady(true);
  }, [ownerSpots]);
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
        if (result.message) {
          alert(result.message);
          if (result.registered) {
            return result.registered;
          }
        }
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
  const getMyReservations = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:3000/reservation", {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      setMyReservations(data);
    } catch (error) {
      console.error("Error fetching reservations:", error);
    }
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
        getMyReservations,
        myReservations,
        ownerReady,
        ownerSpots,
        getHotels,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
