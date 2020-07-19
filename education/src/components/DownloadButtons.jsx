import React, { useContext } from "react";

import { CSVLink } from "react-csv";
import { Button, Grid, Box, Typography, Divider } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import { makeStyles } from "@material-ui/core/styles";
import { DataContext } from "../context/DataContext";

const useStyles = makeStyles((theme) => ({
  csvDownload: {
    textDecoration: "none",
    color: theme.palette.primary.contrastText,
  },
  downloadTitle: {
    display: "inline-flex",
  },
  downloadSeparator: {
    marginBottom: "1vh",
  },
}));

const DownloadButton = (props) => {
  const classes = useStyles();
  const { data, filename, onClick, btnLabel } = props;
  return (
    <Button
      fullWidth
      variant="contained"
      color="primary"
      size="large"
      className={classes.button}
    >
      <CSVLink
        data={data}
        filename={filename}
        target="_blank"
        className={classes.csvDownload}
        onClick={onClick}
      >
        {btnLabel}
      </CSVLink>
    </Button>
  );
};

const DownloadButtons = (props) => {
  const classes = useStyles();
  const { loading, error, Data, GoalData, TargetData } = useContext(
    DataContext
  );

  if (loading) return <p>Loading ...</p>;
  if (error) return <p>Error :(</p>;
  const jsonDownload = async (data, fileName) => {
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const href = await URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = href;
    link.download = `${fileName}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <Box>
      <Typography variant="h4" className={classes.downloadTitle}>
        <SaveIcon fontSize="large" /> Download
      </Typography>
      <Divider className={classes.downloadSeparator} />
      <Grid container spacing={2}>
        <Grid item lg={4} md={12}>
          <DownloadButton
            data={GoalData}
            filename="goal-data.csv"
            onClick={() => {
              console.log(GoalData);
            }}
            btnLabel="Goals"
          />
        </Grid>
        <Grid item lg={4} md={12}>
          <DownloadButton
            data={TargetData}
            filename="target-data.csv"
            onClick={() => {
              console.log(TargetData);
            }}
            btnLabel="Targets"
          />
        </Grid>
        <Grid item lg={4} md={12}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => jsonDownload(Data, "json-data")}
            className={classes.button}
            // startIcon={<SaveIcon />}
            fullWidth
          >
            JSON
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DownloadButtons;
