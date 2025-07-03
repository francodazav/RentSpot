import { SpotCard } from "../elements/SpotCard";
import { useSpots } from "../hooks/ueeSpots";
import { useUser } from "../hooks/useUser";
import "./reserve.css";
export const Reserve = () => {
  const { user } = useUser();
  const { spotToShow } = useSpots();
  console.log("here", spotToShow);
  return (
    <section className="reserve-section">
      {user.message === "" || !spotToShow.name ? (
        <h1>You must login and select an hotel</h1>
      ) : (
        <div className="reserve-container">
          <SpotCard spot={spotToShow} />
        </div>
      )}
    </section>
  );
};
