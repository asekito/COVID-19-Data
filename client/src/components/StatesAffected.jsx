import React from "React";
import c3 from "c3";

class StatesAffected extends React.Component {
  constructor(props) {
    super(props);
  }

  renderChart() {
    const statesWithDeaths = ["States with deaths"];
    const statesWithNoDeaths = ["States with no deaths"];
    const totalStates = 56;
    let amountAffected = 0;

    this.props.data.forEach(item => {
      if (item.death > 0) {
        amountAffected += 1;
        statesWithDeaths.push(item.state);
      } else {
        statesWithNoDeaths.push(item.state);
      }
    });

    const amountOfStatesPie = c3.generate({
      bindto: "#states-affected",
      color: { pattern: ["#216932", "#55398B"] },
      data: {
        columns: [
          ["States with a death count of 1 or more", amountAffected],
          ["States with no death cases", totalStates - amountAffected]
        ],
        type: "pie",
        onclick: function(d, i) {
          console.log("Data object", d);
        }
      }
    });
  }

  render() {
    return <div>{this.renderChart()}</div>;
  }
}

export default StatesAffected;
