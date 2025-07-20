import ReactModal from "react-modal";
import DatePicker from "react-datepicker";
import { useSpots } from "../hooks/ueeSpots";
import "./spotModal.css";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from "react";
import { Link } from "../Router/Link";
import { useUser } from "../hooks/useUser";
export const OwnerModal = () => {
  const {
    ownerModal,
    setOwnerModal,
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
    asignDisponibility,
    deleteSpot,
    getSpotDisponibility,
  } = useSpots();
  const { getHotels } = useUser();
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
  const handleDisponibilityForm = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formEntries = Object.fromEntries(formData.entries());
    const { reason } = formEntries;
    asignDisponibility(reason);
    setOwnerModal(false);
  };
  const handleDelete = async () => {
    await deleteSpot(spotToShow.id);
    alert("Spot deleted it sussccesfully");
    setOwnerModal(false);
    getHotels();
  };

  if (!spotToShow || !spotToShow.photos) return null;

  return (
    <ReactModal
      isOpen={ownerModal}
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
              <form className="reserve-form" onSubmit={handleDisponibilityForm}>
                <h2>Unavaible since</h2>{" "}
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
                <h2>Until</h2>{" "}
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
                <h2>Reason</h2>
                <input
                  type="text"
                  name="reason"
                  className="reason-input"
                  placeholder="Maintenance"
                />
                <button type="submit" className="button-modal button-form">
                  Upload
                </button>
              </form>
            </div>
          </div>
          <div className="buttons-spot owner-buttons">
            <button
              onClick={() => setOwnerModal(false)}
              className="button-modal"
            >
              Close
            </button>
            <Link to="/modify-hotel" className="link">
              Modify
            </Link>
            <Link to="/disponibility" className="link">
              Disponibility
            </Link>
            <button className="button-modal" onClick={handleDelete}>
              Delete Spot
            </button>
          </div>
        </div>
      ) : null}
    </ReactModal>
  );
};
