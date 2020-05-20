import React, { Fragment } from "react";
import Circos from "react-circos";
import { Paper, Box, Grid, Divider } from "@material-ui/core";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from "@material-ui/core";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import DoubleArrowIcon from "@material-ui/icons/DoubleArrow";
import makeStyles from "@material-ui/core/styles/makeStyles";

import {TargetList} from "../data/AllTargets.js";
import { GoalList } from "../data/AllGoals.js";
import { FacultyConfig } from "../config/app-config.js";

import _ from "lodash";

const targetFilter = target => target.id.match("[0-9]$");
const NestedGoals = _.mergeWith(
  _.flatMapDepth(_.groupBy(GoalList, "goal"), 0),
  _.flatMapDepth(
    _.groupBy(TargetList.filter(targetFilter), "goal"),
    x => ({ targets: x }),
    0
  )
);
const Targets = _.flatMap(NestedGoals, x =>
  _.flatMap(x.targets, y => ({ ...y, color: x.colorInfo.hex }))
);

const useStyles = makeStyles(theme => ({
  recordsDetails: {
    display: "flex",
    flexDirection: "column"
  },
  expansionTitle: {
    "& > div": {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      "& > div:first-child": {
        "& p": {
          fontWeight: 800
        }
      }
    }
  },
  expansionDetail: {
    flexDirection: "column"
  },
  gridRow: {
    flexDirection: "row",
    alignItems: "center"
  },
  table: {
    maxWidth: "100%"
  },
  rtlIcon: {
    transform: "rotate(180deg)"
  },
  ltrIcon: {},
  link: {
    textTransform: "uppercase",
    fontSize: "small"
  }
}));

export const RecordSummary = props => {
  const classes = useStyles();
  const { Record, expanded } = props;
  return (
    <Fragment>
      <Box width="100%">
        {Record ? (
          <React.Fragment>
            <ExpansionPanel defaultExpanded={expanded ? true : false}>
              <ExpansionPanelSummary className={classes.expansionTitle}>
                {Record.CourseName ? (
                  <Typography style={{ fontWeight: 800 }}>
                    {Record.CourseName}
                  </Typography>
                ) : (
                  <Typography style={{ fontWeight: 800 }}>Detail</Typography>
                )}
                {Record.CourseCode ? Record.CourseCode : null}
              </ExpansionPanelSummary>
              <ExpansionPanelDetails className={classes.expansionDetail}>
                <ResearchDetails Record={Record} />
                {Record.SDGRecords.length > 0 ? (
                  <SDGTable Record={Record} />
                ) : null}
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </React.Fragment>
        ) : null}
      </Box>
    </Fragment>
  );
};
const ResearchDetails = props => {
  const classes = useStyles();
  const { Record } = props;
  return (
    <Box width="100%" className={classes.recordsDetails}>
      <Typography variant="overline">
        {Record.Type === "course" ? "Course Responsible" : "Main Supervisor"}:
        {Record.CourseResponsible}
      </Typography>
      <Box>
        <Typography variant="subtitle2">
          {FacultyConfig.filter(
            fclty => fclty.value === Record.Faculty
          ).flatMap(fclty => fclty.label)}
        </Typography>
      </Box>
      <Divider />
      <Box>
        <Typography variant="overline">Collaborating Faculties:</Typography>
        <Typography variant="subtitle2">
          {FacultyConfig.filter(fclty =>
            Record.RelatedFaculties.includes(fclty.value)
          )
            .flatMap(fclty => fclty.label)
            .join("; ")}
        </Typography>
      </Box>
      <Divider />
      <Typography variant="overline">
        Primary Teaching: {Record.Teaching}
      </Typography>
      <Divider />
      <Typography variant="overline">
        Primary Sustanability Focus: {Record.SustainFocus}
      </Typography>
    </Box>
  );
};
export const SDGTable = props => {
  const { Record } = props;
  const classes = useStyles();
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="records table" size="small">
        <TableHead>
          <TableRow>
            <TableCell>Target1</TableCell>
            <TableCell>Direction</TableCell>
            <TableCell>Target2</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Interaction</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Record.SDGRecords.length > 0
            ? Record.SDGRecords.map((sdg, key) => (
                <TableRow key={key}>
                  <TableCell>
                    {" "}
                    {sdg.Targets[0] ? sdg.Targets[0] : sdg.Goals[0]}{" "}
                  </TableCell>
                  <TableCell>
                    {sdg.Interaction.direction === "ltr" ? (
                      <DoubleArrowIcon className={classes.ltrIcon} />
                    ) : sdg.Interaction.direction === "rtl" ? (
                      <DoubleArrowIcon className={classes.rtlIcon} />
                    ) : (
                      ""
                    )}
                  </TableCell>
                  <TableCell>
                    {sdg.Targets[1] ? sdg.Targets[1] : sdg.Goals[1]}
                  </TableCell>
                  <TableCell>{sdg.Interaction.type}</TableCell>
                  <TableCell>{sdg.Interaction.value}</TableCell>
                </TableRow>
              ))
            : null}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export const RecordPlotPanel = ({ Records }) => {
  const size = 450;
  const layout = NestedGoals.map(goal => ({
    id: String(goal.goal),
    len: goal.targets.length,
    label: String(goal.goal),
    block_id: goal.goal,
    value: goal.goal,
    start: goal.goal - 1,
    end: goal.goal,
    color: goal.colorInfo.hex
  }));

  const highlight = Targets.map(target => ({
    id: target.id,
    block_id: String(target.goal),
    start: parseInt(target.id.split(".")[1] - 1),
    end: parseInt(target.id.split(".")[1]),
    value: parseInt(target.id.split(".")[1]),
    color: target.color
  }));
  const chords = Records.filter(item => item.Targets.length > 0).map(item => {
    return {
      source: {
        id: String(item.Goals[0]),
        start: parseInt(item.Targets[0].split(".")[1]) - 1,
        end: parseInt(item.Targets[0].split(".")[1])
      },
      target: {
        id: String(item.Goals[1]),
        start: parseInt(item.Targets[1].split(".")[1]) - 1,
        end: parseInt(item.Targets[1].split(".")[1])
      },
      opacity:
        item.Interaction.type === "Direct"
          ? 1
          : item.Interaction.type === "Indirect"
          ? 0.5
          : 0.2,
      value:
        item.Interaction.value === "Positive"
          ? 1
          : item.Interaction.value === "Negative"
          ? -1
          : 0,
      label: `Target: ${item.Targets[0]} ↣ Target: ${item.Targets[1]}`
    };
  });

  return (
    <div className="sdg-data-panel">
      <Circos
        size={size}
        layout={layout}
        config={{
          innerRadius: size / 2 - 115,
          outerRadius: size / 2 - 85,
          gap: 0.01,
          ticks: {
            display: false
          },
          labels: {
            position: "center",
            display: true,
            size: 12,
            color: "white",
            radialOffset: 10
          }
        }}
        tracks={[
          {
            type: "HIGHLIGHT",
            data: highlight,
            config: {
              innerRadius: size / 2 - 85,
              outerRadius: size / 2 - 50,
              opacity: 0.75,
              strokeColor: "white",
              strokeWidth: 0.5,
              color: d => d.color
            }
          },
          {
            type: "TEXT",
            data: highlight.map(d => {
              d.position = (d.start + d.end) / 2 + 0.25;
              d.value = d.id.split(".")[1];
              return d;
            }),
            config: {
              innerRadius: size / 2 - 45,
              outerRadius: size / 2 - 30,
              style: {
                "font-size": 9,
                "font-weight": 600,
                fill: d =>
                  _.flatMap(NestedGoals, x => x.colorInfo.hex)[d.block_id - 1]
              }
            }
          },
          {
            type: "CHORDS",
            data: chords,
            config: {
              opacity: d => d.opacity,
              color: d =>
                d.value > 0
                  ? "forestgreen"
                  : d.value < 0
                  ? "firebrick"
                  : "grey",
              tooltipContent: function(d) {
                const interaction =
                  d.value > 0
                    ? "Interaction: Positive"
                    : d.value < 0
                    ? "Interaction: Negative"
                    : "";
                return `<h3>${d.label}<br/>${interaction}</h3>`;
              }
            }
          }
        ]}
      />
    </div>
  );
};
export default function Summary(props) {
  const { FormData, Records } = props;
  return (
    <React.Fragment>
      <Grid container>
        <Grid item xs={12}>
          <RecordSummary
            Record={{ ...FormData, SDGRecords: Records }}
            expanded
          />
        </Grid>
        {/* <Grid item xs={6}>
          <RecordPlotPanel Records={Records} />
        </Grid> */}
      </Grid>
    </React.Fragment>
  );
}
