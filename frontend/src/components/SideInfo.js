import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Box, Paper } from '@material-ui/core';
import { TableContainer, Table, TableRow, TableCell, TableBody } from '@material-ui/core';
import { InteractionArrow } from './Target.js';

const useStyles = makeStyles(theme => ({
  table: {
    width: '100%',
    maxHeight: '150px',
    overflowY: 'auto',
    marginBottom: "15px",
    "& tbody": {
      "& *": {
        fontFamily: "monospace",
        padding: "2px 5px",
      }
    }
  },
  sideinfoHeader: {
    display: 'flex',
    alignItems: 'center',
    "& > span:first-child": {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      paddingRight: '10px',
      paddingLeft: '4px',
      marginRight: '4px',
    },
    "& > span:nth-child(2)": {
      fontSize: '1.2em'
    }
  }
}));

function SideInfo(props) {
  const classes = useStyles();
  const { Step, StepConfig, Records } = props
  const Label = StepConfig.filter(x => x.key === Step)[0].label
  switch (Step) {
    case 0:
      return (
        <React.Fragment>
          <Typography variant="subtitle2">{Label}</Typography>
        </React.Fragment>
      );
    case 1:
      return (
        <React.Fragment>
          <Box className={classes.sideinfoHeader}>
            <Typography component="span" variant="subtitle1" color="primary">Step {props.Step}</Typography>
            <Typography component="span" variant="subtitle1" color="primary">{Label}</Typography>
          </Box>
          <Box>
            <Typography>
              Here you can provide personal information and details about your main author contribution. Co-authors may also register publications in case the lead author is not affiliated at NMBU. Potentially multiple NMBU co-authors must coordinate a single registration in the portal.
            </Typography>
          </Box>
        </React.Fragment>
      );
    case 2:
      return (
        <React.Fragment>
          <Box className={classes.sideinfoHeader}>
            <Typography component="span" variant="subtitle1" color="primary"> Step {props.Step}</Typography>
            <Typography component="span" variant="subtitle1" color="primary"> {Label}</Typography>
          </Box>
            <Box>
              <Typography paragraph={true} variant="body2">
                The portal focuses on mapping pairwise interactions. Select one or two main SDG goals addressed (directly or indirectly) in your publication. At most two goals can be selected simultaneously. You may to return to this page later to register other goals for the same publication.
              </Typography>

              <Typography paragraph={true} variant="body2">
                (You must deselect selected goals to choose new ones.)
              </Typography>

              <Typography paragraph={true} variant="body2">
                On the next page you will have the opportunity to specify any pair-wise sub-goal interactions addressed in the publication, either between sub-goals within a main goal, or between sub-goals of two main goals.
              </Typography>
            </Box>
        </React.Fragment>
      );
    case 3:
      return (
        <React.Fragment>
          <Box className={classes.sideinfoHeader}>
            <Typography variant="subtitle1" component="span" color="primary">Step {props.Step}</Typography>
            <Typography variant="subtitle2" component="span" color="primary">{Label}</Typography>
          </Box>
          <Box>
            <Typography variant="body2">Select two sub-goals which interactions is addressed. You will also be asked to indicate (optionally) whether:</Typography>

            <ul>
              <li><Typography variant="body2">the interaction is positive (synergetic) or negative (trade-off)</Typography></li>
              <li><Typography variant="body2">the addressed interaction is a direct cause-effect interaction or a mere correlated effect (non-causal)</Typography></li>
              <li><Typography variant="body2">the direction of a potential direct causal effect</Typography></li>
            </ul>

            <Typography variant="body2">You may add multiple pair-wise interactions. Selected interactions are listed here continuously and may be edited (deleted).</Typography>

            <Typography variant="body2">When you are done, you may return to the previous page to select additional main goals.</Typography>

            {
              Records.length > 0 &&
              <React.Fragment>
                <h4 className="sidebar-info-h4">
                  Selected Records
                </h4>
                <SideTable Records={Records} />
              </React.Fragment>
            }
          </Box>
        </React.Fragment>
      );
    case 4:
      return (
        <React.Fragment>
          <Box className={classes.sideinfoHeader}>
            <Typography variant="subtitle1" component="span" color="primary">Step {props.Step}</Typography>
            <Typography variant="subtitle2" component="span" color="primary">{Label}</Typography>
          </Box>
          <Box>
            <Typography variant="body2">Review the summary of you added interactions. A simple graphical representation is given in addition to a full list of provided information on each interaction.</Typography>

            <Typography variant="body2">To delete or add new, please return to the previous page. When the information is completed, press “Submit”</Typography>
          </Box>
        </React.Fragment>
      );
      case 5:
        return (
          <React.Fragment>
            <Box className={classes.sideinfoHeader}>
              <Typography
                variant="body2"
                component="span"
                color="primary">
                Step {props.Step}
              </Typography>
              <Typography
                variant="body2"
                component="span"
                color="primary">
                {Label}
              </Typography>
            </Box>
            <Box>
              <Typography variant="body2">Thank you for your contribution!</Typography>
              <Typography variant="body2">To add more publications, simply press the home button.</Typography>
            </Box>
          </React.Fragment>
        );
      default:
        throw new Error('Opss!');
    }
  }

export default SideInfo;

export const SideTable = props => {
  const classes = useStyles();
  const { Records } = props;
  return (
    <TableContainer component={Paper} className={classes.table}>
      <Table size="small" aria-label="Selected Records Table">
        <TableBody>
          {Records.map((row, key) => (
            <TableRow key={key}>
              <TableCell>
                {row.Targets[0] ? row.Targets[0] : row.Goals[0]}
              </TableCell>
              <TableCell><InteractionArrow direction={row.Interaction.direction}/></TableCell>
              <TableCell>
                {row.Targets[1] ? row.Targets[1] : row.Goals[1]}
              </TableCell>
              <TableCell>{row.Interaction.value}</TableCell>
              <TableCell>{row.Interaction.type}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
