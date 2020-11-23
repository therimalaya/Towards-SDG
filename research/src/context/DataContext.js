import React, { useState, createContext, useEffect } from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

const AllRecords = gql`
  {
    getAllResearchRecords {
      _id
      Name
      Faculty
      Coauthors {
        Faculty
      }
      Research {
        Outreach
        Title
        Type
        URL
      }
      SDGRecords {
        Goals
        Targets
        Interaction {
          value
          type
          direction
        }
      }
    }
  }
`;

const GoalDataParser = (Data) => {
  const GoalData = Data.map((record, idx) => ({
    ID: record._id,
    Name: record.Name,
    Faculty: record.Faculty,
    ResearchTitle: record.Research.Title,
    ResearchURL: record.Research.URL,
    ResearchOutreach: record.Research.Outreach,
    ResearchType: record.Research.Type,
    CoauthorsFaculty: record.Coauthors.Faculty.join(", "),
    Goals: [...new Set(record.SDGRecords.flatMap((item) => item.Goals))],
  }));
  return GoalData;
};

const TargetDataParser = (Data, group = false) => {
  const shouldFilter = Data.map((item) => {
    item.hasTarget = item.SDGRecords.flatMap((sdg) => sdg.Targets.length).every(
      (x) => x > 0
    );
    return item;
  });
  let TargetData = shouldFilter
    .filter((item) => item.hasTarget)
    .flatMap((dta) => {
      return dta.SDGRecords.flatMap((item) => ({
        ID: dta._id,
        id: item.Targets.join("-"),
        Name: dta.Name,
        Faculty: dta.Faculty,
        ResearchTitle: dta.Research.Title,
        ResearchURL: dta.Research.URL,
        ResearchOutreach: dta.Research.Outreach,
        ResearchType: dta.Research.Type,
        CoauthorsFaculty: dta.Coauthors.Faculty.join(", "),
        Goal1: item.Goals[0],
        Goal2: item.Goals[1],
        Target1: item.Targets[0],
        Target2: item.Targets[1],
        Interaction: item.Interaction.value,
        Direction: item.Interaction.direction,
        Type: item.Interaction.type,
      }));
    });

  return TargetData;
};

export const groupData = (Data, group = "id") => {
  let groupedData = Data.reduce((acc, dta) => {
    if (acc.has(dta[group])) return acc;
    acc[dta[group]] = Data.filter((grp) => grp[group] === dta[group]);
    return acc;
  }, new Map());
  return groupedData;
};

export const DataContext = createContext();
export const DataContextProvider = (props) => {
  const { loading, error, data } = useQuery(AllRecords);
  const [Data, setData] = useState([]);
  const [GoalData, setGoalData] = useState([]);
  const [TargetData, setTargetData] = useState([]);

  useEffect(() => {
    if (data) {
      const Data = data.getAllResearchRecords;
      setData(Data);
      setGoalData(GoalDataParser(Data));
      setTargetData(TargetDataParser(Data));
      console.log(Data)
    }
  }, [data]);

  const values = {
    loading,
    error,
    Data,
    GoalData,
    TargetData,
  };
  return (
    <DataContext.Provider value={{ ...values }}>
      {props.children}
    </DataContext.Provider>
  );
};
