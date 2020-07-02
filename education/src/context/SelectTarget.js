import React, { useState, createContext } from "react";

export const SelectTargetContext = createContext();

export const SelectTargetContextProvider = (props) => {
  const [selectTarget, setSelectTarget] = useState("no");
  const values = { selectTarget, setSelectTarget };
  return (
    <SelectTargetContext.Provider value={{ ...values }}>
      {props.children}
    </SelectTargetContext.Provider>
  );
};
