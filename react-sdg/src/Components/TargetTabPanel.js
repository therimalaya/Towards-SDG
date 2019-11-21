import React, { Component, useState } from 'react'
import PropTypes from 'prop-types';
import { FormControl, Tabs, Tab, Typography, Box, Button, Hidden } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import theme from '../theme'
import { borderBottom } from '@material-ui/system';

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      display: 'flex',
    },
    tabs: {
      borderRight: `1px solid ${theme.palette.divider}`,
      minWidth: "max-content",
    },
    button: {
        marginRight: theme.spacing(1),
        minHeight: "50px",
        maxHeight: "50px",
        minWidth:  "50px",
        maxWidth:  "50px",
        overflow: "hidden",
        fontFamily: "Impact, 'Arial Narrow', Sans",
        fontSize: "large",
        '&:hover': {
            backgroundColor: theme.palette.secondary.main,
         },
      },
    targetDescription: {
        padding: theme.spacing(1),
        display: 'flex',
        alignItems: 'start',
        borderBottom: `1px solid ${theme.palette.divider}`,
        fontSize: "larger",
    },
  }));

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
      <Typography
        component="div"
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}>
        <Box p={0}>{children}</Box>
      </Typography>
	);
}
  
TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

const TargetTab = (props) => {
    const classes = useStyles();
    const { goalImages, value, handleChange } = props
    const getImgSrc = (goalImage) => {
        return(
            <img src={goalImage} alt="" width="100px" height="100px"/>
        )
    }
    return(
        <Tabs value={value} 
            onChange={handleChange} 
            indicatorColor="primary"
            textColor="primary"
            aria-label="simple tabs example" 
            orientation="vertical"
            className={classes.tabs}>
                {
                    goalImages.map((goalImage, idx)=>{
                        return(
                            <Tab 
                                key={idx}
                                icon={getImgSrc(goalImage)} 
                                id={"full-width-tab-"+idx} 
                                area-controls={"full-width-tabpanel-"+idx} />
                        )
                    })
                }
        </Tabs>
    )    
}


const SelectTarget = (props) => {
    const classes = useStyles()
    const { Goal, updateTargets } = props
    // const targets = Object.values(Goal.targets).filter(x=>x.slug.match("\\d$"))

    return (
        <div style={{minHeight: "max-content"}}>
        {
            Goal.targets.map((target, idx)=>{
                return(
                    <React.Fragment key={idx}>
                        <Typography className={classes.targetDescription}>
                        <Button
                            value={target.id}
                            key={idx}
                            variant="contained" 
                            color="primary"
                            onClick={updateTargets}
                            className={classes.button}>
                            
                            {target.id}
                        </Button>
                        <span>{target.title}</span>
                        </Typography>
                    </React.Fragment>
                )
            })
        }
        </div>
    )
}


export default function TargetTabPanel(props) {
    const classes = useStyles();
    const { updateTargets, targets, goals } = props
    goals.forEach(goal=>goal['targets']=targets.filter(x=>x.goal===goal.goal))
    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <div className={classes.root}>
        <TargetTab
            value={value}
            goalImages={goals.map(x=>x["image_src"])}
            handleChange={handleChange}/>
        {
            goals.map((goal, idx)=>{
                return(
                    <TabPanel value={value} index={idx} key={idx}>
                        <SelectTarget 
                        Goal={goal}
                        updateTargets={updateTargets} 
                        />
                    </TabPanel>
                )
            })
        }
        </div>
    )
}
