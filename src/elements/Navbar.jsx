import { useUser } from "../hooks/useUser.js";
import "../elements/navbar.css";
import { Link } from "../Router/Link.jsx";
import { SearchBar } from "./SearchBar.jsx";
export const Navbar = () => {
  const { user, loged, setIsOpen, setModaleMode, getHotels } = useUser();

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
          <li>
            <Link to="/" className="link" onClick={() => getHotels()}>
              Home
            </Link>
          </li>
          <li>
            <h3>Spots</h3>
          </li>
          <li>
            <h3>Offers</h3>
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
        </ul>
      </div>
    </nav>
  );
};
