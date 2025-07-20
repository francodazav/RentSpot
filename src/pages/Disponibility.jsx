import { useCallback, useEffect } from "react";
import { useSpots } from "../hooks/ueeSpots";
import { useUser } from "../hooks/useUser";
import "./disponibility.css";
import { DisponibilitySpot } from "../elements/DisponibilitySpot";
export const Disponibility = () => {
  const { user } = useUser();
  const { spotToShow, spotDisponibility, getSpotDisponibility } = useSpots();
  const handleDisponibility = useCallback(async () => {
    if (spotToShow?.id) {
      console.log(spotToShow);
      await getSpotDisponibility(spotToShow.id);
    } else {
      console.warn("not yet");
    }
  }, [spotToShow, getSpotDisponibility]);
  useEffect(() => {
    handleDisponibility();
  }, [handleDisponibility]);
  useEffect(() => {
    console.log(spotDisponibility);
  }, [spotDisponibility]);
  return (
    <section className="disponibility-section">
      {user.type != 1 ? (
        <h1 className="h1-access">You don't have access</h1>
      ) : spotDisponibility.length == 0 ? (
        <h1>It doesn't have any reservation</h1>
      ) : (
        spotDisponibility.map((spot) => (
          <DisponibilitySpot key={spot.name} spot={spot} />
        ))
      )}
    </section>
  );
};
