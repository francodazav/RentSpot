import { createContext, useCallback, useState, useEffect } from "react";

export const SpotsContext = createContext();

export const SpotsProvider = ({ children }) => {
  const [allSpots, setAllSpots] = useState([]);
  const [spotModal, setSpotModal] = useState(false);
  const [spotToShow, setSpotToShow] = useState({});
  const [reserveSpot, setReserveSpot] = useState([]);
  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(checkInDate.getDate() + 1);
  const [formattedTomorrow, setFormattedTomorrow] = useState("");
  const [daysRsv, setDaysRsv] = useState(0);
  const [rsvConfirm, setRsvConfirm] = useState(null);
  const [rsvDone, setRsvDone] = useState(false);
  const [disponibility, setDisponibility] = useState([]);
  const [formatedIn, setFormatedIn] = useState("");
  const [formatedOut, setFormatedOut] = useState("");
  const [notAvaible, setNotAvaible] = useState(false);
  const [ownerModal, setOwnerModal] = useState(false);
  useEffect(() => {
    if (checkInDate) {
      const tomorrow = new Date(checkInDate);
      tomorrow.setDate(tomorrow.getDate() + 1);
      setCheckOutDate(tomorrow);
      setFormatedOut(checkInDate.toISOString().split("T")[0]);
      setFormatedIn(checkInDate.toISOString().split("T")[0]);
    }
  }, [checkInDate]);
  const getAllSpots = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:3000/all-hotels", {
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
          fechaIn: formatedIn,
          fechaOut: formatedOut,
          username: user.username,
          price: payment,
          paymentMethod: "credit_card",
        }),
      });
      const result = await response.json();
      const { rsvConfirmation } = result;
      setRsvConfirm(rsvConfirmation);
    } catch (error) {
      throw new Error(error);
    }
  };
  useEffect(() => {
    setRsvDone(true);
    console.log(rsvDone);
  }, [rsvConfirm]);
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
  useEffect(() => {
    if (!spotToShow?.id) return;
    getDisponibility();
  }, [spotToShow]);
  const getDisponibility = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/disponibility/${spotToShow.id}`,
        { method: "GET" }
      );
      const result = await response.json();
      if (result.length > 0) {
        const datesNotAvaible = result.map((fechas) => {
          const dateIn = new Date(fechas.fechaIn);
          const start = dateIn.toISOString().split("T")[0];
          const dateOut = new Date(fechas.fechaOut);
          const end = dateOut.toISOString().split("T")[0];
          return { start, end };
        });

        setDisponibility(datesNotAvaible);
      }
    } catch (error) {
      throw new Error(error);
    }
  };
  const asignDisponibility = async (reason) => {
    try {
      const response = await fetch(
        "http://localhost:3000/disponibility-hotel",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            hotelId: spotToShow.id,
            fechaIn: formatedIn,
            fechaOut: formatedOut,
            reason,
          }),
        }
      );
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };
  const patchHotel = useCallback(
    async ({ name, price, description }) => {
      try {
        console.log("spot", spotToShow);
        const respone = await fetch("http://localhost:3000/modify-hotel", {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            hotelId: spotToShow.id,
            hotelName: name,
            rate: spotToShow.rate,
            price: Number(price),
            description: description,
            direction: spotToShow.direction,
            photos: spotToShow.photos,
            services: spotToShow.services,
            city: spotToShow.city,
            country: spotToShow.country,
            capacity: spotToShow.capacity,
          }),
        });
        const result = await respone.json();
        return result.message;
      } catch (error) {
        console.error(error);
      }
    },
    [spotToShow]
  );
  const deleteSpot = useCallback(async (id) => {
    console.log(id);
    try {
      const response = await fetch(`http://localhost:3000/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
        }),
      });
      const result = await response.json();
      return result;
    } catch (error) {
      console.error(error);
    }
  }, []);
  const cancelRsv = useCallback(async (rsvConfirm) => {
    try {
      console.log(rsvConfirm);
      const response = await fetch(
        `http://localhost:3000/reservation/${rsvConfirm}`,
        {
          method: "DELETE",
        }
      );
      const result = await response.json();
      return result;
    } catch (error) {
      console.error(error);
    }
  }, []);
  const searchHotel = useCallback(
    async ({
      country = null,
      city = null,
      fechaIn = null,
      fechaOut = null,
      capacity = null,
    }) => {
      const params = new URLSearchParams();
      console.log(fechaIn, fechaOut);
      if (country != "Country") params.append("country", country);
      if (city != "City") params.append("city", city);
      if (fechaIn) params.append("fechaIn", fechaIn);
      if (fechaOut) params.append("fechaOut", fechaOut);
      if (capacity != 0) params.append("capacity", capacity);
      try {
        const response = await fetch(
          `http://localhost:3000/hoteles?${params.toString()}`,
          {
            method: "GET",
          }
        );
        const result = await response.json();
        console.log(result);
        setAllSpots(result);
      } catch (error) {
        console.error(error);
      }
    },

    []
  );
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

        formatedOut,
        formatedIn,
        notAvaible,
        ownerModal,
        rsvDone,
        searchHotel,
        setRsvDone,
        setOwnerModal,
        setNotAvaible,
        setFormatedOut,
        makeReservation,
        setDaysRsv,
        setCheckInDate,
        setCheckOutDate,
        setFormattedTomorrow,
        setReserveSpot,
        setSpotToShow,
        setSpotModal,
        getAllSpots,
        getDisponibility,
        setRsvConfirm,
        asignDisponibility,
        patchHotel,
        deleteSpot,
        cancelRsv,
        setAllSpots,
      }}
    >
      {children}
    </SpotsContext.Provider>
  );
};
