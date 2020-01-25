import React, { Fragment } from 'react';
import TargetList from '../data/targets.json';
import GoalList from '../data/goals.json';
import { FacultyConfig } from '../config/app-config.js';
import Circos from 'react-circos';
import _ from 'lodash';
import Button from '../styles/Buttons.js';

const targetFilter = target => target.id.match("[0-9]$")
const NestedGoals = _.mergeWith(
  _.flatMapDepth(_.groupBy(GoalList, "goal"), 0),
  _.flatMapDepth(_.groupBy(TargetList.filter(targetFilter), "goal"), x => ({ targets: x }), 0))
const Targets = _.flatMap(NestedGoals, x => _.flatMap(x.targets, y => ({ ...y, color: x.colorInfo.hex })))

export default class Summary extends React.Component {
  render() {
    const { FormData, Records, Submit, PrevStep } = this.props

    return (
      <React.Fragment>
        <h2 className="AppStepTitle">Summary</h2>
        <div className="summary-panel">
          <RecordSummary Record={{ ...FormData, SDGRecords: Records }} />
          <RecordPlotPanel Records={Records} />
        </div>
        <div className="nav-btn">
          <Button onClick={PrevStep}>Previous</Button>
          <Button onClick={Submit}>Submit</Button>
        </div>
      </React.Fragment>
    );
  }
};

const RecordSummary = ({ Record }) => (
  <Fragment>
    <div className="records">
      {Record
        ? <React.Fragment>
          <details className="records-details" open>
            <summary className="records-summary">
              <p>
                <span className="record-title">{Record.Research.Title}</span>
                <span className="record-research-url"><a href={Record.Research.URL}>Link</a></span>
              </p>
              <p className="record-research-author">
                <span className="author-name-label">Main Author</span>
                <span className="author-name">{Record.Name}</span>
                <span className="author-faculty">{
                  FacultyConfig.filter(fclty => fclty.value === Record.Faculty).flatMap(fclty => fclty.label)
                }</span>
              </p>
            </summary>
            <p className="record-coauthors"><span className="record-coauthors-label">Coauthors</span>{
              FacultyConfig.filter(fclty => Record.Coauthors.Faculty.includes(fclty.value)).flatMap(fclty => fclty.label).join("; ")
            }</p>
            <p className="record-coauthors"><span className="record-coauthors-label"> Research Type</span> { Record.Research.Type } </p>
            <p className="record-coauthors"><span className="record-coauthors-label"> Research Outreach</span> { Record.Research.Outreach } </p>
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
          </details>
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
