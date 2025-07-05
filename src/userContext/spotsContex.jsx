import { createContext, useCallback, useState, useEffect } from "react";

export const SpotsContext = createContext();

export const SpotsProvider = ({ children }) => {
  const [allSpots, setAllSpots] = useState([]);
  const [spotModal, setSpotModal] = useState(false);
  const [spotToShow, setSpotToShow] = useState({});
  const [reserveSpot, setReserveSpot] = useState([]);
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [formattedTomorrow, setFormattedTomorrow] = useState("");
  const [daysRsv, setDaysRsv] = useState(0);
  const [rsvConfirm, setRsvConfirm] = useState("");
  const [disponibility, setDisponibility] = useState({});
  useEffect(() => {
    if (checkInDate) {
      const tomorrow = new Date(checkInDate);
      tomorrow.setDate(tomorrow.getDate() + 1);
      setFormattedTomorrow(tomorrow.toISOString().split("T")[0]);
    }
  }, [checkInDate]);
  const getAllSpots = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:3000/hoteles", {
        method: "GET",
      });
      const result = await response.json();

      setAllSpots(result);
    } catch (error) {
      console.error(error);
    }
  });
  const makeReservation = async ({ user }) => {
    const payment = daysRsv * spotToShow.price;
    try {
      console.log(checkInDate, checkOutDate);
      const response = await fetch("http://localhost:3000/reservation", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: user.name,
          lastname: user.lastname,
          username: user.username,
          hotelId: spotToShow.id,
          email: user.email,
          fechaIn: checkInDate,
          fechaOut: checkOutDate,
          username: user.username,
          price: payment,
          paymentMethod: "credit_card",
        }),
      });
      const result = await response.json();
      setRsvConfirm(result.rsvConfirmation);
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    const startDate = new Date(checkInDate);
    const outDate = new Date(checkOutDate);
    const startTime = startDate.getTime();
    const endTime = outDate.getTime();

    const diffenreceInMs = endTime - startTime;

    const milliSecondInDays = 1000 * 60 * 60 * 24;
    const diffDays = Math.floor(diffenreceInMs / milliSecondInDays);
    setDaysRsv(diffDays);
    getDisponibility();
  }, [checkOutDate]);
  const getDisponibility = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/disponibility/${spotToShow.id}`,
        { method: "GET" }
      );
      const result = await response.json();
      if (result.length > 0) {
        const datesNotAvaible = result.map((fechas) => {
          const start = new Date(fechas.fechaIn);
          const end = new Date(fechas.fechaOut);
          return { start, end };
        });
        console.log("asd", datesNotAvaible);
        setDisponibility(datesNotAvaible);
      }
    } catch (error) {
      throw new Error(error);
    }
  };
  return (
    <SpotsContext.Provider
      value={{
        allSpots,
        spotModal,
        spotToShow,
        reserveSpot,
        checkInDate,
        checkOutDate,
        formattedTomorrow,
        daysRsv,
        rsvConfirm,
        disponibility,
        makeReservation,
        setDaysRsv,
        setCheckInDate,
        setCheckOutDate,
        setFormattedTomorrow,
        setReserveSpot,
        setSpotToShow,
        setSpotModal,
        getAllSpots,
      }}
    >
      {children}
    </SpotsContext.Provider>
  );
};
