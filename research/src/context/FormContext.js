import React, { useState, createContext } from "react";

const initFormState = {
  Name: "",
  Faculty: "",
  Research: {
    Title: "",
    URL: "",
    Type: "",
    Outreach: ""
  },
  Coauthors: { Faculty: [] }
};

export const FormContext = createContext();
export const FormContextProvider = props => {
  const [FormData, setFormData] = useState(initFormState);
  const [NoError, setNoError] = useState();
  const [Errors, setErrors] = useState({
    Name: "",
    Faculty: "",
    Research: {
      Title: "",
      URL: "",
      Type: "",
      Outreach: ""
    },
    Coauthors: { Faculty: "" }
  });
  // const resetForm = () => setFormData(initFormState);
  const resetForm = () => {
    setFormData({
      Name: "",
      Faculty: "",
      Research: {
        Title: "",
        URL: "",
        Type: "",
        Outreach: ""
      },
      Coauthors: { Faculty: [] }
    });
  };
  const UpdateFormData = (field, data) => {
    field = field.split(".");
    var newState = FormData;
    if (field.length > 1) {
      newState[field[0]][field[1]] = data;
    } else {
      newState[field[0]] = data;
    }

    setFormData(newState);
  };
  const HandleChange = input => event => {
    var errors = Errors;
    const fields = input.split(".");
    if (fields.length < 2) {
      errors[fields[0]] = "";
    } else {
      errors[fields[0]] = { ...errors[fields[0]], [fields[1]]: "" };
    }

    /* errors[input] = ""; */
    setNoError("");
    setErrors({ ...Errors, ...errors });
    var newValue;
    if (event.target) {
      newValue = event.target.value;
    } else if (event.value) {
      newValue = event.value;
    } else {
      newValue = event;
    }
    UpdateFormData(input, newValue);
  };
  const values = {
    FormData,
    resetForm,
    setFormData,
    UpdateFormData,
    HandleChange,
    NoError,
    setNoError,
    Errors,
    setErrors
  };
  return (
    <FormContext.Provider value={{ ...values }}>
      {props.children}
    </FormContext.Provider>
  );
};
