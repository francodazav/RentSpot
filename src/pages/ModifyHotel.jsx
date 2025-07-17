import { useState } from "react";
import { useSpots } from "../hooks/ueeSpots";
import "./modifyHotel.css";
import { useUser } from "../hooks/useUser";
export const ModifyHotel = () => {
  const { spotToShow, patchHotel, setOwnerModal } = useSpots();
  const { user } = useUser();
  const [name, setName] = useState(spotToShow.name);
  const [price, setPrice] = useState(spotToShow.price);
  const [description, setDescription] = useState(spotToShow.description);
  const [message, setMessage] = useState(null);
  setOwnerModal(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(price, description, name);
    const result = await patchHotel({ price, description, name });
    setMessage(result);
  };
  const handleDescription = (event) => {
    setDescription(event.target.value);
  };
  const handlePrice = (event) => {
    setPrice(event.target.value);
  };
  const handleName = () => {
    setName(event.target.value);
  };
  console.log(message);
  return user.message === "" ? (
    <h1 className="h1-modify">You must login to modify the spot</h1>
  ) : spotToShow.name ? (
    <section className="modify-section">
      {message ? (
        <h1>{message.message}</h1>
      ) : (
        <div className="modify-info-container">
          <h1>You are allow to change the name , price and description</h1>
          <form className="modify-form" onSubmit={handleSubmit}>
            <label>Name</label>
            <input
              type="text"
              value={name}
              placeholder={spotToShow.name}
              className="input-modify"
              name="name"
              onChange={handleName}
            />
            <label>Price</label>
            <input
              type="number"
              min="100"
              max="10000"
              value={price}
              className="input-modify"
              onChange={handlePrice}
            />
            <label>Description</label>
            <input
              type="textarea"
              value={description}
              className="textarea-modify"
              onChange={handleDescription}
            />
            <button type="submit" className="button-modify">
              Make changes
            </button>
          </form>
        </div>
      )}
    </section>
  ) : (
    <h1 className="h1-modify">You must select and hotel</h1>
  );
};
