import { Component } from "react";
import { UpoloadSpot } from "../pages/UploadSpot.jsx";
import { MySpots } from "../pages/MySpots.jsx";
import { HomePage } from "../pages/Homepage.jsx";
import { Reserve } from "../pages/Reserve.jsx";
export const routes = [
  { path: "/upload-spot", Component: UpoloadSpot },
  { path: "/my-spots", Component: MySpots },
  { path: "/", Component: HomePage },
  { path: "/reserve", Component: Reserve },
];
