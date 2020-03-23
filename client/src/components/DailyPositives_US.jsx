import React from "React";
import c3 from "c3";

class DailyPositives_US extends React.Component {
  constructor(props) {
    super(props);
  }

  renderChart() {
    const dates = ["date"];
    const amountOfStatesAffected = ["states"];
    const testedPositive = ["positive test results"];

    this.props.data.forEach(item => {
      dates.push(
        `${item.date
          .toString()
          .substring(0, 4)}-${item.date
          .toString()
          .substring(4, 6)}-${item.date.toString().substring(6)}`
      );
      amountOfStatesAffected.push(item.states);
      testedPositive.push(item.positive);
    });

    c3.generate({
      bindto: "#daily-us",
      color: {
        pattern: ["#FFFFFF", "#FFFFFF"]
      },
      data: {
        x: "date",
        y: "positive test results",
        columns: [dates, testedPositive],
        type: "line"
      },
      axis: {
        x: {
          type: "timeseries",
          tick: {
            format: "%Y-%m-%d"
          }
        },
        y: {
          min: 0
        }
      }
    });
  }

  render() {
    return <div>{this.renderChart()}</div>;
  }
}

export default DailyPositives_US;
