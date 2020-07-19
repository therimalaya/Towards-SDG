import React, { useState, createContext } from "react";

export const FilterContext = createContext();
export const FilterContextProvider = (props) => {
  const [Filter, setFilter] = useState("id");

  const values = {
    Filter,
    setFilter,
  };
  return (
    <FilterContext.Provider value={{ ...values }}>
      {props.children}
    </FilterContext.Provider>
  );
};
