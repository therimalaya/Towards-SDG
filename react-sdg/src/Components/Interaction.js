import React, {useState} from 'react'
import { Grid, Card, Button, ButtonGroup, CardMedia, CardContent, Typography, Switch, CardActions, Hidden } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  card: {
    width: "100%",
    height: "500px",
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  cardContent: {
      flex: 1,
  },
  cardAction: {
      maxHeight: "60px",
  },
  goalTitle: {
      fontSize: "1rem",
  },
  targetTitle: {
    fontSize: "1.2rem",
    overflowY: "auto",
  },
}));

function InteractionSwitch(props) {
    const {value, handleInteraction} = props
    const [PositiveColor, setPositiveColor] = React.useState("primary")
    const [NegativeColor, setNegativeColor] = React.useState("primary")

    const handlePositive = (event) => {
        setPositiveColor("secondary")        
        setNegativeColor("primary")
        handleInteraction(event)
    }
    const handleNegative = (event) => {
        setNegativeColor("secondary")        
        setPositiveColor("primary")        
        handleInteraction(event)
    }
    return(
        <Typography component="div" style={{width: "100%", textAlign: "center"}} gutterBottom>
            <ButtonGroup
                variant="contained"
                size="large"
                aria-label="large contained secondary button group"
                >
                <Button value="positive" 
                    color={PositiveColor}
                    onClick={handlePositive}>Positive</Button>
                <Button value="negative" 
                    color={NegativeColor}
                    onClick={handleNegative}>Negative</Button>
            </ButtonGroup>
        </Typography>
    )
}

function GoalCard(props) {
    const classes = useStyles();
    const {Goal} = props
    return(
        <Card className={classes.card}>
            <CardMedia
                component="img"
                alt={Goal.short}
                image={Goal.image_src}
                title={Goal.title}
                />
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    {Goal.short}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p" className={classes.goalTitle}>
                    {Goal.title}
                </Typography>
            </CardContent>
        </Card>
    )
}

function TargetCard(props) {
    const classes = useStyles();
    const {Target} = props
    return(
        <Card className={classes.card}>
            <CardContent className={classes.cardContent}>
                <Typography className={classes.title} variant="h5" component="h3" color="textSecondary" gutterBottom>
                {"Title "+Target.id}
                </Typography>
                <Typography variant="body2" component="p" className={classes.targetTitle}>
                {Target.title}
                </Typography>
            </CardContent>
        </Card>
    )
}


export default function Interaction(props) {
    const classes = useStyles();
    const { goals, interaction, handleInteraction } = props
    return (
        <div>
            <Grid container spacing={1}>
                {goals.map((goal, idx)=>{
                    var target = goal.targets.filter(y=>y.isSelected)[0]
                    return(
                        <React.Fragment key={idx}>
                            <Grid item sm={4} md={2}>
                                <GoalCard Goal={goal}/>
                            </Grid>
                            <Grid item sm={8} md={4}>
                                {target && <TargetCard Target={target}/>}
                            </Grid>
                        </React.Fragment>
                    )
                })}
                {goals.length > 1 && <InteractionSwitch handleInteraction={handleInteraction} value={interaction}/>}
            </Grid>
        </div>
    )
}
