import React, { useState, createContext } from "react";

export const GroupContext = createContext();
export const GroupContextProvider = (props) => {
  const [Group, setGroup] = useState("Faculty");

  const values = {
    Group,
    setGroup,
  };
  return (
    <GroupContext.Provider value={{ ...values }}>
      {props.children}
    </GroupContext.Provider>
  );
};
