import { useUser } from "../hooks/useUser.js";
import "../elements/navbar.css";
import { Link } from "../Router/Link.jsx";
import { SearchBar } from "./SearchBar.jsx";
import { useEffect, useState } from "react";
export const Navbar = () => {
  const { user, loged, setIsOpen, setModaleMode, getHotels } = useUser();
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  const [options, setOptions] = useState("block");
  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };
    console.log(width, height);
    if (width >= 320 && width <= 770) {
      console.log("entra");
      setOptions("none");
    } else {
      setOptions("flex");
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const handleOptions = () => {
    options === "flex" ? setOptions("none") : setOptions("flex");
  };
  const showModalLog = () => {
    setIsOpen(true);
    setModaleMode("login");
  };
  const showModalReg = () => {
    setIsOpen(true);
    setModaleMode("register");
  };
  return (
    <nav className="navbar">
      <h1 className="title">RentSpot</h1>
      <div className="options-container">
        <SearchBar />
        <ul className="navbar-list">
          <button className="options-btn" onClick={handleOptions}>
            <svg
              className="w-6 h-6 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M18 6H6m12 4H6m12 4H6m12 4H6"
              />
            </svg>
          </button>
          <div className="options-nav" style={{ display: options }}>
            <li>
              <Link to="/" className="link" onClick={() => getHotels()}>
                Home
              </Link>
            </li>
            <li>
              <h3>{user.name}</h3>
            </li>

            <li>
              <button
                type="button"
                onClick={showModalLog}
                className="log-reg-btn"
              >
                Login
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={showModalReg}
                className="log-reg-btn"
              >
                Register
              </button>
            </li>
          </div>
        </ul>
      </div>
    </nav>
  );
};
