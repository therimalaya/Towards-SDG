import React, { useState, useEffect } from 'react';
import { firestore } from 'firebase';
import { FacultyConfig } from '../config/app-config';
import { RecordSummary, RecordPlotPanel } from './Summary';
import { flatMap } from 'lodash';
import { Grid, Box, Typography } from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
var unsubscribe;

const useStyle = makeStyles(theme => ({
  wrapperBox: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    overflowY: 'auto',
    [theme.breakpoints.down('lg')]: {
      justifyContent: 'flex-start',
    }
  },
  recordsBox: {
    maxHeight: '95%',
    width: '100%',
    overflowY: 'auto',
    flexWrap: 'nowrap',
    alignItems: 'flex-start',
  },
  recordTitle: {
    paddingBottom: '20px',
  }
}))

const AllRecords = (props) =>  {
  const classes = useStyle();
  const [records, setRecords] = useState({})
  useEffect(() => {
    const db = firestore();

    unsubscribe = db.collection("records")
      .orderBy('created', 'desc')
      .limit(8)
      .onSnapshot(snapshot => {
        let records = [];
        snapshot.forEach(doc => records.push({ ...doc.data() }))
        setRecords(records)
      });
    return () => unsubscribe();
  }, [])

  return(
    <Box className={classes.wrapperBox} height="100%" width="100%">
      <Typography variant="h2" className={classes.recordTitle}>Recent Records</Typography>
      <Grid container direction='row'>
        <Grid item lg={6}>
          <Grid container spacing={1} direction="column" className={classes.recordsBox}>
            {
              records.length
              ? records.map((record, idx) => {
                return(
                  <Grid item key={idx}>
                    <RecordSummary Record={record} expanded={false} />
                  </Grid>
                )
              })
              : null
            }
          </Grid>
        </Grid>
        <Grid item lg={6}>
          {
            records.length
            ? <RecordPlotPanel Records={flatMap(records, "SDGRecords")} />
            : null
          }
        </Grid>
      </Grid>
    </Box>
  )
}
export default AllRecords;

export class AllRecords1 extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      records: {}
    }
  }
  componentDidMount() {
    const db = firestore();
    unsubscribe = db.collection("records")
      .orderBy('created', 'desc')
      .limit(5)
      .onSnapshot(snapshot => {
        let records = [];
        snapshot.forEach(doc => records.push({ ...doc.data() }))
        this.setState({ records })
        console.log(records)
      });
  }
  componentWillUnmount() {
    unsubscribe();
  }
  render() {
    let { records } = this.state;
    return (
      <React.Fragment>
        <div className="records">
          {records.length
            ? records.map((record, idx) => <React.Fragment key={idx}>
              <details className="records-details">
                <summary className="records-summary">
                  <p>
                    <span className="record-title">{record.Research.Title}</span>
                    <span className="record-research-url"><a href={record.Research.URL}>Link</a></span>
                  </p>
                  <p className="record-research-author">
                    <span className="author-name-label">Main Author</span>
                    <span className="author-name">{record.Name}</span>
                    <span className="author-faculty">{
                      FacultyConfig.filter(fclty => fclty.value === record.Faculty).flatMap(fclty => fclty.label)
                    }</span>
                  </p>
                </summary>
                <p className="record-coauthors"><span className="record-coauthors-label">Coauthors</span>{
                  FacultyConfig.filter(fclty => record.Coauthors.Faculty.includes(fclty.value)).flatMap(fclty => fclty.label).join("; ")
                }</p>
                <table className="sdg-records">
                  <thead>
                    <tr>
                      <th>Goal1</th><th>Goal2</th>
                      <th>Target1</th><th>Target2</th>
                      <th>Interaction</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      record.SDGRecords.map((sdg, idx) => <React.Fragment key={idx}>
                        <tr>
                          <td>{sdg.Goals[0]}</td><td>{sdg.Goals[1]}</td>
                          <td>{sdg.Targets[0]}</td><td>{sdg.Targets[1]}</td>
                          <td>{sdg.Interaction.value}</td>
                        </tr>
                      </React.Fragment>)
                    }
                  </tbody>
                </table>
              </details>
            </React.Fragment>)
            : null}
          {records.length
            ? <RecordPlotPanel Records={flatMap(records, "SDGRecords")} />
            : null}
        </div>
      </React.Fragment>
    );
  }
};
