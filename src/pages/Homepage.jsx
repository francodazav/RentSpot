import { useEffect, useState } from "react";
import { useSpots } from "../hooks/ueeSpots";
import "./home.css";
import { SpotCard } from "../elements/SpotCard";
import { SpotModal } from "../elements/SpotModal";
export const HomePage = () => {
  const { getAllSpots, allSpots } = useSpots();
  useEffect(() => {
    getAllSpots();
  }, []);
  const handleClick = () => {
    console.log("WORKING ON IT CHAVALO");
  };
  return (
    <section className="home-section">
      <SpotModal />
      <div className="bar"></div>
      <div className="spot-show-container">
        {allSpots.length === null ? (
          <p>Loading</p>
        ) : (
          allSpots.map((spot) => (
            <SpotCard key={spot.name} spot={spot} handleClick={handleClick} />
          ))
        )}
      </div>
    </section>
  );
};
