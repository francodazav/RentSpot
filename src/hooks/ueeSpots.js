import { SpotsContext } from "../userContext/spotsContex";
import { useContext } from "react";

export const useSpots = () => {
  const {
    getAllSpots,
    allSpots,
    spotModal,
    setSpotModal,
    spotToShow,
    setSpotToShow,
    reserveSpot,
    setReserveSpot,
    daysReserve,
    setDaysReserve,
    checkInDate,
    setCheckInDate,
    checkOutDate,
    setCheckOutDate,
    formattedTomorrow,
    setFormattedTomorrow,
    daysRsv,
    setDaysRsv,
  } = useContext(SpotsContext);
  return {
    getAllSpots,
    allSpots,
    spotModal,
    setSpotModal,
    spotToShow,
    setSpotToShow,
    reserveSpot,
    setReserveSpot,
    daysReserve,
    setDaysReserve,
    checkInDate,
    setCheckInDate,
    checkOutDate,
    setCheckOutDate,
    formattedTomorrow,
    setFormattedTomorrow,
    daysRsv,
    setDaysRsv,
  };
};
