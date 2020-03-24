import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import c3 from "c3";
import Positive_US from "./components/Positive_US.jsx";
import Deaths_US from "./components/Deaths_US.jsx";
import StatesAffected from "./components/StatesAffected.jsx";
import DailyPositives_US from "./components/DailyPositives_US.jsx";

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

  chartRenderer() {
    if (this.state.statesData !== null && this.state.dailyData_US) {
      return (
        <div>
          <Positive_US data={this.state.statesData} />
          <Deaths_US data={this.state.statesData} />
          <StatesAffected data={this.state.statesData} />
          <DailyPositives_US data={this.state.dailyData_US} />
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        <div id="nav-bar">
          <ul>
            <li>test</li>
            <li>test</li>
            <li>test</li>
          </ul>
        </div>
        <div id="statistics-container">
          <h3>Number of cases that tested positive per state</h3>
          <div className="chart-display" id="positives"></div>

          <h3>Number of cases that led to death per state</h3>
          <div className="chart-display" id="deaths"></div>
          <h3>
            States that have had at least one death vs States that have not had
            a case lead to death
          </h3>
          <div className="chart-display" id="states-affected"></div>

          <h3>Daily cases in America</h3>
          <div className="chart-display" id="daily-us"></div>
          {this.chartRenderer()}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
