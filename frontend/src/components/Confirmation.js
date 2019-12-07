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
    const data = Firebase.database().ref('/')
      .orderByChild('TimeStamp')
      .limitToLast(10);
    console.log("Data Fetched")
    data.once('value', (snapshot) => {
      this.setState({
        records: snapshot.val()
      })
    });
  }
  render() {
    return (
      <React.Fragment>
        <div className="record-table">
          <h1>Recent Records</h1>
          <RecordTable
              data={this.state.records} />
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
