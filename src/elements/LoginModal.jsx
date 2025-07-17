import { useEffect, useState } from "react";
import { useUser } from "../hooks/useUser.js";
import ReactModal from "react-modal";
export const LoginRegisterModal = () => {
  const {
    user,
    loged,
    login,
    setIsOpen,
    modalIsOpen,
    invalid,
    modalMode,
    register,
  } = useUser();

  const loginCatcher = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formEntries = Object.fromEntries(formData.entries());
    login({ username: formEntries.username, password: formEntries.password });
  };
  const registerCatcher = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formEntries = Object.fromEntries(formData.entries());
    console.log(formEntries);
    const result = register({
      username: formEntries.username,
      password: formEntries.password,
      name: formEntries.name,
      lastname: formEntries.lastname,
      email: formEntries.email,
      type: formEntries.type,
    });
    if (result.registered) {
      alert(result.message);
      setIsOpen(false);
    }
  };
  useEffect(() => {
    if (loged) {
      setIsOpen(false);
    }
  }, [loged, user]);
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Esc") {
        setIsOpen(false);
      }
    };
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);
  const handleExit = () => {
    setIsOpen(false);
  };
  useEffect(() => {}, []);
  return (
    <ReactModal
      isOpen={modalIsOpen}
      contentLabel="Login Modal"
      className="login-modal"
      overlayClassName="login-modal-overlay"
      ariaHideApp={false}
    >
      {modalMode === "login" ? (
        <div className="login-container">
          <div className="exit-div">
            <button type="button" className="exit-btn" onClick={handleExit}>
              x
            </button>
          </div>
          <h1>Welcome to RentSpot please login</h1>
          <form onSubmit={loginCatcher} className="login-form">
            <label className="label-form">
              Username:
              <input
                type="text"
                name="username"
                required
                className="input-form"
              />
            </label>
            <label className="label-form">
              Password:
              <input
                type="password"
                name="password"
                required
                className="input-form"
              />
            </label>
            <span className="span-valid">{invalid}</span>
            <button type="submit" className="log-reg-btn">
              Login
            </button>
          </form>
        </div>
      ) : (
        <div className="register-container">
          <div className="exit-div">
            <button type="button" className="exit-btn" onClick={handleExit}>
              x
            </button>
          </div>
          <h1>Please Register your data</h1>
          <form className="register-form" onSubmit={registerCatcher}>
            <label className="label-form">Name</label>
            <input
              type="text"
              placeholder="Name"
              name="name"
              required
              className="input-form"
            />
            <label className="label-form">Lastname</label>
            <input
              type="text"
              placeholder="Lastname"
              name="lastname"
              required
              className="input-form"
            />
            <label className="label-form">Email</label>
            <input
              type="email"
              placeholder="email@example.com"
              name="email"
              required
              className="input-form"
            />
            <label className="label-form">Username</label>
            <input
              type="text"
              placeholder="Username"
              name="username"
              required
              className="input-form"
            />
            <label className="label-form">Password</label>
            <input
              type="password"
              placeholder="Must have at least one capital letter and a number"
              name="password"
              required
              className="input-form"
            />
            <label className="label-form">Owner or costumer</label>
            <select name="type" className="input-form">
              <option value={1}>Owner</option>
              <option value={2}>Costumer</option>
            </select>
            <button className="log-reg-btn">Register</button>
          </form>
        </div>
      )}
    </ReactModal>
  );
};
