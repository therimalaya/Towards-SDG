import React from 'react'
import { InputLabel, Select, MenuItem, FormControl, Checkbox, Chip, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

/* const FacultyConfig = {
  "biosciences": "Biosciences",
  "kbm": "Chemistry, Biotechnology and Food Science",
  "mina": "Environmental Sciences and Natural Resource Management",
  "landsam": "Landscape and Society",
  "economics": "School of Economics and Business",
  "realtek": "Science and Technology",
  "vet": "Veterinary Medicine",
} */

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
}));

export function Name(props) {
  const classes = useStyles();
  const { updateInput, values } = props
  return (
    <FormControl variant="outlined" className={classes.formControl} fullWidth >
      <TextField
        value={values.Name}
        id="name"
        placeholder="First and Last Name"
        className={classes.textField}
        label="First and Last Name"
        variant="outlined"
        onChange={updateInput}
      />
    </FormControl>
  )
}

export function Research(props) {
  const classes = useStyles()
  const { updateResearch, values } = props

  return (
    <React.Fragment>
      <FormControl variant="outlined" className={classes.formControl} fullWidth >
      <TextField
        value={values.Research.title}
        id="research-title"
        placeholder="Research Title"
        className={classes.textField}
        label="Research Title"
        variant="outlined"
        onChange={updateResearch('title')}
      />
    </FormControl>
    <FormControl variant="outlined" className={classes.formControl} fullWidth >
      <TextField
        value={values.Research.url}
        id="research-url"
        placeholder="Research URL/ Doi/ Links"
        className={classes.textField}
        label="Research URL"
        variant="outlined"
        onChange={updateResearch('url')}
      />
    </FormControl>
    </React.Fragment>
  )
}



export function Faculty(props) {
  const classes = useStyles();
  const { FacultyConfig } = props
  const { multiple, updateInput, FacultyTitle } = props
  const { selectedFaculty } = props

  const [Faculty, setFaculty] = React.useState(selectedFaculty);
  const handleChange = event => {
    setFaculty(event.target.value);
    updateInput(event)
  };

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  return (
    <div>
      <FormControl variant="outlined" className={classes.formControl} fullWidth >
        <InputLabel ref={inputLabel} id="faculty-select-id">{FacultyTitle}</InputLabel>
        <Select
          labelId="faculty-select-id"
          labelWidth={labelWidth}
          id="faculty-checkbox"
          multiple={multiple}
          value={Faculty}
          onChange={handleChange}
          renderValue={selected => (
            <div className={classes.chips}>
              {multiple ?
                selected.map(value => <Chip key={value}
                  label={FacultyConfig[value]}
                  className={classes.chip} />) :
                <Chip key={selected}
                  label={FacultyConfig[selected]}
                  className={classes.chip} />}
            </div>
          )}>
          {Object.keys(FacultyConfig).map(faculty => {
            return (
              <MenuItem key={faculty} value={faculty}>
                {multiple ? <Checkbox checked={selectedFaculty.indexOf(faculty) > -1} /> : null}
                {FacultyConfig[faculty]}
              </MenuItem>
            )
          })}
        </Select>
      </FormControl>
    </div>
  );
}


