import "./myReservations.css";
import { useUser } from "../hooks/useUser.js";
import { Reservation } from "../elements/Reservation.jsx";

export const MyReservations = () => {
  const { user, getMyReservations, myReservations } = useUser();

  return (
    <section className="reservations-section">
      {user.message ? (
        <h1>You must login to see the reservations </h1>
      ) : myReservations ? (
        myReservations.map((myReservation) => (
          <Reservation user={user} myReservation={myReservation} />
        ))
      ) : (
        <h1>You dont have any reservations</h1>
      )}
    </section>
  );
};
