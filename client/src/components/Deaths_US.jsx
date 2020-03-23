import React from "React";
import c3 from "c3";

class Deaths_US extends React.Component {
  constructor(props) {
    super(props);
  }

  renderDeathsChart() {
    const statesData = ["States"];
    const deathsData = ["deaths"];

    this.props.data.forEach(item => {
      statesData.push(item.state);

      if (item.death) {
        deathsData.push(item.death);
      } else {
        deathsData.push(0);
      }
    });

    const deaths = c3.generate({
      bindto: "#deaths",
      color: {
        pattern: ["#E12200"]
      },
      data: {
        x: "States",
        columns: [statesData, deathsData],
        type: "bar"
      },
      axis: {
        x: {
          type: "category"
        },
        y: {
          max: 1000
        }
      },
      bar: {
        width: 15
      },
      size: {
        width: 2000,
        height: 400
      }
    });
  }

  render() {
    return <div>{this.renderDeathsChart()}</div>;
  }
}

export default Deaths_US;
