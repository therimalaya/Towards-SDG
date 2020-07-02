import React, { useState, createContext } from "react";

export const StepContext = createContext();

export const StepContextProvider = (props) => {
  const [step, setStep] = useState(1);
  const NextStep = (event) => {
    event.preventDefault();
    setStep(step + 1);
  };
  const PrevStep = (event) => {
    event.preventDefault();
    setStep(step - 1);
  };
  const GoHome = (event) => {
    event.preventDefault();
    setStep(1);
  };
  const values = { step, setStep, NextStep, PrevStep, GoHome };
  return (
    <StepContext.Provider value={{ ...values }}>
      {props.children}
    </StepContext.Provider>
  );
};
