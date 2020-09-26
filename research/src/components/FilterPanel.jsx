import React, { useContext } from "react";
import { FilterContext } from "../context/FilterContext";

const FilterPanel = (props) => {
  const { Filter, setFilter } = useContext(FilterContext);
  return <p>Filter Panel (Filtered by: {Filter})</p>;
};

export default FilterPanel;
