import { useSpots } from "../hooks/ueeSpots";
import "./spotcard.css";
export const SpotCard = ({ spot }) => {
  const { setSpotModal, setSpotToShow } = useSpots();
  const handleClick = () => {
    setSpotToShow(spot);
    setSpotModal(true);
  };
  return (
    <div className="spot-container" onClick={handleClick}>
      <img src={spot.photos.photo1} className="spot-photo" />
      <div className="info-spot">
        <h4 className="spot-name">place in {spot.city}</h4>
        <p className="spot-price">${spot.price * 2} for 2 nights</p>
      </div>
    </div>
  );
};
