import React from "react";
import DoubleArrowIcon from "@material-ui/icons/DoubleArrow";

// const useStyles = makeStyles((theme) => ({
//   targetBtns: {
//     alignContent: "flex-start",
//   },
//   targetBtn: {
//     margin: "4px 0px",
//     textTransform: "unset",
//     textAlign: "left",
//     justifyContent: "start",
//     "& p": {
//       margin: 0,
//       "& span": {
//         fontWeight: "bold",
//         color: theme.palette.primary.main,
//       },
//     },
//     "&:hover": {
//       color: theme.palette.primary.main,
//       "& p": {
//         "& span": {
//           backgroundColor: theme.palette.primary.main,
//           color: theme.palette.primary.contrastText,
//           display: "inline-block",
//           paddingRight: "5px",
//           paddingLeft: "3px",
//           borderRadius: "5px",
//           marginRight: "5px",
//         },
//       },
//     },
//   },
//   clickedTargetBtn: {
//     margin: "4px 0px",
//     textTransform: "unset",
//     textAlign: "left",
//     justifyContent: "start",
//     backgroundColor: theme.palette.background.light,
//     color: theme.palette.primary.main,
//     "& p": {
//       margin: 0,
//       "& span": {
//         backgroundColor: theme.palette.primary.main,
//         color: theme.palette.primary.contrastText,
//         display: "inline-block",
//         paddingRight: "5px",
//         paddingLeft: "3px",
//         borderRadius: "5px",
//         marginRight: "5px",
//       },
//     },
//     "&:hover": {
//       backgroundColor: theme.palette.background.light,
//     },
//   },
//   goalcover: {
//     width: "100%",
//     height: "175px",
//     flexShrink: 0,
//     backgroundPosition: "top left",
//   },
//   tableWrapper: {
//     width: "100%",
//   },
//   table: {
//     width: "100%",
//     maxHeight: "150px",
//     overflowY: "scroll",
//     marginBottom: "15px",
//     "& tbody": {
//       "& *": {
//         fontSize: "inherit",
//         padding: "2px 5px",
//       },
//     },
//   },
//   goalheader: {
//     display: "flex",
//     alignItems: "center",
//     "& p": {
//       color: theme.palette.primary.contrastText,
//       fontSize: "larger",
//     },
//     "& h3": {
//       color: theme.palette.primary.contrastText,
//       paddingRight: "10px",
//       paddingLeft: "5px",
//     },
//   },
// }));

export const InteractionArrow = (props) => {
  const { direction } = props;
  if (direction === "rtl") {
    return (
      <DoubleArrowIcon
        style={{ fontSize: "inherit", transform: "rotate(180deg)" }}
      />
    );
  } else if (direction === "ltr") {
    return <DoubleArrowIcon style={{ fontSize: "inherit" }} />;
  } else {
    return null;
  }
};
export const direction = [
  { value: "", label: "None" },
  { value: "ltr", label: <InteractionArrow direction="ltr" /> },
  { value: "rtl", label: <InteractionArrow direction="rtl" /> },
];
export const interaction = [
  { value: "", label: "None" },
  { value: "Positive", label: "Positive" },
  { value: "Negative", label: "Negative" },
];
export const type = [
  { value: "", label: "None" },
  { value: "Direct", label: "Direct" },
  { value: "Indirect", label: "Indirect" },
];
