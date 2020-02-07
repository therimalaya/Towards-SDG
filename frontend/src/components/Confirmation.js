import React from 'react';
import { FacultyConfig } from '../config/app-config';

function Confirmation(props) {
  const records = [{ ...props.FormData, SDGRecords: props.Records }];
  return (
    <React.Fragment>
      <p className="center">Your Records have been saved.</p>
      <div className="records">
        {records.length
        ? records.map((record, idx) => <React.Fragment key={idx}>
          <details className="records-details" open>
            <summary className="records-summary">
              <p>
                <span className="record-title">{record.Research.Title}</span>
                <span className="record-research-url"><a href={record.Research.URL}>Link</a></span>
              </p>
              <p className="record-research-author">
                <span className="author-name-label">Main Author</span>
                <span className="author-name">{record.Name}</span>
                <span className="author-faculty">{
                  FacultyConfig.filter(fclty => fclty.value === record.Faculty).flatMap(fclty => fclty.label)
                }</span>
              </p>
            </summary>
            <p className="record-coauthors"><span className="record-coauthors-label">Coauthors</span>{
              FacultyConfig.filter(fclty => record.Coauthors.Faculty.includes(fclty.value)).flatMap(fclty => fclty.label).join("; ")
            }</p>
            <p className="record-coauthors"><span className="record-coauthors-label"> Research Type</span> {record.Research.Type} </p>
            <p className="record-coauthors"><span className="record-coauthors-label"> Research Outreach</span> {record.Research.Outreach} </p>
            <table className="sdg-records">
              <thead>
                <tr>
                  <th>Goal1</th><th>Goal2</th>
                  <th>Target1</th><th>Target2</th>
                  <th>Interaction</th>
                </tr>
              </thead>
              <tbody>
                {
                  record.SDGRecords.map((sdg, idx) => <React.Fragment key={idx}>
                    <tr>
                      <td>{sdg.Goals[0]}</td><td>{sdg.Goals[1]}</td>
                      <td>{sdg.Targets[0]}</td><td>{sdg.Targets[1]}</td>
                      <td>{sdg.Interaction.value}</td>
                    </tr>
                  </React.Fragment>)
                }
              </tbody>
            </table>
          </details>
        </React.Fragment>)
        : null}
      </div>
    </React.Fragment>
  );
}

export default Confirmation;

/* class Confirmation extends React.Component {
 *   render() {
 *     const records = [{ ...this.props.FormData, SDGRecords: this.props.Records }]
 *     return (
 *       <React.Fragment>
 *         <p className="center">Your Records have been saved.</p>
 *         <div className="records">
 *           {records.length
 *             ? records.map((record, idx) => <React.Fragment key={idx}>
 *               <details className="records-details" open>
 *                 <summary className="records-summary">
 *                   <p>
 *                     <span className="record-title">{record.Research.Title}</span>
 *                     <span className="record-research-url"><a href={record.Research.URL}>Link</a></span>
 *                   </p>
 *                   <p className="record-research-author">
 *                     <span className="author-name-label">Main Author</span>
 *                     <span className="author-name">{record.Name}</span>
 *                     <span className="author-faculty">{
 *                       FacultyConfig.filter(fclty => fclty.value === record.Faculty).flatMap(fclty => fclty.label)
 *                     }</span>
 *                   </p>
 *                 </summary>
 *                 <p className="record-coauthors"><span className="record-coauthors-label">Coauthors</span>{
 *                   FacultyConfig.filter(fclty => record.Coauthors.Faculty.includes(fclty.value)).flatMap(fclty => fclty.label).join("; ")
 *                 }</p>
 *                 <p className="record-coauthors"><span className="record-coauthors-label"> Research Type</span> {record.Research.Type} </p>
 *                 <p className="record-coauthors"><span className="record-coauthors-label"> Research Outreach</span> {record.Research.Outreach} </p>
 *                 <table className="sdg-records">
 *                   <thead>
 *                     <tr>
 *                       <th>Goal1</th><th>Goal2</th>
 *                       <th>Target1</th><th>Target2</th>
 *                       <th>Interaction</th>
 *                     </tr>
 *                   </thead>
 *                   <tbody>
 *                     {
 *                       record.SDGRecords.map((sdg, idx) => <React.Fragment key={idx}>
 *                         <tr>
 *                           <td>{sdg.Goals[0]}</td><td>{sdg.Goals[1]}</td>
 *                           <td>{sdg.Targets[0]}</td><td>{sdg.Targets[1]}</td>
 *                           <td>{sdg.Interaction.value}</td>
 *                         </tr>
 *                       </React.Fragment>)
 *                     }
 *                   </tbody>
 *                 </table>
 *               </details>
 *             </React.Fragment>)
 *             : null}
 *         </div>
 *         <div className="nav-btn">
 *           <Button variant="contained" color="primary" onClick={this.props.GoHome}>Home</Button>
 *         </div>
 *       </React.Fragment>
 *     );
 *   }
 * }; */

