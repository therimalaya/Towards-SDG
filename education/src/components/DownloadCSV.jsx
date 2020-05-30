import React, { Fragment } from "react";

import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

import { makeStyles } from "@material-ui/core/styles";
import { CSVLink } from "react-csv";

const useStyles = makeStyles((theme) => ({
  csvDownload: {
    textDecoration: "none",
    color: theme.palette.primary.contrastText,
  },
}));

const CSV_DOWNLOAD = gql`
  {
    getAllCourseRecords {
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

const DownloadCSV = (props) => {
  const classes = useStyles();
  const { loading, error, data } = useQuery(CSV_DOWNLOAD);
  if (loading) return <p>Loading ...</p>;
  if (error) return <p>Error :(</p>;
  const records = data.getAllCourseRecords.flatMap((dta) => {
    return dta.SDGRecords.flatMap((item) => ({
      id: item.Targets.join("-"),
      CourseType: dta.Type,
      CourseCode: dta.CourseCode,
      Year: dta.CourseCode,
      CourseName: dta.CourseName,
      CourseResponsible: dta.CourseResponsible,
      Goal1: item.Goals[0],
      Goal2: item.Goals[1],
      Target1: item.Targets[0],
      Target2: item.Targets[1],
      Interaction: item.Interaction.value,
      Direction: item.Interaction.direction,
      Type: item.Interaction.type,
    }));
  });

  return (
    <Fragment>
      {records.length > 0 ? (
        <CSVLink
          data={records}
          filename={"SDG-Records.csv"}
          target="_blank"
          className={classes.csvDownload}
          onClick={(event) => {
            console.log(records);
          }}
        >
          Download CSV
        </CSVLink>
      ) : null}
    </Fragment>
  );
};

export default DownloadCSV;
