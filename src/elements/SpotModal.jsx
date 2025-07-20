import ReactModal from "react-modal";
import DatePicker from "react-datepicker";
import { useSpots } from "../hooks/ueeSpots";
import "./spotModal.css";
import { Link } from "../Router/Link";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect } from "react";
export const SpotModal = () => {
  const {
    spotModal,
    setSpotModal,
    spotToShow,
    setCheckInDate,
    setCheckOutDate,
    checkOutDate,
    disponibility,
    checkInDate,
    setFormatedOut,
    formatedIn,
    formatedOut,
    setNotAvaible,
  } = useSpots();
  useEffect(() => {
    if (!formatedIn || !formatedOut || disponibility.length === 0) return;

    const selectedStart = new Date(formatedIn);
    const selectedEnd = new Date(formatedOut);

    const overlaps = disponibility.some(({ start, end }) => {
      const reservedStart = new Date(start);
      reservedStart.setHours(0, 0, 0, 0);
      const reservedEnd = new Date(end);
      reservedEnd.setHours(0, 0, 0, 0);

      return selectedStart <= reservedEnd && selectedEnd >= reservedStart;
    });

    setNotAvaible(overlaps);
  }, [formatedIn, formatedOut, disponibility]);
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
                <DatePicker
                  excludeDateIntervals={
                    Array.isArray(disponibility) ? disponibility : []
                  }
                  showIcon
                  onChange={(date) => setCheckInDate(date)}
                  selected={checkInDate}
                  minDate={new Date(formatedIn)}
                  className="date-input"
                />
                <h2>Check out:</h2>{" "}
                <DatePicker
                  excludeDateIntervals={
                    Array.isArray(disponibility) ? disponibility : []
                  }
                  showIcon
                  name="fecha-out"
                  onChange={(date) => {
                    setFormatedOut(date.toISOString().split("T")[0]);
                    setCheckOutDate(date);
                  }}
                  selected={checkOutDate}
                  minDate={new Date(formatedOut)}
                  className="date-input"
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
