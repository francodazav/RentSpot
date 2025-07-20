import { useUser } from "../hooks/useUser";
import { Link } from "../Router/Link";
import "../elements/navbar.css";
import { SearchBar } from "./SearchBar";
import { useEffect, useState } from "react";
export const DinamicNavbar = () => {
  const { user, logout, getHotels } = useUser();
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  const [options, setOptions] = useState("block");
  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };
    console.log(width, height);
    if (width >= 320 && width <= 725) {
      console.log("entra");
      setOptions("none");
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const handleOptions = () => {
    options === "block" ? setOptions("none") : setOptions("block");
  };
  return (
    <nav className="navbar">
      <h1 className="title">RentSpot</h1>
      <div className="options-container-user">
        {user.type === 2 ? (
          <SearchBar />
        ) : (
          <h2 className="h2-name">{user.username}</h2>
        )}

        <ul className="navbar-list-user">
          <li>
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
          </li>
          {user.type === 1 ? (
            <div className="usernav-responsive" style={{ display: options }}>
              <div className="usernav-div-1 ">
                <li>
                  <Link to="/" className="link">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to={"/my-spots"} className="link">
                    My Spots
                  </Link>
                </li>
                <li>
                  <Link to={"/upload-spot"} className="link">
                    Upload Spot
                  </Link>
                </li>
                <li>
                  <button className="user-btns" onClick={logout}>
                    Log out
                  </button>
                </li>
              </div>
            </div>
          ) : (
            <div className="usernav-responsive" style={{ display: options }}>
              <div className="usernav-div">
                <li>
                  <Link to={"/"} className="link">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to={"/my-reservations"} className="link">
                    My reservations
                  </Link>
                </li>
                <li>
                  <button className="user-btns" onClick={logout}>
                    Log out
                  </button>
                </li>
              </div>
            </div>
          )}
        </ul>
      </div>
    </nav>
  );
};
