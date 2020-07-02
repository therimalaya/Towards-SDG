import React, { useState, createContext } from "react";

const initFormState = {
  Type: "course",
  CourseCode: "",
  Year: new Date().getFullYear(),
  CourseName: "",
  CourseResponsible: "",
  Faculty: "",
  RelatedFaculties: [],
  Teaching: "",
  SustainFocus: "",
};

export const FormContext = createContext();
export const FormContextProvider = (props) => {
  const [FormData, setFormData] = useState(initFormState);
  const [NoError, setNoError] = useState();
  const [Errors, setErrors] = useState({
    Type: "",
    CourseName: "",
    CourseCode: "",
    Year: "",
    CourseResponsible: "",
    Faculty: "",
    RelatedFaculties: "",
    Teaching: "",
    SustainFocus: "",
  });
  const resetForm = () => setFormData(initFormState);
  const UpdateFormData = (field, data) => {
    setFormData({
      ...FormData,
      ...{ [field]: data },
    });
  };
  const HandleChange = (input) => (event) => {
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
    if (input === "CourseCode") {
      newValue = newValue.toUpperCase();
    }
    UpdateFormData(input, newValue);
  };
  const values = {
    FormData,
    setFormData,
    resetForm,
    UpdateFormData,
    HandleChange,
    NoError,
    setNoError,
    Errors,
    setErrors,
  };
  return (
    <FormContext.Provider value={{ ...values }}>
      {props.children}
    </FormContext.Provider>
  );
};
