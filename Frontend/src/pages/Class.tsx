import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import Navbar from "../components/navbar";
import JoinClassImage from "../assets/Class.png";
import CreateClassImage from "../assets/Class.png";
import MyClassesImage from "../assets/Class.png";

const Class = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Navbar />
      <section className="w-full bg-[#FFFFFF] flex flex-col items-center min-h-screen pt-12">
        <div className="w-full max-w-[1200px] px-6 py-12">
          {/* Row 1: Join Class & Create Class */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-16 mb-16">
            <div
              className="card cursor-pointer"
              onClick={() => navigate("/select-class-subject")}
            >
              <img
                src={JoinClassImage}
                alt="Join Class"
                className="rounded-lg w-[300px] h-[220px] object-cover"
              />
              <h3 className="mt-4 text-lg font-semibold text-center">
                Join Class
              </h3>
            </div>

            <div
              className="card cursor-pointer"
              onClick={() => navigate("/create-class")}
            >
              <img
                src={CreateClassImage}
                alt="Create Class"
                className="rounded-lg w-[300px] h-[220px] object-cover"
              />
              <h3 className="mt-4 text-lg font-semibold text-center">
                Create Class
              </h3>
            </div>
          </div>

          {/* Row 2: Centered My Classes */}
          <div className="flex justify-center">
            <div
              className="card cursor-pointer"
              onClick={() => navigate("/my-classes")}
            >
              <img
                src={MyClassesImage}
                alt="My Classes"
                className="rounded-lg w-[300px] h-[220px] object-cover"
              />
              <h3 className="mt-4 text-lg font-semibold text-center">
                My Classes
              </h3>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Class;
