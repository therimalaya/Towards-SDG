import React, { useState, createContext } from "react";

const initSDG = {
  Goals: [],
  Targets: [],
  Interaction: {
    value: "",
    type: "",
    direction: "",
  },
};

export const SDGContext = createContext();

export const SDGContextProvider = (props) => {
  const [CurrentSDG, setCurrentSDG] = useState({
    Goals: [],
    Targets: [],
    Interaction: {
      value: "",
      type: "",
      direction: "",
    },
  });
  const UpdateCurrentSDG = (input, value) => {
    setCurrentSDG({ ...CurrentSDG, [input]: value });
  };
  const resetCurrentSDG = () => setCurrentSDG(initSDG);
  const values = {
    CurrentSDG,
    setCurrentSDG,
    resetCurrentSDG,
    UpdateCurrentSDG,
  };
  return (
    <SDGContext.Provider value={{ ...values }}>
      {props.children}
    </SDGContext.Provider>
  );
};
