import React from "react";
import { useState } from "react";
import CheckBox from "../ui/Checkbox";
import "../../assets/css/SearchBar.css";
import Buttom from "../ui/Button";

function SearchBox() {
  const [showCheckbox, setShowCheckbox] = useState(false);

  const handleInputFocus = () => {
    setShowCheckbox(true);
  };
  return (
    <form className="searchBox">
      <input
        type="text"
        className="search"
        placeholder="type employee name..."
        onFocus={handleInputFocus} 
      />
      <Buttom />
      {showCheckbox && <CheckBox />} 
    </form>
  );
}

export default SearchBox;
