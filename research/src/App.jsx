import React from "react";

// Apollo GraphQL Related Imports
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { ApolloProvider } from "@apollo/react-hooks";
import { ApolloClient } from "apollo-client";

// Style Related Imports
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/core/styles";

// Import Other Components
import InnerApp from "./components/InnerApp.jsx";

// Import Contexts
import { StepContextProvider } from "./context/StepContext";
import { FormContextProvider } from "./context/FormContext";
import { RecordsContextProvider } from "./context/RecordsContext";
import { GoalContextProvider } from "./context/GoalContext";
import { SelectTargetContextProvider } from "./context/SelectTarget";
import { SDGContextProvider } from "./context/SDGContext";
import { DataContextProvider } from "./context/DataContext";
import { GroupContextProvider } from "./context/GroupContext";

// Apollo Client Setup
const cache = new InMemoryCache();
const link = new HttpLink({
  uri: "http://api:4000/graphql/",
});
const client = new ApolloClient({
  cache,
  link,
  onError: ({ networkError, graphQLErrors }) => {
    console.log("graphQLErrors", graphQLErrors);
    console.log("networkError", networkError);
  },
});

// App-Theme: Used when creating classes to keep consistent colors and other aspects
const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#33ae99",
      main: "#009a80",
      dark: "#006b59",
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
// May be create responsive font sizes

export default function App() {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <StepContextProvider>
          <FormContextProvider>
            <SelectTargetContextProvider>
              <SDGContextProvider>
                <RecordsContextProvider>
                  <GoalContextProvider>
                    <DataContextProvider>
                      <GroupContextProvider>
                        <InnerApp />
                      </GroupContextProvider>
                    </DataContextProvider>
                  </GoalContextProvider>
                </RecordsContextProvider>
              </SDGContextProvider>
            </SelectTargetContextProvider>
          </FormContextProvider>
        </StepContextProvider>
      </ThemeProvider>
    </ApolloProvider>
  );
}
