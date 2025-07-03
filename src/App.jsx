import "./App.css";
import React from "react";
import { useUser } from "../src/hooks/useUser.js";
import { LoginRegisterModal } from "./elements/LoginModal.jsx";
import { Navbar } from "./elements/Navbar.jsx";
import { DinamicNavbar } from "./elements/DinamicNavbar.jsx";
import { Suspense } from "react";
import { Router } from "./Router/Router.jsx";
import { Route } from "./Router/Route.jsx";
import { routes } from "./Router/routes.js";
const UploadSpot = React.lazy(() => import("./pages/UploadSpot.jsx"));
const MySpots = React.lazy(() => import("./pages/MySpots.jsx"));
const HomePage = React.lazy(() => import("./pages/Homepage.jsx"));
const Reserve = React.lazy(() => import("./pages/Reserve.jsx"));
function App() {
  const { user, loged, setIsOpen, setModaleMode } = useUser();

  return (
    <main className="App">
      <Suspense>
        {loged ? <DinamicNavbar /> : <Navbar />}
        <Router routes={routes}>
          <Route path="/" Component={HomePage} />
          <Route path="/reserve" Component={Reserve} />
        </Router>
        {loged ? (
          <Router routes={routes}>
            <Route path="/upload-spot" Component={UploadSpot} />
            <Route path="/my-spots" Component={MySpots} />
          </Router>
        ) : (
          <Route path="/" Component={HomePage} />
        )}
        <LoginRegisterModal />
      </Suspense>
    </main>
  );
}

export default App;
