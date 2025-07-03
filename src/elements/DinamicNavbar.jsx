import { useUser } from "../hooks/useUser";
import { Link } from "../Router/Link";
import "../elements/navbar.css";
export const DinamicNavbar = () => {
  const { user, logout } = useUser();

  return (
    <nav className="navbar">
      <h1 className="title">RentSpot</h1>
      <div className="options-container-user">
        {user.type === 2 ? (
          <input type="text" className="search-bar" placeholder="Search..." />
        ) : (
          <h2 className="h2-name">{user.username}</h2>
        )}

        <ul className="navbar-list-user">
          {user.type === 1 ? (
            <div className="usernav-div-1">
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
                  Reservations
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
                <button className="user-btns">My reservations</button>
              </li>
              <li>
                <button className="user-btns">Find spot</button>
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
