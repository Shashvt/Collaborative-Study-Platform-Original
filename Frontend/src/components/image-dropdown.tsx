import React, { useState } from "react";
import avatar from "../assets/avatar.avif";
import "../App.css";
import { useAuthContext } from "../context/Auth-Context";
import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ImageDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useAuthContext();

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  function handleLogout() {
      logout();

      toast('Logout Successfully', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        });
  }

  return (
    <div className="dropdown-container">
      <img
        src={avatar}
        alt="Dropdown Trigger"
        className="dropdown-image"
        onClick={toggleDropdown}
      />
      {isOpen && (
        <div className="dropdown-menu">
          <a href="/">Dashboard</a>
          <a href="/saved">Saved</a>
          <div onClick={() => {handleLogout()}} className="logout-button">
            <a>Logout</a>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageDropdown;
