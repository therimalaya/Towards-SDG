import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, MenuItem } from '@material-ui/core';
import { FacultyConfig, OutreachOptions, ResearchOptions } from '../config/app-config';

const useStyles = makeStyles(theme=>({
  root: {
    display: 'flex',
    flexDirection: 'column',
    '& > *': {
      margin: theme.spacing(1),
    }
  },
}))

function Personal(props) {
  const classes = useStyles();
  const {FormData, HandleChange, Errors} = props;

  return (
    <Fragment>
      <form className={classes.root}>
        <TextField
          onChange={HandleChange('Name')}
          error={Errors.Name!==""}
          id="name"
          value={FormData.Name}
          label="FullName"
          helperText={Errors.Name!=="" ? Errors.Name : "Full name of main author"}
          variant="outlined"
          autoFocus={true}
          fullWidth={true}
        />
        <TextField
          select
          onChange={HandleChange('Faculty')}
          error={Errors.Faculty!==""}
          id="faculty"
          value={FormData.Faculty}
          label="Faculty"
          helperText={Errors.Faculty!=="" ? Errors.Faculty : "Main Author's Faculty"}
          variant="outlined"
          fullWidth={true}>
          {FacultyConfig.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          error={Errors.Research.Title!==""}
          onChange={HandleChange('Research.Title')}
          id="research-title"
          value={FormData.Research.Title}
          label="Research Title"
          helperText={Errors.Research.Title!=="" ?
                      Errors.Research.Title :
                      null}
          variant="outlined"
          fullWidth={true}
        />
        <TextField
          error={Errors.Research.URL!==""}
          onChange={HandleChange('Research.URL')}
          id="research-url"
          value={FormData.Research.URL}
          label="Research URL"
          helperText={Errors.Research.URL!=="" ?
                      Errors.Research.URL :
                      "DOI or Other URL reference for the research. For DOI use doi.org/<<number>>."}
          variant="outlined"
          fullWidth={true}
        />
        <TextField
          select
          onChange={HandleChange('Coauthors.Faculty')}
          SelectProps={{
            multiple: true
          }}
          value={FormData.Coauthors.Faculty}
          error={Errors.Coauthors.Faculty!==""}
          id="coauthors-faculty"
          label="Coauthor's Faculty"
          helperText={Errors.Coauthors.Faculty!=="" ? Errors.Coauthors.Faculty : "Coauthor's Faculty"}
          variant="outlined"
          fullWidth={true}>
          {FacultyConfig.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          onChange={HandleChange('Research.Type')}
          error={Errors.Research.Type!==""}
          name="type"
          id="research-type"
          value={FormData.Research.Type}
          label="Researh Type"
          helperText={Errors.Research.Type!=="" ?
                      Errors.Research.Type :
                      "Type of Research"}
          variant="outlined"
          fullWidth={true}>
          {ResearchOptions.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          onChange={HandleChange('Research.Outreach')}
          error={Errors.Research.Outreach!==""}
          name="outreach"
          id="research-outreach"
          value={FormData.Research.Outreach}
          label="Researh Outreach"
          helperText={Errors.Research.Outreach!=="" ?
                      Errors.Research.Outreach :
                      "Communicated with decision maker about the research?"}
          variant="outlined"
          fullWidth={true}>
          {OutreachOptions.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </form>
    </Fragment>
  );
}

export default Personal;

