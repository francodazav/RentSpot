import { useUser } from "../hooks/useUser";

export const DisponibilitySpot = ({ spot }) => {
  const { user } = useUser();
  console.log(spot);
  return (
    <div className="reservation-container">
      <h1>
        {user.name} {user.lastname}
      </h1>
      <h1>Spot {spot.name}</h1>
      <div>
        <h3>Check In {spot.fechaIn}</h3>
        <h3>Check Out {spot.fechaOut}</h3>
      </div>
      <h3>Reason : {spot.reason}</h3>
      {spot.rsvConfirm ? (
        <h3>Confirm Code {spot.rsvConfirm}</h3>
      ) : (
        <h3>No confirm code </h3>
      )}
    </div>
  );
};
