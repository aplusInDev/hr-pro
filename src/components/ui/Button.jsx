import React from "react";
import { FaFilter } from "react-icons/fa";
import "../../assets/css/Button.css";

function Buttom() {
  return (
    <>
      <button className="buttomFilter">
        <FaFilter />
      </button>
      <button className="buttomGo">Go</button>
    </>
  );
}
export default Buttom;
