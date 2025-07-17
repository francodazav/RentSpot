import { Component } from "react";
import { UpoloadSpot } from "../pages/UploadSpot.jsx";
import { MySpots } from "../pages/MySpots.jsx";
import { HomePage } from "../pages/Homepage.jsx";
import { Reserve } from "../pages/Reserve.jsx";
import { MyReservations } from "../pages/MyReservations.jsx";
import { ModifyHotel } from "../pages/ModifyHotel.jsx";
import { Disponibility } from "../pages/Disponibility.jsx";
export const routes = [
  { path: "/upload-spot", Component: UpoloadSpot },
  { path: "/my-spots", Component: MySpots },
  { path: "/", Component: HomePage },
  { path: "/reserve", Component: Reserve },
  { path: "/my-reservations", Component: MyReservations },
  { path: "/modify-hotel", Component: ModifyHotel },
  { path: "/disponibility", Component: Disponibility },
];
