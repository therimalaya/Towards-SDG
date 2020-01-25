import React from 'react';
import ReactModal from 'react-modal';
import styles from './TargetModal.module.scss';
import { Button, ButtonGroup } from '@material-ui/core';
/* import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab'; */

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
        <div className={styles.goalHeaderContainer}>
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
        </div>
        <div className="target-page-buttons">
          {
            CurrentRecord.Targets.length === 2
            ? <InteractionButtons
                handleInteraction={handleInteraction("value")} />
            : <div></div>
          }
          {
            CurrentRecord.Interaction.value !== ""
            ? <React.Fragment>
              <InteractionType
                handleType={handleInteraction("type")} />
              <InteractionDirection
                selectedTargets={selectedTargets}
                handleDirection={handleInteraction("direction")} />
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
  const { handleInteraction } = props;
  return (
    <div className="ButtonGroup">
      <p className="ButtonLabel">Set Interaction (Optional)</p>
      <ButtonGroup color="primary" variant="contained">
        <button onClick={handleInteraction}
          value="Positive"
          className="ButtonInGroup">Positive</button>
        <button onClick={handleInteraction}
          value="Negative"
          className="ButtonInGroup">Negative</button>
      </ButtonGroup>
    </div>
  )
}

const InteractionType = (props) => {
  const { handleType } = props;
  return (
    <div className="ButtonGroup">
      <p className="ButtonLabel">Type of Interaction (Optional)</p>
      <ButtonGroup color="primary" variant="contained">
        <button onClick={handleType}
          value="Direct"
          className="ButtonInGroup">Direct</button>
        <button onClick={handleType}
          value="Indirect"
          className="ButtonInGroup">InDirect</button>
      </ButtonGroup>
    </div>
  )
}

const InteractionDirection = (props) => {
  const { handleDirection, selectedTargets } = props;
  return (
    <div className="ButtonGroup">
      <p className="ButtonLabel">Interaction Direction (Optional)</p>
      <ButtonGroup color="primary" variant="contained">
        <button onClick={handleDirection}
          value="ltr"
          className="ButtonInGroup">{selectedTargets[0].id+" → "+selectedTargets[1].id}</button>
        <button onClick={handleDirection}
          value="rtl"
          className="ButtonInGroup">{selectedTargets[0].id+" ← "+selectedTargets[1].id}</button>
      </ButtonGroup>
    </div>
  )
}

export default InteractionModal;
