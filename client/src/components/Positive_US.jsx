import React from "React";
import c3 from "c3";

class Positive_US extends React.Component {
  constructor(props) {
    super(props);
  }

  renderPositivesChart() {
    const statesData = ["States"];
    const positivesData = ["positives"];

    this.props.data.forEach(item => {
      statesData.push(item.state);

      if (item.positive) {
        positivesData.push(item.positive);
      } else {
        positivesData.push(0);
      }
    });

    const positive = c3.generate({
      bindto: "#positives",
      color: {
        pattern: ["#D8BF0D"]
      },
      data: {
        x: "States",
        columns: [statesData, positivesData],
        type: "bar"
      },
      axis: {
        x: {
          type: "category"
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
    return <div>{this.renderPositivesChart()}</div>;
  }
}

export default Positive_US;
