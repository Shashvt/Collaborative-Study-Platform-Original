import React, { FC } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "../App.css";
import ImageDropdown from "./image-dropdown";
import { useAuthContext } from "../context/Auth-Context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

interface NavBarProps {
  isHome?: boolean;
}

const Navbar:FC<NavBarProps> = ({
  isHome = false,
}) => {
  const { user } = useAuthContext();
  const navigate = useNavigate(); // Initialize navigate function

  return (
    <nav className="flex flex-row justify-between items-center px-2 py-4">
      <div className="flex items-center gap-[16px]">
        {!isHome ?
        <button
          onClick={() => navigate(-1)} // Go back to the previous page
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        : null}
        <a href="#Link_Profile" className="text-black text-2xl font-bold">
          Hello {user}
        </a>
      </div>
      <ImageDropdown />
    </nav>
  );
};

export default Navbar;
