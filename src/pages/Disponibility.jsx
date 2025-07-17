import { useSpots } from "../hooks/ueeSpots";
import { useUser } from "../hooks/useUser";
import "./disponibility.css";
export const Disponibility = () => {
  const { user } = useUser();
  const { spotToShow } = useSpots();
  return (
    <section className="disponibility-section">
      {user != 1 ? (
        <h1 className="h1-access">You don't have access</h1>
      ) : (
        <h1 className="h1-access">You have access</h1>
      )}
    </section>
  );
};
