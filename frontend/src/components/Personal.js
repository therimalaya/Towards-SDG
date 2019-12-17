import React from 'react';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import {SelectInput} from './Inputs';
import {FacultyConfig} from '../config/app-config';

const OutreachOptions = [
  {value: 'Yes', label: 'Yes'},
  {value: 'Planned', label: 'No, but I do have concrete plans for do so'},
  {value: 'No', label: 'No'},
]
const ResearchOptions = [
  {value: 'Theoretical/ Conceptual work', label: 'Theoretical/ Conceptual work'},
  {value: 'Experiments', label: 'Experiments'},
  {value: 'Statistical analysis of primary observational data', label: 'Statistical analysis of primary observational data'},
  {value: 'Statistical analysis of secondary data', label: 'Statistical analysis of secondary data'},
  {value: 'Simulations', label: 'Simulations'},
  {value: 'Case studies (Qualitative analysis)', label: 'Case studies (Qualitative analysis)'},
  {value: 'Reviews/ Synthesis', label: 'Reviews/ Synthesis'},
]

const validateURL  = (str) => {
  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return !!pattern.test(str);
}

function classList(...classes) {
  return classes
    .filter(item => !!item)
    .join(' ');
}

class Personal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      noError: false,
      errors: {
        Name: "",
        Faculty: "",
        Research: {
          Title: "",
          URL: "",
          Type: "",
          Outreach: ""
        },
        CoauthorFaculty: ""
      }
    }
    this.checkValidFields = this.checkValidFields.bind(this)
    this.HandleChange = this.HandleChange.bind(this)
    this.CheckAndProceed = this.CheckAndProceed.bind(this)
  }

  checkValidFields = (event) => {
    const FormData = this.props.FormData
    let isValid = true;
    let errors = {}

    // Update error state based on the
    // fetching values from Form state
    // All the checking goes here
    // Update the error state
    if (!FormData.Name) {
      errors.Name = "Name can not be empty";
      isValid = false;
    } else if (FormData.Name.length <= 5) {
      errors.Name = "Name must be at least 5 character long.";
      isValid = false;
    }

    if (!FormData.Faculty) {
      errors.Faculty = "Must select a faculty";
      isValid = false;
    }

    if (!FormData.Research.Title) {
      errors.Research = {...errors.Research, Title: "Research title must not be empty."};
      isValid = false;
    } else if (FormData.Research.Title.length <= 5) {
      errors.Research = {...errors.Research, Title: "Research title must be at least 5 character long."};
      isValid = false;
    }

    if (!FormData.Research.URL) {
      errors.Research = {...errors.Research, URL: "Research URL must not be empty."};
      isValid = false;
    } else if (!validateURL(FormData.Research.URL)) {
      errors.Research = {...errors.Research, URL: "Research URL is not valid."};
      isValid = false;
    }

    this.setState({
      noError: isValid,
      errors: {...this.state.errors, ...errors}
    })

    this.setState({
      noError: isValid
    })
    return isValid
  }

  HandleChange = input => event => {
    let errors = {}
    errors[input] = "";
    this.setState({
      noError: "",
      errors: {...this.state.errors, ...errors}
    })
    if (event.target) {
      this.props.UpdateFormData(input, event.target.value)
    } else if (event.value) {
      this.props.UpdateFormData(input, event.value)
    } else {
      this.props.UpdateFormData(input, event)
    }
  }

  CheckAndProceed = (event) => {
    /* event.preventDefault() */
    const isValid = this.checkValidFields(event)
    // Call checkValidFields function
    // This will update all the state
    // If noError is false, Error should automatically displayed
    // If noError is true, proceed to next step
    if (isValid) {
      this.props.NextStep(event)
    }
  }

  render() {
    const {FormData} = this.props
    const {errors} = this.state
    return (
      <React.Fragment>
        <h2 className="AppStepTitle">
          Personal Details
        </h2>
        <form>
          <label className="app-input-label" htmlFor="fullname">Full Name</label>
          <div className="App-form-field">
            <div className="App-Form-Error" id="Name-Error">{errors.Name}</div>
            <input
              name="Name"
              className={classList("App-Form-Inputs", errors.Name!=="" && "has-error")}
              placeholder="Name (First and Last)"
              type="text"
              value={FormData.Name}
              onChange={this.HandleChange("Name")} />
          </div>
          <label className="app-input-label" htmlFor="faculty">Faculty</label>
          <div className="App-form-field">
            <div className="App-Form-Error" id="Faculty-Error">{errors.Faculty}</div>
            <SelectInput
              field="Faculty"
              options={FacultyConfig}
              name="Faculty"
              className={classList("App-Form-Inputs", errors.Faculty!=="" && "has-error")}
              isMulti={false}
              value={FormData.Faculty}
              HandleChange={this.HandleChange("Faculty")}
              placeholder="Faculty"/>
          </div>
          <label className="app-input-label" htmlFor="research-title">Research Title</label>
          <div className="App-form-field">
            <div className="App-Form-Error" id="Research-Title-Error">{errors.Research.Title}</div>
            <input
              name="research-title"
              className={classList("App-Form-Inputs", errors.Research.Title!=="" && "has-error")}
              placeholder="Research Title"
              type="text"
              value={FormData.Research.Title}
              onChange={this.HandleChange("Research.Title")} />
          </div>
          <label className="app-input-label" htmlFor="research-url">Research URL</label>
          <div className="App-form-field">
            <div className="App-Form-Error" id="Research-URL-Error">{errors.Research.URL}</div>
            <input
              name="research-url"
              className={classList("App-Form-Inputs", errors.Research.URL!=="" && "has-error")}
              placeholder="Research URL"
              type="url"
              value={FormData.Research.URL}
              onChange={this.HandleChange("Research.URL")} />
          </div>
          <label className="app-input-label" htmlFor="coauthors-faculty">Coauthor's Faculty</label>
          <div className="App-form-field">
            <div className="App-Form-Error" id="Coauthors-Faculty-Error">{errors.CoauthorFaculty}</div>
            <SelectInput
              field="Faculty"
              options={FacultyConfig}
              name="Coauthors-Faculty"
              className={classList("App-Form-Inputs", errors.CoauthorFaculty!=="" && "has-error")}
              isMulti={true}
              value={FormData.Coauthors.Faculty}
              HandleChange={this.HandleChange("Coauthors")}
              placeholder="Coauthor's Faculty"/>
          </div>
          <label className="app-input-label" htmlFor="type">Research Type</label>
          <div className="App-form-field">
            <div className="App-Form-Error" id="Research-Type-Error">{errors.Research.Type}</div>
            <div className="App-Form-Message" id="Question-Type">How will you classify this work by Method?</div>
            <CreatableSelect
              name="type"
              className={classList("App-Form-Inputs", errors.Research.Type!=="" && "has-error")}
              placeholder="Type of Research"
              isMulti={false}
              isClearable={false}
              value={ResearchOptions.find(item=>item.value === FormData.Research.Type)}
              onChange={this.HandleChange("Research.Type")}
              options={ResearchOptions}
            />
          </div>
          <label className="app-input-label" htmlFor="outreach">Research Outreach</label>
          <div className="App-form-field">
            <div className="App-Form-Error" id="Research-Outreach-Error">{errors.Research.Outreach}</div>
            <div className="App-Form-Message" id="Question-Type">Have you taken any particular steps to communicate this research to policy/decision makers (e.g. meetings/ presentations)?</div>
            <Select
              name="outreach"
              className={classList("App-Form-Inputs", errors.Research.Outreach!=="" && "has-error")}
              placeholder="Communicated with decision maker about the research?"
              isMulti={false}
              isClearable={false}
              value={OutreachOptions.find(item=>item.value === FormData.Research.Outreach)}
              onChange={this.HandleChange("Research.Outreach")}
              options={OutreachOptions}
            />
          </div>
        </form>
        <div className="nav-btn">
          <button onClick={this.CheckAndProceed} className="App-Nav-Btn">Next</button>
        </div>
      </React.Fragment>
    );
  }
};

export default Personal;
