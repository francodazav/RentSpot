import { useSpots } from "../hooks/ueeSpots";
import "./navbar.css";

import { useState, useCallback, useEffect } from "react";
export const SearchBar = () => {
  const [country, setCountry] = useState();
  const [cities, setCities] = useState([]);
  const [ready, setReady] = useState(false);
  const [checkInLocal, setCheckInLocal] = useState(null);
  const [checkOutLocal, setCheckOutLocal] = useState(null);
  const {
    formatedIn,
    searchHotel,
    setCheckInDate,
    formatedOut,
    setFormatedOut,
    setAllSpots,
    checkInDate,
  } = useSpots();
  const handleDate = (event) => {
    const tomorrow = new Date(event.target.value);
    tomorrow.setDate(tomorrow.getDate() + 1);
    setFormatedOut(tomorrow.toISOString().split("T")[0]);
    setCheckInDate(new Date(event.target.value));
    setCheckInLocal(formatedIn);
  };
  const handleDateOut = (event) => {
    const date = new Date(event.target.value);

    setFormatedOut(date.toISOString().split("T")[0]);
    setCheckOutLocal(formatedOut);
  };
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
  const handleCountry = (e) => {
    const countries = e.target.value;
    setCountry(countries);
    getCities(countries);
  };
  useEffect(() => {
    setReady(true);
  }, [cities]);
  const handleSearch = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = {
      capacity: formData.get("capacity"),
      country: formData.get("country"),
      city: formData.get("city"),
    };
    console.log(data.country);
    searchHotel({
      fechaIn: checkInLocal,
      fechaOut: checkOutLocal,
      capacity: data.capacity,
      country: data.country,
      city: data.city,
    });
    searchHotel;
  };
  return (
    <div className="search-container">
      <form className="search-bar-form" onSubmit={handleSearch}>
        <input
          type="number"
          placeholder="capacity"
          className="capacity-search"
          name="capacity"
        />

        <select
          onChange={handleCountry}
          name="country"
          required
          className="place-input"
        >
          <option>Country</option>
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
        <select name="city" required className="place-input">
          <option>City</option>
          {ready
            ? cities.map((city) => (
                <option key={city.name} value={city.name}>
                  {city.name}
                </option>
              ))
            : null}
        </select>
        <input
          type="date"
          className="date-search"
          min={formatedIn}
          onChange={handleDate}
          name="fechaIn"
        />
        <input
          type="date"
          className="date-search"
          min={formatedOut}
          name="fechaOut"
          onChange={handleDateOut}
        />
        <button className="search-btn" type="submit">
          Search
        </button>
      </form>
    </div>
  );
};
