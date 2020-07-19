import React, { useState, createContext, useEffect } from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

const AllRecords = gql`
  {
    getAllCourseRecords {
      _id
      Type
      CourseCode
      Year
      CourseName
      CourseResponsible
      Faculty
      RelatedFaculties
      Teaching
      SustainFocus
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
    CourseType: record.Type,
    CourseCode: record.CourseCode,
    Year: record.Year,
    CourseName: record.CourseName,
    CourseResponsible: record.CourseResponsible,
    Faculty: record.Faculty,
    RelatedFaculties: record.RelatedFaculties.join(", "),
    Teaching: record.Teaching,
    SustainFocus: record.SustainFocus,
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
        id: item.Targets.join("-"),
        CourseType: dta.Type,
        CourseCode: dta.CourseCode,
        Year: dta.Year,
        CourseName: dta.CourseName,
        CourseResponsible: dta.CourseResponsible,
        Faculty: dta.Faculty,
        RelatedFaculties: dta.RelatedFaculties.join(", "),
        Teaching: dta.Teaching,
        SustainFocus: dta.SustainFocus,
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
      const Data = data.getAllCourseRecords;
      setData(Data);
      setGoalData(GoalDataParser(Data));
      setTargetData(TargetDataParser(Data));
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
