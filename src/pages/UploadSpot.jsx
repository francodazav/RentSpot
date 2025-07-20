import { useState, useCallback, useEffect } from "react";
import { useUser } from "../hooks/useUser";
import "./uploadspot.css";
import { LoadingSpinner } from "../elements/LoadingSpinner";
import { useSpots } from "../hooks/ueeSpots";
export const UpoloadSpot = () => {
  const [cities, setCities] = useState([]);
  const [file, setFile] = useState([]);
  const [ready, setReady] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const servicesList = ["Parking", "Wi-Fi", "Pool", "Gym", "Restaurant", "Spa"];
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const getCities = useCallback(async (country) => {
    try {
      const response = await fetch(
        "https://countriesnow.space/api/v0.1/countries/states",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            country: `${country}`, // o "Argentina", "Brasil", etc.
          }),
        }
      );
      const dataCountry = await response.json();
      const countryCities = dataCountry.data;
      setCities(countryCities.states);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  }, []);
  useEffect(() => {
    setReady(true);
  }, [cities]);
  const handleCountry = (e) => {
    const country = e.target.value;
    getCities(country);
  };
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      if (file) {
        setFile((prevState) => [...prevState, e.target.files[0]]);
      } else {
        setFile(e.target.files[0]);
      }
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);

    const data = {
      hotelName: formData.get("hotelName"),
      country: formData.get("country"),
      city: formData.get("city"),
      description: formData.get("decription"),
      direction: formData.get("direction"),
      rate: Number(formData.get("rate")),
      capacity: Number(formData.get("capacity")),
      price: Number(formData.get("price")),
      services: servicesList.reduce((acc, service) => {
        acc[service] = formData.get(service) === "on";
        return acc;
      }, {}),
      photos: file,
    };
    formData.append("data", JSON.stringify(data));
    for (let i = 0; i < file.length; i++) {
      formData.append("photos", file[i]);
    }
    try {
      const response = await fetch("http://localhost:3000/upload-hotel", {
        method: "POST",
        credentials: "include",
        body: formData,
      });
      const result = await response.json();
      if (result.message.includes("Spot uploaded successfully"))
        setUploaded(true);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className="upload-section">
      {user.message === "" || user.type === 2 ? (
        <div className="access">
          <h1>You don't have access</h1>
        </div>
      ) : loading ? (
        <LoadingSpinner className="loading" />
      ) : (
        <div style={{ width: "100%", height: "90vh" }}>
          {uploaded ? (
            <div className="uploaded">
              <h1 className="h1-uploaded">Hotel uploaded successfully</h1>
            </div>
          ) : (
            <div className="upload-info">
              <div className="info-container">
                <h1>What information do we need to register your hotel?</h1>
                <ul className="ul-requires">
                  <li className="requires-list">
                    <h3>Name</h3> <p>Must have at least two letters</p>
                  </li>

                  <li className="requires-list">
                    <h3>Country</h3> <p>Choose a country on the list</p>
                  </li>
                  <li className="requires-list">
                    <h3>city</h3> <p>Chooe a city on the list</p>
                  </li>
                  <li className="requires-list">
                    <h3>Description</h3>{" "}
                    <p>
                      Give us a description about the pleaso and what interest
                      things are around the location
                    </p>
                  </li>
                  <li className="requires-list">
                    <h3>Direction</h3>{" "}
                    <p>Must be precise and includes de zip code</p>
                  </li>
                  <li className="requires-list">
                    <h3>Direction</h3>{" "}
                    <p>
                      Your spot must be capable of receive at least 1 person
                    </p>
                  </li>
                  <li className="requires-list">
                    <h3>Rate</h3> <p>How would you rate your spot?</p>
                  </li>
                  <li className="requires-list">
                    <h3>Price</h3>{" "}
                    <p>The minimal price is 100$ and the maximun is 10000$</p>
                  </li>
                  <li className="requires-list">
                    <h3>Services</h3> <p>Must add at least 3</p>
                  </li>
                  <li className="requires-list">
                    <h3>Photos</h3>{" "}
                    <p>
                      You must add least upload 3 photos. The photos should show
                      the rooms and the front of the spot
                    </p>
                  </li>
                </ul>
              </div>
              <div className="form-container">
                <form className="form-hotel" onSubmit={handleSubmit}>
                  <label>Spot name:</label>
                  <input
                    type="text"
                    placeholder="Spot name"
                    name="hotelName"
                    required
                    className="input-hotel"
                  />
                  <label>Country</label>
                  <select
                    onChange={handleCountry}
                    name="country"
                    required
                    className="input-hotel"
                  >
                    <option>Choose a country</option>
                    <option value="argentina" name="country">
                      Argentina
                    </option>
                    <option value="colombia" name="country">
                      Colombia
                    </option>
                    <option value="mexico" name="country">
                      Mexico
                    </option>
                  </select>
                  <label>City</label>
                  <select name="city" required className="input-hotel">
                    <option>Choose a city</option>
                    {ready
                      ? cities.map((city) => (
                          <option key={city.name} value={city.name} name="city">
                            {city.name}
                          </option>
                        ))
                      : null}
                  </select>
                  <label>Direction</label>
                  <input
                    type="text"
                    placeholder="Direction"
                    name="direction"
                    className="input-hotel"
                  />
                  <label>Description</label>
                  <textarea
                    name="decription"
                    required
                    className="text-hotel"
                    placeholder="Beautifull place with a view to the city."
                  ></textarea>

                  <label>Capacity</label>
                  <input
                    type="number"
                    name="capacity"
                    min="2"
                    max="20"
                    className="input-hotel"
                  />
                  <label>Rate</label>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    name="rate"
                    className="input-hotel"
                  />
                  <label>Price</label>
                  <input
                    type="number"
                    min="100"
                    max="10000"
                    placeholder="100$"
                    name="price"
                    className="input-hotel"
                  />
                  <label>Services</label>
                  <div className="services-options">
                    {servicesList.map((service) => (
                      <div key={service} className="service-option">
                        <label>{service}</label>
                        <input
                          type="checkbox"
                          name={service}
                          className="check-services"
                        />
                      </div>
                    ))}
                  </div>

                  <label>Photos</label>
                  <input
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    required
                    className="file-input"
                  />
                  <button type="submit" className="submit-hotel">
                    Upload
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
};
