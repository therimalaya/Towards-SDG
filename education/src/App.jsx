import React, { Fragment, useState } from "react";

// Apollo GraphQL Related Imports
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { useQuery, useMutation, ApolloProvider } from "@apollo/react-hooks";
import { ApolloClient } from "apollo-client";

// Style Related Imports
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider, makeStyles } from "@material-ui/core/styles";

// Import Other Components
import InnerApp from './components/InnerApp.jsx'

// Data, Images and realted stuffs
import { StepConfig } from "./config/app-config";

// Apollo Client Setup
const cache = new InMemoryCache();
const link = new HttpLink({
  uri: "http://localhost:4000/graphql/",
});
const client = new ApolloClient({
  cache,
  link,
  onError: ({ networkError, graphQLErrors }) => {
    console.log("graphQLErrors", graphQLErrors);
    console.log("networkError", networkError);
  },
});

// App-Theme: Used when creating classes to keep consistant colors and other aspects
const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#33ae99",
      dark: "#009a80",
      main: "#006b59",
      contrastText: "#fff",
    },
    secondary: {
      main: "#556680",
      contrastText: "#fff",
    },
    background: {
      paper: "#fff",
      default: "#fafafa",
      light: "#F0F8FF",
    },
  },
});
// May be create responseive font sizes

export default function App() {
  // STATES
  const [Step, setStep] = useState(3);
  const [FormData, setFormData] = useState({
    Type: "course",
    CourseCode: "",
    Year: new Date().getFullYear(),
    CourseName: "",
    CourseResponsible: "",
    Faculty: "",
    RelatedFaculties: [],
    Teaching: "",
    SustainFocus: "",
  });
  const [PossibleGoals, SetPossibleGoals] = useState([]);
  const [CurrentRecord, setCurrentRecord] = useState({
    Goals: [],
    Targets: [],
    Interaction: {
      value: "",
      type: "",
      direction: "",
    },
  });
  const [Records, setRecords] = useState([]);
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

  // METHODS -> FUNCTIONS
  const UpdateRecords = (event) => {
    event.preventDefault();
    /* const clicked_targets = [...document.getElementsByClassName("clicked-target-btn")]
     * clicked_targets.map(btn => btn.classList.toggle("clicked-target-btn"))
     * clicked_targets.map(btn => btn.classList.toggle("target-btn")) */
    var _CurrentRecord = CurrentRecord;
    if (CurrentRecord.Targets.length <= 2) {
      _CurrentRecord = {
        ..._CurrentRecord,
        Goals: _CurrentRecord.Goals,
      };
    } else {
      _CurrentRecord = {
        ..._CurrentRecord,
        Goals: _CurrentRecord.Targets.map((x) => parseInt(x.split(".")[0])),
      };
    }
    setRecords([_CurrentRecord, ...Records]);
    setCurrentRecord({
      ...CurrentRecord,
      Targets: [],
      Interaction: { value: "", type: "", direction: "" },
    });
  };
  const RemoveCurrentRecord = (event) => {
    setRecords(
      Records.filter((value, idx) => String(idx) !== event.currentTarget.name)
    );
  };
  const UpdateCurrent = (input) => (event) => {
    const newRecord = Records.map((record, idx) => {
      if (String(idx) === event.target.name) {
        record.Interaction[input] = event.target.value;
        return record;
      } else {
        return record;
      }
    });
    setRecords(newRecord);
  };
  const UpdateFormData = (field, data) => {
    setFormData({
      ...FormData,
      ...{ [field]: data },
    });
  };
  const UpdateCurrentRecord = (input, value) => {
    setCurrentRecord({
      ...CurrentRecord,
      [input]: value,
    });
  };
  const NextStep = (event) => {
    event.preventDefault();
    setStep(Step + 1);
  };
  const PrevStep = (event) => {
    event.preventDefault();
    setStep(Step - 1);
  };
  const GoHome = (event) => {
    event.preventDefault();
    setRecords([]);
    setCurrentRecord({
      Goals: [],
      Targets: [],
      Interaction: {
        value: "",
        type: "",
        direction: "",
      },
    });
    setFormData({
      Type: FormData.Type,
      CourseCode: "",
      Year: 2020,
      CourseName: "",
      CourseResponsible: "",
      Faculty: "",
      RelatedFaculties: [],
      Teaching: "",
      SustainFocus: "",
    });
    setStep(0);
  };
  const checkValidFields = (event) => {
    let isValid = true;
    let errors = Errors;

    if (!FormData.CourseName) {
      errors.CourseName = "This field cannot be empty.";
      isValid = false;
    }
    if (!FormData.CourseCode) {
      errors.CourseCode = "Code cannot be empty. See Studentweb for code.";
      isValid = false;
    }

    setNoError(isValid);
    setErrors({ ...Errors, ...errors });
    return isValid;
  };
  const HandleFormChange = (input) => (event) => {
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
  const CheckAndProceed = (event) => {
    event.preventDefault();
    const isValid = checkValidFields(event);
    // Call checkValidFields function
    // This will update all the state
    // If noError is false, Error should automatically displayed
    // If noError is true, proceed to next step
    /* NextStep(event) */
    if (isValid) {
      NextStep(event);
    }
  };

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <InnerApp
          Records={Records}
          RemoveCurrentRecord={RemoveCurrentRecord}
          UpdateCurrent={UpdateCurrent}
          Step={Step}
          StepConfig={StepConfig}
          NextStep={NextStep}
          FormData={FormData}
          CurrentRecord={CurrentRecord}
          UpdateFormData={UpdateFormData}
          UpdateCurrentRecord={UpdateCurrentRecord}
          UpdateRecords={UpdateRecords}
          PrevStep={PrevStep}
          GoHome={GoHome}
          Errors={Errors}
          setErrors={setErrors}
          NoError={NoError}
          setNoError={setNoError}
          checkValidFields={checkValidFields}
          HandleChange={HandleFormChange}
          CheckAndProceed={CheckAndProceed}
          PossibleGoals={PossibleGoals}
          SetPossibleGoals={SetPossibleGoals}
        />
      </ThemeProvider>
    </ApolloProvider>
  );
}

