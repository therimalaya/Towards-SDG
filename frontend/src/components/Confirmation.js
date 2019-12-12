import React from 'react';
import Firebase from 'firebase';

class Confirmation extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      records: {}
    }
  }
  componentDidMount() {
    const db = Firebase.firestore();
    db.collection("records").onSnapshot(snapshot => {
      let records = [];
      snapshot.forEach(doc => records.push({ ...doc.data() }))
      this.setState({records})
    });
  }
  render() {
    let { records } = this.state;
    /* records.map(record=>console.log(record.Research)) */
    return (
      <React.Fragment>
        <div className="record-table">
          <h1>Recent Records</h1>
          {records.length
          ? records.map(record=><React.Fragment>
            <details>
              <summary>
                <h3>{record.Research.Title}</h3>
                <a href={record.Research.URL}>Link</a>
                <p>{record.Name}, {record.Faculty}</p>
                <p>Coauthors: {record.Coauthors.Faculty.join(", ")}</p>
              </summary>
              <table>
                <thead>
                  <tr>
                    <th>Goal1</th><th>Goal2</th>
                    <th>Target1</th><th>Target2</th>
                    <th>Interaction</th>
                  </tr>
                </thead>
                <tbody>
              {
                record.SDGRecords.map(sdg=><React.Fragment>
                  <tr>
                    <td>{sdg.Goals[0]}</td><td>{sdg.Goals[1]}</td>
                    <td>{sdg.Targets[0]}</td><td>{sdg.Targets[1]}</td>
                    <td>{sdg.Interaction}</td>
                  </tr>
                </React.Fragment>)
              }
                </tbody>
              </table>
            </details>
          </React.Fragment>)
          : null}
        </div>
        <div className="nav-btn">
          <button onClick={this.props.GoHome} className="App-Nav-Btn">Home</button>
        </div>
      </React.Fragment>
    );
  }
};

export default Confirmation;

const RecordTable = (data) => {
  if (data.data != null) {
    let records = Object.values(data.data);
    return(
      <React.Fragment>
        <div className="records">
          <div className="record-heading">Name</div>
          <div className="record-heading">Faculty</div>
          <div className="record-heading">Research Title</div>
          <div className="record-heading">Target1</div>
          <div className="record-heading">Target2</div>
          <div className="record-heading">Interaction</div>
          {
            records.map((record, idx)=>{
              return(
                <React.Fragment key={idx}>
                  <div className="record">{record.Name ? record.Name : ""}</div>
                  <div className="record">{record.Faculty ? record.Faculty : ""}</div>
                  <div className="record">
                    {record.Research.Title ? record.Research.Title : ""}
                  </div>
                  {record.SDGRecords.Targets ? record.SDGRecords.Targets.map((target, idx)=>{
                    return(
                      <div className="record" key={idx}>{target ? target : ""}</div>
                    )
                  }):
                   <React.Fragment>
                     <div className="record"></div>
                     <div className="record"></div>
                   </React.Fragment>}
                  <div className="record">{record.SDGRecords.Interaction ? record.SDGRecords.Interaction : ""}</div>
                </React.Fragment>
              )
            })
          }
        </div>
      </React.Fragment>
    )
  } else {
    return(<h2>No records found.</h2>)
  }
}
