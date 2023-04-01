import React from "react";
import "./Advise.css";
import { useNavigate } from "react-router-dom";
const Advise = () => {
  const Navigate = useNavigate();
  return (
    <div>
      <h1>Comming Soon</h1>
      <div>
        <button
          onClick={() => {
            Navigate("/");
          }}
        >
          Go Back
        </button>
      </div>
    </div>
  );
};
export default Advise;
