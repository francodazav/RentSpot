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
  useEffect(() => {
    const startDate = new Date(checkInDate);
    const outDate = new Date(checkOutDate);
    const startTime = startDate.getTime();
    const endTime = outDate.getTime();

    const diffenreceInMs = endTime - startTime;

    const milliSecondInDays = 1000 * 60 * 60 * 24;
    const diffDays = Math.floor(diffenreceInMs / milliSecondInDays);
    setDaysRsv(diffDays);
  }, [checkOutDate]);
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
