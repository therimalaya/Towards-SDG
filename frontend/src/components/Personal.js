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
    /* this.state = {
     *   noError: false,
     *   errors: {
     *     Name: values.Name === "" ? "Name is Empty." : "",
     *     Research: {
     *       Title: values.Research.Title === "" ? "Reseach Title is Empty" : "",
     *       URL: values.Research.URL === "" ? "Research URL is Empty" : ""
     *     }
     *   }
     * } */
    /* this.checkValidFields = this.checkValidFields.bind(this) */
    this.HandleChange = this.HandleChange.bind(this)
  }

  /* checkValidFields = (input) => (event) => {
   *   let value = event.target.value
   *   let newError = this.state.errors;
   *   let inp_arr = input.split(".")

   *   if (inp_arr[0] === "Name" ) {
   *     if (value.length < 5) {
   *       newError.Name = "Full Name must be a least 5 characters long!";
   *     } else {
   *       newError.Name = ""
   *     }
   *   }
   *   if (inp_arr[0] === "Research") {
   *     if (inp_arr[1] === "Title") {
   *       if (value.length < 5) {
   *         newError.Research.Title = "Research Title much have at least 5 characters!"
   *       } else {
   *         newError.Research.Title = ""
   *       }

   *     }
   *     if (inp_arr[1] === "URL") {
   *       if (!validateUrl(value)) {
   *         newError.Research.URL = "Research URL is not valid!"
   *       } else {
   *         newError.Research.URL = ""
   *       }

   *     }
   *   }

   *   this.setState({
   *     noError: newError.Name === "" && newError.Research.Title === "" && newError.Research.URL === "",
   *     errors: newError
   *   })
   * } */

  HandleChange = input => event => {
    if (event.target) {
      this.props.UpdateFormData(input, event.target.value)
    } else {
      this.props.UpdateFormData(input, event)
    }
  }

  render() {
    const {FormData, NextStep} = this.props
    return (
      <React.Fragment>
        <form>
          <label className="app-input-label" htmlFor="fullname">Full Name</label>
          <input
            name="Name"
            className="App-Form-Inputs"
            placeholder="Name (First and Last)"
            type="text"
            value={FormData.Name}
            onChange={this.HandleChange("Name")} />
          <label className="app-input-label" htmlFor="faculty">Faculty</label>
          <Faculty
              className="App-Form-Inputs"
              isMulti={false}
              value={FormData.Faculty}
              HandleChange={this.HandleChange("Faculty")}
              placeholder="Faculty"/>
          <label className="app-input-label" htmlFor="research-title">Research Title</label>
          <input
            name="research-title"
            className="App-Form-Inputs"
            placeholder="Research Title"
            type="text"
            value={FormData.Research.Title}
            onChange={this.HandleChange("Research.Title")} />
          <label className="app-input-label" htmlFor="research-url">Research URL</label>
          <input
            name="research-url"
            className="App-Form-Inputs"
            placeholder="Research URL"
            type="url"
            value={FormData.Research.URL}
            onChange={this.HandleChange("Research.URL")} />
          <label className="app-input-label" htmlFor="coauthors-faculty">Coauthor's Faculty</label>
          <Faculty
            className="App-Form-Inputs"
            isMulti={true}
            value={FormData.Coauthors.Faculty}
            HandleChange={this.HandleChange("Coauthors")}
            placeholder="Coauthor's Faculty"/>
        </form>
        <div className="nav-btn">
          <button onClick={NextStep} className="App-Nav-Btn">Next</button>
        </div>
      </React.Fragment>
    );
  }
};

export default Personal;
