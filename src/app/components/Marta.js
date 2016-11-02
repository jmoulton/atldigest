import React, {PropTypes, Component} from 'react';
import Select from 'react-select';
import {MARTA_STATIONS} from '../constants/MartaStations';

class MartaContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trains: [{}]
    };
  }

  render() {
    return (
      <div className="marta-container">
        <MartaSelect
          trains={this.state.trains}
          />
      </div>
    );
  }
}

class MartaSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showTable: false,
      trains: []
    };
    this.handleMartaSelection = this.handleMartaSelection.bind(this);
  }

  determineDirection(destination) {
    switch (destination) {
      case "North Springs":
        return "North";
      case "Doraville":
        return "North";
      case "Airport":
        return "South";
      case "Hamilton E Holmes":
        return "West";
      case "Bankhead":
        return "West";
      case "Indian Creek":
        return "East";
      default:
        return "N/A";
    }
  }

  parseStation(str) {
    str = str.toLowerCase();
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  handleMartaSelection(station) {
    this.fetchStationData(station.value);
  }

  fetchStationData(station) {
    fetch('http://developer.itsmarta.com/RealtimeTrain/RestServiceNextTrain/GetRealtimeArrivals?' +
          'apikey=a0ab13de-8d95-4e3b-9454-e7de01bcf1bf')
      .then(response => {
        return response.json();
      }).then(json => {
        const trainsArr = [];
        for (const {STATION, LINE, NEXT_ARR, DESTINATION} of json) {
          if (station === STATION) {
            const bound = this.determineDirection(DESTINATION);
            console.log(STATION, LINE, NEXT_ARR, DESTINATION);
            trainsArr.push({
              station: this.parseStation(STATION),
              line: this.parseStation(LINE),
              direction: bound,
              arrival: NEXT_ARR,
              destination: DESTINATION
            });
          }
        }
        this.setState({showTable: true, trains: trainsArr});
      }).catch(ex => {
        console.log('parsing failed', ex);
      });
  }

  render() {
    const Select = require('react-select');

    const options = MARTA_STATIONS;

    return (
      <div className="marta-select-header">
        <h4> Select MARTA Station </h4>
        <Select
          name="marta-select"
          options={options}
          onChange={this.handleMartaSelection}
          />
          {this.state.showTable ?
            <MartaTrainTable trains={this.state.trains}/> : null
          }
      </div>
    );
  }
}

class MartaTrain extends Component {
  render() {
    return (
      <tr>
        <td>{this.props.train.station}</td>
        <td>{this.props.train.line}</td>
        <td>{this.props.train.direction}</td>
        <td>{this.props.train.arrival}</td>
        <td>{this.props.train.destination}</td>
      </tr>
    );
  }
}

class MartaTrainTable extends Component {
  render() {
    const rows = [];
    this.props.trains.forEach(train => {
      rows.push(<MartaTrain train={train}/>);
    });
    return (
      <table className="table-fill">
        <thead>
          <tr>
            <th className="text-left">Station</th>
            <th className="text-left">Line</th>
            <th className="text-left">Direction</th>
            <th className="text-left">Arrival</th>
            <th className="text-left">Destination</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

MartaSelect.propTypes = {
  trains: PropTypes.array.isRequired
};

MartaTrainTable.propTypes = {
  trains: PropTypes.array.isRequired
};

MartaTrain.propTypes = {
  train: PropTypes.object.isRequired
};

export default MartaContainer;
