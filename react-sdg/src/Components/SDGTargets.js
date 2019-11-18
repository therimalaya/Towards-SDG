import React, { Component } from 'react'
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(3),
  },
}));

const SelectTarget = (props) => {
    const classes = useStyles()
    const { Goals, SelectedGoals } = props
    const CurrentGoals = Object.values(Goals).filter(x=>SelectedGoals.includes(Number(x.number)))
    const Targets = CurrentGoals.map(x=>Object.values(x.targets).filter(y=>y.slug.match("\\d$")))
    const showTargetDesc = x => x
    return (
        <div>
            <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">Targets</FormLabel>
                <RadioGroup aria-label="target" name="target">
                    {Targets[0].map(target => {
                        return(
                            <FormControlLabel
                                value={target.number}
                                key={target.number}
                                control={<Radio color="primary"/>}
                                label={"Target "+target.number}
                                labelPlacement="end"
                                onMouseEnter={showTargetDesc}/>
                        )
                    })}
                </RadioGroup>
            </FormControl>
        </div>
    )
}


export default class SDGTargets extends Component {

    render() {
        const { values, Goals, Images } = this.props
        return (
            <div>
                <h2>This is SDG Targes.</h2>
                <SelectTarget 
                Goals={Goals}
                Images={Images}
                SelectedGoals={values.sdgGoals}/>
            </div>
        )
    }
}
