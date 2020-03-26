import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Chip, TextField, MenuItem } from "@material-ui/core";
import {
  FacultyConfig,
  OutreachOptions,
  ResearchOptions
} from "../config/app-config";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    "& > *": {
      margin: theme.spacing(1)
    }
  },
  chips: {
    display: "flex",
    flexWrap: "wrap"
  },
  chip: {
    margin: 2
  }
}));

function Personal(props) {
  const classes = useStyles();
  const { FormData, HandleChange, Errors } = props;

  return (
    <Fragment>
      <form className={classes.root}>
        <TextField
          select
          onChange={HandleChange("Type")}
          error={Errors.Faculty !== ""}
          id="type"
          value={FormData.Type}
          label="Type"
          SelectProps={{
            MenuProps: {
              getContentAnchorEl: null,
              anchorOrigin: {
                vertical: "bottom",
                horizontal: "left"
              }
            }
          }}
          helperText="Registering Author's Faculty"
          variant="outlined"
          fullWidth={true}
        >
          <MenuItem key="course" value="course" dense>
            Course
          </MenuItem>
          <MenuItem key="thesis" value="thesis" dense>
            Thesis
          </MenuItem>
        </TextField>
        <TextField
          onChange={HandleChange("CourseCode")}
          error={Errors.CourseCode !== ""}
          id="course-code"
          value={FormData.CourseCode.toUpperCase()}
          label="Course Code"
          helperText="Course Code"
          variant="outlined"
          autoFocus={true}
          fullWidth={true}
        />
        <TextField
          onChange={HandleChange("CourseName")}
          error={Errors.CourseName !== ""}
          id="course-name"
          value={FormData.CourseName}
          label="Course Name"
          helperText={
            Errors.CourseName !== "" ? Errors.CourseName : "Name of the course"
          }
          variant="outlined"
          autoFocus={true}
          fullWidth={true}
        />
        <TextField
          onChange={HandleChange("CourseResponsible")}
          error={Errors.CourseCode !== ""}
          id="course-responsible"
          value={FormData.CourseResponsible}
          label="Course Responsible"
          helperText="Person Responsible for the course"
          variant="outlined"
          autoFocus={true}
          fullWidth={true}
        />
        <TextField
          select
          onChange={HandleChange("Faculty")}
          error={Errors.Faculty !== ""}
          id="faculty"
          value={FormData.Faculty.toUpperCase()}
          label="Faculty"
          SelectProps={{
            MenuProps: {
              getContentAnchorEl: null,
              anchorOrigin: {
                vertical: "bottom",
                horizontal: "left"
              }
            }
          }}
          helperText="Faculty responsible for the course"
          variant="outlined"
          fullWidth={true}
        >
          {FacultyConfig.map(option => (
            <MenuItem key={option.value} value={option.value} dense>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          onChange={HandleChange("RelatedFaculties")}
          SelectProps={{
            renderValue: selected => (
              <div className={classes.chips}>
                {selected.map(value => (
                  <Chip
                    key={value}
                    label={
                      FacultyConfig.filter(item => item.value === value)[0]
                        .label
                    }
                    className={classes.chip}
                  />
                ))}
              </div>
            ),
            multiple: true,
            MenuProps: {
              getContentAnchorEl: null,
              anchorOrigin: {
                vertical: "bottom",
                horizontal: "left"
              }
            }
          }}
          value={FormData.RelatedFaculties}
          error={Errors.RelatedFaculties !== ""}
          id="related-faculties"
          label="Related Faculties"
          helperText="Other Faculties related to the course"
          variant="outlined"
          fullWidth={true}
        >
          {FacultyConfig.map(option => (
            <MenuItem key={option.value} value={option.value} dense>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          SelectProps={{
            MenuProps: {
              getContentAnchorEl: null,
              anchorOrigin: {
                vertical: "bottom",
                horizontal: "left"
              }
            }
          }}
          onChange={HandleChange("CourseType")}
          error={Errors.CourseType !== ""}
          name="course-type"
          id="course-type"
          value={FormData.CourseType}
          label="Course Type"
          helperText="Type of Research"
          variant="outlined"
          fullWidth={true}
        >
          {ResearchOptions.map(option => (
            <MenuItem key={option.value} value={option.value} dense>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          SelectProps={{
            MenuProps: {
              getContentAnchorEl: null,
              anchorOrigin: {
                vertical: "bottom",
                horizontal: "left"
              }
            }
          }}
          onChange={HandleChange("Outreach")}
          error={Errors.Outreach !== ""}
          name="outreach"
          id="outreach"
          value={FormData.Outreach}
          label="Outreach"
          helperText="Communicated with decision maker about the course?"
          variant="outlined"
          fullWidth={true}
        >
          {OutreachOptions.map(option => (
            <MenuItem key={option.value} value={option.value} dense>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </form>
    </Fragment>
  );
}

export default Personal;
