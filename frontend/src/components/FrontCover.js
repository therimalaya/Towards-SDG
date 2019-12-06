import React from 'react';

const FrontCover = (props) => {
    return(
      <div className="cover-page">
        <img src="images/SDG-Logo-Horizontal.png" alt="Towards SDG"/>
        <div className="nav-btn">
          <button onClick={props.nextStep} className="App-Nav-Btn">Let's Get Started »</button>
        </div>
      </div>
    )
}

export default FrontCover
