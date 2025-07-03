import { useEffect, useState } from "react";
import "./myspots.css";
import { useUser } from "../hooks/useUser";
import { Spot } from "../elements/Spot";

export const MySpots = () => {
  const { user, loged } = useUser();
  const [spots, setSpots] = useState(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const getHotels = async () => {
      try {
        const response = await fetch("http://localhost:3000/my-hotels", {
          method: "GET",
          credentials: "include",
        });
        const userSpots = await response.json();

        setSpots(userSpots);
        setReady(true);
        console.log("spots", spots);
        console.log("sercies", services);
      } catch (error) {}
    };

    getHotels();
  }, []);
  console.log("spots", spots);
  return (
    <section className="myspots">
      {user.type === 2 || !loged ? (
        <div className="access">
          <h2>You don't have access</h2>
        </div>
      ) : (
        <div>
          <h1 className="user-h1">My Spots</h1>
          <div>{user.name}</div>
          {ready ? (
            spots.map((spot) => <Spot key={spot.name} spots={spot} />)
          ) : (
            <h1>You don't have spots</h1>
          )}
        </div>
      )}
    </section>
  );
};
