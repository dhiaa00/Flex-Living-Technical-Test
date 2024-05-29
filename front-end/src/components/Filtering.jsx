import React, { useEffect, useState } from "react";

const Filtering = ({ properties, setFilteredProperties }) => {
  const [filterValue, setFilterValue] = useState("");
  const handleChange = (e) => {
    setFilterValue(e.target.value);
  };

  useEffect(() => {
    setFilteredProperties(
      properties.filter((prop) => prop.city.toLowerCase().includes(filterValue))
    );
  }, [filterValue, properties]);
  return (
    <div className="filtering">
      <input
        onChange={(e) => handleChange(e)}
        type="text"
        placeholder="Filter By City"
      />
    </div>
  );
};

export default Filtering;
