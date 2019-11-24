import React from 'react'
import {Add, AccountBoxOutlined, AccountBalanceOutlined, AssignmentOutlined, LinkOutlined, PeopleAltOutlined, FormatAlignJustify} from '@material-ui/icons'
import { Fab, Box, Button, Grid, List, ListItem, ListItemAvatar, ListItemText, Avatar, Typography, Link, Card, CardMedia, CardContent } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'


const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    summaryText: {
        fontSize: "1.3rem",
        fontWeight: "bold",
        lineHeight: "normal",
    },
    rounded: {
        color: '#fff',
        backgroundColor: theme.palette.primary.main,
    },
    card: {
        display: 'flex',
        alignItems: "flex-end",
        marginBottom: "12px",
    },
    details: {
        display: 'grid',
        gridTemplateRows: '45px 1fr',
        gridTemplateColumns: '1fr 150px',
        gridGap: '10px',
    },
    cover: {
        width: 151,
        height: 151,
    },
    content: {
        gridColumn: "1/1",
        gridRow: '2/2',
        textAlign: 'justify',
    },
    goalTitle: {
        gridColumn: '1/3',
        gridRow: '1/1',
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
        float: "left",
      },
      GoalSummaryTitle: {
        fontSize: "1.3rem",
        fontWeight: "bold",
        lineHeight: "normal",
        padding: 0,
      },
      GoalNumber: {
          color: theme.palette.primary.main,
      },
}))

function SummaryText(prop) {
    const classes = useStyles()
    const {name, value, Icon} = prop
    return(
        <ListItem>
            <ListItemAvatar>
            <Avatar  variant="rounded" className={classes.rounded}>
                <Icon />
            </Avatar>
            </ListItemAvatar>
            <ListItemText 
                primary={
                    <React.Fragment>
                        <Typography variant="subtitle2" component="div" color="textSecondary">{name}</Typography>
                        <Typography variant="subtitle1" component="div" color="textPrimary" className={classes.summaryText}>{value}</Typography>
                    </React.Fragment>
                }
            />
        </ListItem>
    )
}

function GoTaSummary(props) {
    const classes = useStyles()
    const goal = props.goal
    const target = goal.targets.filter(x=>x.isSelected)[0]
    return(
        <Card className={classes.card}>
            <div className={classes.details}>
            <CardContent className={classes.goalTitle}>
                <Typography 
                variant="subtitle1" 
                component="div" 
                color="textPrimary" 
                className={classes.GoalSummaryTitle}>
                    <Box component="span" className={classes.GoalNumber}>Goal {goal.goal}: </Box> 
                    {goal.short}
                </Typography>
            </CardContent>
            <CardContent className={classes.content}>
                <Button
                    component="span"
                    value={target.id}
                    variant="contained" 
                    color="primary"
                    className={classes.button}>
                                    
                    {target.id}
                </Button>
                {target.title}
            </CardContent>
            <CardMedia
                className={classes.cover}
                image={goal.image_src}
                title="Live from space album cover" />
            </div>
        </Card>
    )
}

export default function Summary(prop) {
    const classes = useStyles()
    const { states, Faculties } = prop
    return (
        <div>
            <Grid container spacing={3}>
                <Grid item sm={12} md={6}>
                <List className={classes.root}>
                    <SummaryText name="Name" value={states.Name} Icon={AccountBoxOutlined}/>
                    <SummaryText name="Faculty" value={Faculties[states.Faculty]} Icon={AccountBalanceOutlined}/>
                    <SummaryText name="Research" value={states.Research.title} Icon={AssignmentOutlined}/>
                    <Link href={states.Research.url}> 
                        <SummaryText name="Research URL" value={states.Research.url} Icon={LinkOutlined}/>
                    </Link>
                    <SummaryText name="Coauthor Faculties" value={states.Coauthors.Faculty.map((faculty, idx)=>{
                        return(
                            <Typography className={classes.summaryText} key={idx}>{Faculties[faculty]}</Typography>
                        )
                    })} Icon={PeopleAltOutlined}/>
                </List>
                </Grid>
                <Grid item sm={12} md={6} spacing={3}>
                {states.Goals.map((goal, idx)=>{
                    return(
                            <GoTaSummary key={idx} goal={goal} />
                    )
                })}
                </Grid>
            </Grid>
        </div>
    )
}

// ICON NAMES

// people (Coauthors)
// person (Name)
// account_balance (Faculty)
// assignment (Research Title)
// link (Research URL)

// For Targeta, use goal image
