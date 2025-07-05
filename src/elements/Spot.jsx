import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
export const Spot = ({ spots }) => {
  console.log(spots);
  const [photos, setPhotos] = useState([]);
  const [services, setServices] = useState([]);
  useEffect(() => {
    setPhotos(JSON.parse(spots.photos));
    setServices(JSON.parse(spots.services));
  }, []);
  return (
    <div className="spot-container">
      <h1 className="h1-spot">{spots.name}</h1>
      <div className="info-container">
        <img src={photos.photo1} className="img-spot" />
        <ul className="ul-spot">
          <li>
            <h3>Description</h3>
            <p>{spots.description}</p>
          </li>
          <li>
            <h3>Price: ${spots.price}</h3>
          </li>
          <li>
            <h3>Services</h3>
            <div className="spot-services">
              {Object.entries(services)
                .filter(([key, value]) => value)
                .map(([key]) => (
                  <p key={key}>{key}</p>
                ))}
            </div>
          </li>
          <li>
            <h3>Capacity: {spots.capacity}</h3>
          </li>
        </ul>
        <button className="spot-btn">Show more info</button>
      </div>
    </div>
  );
};
