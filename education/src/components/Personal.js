import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Chip, TextField, MenuItem, Box } from "@material-ui/core";
import { range } from "lodash";
import {
  FacultyConfig,
  TeachingOption,
  SustainFocusOption
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
  },
  paper: {
    maxHeight: "250px"
  }
}));

function Personal(props) {
  const classes = useStyles();
  const { FormData, HandleChange, Errors } = props;
  const toProper = string => string.replace(/^\w/, c => c.toUpperCase());

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
          helperText="Select if the record is for a course or thesis."
          variant="outlined"
          autoFocus={true}
          fullWidth={true}
        >
          <MenuItem key="course" value="course" dense>
            Course
          </MenuItem>
          <MenuItem key="thesis" value="thesis" dense>
            Thesis
          </MenuItem>
        </TextField>
        <Box
          display="flex"
          flexDirection="row"
          width="100%"
          justifyContent="space-between"
        >
          <Box width="48%">
            <TextField
              onChange={HandleChange("CourseCode")}
              error={Errors.CourseCode !== ""}
              id="course-code"
              value={FormData.CourseCode.toUpperCase()}
              label={toProper(FormData.Type) + " Code"}
              helperText={
                Errors.CourseCode !== ""
                  ? Errors.CourseCode
                  : `See Student web for ${FormData.Type} code`
              }
              variant="outlined"
              fullWidth={true}
            />
          </Box>
          <Box width="48%">
            <TextField
              select
              SelectProps={{
                MenuProps: {
                  className: classes.paper,
                  getContentAnchorEl: null,
                  anchorOrigin: {
                    vertical: "bottom",
                    horizontal: "left"
                  }
                }
              }}
              onChange={HandleChange("Year")}
              error={Errors.Year !== ""}
              id="course-year"
              value={FormData.Year}
              label={toProper(FormData.Type) + " Year"}
              helperText="Year in which the course is conducted."
              variant="outlined"
              fullWidth={true}
            >
              {range(2000, 2035, 1).map(yr => (
                <MenuItem key={yr} value={yr} dense>
                  {yr}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        </Box>
        <TextField
          onChange={HandleChange("CourseName")}
          error={Errors.CourseName !== ""}
          id="course-name"
          value={FormData.CourseName}
          label={`${toProper(FormData.Type)} ${
            FormData.Type === "course" ? "Name" : "Title"
          }`}
          helperText={
            Errors.CourseName !== ""
              ? Errors.CourseName
              : `${FormData.Type === "course" ? "Name" : "Title"} 
                of ${FormData.Type}`
          }
          variant="outlined"
          fullWidth={true}
        />
        <TextField
          onChange={HandleChange("CourseResponsible")}
          error={Errors.CourseResponsible !== ""}
          id="course-responsible"
          value={FormData.CourseResponsible}
          label={`${
            FormData.Type === "course"
              ? "Course Responsible"
              : "Main Supervisor"
          }`}
          helperText={`Name of ${
            FormData.Type === "course"
              ? "Person Responsible for the course"
              : "Main Supervisor"
          }`}
          variant="outlined"
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
          helperText={`Faculty responsible for the ${FormData.Type}`}
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
          label="Collaborating Faculties"
          helperText="Other collaborating faculties"
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
          onChange={HandleChange("Teaching")}
          error={Errors.Teaching !== ""}
          name="teaching"
          id="teaching"
          value={FormData.Teaching}
          label="Teaching (Primarily)"
          helperText={`Primary teaching type`}
          variant="outlined"
          fullWidth={true}
        >
          {TeachingOption.map(option => (
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
          onChange={HandleChange("SustainFocus")}
          error={Errors.SustainFocus !== ""}
          name="sustain-focus"
          id="sustain-focus"
          value={FormData.SustainFocus}
          label="Sustainability Focus (primarily)"
          helperText={`Primary sustainablity focus`}
          variant="outlined"
          fullWidth={true}
        >
          {SustainFocusOption.map(option => (
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
