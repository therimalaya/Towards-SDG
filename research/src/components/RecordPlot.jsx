import React from "react";

import Circos from "react-circos";

import { GoalList } from "../data/AllGoals.js";
import _ from "lodash";

// const useStyles = makeStyles((theme) => ({
//   recordsDetails: {
//     display: "flex",
//     flexDirection: "column",
//   },
//   expansionTitle: {
//     "& > div": {
//       display: "flex",
//       flexDirection: "row",
//       justifyContent: "space-between",
//       "& > div:first-child": {
//         "& p": {
//           fontWeight: 800,
//         },
//       },
//     },
//   },
//   expansionDetail: {
//     flexDirection: "column",
//   },
//   gridRow: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   table: {
//     maxWidth: "100%",
//   },
//   rtlIcon: {
//     transform: "rotate(180deg)",
//   },
//   ltrIcon: {},
//   link: {
//     textTransform: "uppercase",
//     fontSize: "small",
//   },
// }));

const Targets = _.flatMap(GoalList, (x) =>
  _.flatMap(x.targets, (y) => ({ ...y, color: x.colorInfo.hex }))
);

const RecordPlot = ({ Records }) => {
  const size = 450;
  const layout = GoalList.map((goal) => ({
    id: String(goal.goal),
    len: goal.targets.length,
    label: String(goal.goal),
    block_id: goal.goal,
    value: goal.goal,
    start: goal.goal - 1,
    end: goal.goal,
    color: goal.colorInfo.hex,
  }));

  const highlight = Targets.map((target) => ({
    id: target.id,
    block_id: String(target.goal),
    start: parseInt(target.id.split(".")[1] - 1),
    end: parseInt(target.id.split(".")[1]),
    value: parseInt(target.id.split(".")[1]),
    color: target.color,
  }));
  const chords = Records.filter((item) => item.Targets.length > 1).map(
    (item) => {
      return {
        source: {
          id: String(item.Goals[0]),
          start: parseInt(item.Targets[0].split(".")[1]) - 1,
          end: parseInt(item.Targets[0].split(".")[1]),
        },
        target: {
          id: String(item.Goals[1]),
          start: parseInt(item.Targets[1].split(".")[1]) - 1,
          end: parseInt(item.Targets[1].split(".")[1]),
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
        label: `Target: ${item.Targets[0]} ↣ Target: ${item.Targets[1]}`,
      };
    }
  );

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
            position: "center",
            display: true,
            size: 12,
            color: "white",
            radialOffset: 10,
          },
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
              color: (d) => d.color,
            },
          },
          {
            type: "TEXT",
            data: highlight.map((d) => {
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
                fill: (d) =>
                  _.flatMap(GoalList, (x) => x.colorInfo.hex)[d.block_id - 1],
              },
            },
          },
          {
            type: "CHORDS",
            data: chords,
            config: {
              opacity: (d) => d.opacity,
              color: (d) =>
                d.value > 0
                  ? "forestgreen"
                  : d.value < 0
                  ? "firebrick"
                  : "grey",
              tooltipContent: function (d) {
                const interaction =
                  d.value > 0
                    ? "Interaction: Positive"
                    : d.value < 0
                    ? "Interaction: Negative"
                    : "";
                return `<h3>${d.label}<br/>${interaction}</h3>`;
              },
            },
          },
        ]}
      />
    </div>
  );
};

export default RecordPlot;
