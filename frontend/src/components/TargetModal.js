import React, { Fragment } from 'react';
import ReactModal from 'react-modal';
import styles from './TargetModal.module.scss';
import { Button, ButtonGroup } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
const modalStyle = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    backdropFilter: 'blur(0.5rem)'
  },
  content: {
    position: 'relative',
    top: '25%',
    height: 'auto',
    margin: 'auto',
    width: '75%',
    border: '1px solid #ccc',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    overflow: 'auto',
    WebkitOverflowScrolling: 'touch',
    borderRadius: '4px',
    outline: 'none',
    padding: '25px'
  }
}

const useStyles = makeStyles(theme => ({
  active: {
    backgroundColor: theme.palette.primary.dark,
  },
}))

const InteractionModal = (props) => {
  const { SelectedGoals, CurrentRecord, showModal, closeModal } = props;
  const { handleInteraction, ResetAndUpdate } = props;
  const selectedTargets = SelectedGoals
    .flatMap(goal => goal.targets.filter(target => target.isSelected))
  return (
    <ReactModal
      appElement={document.getElementById('root')}
      onRequestClose={closeModal}
      style={modalStyle}
      isOpen={showModal}
      contentLabel="Minimal Modal Example">
      <div className={styles.container}>
        {/* <div className={styles.goalHeaderContainer}>
            {
            SelectedGoals.map((goal, idx) => {
            const selectedTarget = goal.targets.filter(target => target.isSelected)
            return (
            <React.Fragment key={idx}>
            <div id={"goal-" + goal.goal + "-header"} className={styles.goalHeader}>
            <img src={goal.image_src} alt={goal.goal} />
            <div>
            <p>{goal.short}</p>
            <p className={styles.targetTitle}>
            <span>{selectedTarget.flatMap(target => target.id)}</span>
            {selectedTarget.flatMap(target => target.title)}
            </p>
            </div>
            </div>
            </React.Fragment>
            )
            })
            }
            </div> */}
        <div className="target-page-buttons">
          {
            CurrentRecord.Targets.length === 2
            ? <InteractionButtons
                handleInteraction={handleInteraction("value")}
                activeInteraction={CurrentRecord.Interaction.value}/>
            : <div></div>
          }
          {
            CurrentRecord.Interaction.value !== ""
            ? <React.Fragment>
              <InteractionType
                handleType={handleInteraction("type")}
                activeInteraction={CurrentRecord.Interaction.type}/>
              <InteractionDirection
                selectedTargets={selectedTargets}
                handleDirection={handleInteraction("direction")}
                activeInteraction={CurrentRecord.Interaction.direction}/>
            </React.Fragment>
            : null
          }
          <div className="nav-btns">
            <div className="nav-btn add-btn">
              <Button
                color="primary"
                variant="contained"
                disabled={CurrentRecord.Targets.length <= 0}
                onClick={ResetAndUpdate}>
                Add More Records
              </Button>
            </div>
          </div>
        </div>
      </div>

    </ReactModal>
  )
}

const InteractionButtons = (props) => {
  const classes = useStyles();
  const { handleInteraction, activeInteraction } = props;
  return (
    <Fragment>
      <p className="ButtonLabel">Set Interaction (Optional)</p>
      <ButtonGroup color="primary" variant="contained">
        <Button
          onClick={handleInteraction}
          value="Positive"
          classes={{root: activeInteraction==="Positive" ? classes.active : null}}>
          Positive
        </Button>
        <Button
          onClick={handleInteraction}
          value="Negative"
          classes={{root: activeInteraction==="Negative" ? classes.active : null}}>
          Negative
        </Button>
      </ButtonGroup>
    </Fragment>
  )
}

const InteractionType = (props) => {
  const classes = useStyles();
  const { handleType, activeInteraction } = props;
  return (
    <Fragment>
      <p className="ButtonLabel">Type of Interaction (Optional)</p>
      <ButtonGroup color="primary" variant="contained">
        <Button
          onClick={handleType}
          value="Direct"
          classes={{root: activeInteraction==="Direct" ? classes.active : null}}>
          Direct
        </Button>
        <Button
          onClick={handleType}
          value="Indirect"
          classes={{root: activeInteraction==="Indirect" ? classes.active : null}}>
          InDirect
        </Button>
      </ButtonGroup>
    </Fragment>
  )
}

const InteractionDirection = (props) => {
  const classes = useStyles();
  const { handleDirection, selectedTargets, activeInteraction } = props;
  const IntDirStr = str => selectedTargets[0].id+str+selectedTargets[1].id;
  return (
    <Fragment>
      <p className="ButtonLabel">Interaction Direction (Optional)</p>
      <ButtonGroup color="primary" variant="contained">
        <Button
          onClick={handleDirection}
          value="ltr"
          classes={{root: activeInteraction === "ltr" ? classes.active : null}}>
          {IntDirStr(" → ")}
        </Button>
        <Button
          onClick={handleDirection}
          value="rtl"
          classes={{root: activeInteraction === "rtl" ? classes.active : null}}>
          {IntDirStr(" ← ")}
        </Button>
      </ButtonGroup>
    </Fragment>
  )
}

export default InteractionModal;
