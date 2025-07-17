import { useEffect, useState } from "react";
import { useSpots } from "../hooks/ueeSpots";
import "./home.css";
import { SpotCard } from "../elements/SpotCard";
import { SpotModal } from "../elements/SpotModal";
export const HomePage = () => {
  const { getAllSpots, allSpots, setSpotModal } = useSpots();
  useEffect(() => {
    getAllSpots();
    setSpotModal(false);
  }, []);

  return (
    <section className="home-section">
      <SpotModal />
      <div className="bar"></div>
      <div className="spot-show-container">
        {allSpots.length > 0 ? (
          allSpots.map((spot) => <SpotCard key={spot.name} spot={spot} />)
        ) : (
          <h1 className="h1-not-found">Any spot was found</h1>
        )}
      </div>
    </section>
  );
};
