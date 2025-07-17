import { useUser } from "../hooks/useUser";
import { Link } from "../Router/Link";
import "../elements/navbar.css";
import { SearchBar } from "./SearchBar";
export const DinamicNavbar = () => {
  const { user, logout, getHotels } = useUser();

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
          {user.type === 1 ? (
            <div className="usernav-div-1">
              <li>
                <Link to="/" className="link" onClick={getHotels}>
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
            </div>
          ) : (
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
            </div>
          )}
          <li>
            <button className="user-btns" onClick={logout}>
              Log out
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};
