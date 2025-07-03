import { useUser } from "../hooks/useUser.js";
import "../elements/navbar.css";
import { Link } from "../Router/Link.jsx";
export const Navbar = () => {
  const { user, loged, setIsOpen, setModaleMode } = useUser();
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
        <input type="text" className="search-bar" placeholder="Search..." />
        <ul className="navbar-list">
          <li>
            <Link to="/" className="link">
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

          <div className="login-register-div">
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
