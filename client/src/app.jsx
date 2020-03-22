import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import c3 from "c3";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      statesData: null,
      dailyData_US: null
    };
  }

  componentDidMount() {
    axios
      .get("https://covidtracking.com/api/states")
      .then(result => {
        result.data = result.data.sort(
          (a, b) => parseFloat(b.positive) - parseFloat(a.positive)
        );
        this.setState({ statesData: result.data }, () => {
          console.log(this.state);
        });
      })
      .catch(err => {
        if (err) {
          throw err;
        }
      });

    axios
      .get("https://covidtracking.com/api/us/daily")
      .then(result => {
        result.data = result.data.sort(
          (a, b) => parseFloat(a.date) - parseFloat(b.date)
        );
        this.setState({ dailyData_US: result.data }, () => {
          console.log(this.state.dailyData_US);
        });
      })
      .catch(err => {
        if (err) {
          throw err;
        }
      });
  }

  renderStateChart() {
    if (this.state.statesData !== null) {
      const statesData = ["States"];
      const positivesData = ["positives"];
      const deathsData = ["deaths"];

      this.state.statesData.forEach(item => {
        statesData.push(item.state);

        if (item.positive) {
          positivesData.push(item.positive);
        } else {
          positivesData.push(0);
        }

        if (item.death) {
          deathsData.push(item.death);
        } else {
          deathsData.push(0);
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
  }

  renderPercentStatesWithDeaths() {
    if (this.state.statesData !== null) {
      const statesWithDeaths = ["States with deaths"];
      const statesWithNoDeaths = ["States with no deaths"];
      const totalStates = 56;
      let amountAffected = 0;

      this.state.statesData.forEach(item => {
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
  }

  renderDailyUSChart() {
    if (this.state.dailyData_US !== null) {
      const dates = ["dates"];
      const amountOfStatesAffected = ["states"];
      const testedPositive = ["positive"];

      this.state.dailyData_US.forEach(item => {
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

      let chart = c3.generate({
        bindto: "#daily-us",
        data: {
          x: "dates",
          columns: [dates, testedPositive]
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
  }

  render() {
    return (
      <div>
        <h3>Number of cases that tested positive per state</h3>
        <div id="positives"></div>
        <h3>Number of cases that led to death per state</h3>
        <div id="deaths"></div>
        {this.renderStateChart()}
        <h3>
          States that have had at least one death vs States that have not had a
          case lead to death
        </h3>
        <div id="states-affected"></div>
        {this.renderPercentStatesWithDeaths()}

        <div id="daily-us"></div>
        {this.renderDailyUSChart()}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
