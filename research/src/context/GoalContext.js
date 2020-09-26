import React, { useState, createContext, useContext } from "react";
import { GoalList } from "../data/AllGoals.js";
import { RecordsContext } from "./RecordsContext";

export const GoalContext = createContext();

export const GoalContextProvider = (props) => {
  const [PossibleGoals, UpdatePossibleGoals] = useState(GoalList);
  const { Records, setRecords } = useContext(RecordsContext);
  const handleTileClick = (event) => {
    const selectedGoal = event.target.name;
    const Goals = [...PossibleGoals];
    Goals.forEach((goal) => {
      if (String(goal.goal) === selectedGoal) {
        goal.isPossible = !goal.isPossible;
      }
      return goal;
    });
    const filteredRecords = Records.filter(
      (item) => !item.Goals.includes(Number(selectedGoal))
    );
    setRecords(filteredRecords);
    UpdatePossibleGoals(Goals);
  };
  const resetGoals = () => {
    const Goals = [...PossibleGoals];
    Goals.forEach((goal) => {
      goal.isPossible = false;
      return goal;
    });
  };
  const handleSelectAll = (state) => (event) => {
    const Goals = [...PossibleGoals];
    if (state === "select") {
      Goals.forEach((goal) => {
        goal.isPossible = true;
      });
    }
    if (state === "reject") {
      Goals.forEach((goal) => {
        goal.isPossible = false;
      });
    }
    UpdatePossibleGoals(Goals);
  };

  const values = {
    resetGoals,
    PossibleGoals,
    UpdatePossibleGoals,
    handleSelectAll,
    handleTileClick,
  };
  return (
    <GoalContext.Provider value={{ ...values }}>
      {props.children}
    </GoalContext.Provider>
  );
};
