import React from 'react';
import './App.scss';

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      Step: 1,
      Goal: 1,
      Target: 1.1,
      Name: "Raju Rimal",
      Faculty: "KBM",
      Research: {Title: "Simrel", URL: "https://simulatr.github.io"},
      Coauthors: {Faculty: ["KBM", "MINA"]},
      Interaction: "Positive"
    }
  }
  render() {
    return (
      <div className="App">
        <aside className="App-sidebar">
          <header className="App-header"></header>
          <div className="App-info">
            <p>Information about this application. Include help per stages. This section might include login and logout afterwards.</p>
          </div>
          <footer className="App-footer">
          </footer>
        </aside>
        <main className="App-main">
          <dl>
            <dt>Step:</dt><dd>{this.state.Step}</dd>
            <dt>Goal:</dt><dd>{this.state.Goal}</dd>
            <dt>Target:</dt><dd>{this.state.Target}</dd>
            <dt>Name:</dt><dd>{this.state.Name}</dd>
            <dt>Faculty:</dt><dd>{this.state.Faculty}</dd>
            <dt>Research Title:</dt><dd>{this.state.Research.Title}</dd>
            <dt>Research URL:</dt><dd>{this.state.Research.URL}</dd>
            <dt>Coauthor's Faculty:</dt><dd>{this.state.Coauthors.Faculty.join(", ")}</dd>
            <dt>Interaction:</dt><dd>{this.state.Interaction}</dd>
          </dl>
        </main>
      </div>
    );
  }
}
