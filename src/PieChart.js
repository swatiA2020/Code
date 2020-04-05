import React from "react";
import Piechart from "react-minimal-pie-chart";
import "./App.css";

function PieChartCustom(props) {
  const jsonData = {
    mydata: [
      { title: "E0", value: 10, color: "#E38627" },
      { title: "E1", value: 15, color: "#C13C37" },
      { title: "E2", value: 20, color: "#6A2135" },
    ],
  };

  return (
    <div>
      <header>
        <p></p>
      </header>
      <Piechart
        data={props.data ? props.data : jsonData.mydata}
        label={true}
        labelStyle={{
          fill: "#121212",
          fontFamily: "sans-serif",
          fontSize: "5px",
        }}
        style={{
          height: "500px",
        }}
      />
    </div>
  );
}

export default PieChartCustom;
