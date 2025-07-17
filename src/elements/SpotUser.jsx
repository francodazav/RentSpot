import { useSpots } from "../hooks/ueeSpots";

export const SpotOwner = ({ spot }) => {
  const { setOwnerModal, setSpotToShow, spotToShow } = useSpots();
  const handleModal = () => {
    if (spotToShow?.id !== spot.id) {
      setSpotToShow(spot);
      setOwnerModal(true);
    } else {
      setOwnerModal(true); // opcional si igual quieres abrirlo de nuevo
    }
  };
  return (
    <div className="spot-container" onClick={handleModal}>
      <img src={spot.photos.photo1} className="spot-photo" />
      <div className="info-spot">
        <h4 className="spot-name">place in {spot.city}</h4>
        <p className="spot-price">${spot.price * 2} for 2 nights</p>
      </div>
    </div>
  );
};
