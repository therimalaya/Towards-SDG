import React, { Fragment } from 'react';
import Circos from 'react-circos';
import { Grid } from '@material-ui/core';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';

import TargetList from '../data/targets.json';
import GoalList from '../data/goals.json';
import { FacultyConfig } from '../config/app-config.js';

import _ from 'lodash';

const targetFilter = target => target.id.match("[0-9]$")
const NestedGoals = _.mergeWith(
  _.flatMapDepth(_.groupBy(GoalList, "goal"), 0),
  _.flatMapDepth(_.groupBy(TargetList.filter(targetFilter), "goal"), x => ({ targets: x }), 0))
const Targets = _.flatMap(NestedGoals, x => _.flatMap(x.targets, y => ({ ...y, color: x.colorInfo.hex })))

export default function Summary(props) {
  const { FormData, Records } = props

  return (
    <React.Fragment>
      <Grid container>
        <Grid item xs={6}>
          <RecordSummary Record={{ ...FormData, SDGRecords: Records }} />
        </Grid>
        <Grid item xs={6}>
          <RecordPlotPanel Records={Records} />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

const RecordSummary = ({ Record }) => (
  <Fragment>
    <div className="records">
      {Record
      ? <React.Fragment>
        <ExpansionPanel>
          <ExpansionPanelSummary>
            <Typography>{Record.Research.Title}</Typography>
            <Typography>{Record.Research.URL}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography variant="span">Main Author:</Typography>
            <Typography>{Record.Name}</Typography>
            <Typography>{FacultyConfig.filter(fclty => fclty.value === Record.Faculty).flatMap(fclty => fclty.label)}</Typography>
            <Typography variant="span">Coaurhots: </Typography>
            <Typography>{FacultyConfig.filter(fclty => Record.Coauthors.Faculty.includes(fclty.value)).flatMap(fclty => fclty.label).join("; ")}</Typography>
            <Typography>Research Type</Typography>
            <Typography>{Record.Research.Type}</Typography>
            <Typography>Research Outreach</Typography>
            <Typography>{Record.Research.Outreach}</Typography>
            {Record.SDGRecords.length > 0
                                      ? <table className="sdg-records">
                                        <thead>
                                          <tr>
                                            <th>Target1</th>
                                            <th>Direction</th>
                                            <th>Target2</th>
                                            <th>Type</th>
                                            <th>Interaction</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {
                                            Record.SDGRecords.map((sdg, idx) => {
                                              return (
                                                <React.Fragment key={idx}>
                                                  <tr>
                                                    <td>{sdg.Targets[0]}</td>
                                                    <td>{sdg.Interaction.direction === "ltr" ? "->" : sdg.Interaction.direction === "rtl" ? "<-" : ""}</td>
                                                    <td>{sdg.Targets[1]}</td>
                                                    <td>{sdg.Interaction.type}</td>
                                                    <td>{sdg.Interaction.value}</td>
                                                  </tr>
                                                </React.Fragment>
                                              )
                                            })
                                          }
                                        </tbody>
                                      </table>
                                      : null}
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </React.Fragment>
      : null}
    </div>
  </Fragment>
)

export const RecordPlotPanel = ({ Records }) => {
  const size = 450;
  const layout = NestedGoals
    .map(goal => ({
      id: String(goal.goal),
      len: goal.targets.length,
      label: String(goal.goal),
      block_id: goal.goal,
      value: goal.goal,
      start: goal.goal - 1,
      end: goal.goal,
      color: goal.colorInfo.hex
    }));

  const highlight = Targets
    .map(target => ({
      id: target.id,
      block_id: String(target.goal),
      start: parseInt(target.id.split(".")[1] - 1),
      end: parseInt(target.id.split(".")[1]),
      value: parseInt(target.id.split(".")[1]),
      color: target.color
    }));
  const chords = Records.map(item => {
    return ({
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
      opacity: item.Interaction.type === "Direct" ? 1 : item.Interaction.type === "Indirect" ? 0.5 : 0.2,
      value: item.Interaction.value === "Positive" ? 1 : item.Interaction.value === "Negative" ? -1 : 0,
      label: `Target: ${item.Targets[0]} ↣ Target: ${item.Targets[1]}`
    });
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
            display: false,
          },
          labels: {
            position: 'center',
            display: true,
            size: 12,
            color: "white",
            radialOffset: 10,
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
              d.position = (d.start + d.end) / 2 + 0.25
              d.value = d.id.split(".")[1]
              return d
            }),
            config: {
              innerRadius: size / 2 - 45,
              outerRadius: size / 2 - 30,
              style: {
                'font-size': 9,
                'font-weight': 600,
                'fill': d => _.flatMap(NestedGoals, x => x.colorInfo.hex)[d.block_id - 1]
              },
            }
          },
          {
            type: "CHORDS",
            data: chords,
            config: {
              opacity: d => d.opacity,
              color: d => d.value > 0 ? "forestgreen" : (d.value < 0 ? "firebrick" : "grey"),
              tooltipContent: function (d) {
                const interaction = d.value > 0 ? "Interaction: Positive" : (d.value < 0 ? "Interaction: Negative" : "")
                return `<h3>${d.label}<br/>${interaction}</h3>`;
              },
            }
          }
        ]}
      />
    </div>
  )
}
