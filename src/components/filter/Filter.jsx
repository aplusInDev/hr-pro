import React from "react";
import { useState } from "react";
import SearchBox from "../ui/SearchBox";

function Filter() {
  const [filterText, setFilterText] = useState("");
  const [inCheckbox, setCheckbox] = useState(false);

  return (
    <div>
      <SearchBox filterText={filterText} inCheckbox={inCheckbox} />
      
    </div>
  );
}
export default Filter;
