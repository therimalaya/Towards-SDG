import React, { useState, createContext, useContext } from "react";
import { SDGContext } from "./SDGContext";

export const RecordsContext = createContext();

export const RecordsContextProvider = (props) => {
  const [Records, setRecords] = useState([]);
  const { CurrentSDG, setCurrentSDG } = useContext(SDGContext);

  const UpdateRecords = (event) => {
    event.preventDefault();
    /* const clicked_targets = [...document.getElementsByClassName("clicked-target-btn")]
     * clicked_targets.map(btn => btn.classList.toggle("clicked-target-btn"))
     * clicked_targets.map(btn => btn.classList.toggle("target-btn")) */

    var _CurrentSDG = CurrentSDG;
    if (CurrentSDG.Targets.length <= 1) {
      _CurrentSDG = {
        ..._CurrentSDG,
        Goals: _CurrentSDG.Goals,
      };
    } else {
      _CurrentSDG = {
        ..._CurrentSDG,
        Goals: _CurrentSDG.Targets.map((x) => parseInt(x.split(".")[0])),
      };
    }
    setRecords([_CurrentSDG, ...Records]);
    setCurrentSDG({
      ...CurrentSDG,
      Targets: [],
      Interaction: { value: "", type: "", direction: "" },
    });
  };
  const RemoveCurrentSDG = (event) => {
    setRecords(
      Records.filter((value, idx) => String(idx) !== event.currentTarget.name)
    );
  };
  const UpdateCurrent = (input) => (event) => {
    const newRecord = Records.map((record, idx) => {
      if (String(idx) === event.target.name) {
        record.Interaction[input] = event.target.value;
        return record;
      } else {
        return record;
      }
    });
    setRecords(newRecord);
  };
  const resetRecords = () => {
    setRecords([]);
  };

  const values = {
    Records,
    setRecords,
    resetRecords,
    UpdateRecords,
    RemoveCurrentSDG,
    UpdateCurrent,
  };
  return (
    <RecordsContext.Provider value={{ ...values }}>
      {props.children}
    </RecordsContext.Provider>
  );
};
