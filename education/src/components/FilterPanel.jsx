// Import Javascript Modules
import React, { useContext } from "react";

// Import Contexts
import { FilterContext } from "../context/FilterContext";

// Currently this functionality is not created
const FilterPanel = (props) => {
  const { Filter, setFilter } = useContext(FilterContext);
  return <p>Filter Panel (Filtered by: {Filter})</p>;
};

export default FilterPanel;
