import React, { Component } from "react";
import axios from "axios";
//import {Pie} from 'react-chartjs-2';
import PieChartCustom from "./PieChart";

class FetchData extends Component {
  constructor(props) {
    super(props);
    this.state = { responded: [], pieChartData: [] };
  }
  // added one more field for colors
  colors = ["#E322627", "#C13C37", "#6A2135", "#E38627"];

  submitButtonAction() {
    axios.get("http://localhost:3000/countries.json").then(
      ((Response) => {
        console.log(Response.data);
        this.setState({ responded: Response.data });
      },
      (e) => {
        console.log(e);
      })
    );
  }

  handleRoleChange(event) {
    if (event.target.value !== "ps") {
      // uncomment below line if you want to try the sameple data without db. chnage the port as per your server (uses countries.json inside public folder)
      // axios.get("http://localhost:3000/countries.json").then((Response) => {
       axios.get("http://localhost:3000/" + event.target.value +".json").then((Response) => {
        let data = [];
      /* old code
     Response.data.status.map(status => {
      Object.entries(status).map((s,index)=> {
      removed status from above line and used forEach to avoid warning thrown by map fucntion as it expects an array to be returned
    */
        Response.data.forEach((status) => {
          Object.entries(status).forEach((s, index) => {
            // if condition applied to skip the id field being pushed to the pie chart
            if (s[1].match(/\d+/g)) {
              data.push({
                title: s[0],
                value: Number(s[1]),
                color: this.colors[index],
              });
            }
          });
        });
        //  this.setState({ responded: Response.data.status, pieChartData: data});
        // removed status from this line as well
        this.setState({ responded: Response.data, pieChartData: data });
      });
    } else {
      this.setState({ responded: [] });
    }
  }

  render() {
    const isDataAvailable = this.state.responded.length > 0;
    const status = this.state.responded.map((data) => {
      return (
        <tr key={data.E0}>
          <td>{data.E0}</td>
          <td>{data.E1}</td>
          <td>{data.E2}</td>
        </tr>
      );
    });
    const finalTable = isDataAvailable && (
      <table styles={{ borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>E0</th>
            <th>E1</th>
            <th>E2</th>
          </tr>
        </thead>

        <tbody>{status}</tbody>
      </table>
    );

    return (
      <div>
        <select
          defaultValue="ps"
          onChange={(event) => {
            this.handleRoleChange(event);
          }}
        >
          <option value="ps"> Please select</option>
          <option value="dev"> developer</option>
          <option value="t1">Tech lead</option>
        </select>
        <br></br>
        <br></br>
        <br></br>
        {finalTable}
        <PieChartCustom data={this.state.pieChartData}></PieChartCustom>
      </div>
    );
  }
}

export default FetchData;
