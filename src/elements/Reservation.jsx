import { useSpots } from "../hooks/ueeSpots";
import { useUser } from "../hooks/useUser";

export const Reservation = ({ user, myReservation }) => {
  const { cancelRsv } = useSpots();
  const { getMyReservations } = useUser();
  const handleCancel = async () => {
    const result = await confirm("Do you want to cancel the reservation?");
    if (result) {
      await cancelRsv(myReservation.rsvConfirm);
      alert("The reservation was cancel ");
      getMyReservations();
    }
  };

  return (
    <div className="reservation-container">
      <h1>
        {user.name} {user.lastname}
      </h1>
      <h1>Spot {myReservation.name}</h1>
      <div>
        <h3>Check In {myReservation.fechaIn}</h3>
        <h3>Check Out {myReservation.fechaOut}</h3>
      </div>
      <h3>Reserve Confirmation : {myReservation.rsvConfirm}</h3>
      <button type="button" className="cancel-btn" onClick={handleCancel}>
        Cancel Reservation
      </button>
    </div>
  );
};
