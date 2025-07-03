import ReactModal from "react-modal";
import { useSpots } from "../hooks/ueeSpots";
import "./spotModal.css";
import { useEffect, useState } from "react";
import { Link } from "../Router/Link";
export const SpotModal = () => {
  const {
    spotModal,
    setSpotModal,
    spotToShow,
    setCheckInDate,
    setCheckOutDate,
    formattedTomorrow,
  } = useSpots();
  const date = new Date();
  const formattedDate = date.toISOString().split("T")[0];
  const handleDate = (event) => {
    const selectedDate = event.target.value;
    setCheckInDate(selectedDate);
  };

  const handleCheckOutDate = (event) => {
    setCheckOutDate(event.target.value);
  };
  if (!spotToShow || !spotToShow.photos) return null;
  return (
    <ReactModal
      isOpen={spotModal}
      contentLabel="Spot modall"
      className="spot-modal"
      overlayClassName="spot-modal-overlay"
      ariaHideApp={false}
    >
      {spotToShow ? (
        <div className="spot-modal-container">
          <div className="images-spot">
            <img
              src={spotToShow.photos.photo1}
              alt="principal photo"
              className="principal-photo"
            />
            <div className="secundary-photos">
              <img
                src={spotToShow.photos.photo2}
                alt="secundary photo"
                className="secundary-photos"
              />
              <img
                src={spotToShow.photos.photo3}
                alt="third photo"
                className="secundary-photos"
              />
            </div>
          </div>
          <div className="info-reserve-container">
            <div className="spot-info-container">
              <ul className="spot-info-list">
                <li>
                  <h2>{spotToShow.name.toUpperCase()}</h2>
                </li>
                <li>
                  <strong>
                    {spotToShow.city}, {spotToShow.country.toUpperCase()}
                  </strong>
                </li>
                <li>Direction: {spotToShow.direction}</li>
                <li>Capacity: {spotToShow.capacity}</li>
                <li>${spotToShow.price} per night</li>
                <li>
                  Services:
                  <span className="services">
                    {Object.entries(spotToShow.services)
                      .filter(([_, value]) => value)
                      .map(([key]) => (
                        <span key={key} className="service">
                          {key}
                        </span>
                      ))}
                  </span>
                </li>
                <li>{spotToShow.description}</li>
              </ul>
            </div>
            <div className="reservation">
              <form className="reserve-form">
                <h2>Check in:</h2>{" "}
                <input
                  type="date"
                  name="fecha-in"
                  className="date-input"
                  min={formattedDate}
                  onChange={handleDate}
                />
                <h2>Check out:</h2>{" "}
                <input
                  type="date"
                  name="fecha-out"
                  className="date-input"
                  min={formattedTomorrow}
                  onChange={handleCheckOutDate}
                />
              </form>
            </div>
          </div>
          <div className="buttons-spot">
            <button
              onClick={() => setSpotModal(false)}
              className="button-modal"
            >
              Close
            </button>
            <Link to="/reserve" className="link">
              Reserve
            </Link>
          </div>
        </div>
      ) : null}
    </ReactModal>
  );
};
