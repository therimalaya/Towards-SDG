import React from 'react';
import {Faculty} from './Inputs';

const validateUrl  = (str) => {
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
          URL: ""
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
            <div className="App-Form-Error" id="Faculty-Error"></div>
            <Faculty
              name="Faculty"
              className={classList("App-Form-Inputs", errors.Faculty!=="" && "has-error")}
              isMulti={false}
              value={FormData.Faculty}
              HandleChange={this.HandleChange("Faculty")}
              placeholder="Faculty"/>
          </div>
          <label className="app-input-label" htmlFor="research-title">Research Title</label>
          <div className="App-form-field">
            <div className="App-Form-Error" id="Research-Title-Error"></div>
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
            <div className="App-Form-Error" id="Research-URL-Error"></div>
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
            <div className="App-Form-Error" id="Coauthors-Faculty-Error"></div>
            <Faculty
              name="Coauthors-Faculty"
              className={classList("App-Form-Inputs", errors.CoauthorFaculty!=="" && "has-error")}
              isMulti={true}
              value={FormData.Coauthors.Faculty}
              HandleChange={this.HandleChange("Coauthors")}
              placeholder="Coauthor's Faculty"/>
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
