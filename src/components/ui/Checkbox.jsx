import React from "react";
import "../../assets/css/Checkbox.css";

function CheckBox() {
  return (
    <form className="CheckBox">
      <tr>
        <th class="dept">
          <label className="labelDept"> Departements </label>
          <label>
            <input type="checkbox" />
            dep1
          </label>
          <label>
            <input type="checkbox" />
            dep2
          </label>
          <label>
            <input type="checkbox" />
            dep3
          </label>
          <label>
            <input type="checkbox" />
            dep4
          </label>
        </th>
        <th class="vertical-line"></th>
        <th class="job">
          <label> Job titles </label>
          <label>
            <input type="checkbox" />
            job1
          </label>
          <label>
            <input type="checkbox" />
            job2
          </label>
          <label>
            <input type="checkbox" />
            job3
          </label>
          <label>
            <input type="checkbox" />
            job4
          </label>
        </th>
      </tr>
    </form>
  );
}
export default CheckBox;
