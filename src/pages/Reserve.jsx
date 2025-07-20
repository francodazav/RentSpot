import { SpotCard } from "../elements/SpotCard";
import { useSpots } from "../hooks/ueeSpots";
import { useUser } from "../hooks/useUser";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { CardElement } from "@stripe/react-stripe-js";
import "./reserve.css";
import { useEffect, useState } from "react";
import { LoadingSpinner } from "../elements/LoadingSpinner";
export const Reserve = () => {
  const { user, getMyReservations } = useUser();
  const {
    spotToShow,
    daysRsv,
    makeReservation,
    rsvConfirm,
    formatedIn,
    formatedOut,
    notAvaible,
    setSpotToShow,
    setRsvDone,
    setRsvConfirm,
    rsvDone,
  } = useSpots();
  const [loading, setLoading] = useState(false);
  const stripePromise = loadStripe("pk_test");
  const options = {
    style: {
      base: {
        fontSize: "16px",
        color: "#20202f",
        "::placeholder": { color: "#aab7c4" },
      },
    },
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    await makeReservation({ user });

    getMyReservations();
    setLoading(false);
  };
  useEffect(() => {
    setRsvDone(false);
  }, []);
  return (
    <section className="reserve">
      {rsvDone ? (
        <div className="rsv-confirmation">
          <h1>Thanks for reserving with us {user.name}</h1>
          <h2>You can watch the details at my reservations section</h2>
        </div>
      ) : user.message === "" || !spotToShow.name ? (
        <div className="default-payment">
          {user.name ? (
            <h1 className="default-h1">You must select an hotel</h1>
          ) : (
            <h1 className="default-h1">You must login and select an hotel</h1>
          )}
        </div>
      ) : notAvaible ? (
        <div className="not-avaible">
          <h2>Dates not avaible plese choose another dates</h2>
        </div>
      ) : loading ? (
        <LoadingSpinner />
      ) : (
        <div className="reserve-container">
          <div className="info-reserve">
            <h1 className="h1-reserve">
              {user.name.toUpperCase()} confirm your reservation
            </h1>
            <SpotCard className="spot-card" spot={spotToShow} />
            <div className="info-display">
              <h1>Check in :</h1>
              <h3>{formatedIn}</h3>
              <h1>Check out :</h1>
              <h3>{formatedOut}</h3>
              <h1>Your are gonna stay</h1>
              <h3>{daysRsv} days</h3>
              <h1>The price is gonna be</h1>
              <h3>${daysRsv * spotToShow.price}</h3>
            </div>
          </div>
          <div className="payment-container">
            <Elements stripe={stripePromise}>
              <form className="form-payment" onSubmit={handleSubmit}>
                <label className="label-payment">Name on card</label>
                <input
                  type="text"
                  className="input-payment"
                  placeholder="Franco Daza"
                />

                <label className="label-payment">Card details</label>
                <div className="card-element-wrapper">
                  <CardElement options={options} />
                </div>

                <button type="submit" className="submit-payment">
                  Reserve
                </button>
              </form>
            </Elements>
          </div>
        </div>
      )}
    </section>
  );
};
