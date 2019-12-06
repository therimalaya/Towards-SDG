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

class Personal extends React.Component {
  constructor(props) {
    super(props)
    const {values} = this.props
    this.state = {
      noError: false,
      errors: {
        Name: values.Name === "" ? "Name is Empty." : "",
        Research: {
          Title: values.Research.Title === "" ? "Reseach Title is Empty" : "",
          URL: values.Research.URL === "" ? "Research URL is Empty" : ""
        }
      }
    }
    this.checkValidFields = this.checkValidFields.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  checkValidFields = (input) => (event) => {
    let value = event.target.value
    let newError = this.state.errors;
    let inp_arr = input.split(".")

    if (inp_arr[0] === "Name" ) {
      if (value.length < 5) {
        newError.Name = "Full Name must be a least 5 characters long!";
      } else {
        newError.Name = ""
      }
    }
    if (inp_arr[0] === "Research") {
      if (inp_arr[1] === "Title") {
        if (value.length < 5) {
          newError.Research.Title = "Research Title much have at least 5 characters!"
        } else {
          newError.Research.Title = ""
        }

      }
      if (inp_arr[1] === "URL") {
        if (!validateUrl(value)) {
          newError.Research.URL = "Research URL is not valid!"
        } else {
          newError.Research.URL = ""
        }

      }
    }

    this.setState({
      noError: newError.Name === "" && newError.Research.Title === "" && newError.Research.URL === "",
      errors: newError
    })
  }

  handleChange = (input) => (event) => {
    this.checkValidFields(input)(event);
    this.props.handleInput(input)(event)
  }

  render() {
    const {values, handleSelect, nextStep} = this.props
    return (
      <React.Fragment>
        <form onSubmit={this.handleSubmit}>
          <label className="app-input-label" htmlFor="fullname">Full Name</label>
          <input
            name="fullname"
            className="App-Form-Inputs"
            placeholder="Name (First and Last)"
            type="text"
            value={values.Name}
            onChange={this.handleChange("Name")} />
          <label className="app-input-label" htmlFor="faculty">Faculty</label>
          <Faculty
            className="App-Form-Inputs"
            isMulti={false}
            value={values.Faculty}
            handleSelect={handleSelect("Faculty")}
            placeholder="Faculty"/>
          <label className="app-input-label" htmlFor="research-title">Research Title</label>
          <input
            name="research-title"
            className="App-Form-Inputs"
            placeholder="Research Title"
            type="text"
            value={values.Research.Title}
            onChange={this.handleChange("Research.Title")} />
          <label className="app-input-label" htmlFor="research-url">Research URL</label>
          <input
            name="research-url"
            className="App-Form-Inputs"
            placeholder="Research URL"
            type="url"
            value={values.Research.URL}
            onChange={this.handleChange("Research.URL")} />
          <label className="app-input-label" htmlFor="coauthors-faculty">Coauthor's Faculty</label>
          <Faculty
            className="App-Form-Inputs"
            isMulti={true}
            value={values.Coauthors.Faculty}
            handleSelect={handleSelect("Coauthors")}
            placeholder="Coauthor's Faculty"/>
        </form>
        <div className="nav-btn">
          <button onClick={nextStep} className="App-Nav-Btn">Next</button>
        </div>
      </React.Fragment>
    );
  }
};

export default Personal;
