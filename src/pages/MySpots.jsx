import "./myspots.css";
import { useUser } from "../hooks/useUser";
import { SpotOwner } from "../elements/SpotUser";
import { OwnerModal } from "../elements/OwnerModal";
export const MySpots = () => {
  const { user, loged, ownerSpots, ownerReady } = useUser();
  return (
    <section className="myspots">
      <OwnerModal />
      {user.type === 2 || !loged ? (
        <div className="access">
          <h2>You don't have access</h2>
        </div>
      ) : (
        <div className="spot-show-container">
          {ownerReady && Array.isArray(ownerSpots) && ownerSpots.length > 0 ? (
            ownerSpots.map((spot) => <SpotOwner key={spot.name} spot={spot} />)
          ) : (
            <h2>You don't have any spot</h2>
          )}
        </div>
      )}
    </section>
  );
};
