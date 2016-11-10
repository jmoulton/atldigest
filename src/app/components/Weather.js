import React, {PropTypes, Component} from 'react';

class WeatherContainer extends Component {
  render() {
    return (
      <div className="weather">
        <WeatherFetch/>
      </div>
    );
  }
}

class WeatherFetch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDetails: false,
      weather: {}
    };
  }

  render() {
    if (this.state.showDetails === false) {
      this.fetchWeatherData();
    }

    return (
      <div className="weather-details">
        {this.state.showDetails ?
          <WeatherDetails weatherObj={this.state.weather}/> : null
        }
      </div>
    );
  }

  fetchWeatherData() {
    fetch('http://api.wunderground.com/api/8199454bb35e779a/conditions/q/GA/Atlanta.json')
      .then(response => {
        return (response.json());
      }).then(json => {
        this.setState({weather: json.current_observation, showDetails: true});
      }).catch(ex => {
        console.log('parsing failed', ex);
        return (ex);
      });
  }
}

class WeatherDetails extends Component {

  render() {
    const weather = this.props.weatherObj;
    console.log(weather);
    return (
      <div className="weather">
        <h4>Current Weather</h4>
        <h1>{weather.temp_f}</h1>
      </div>
    );
  }
}

WeatherDetails.propTypes = {
  weatherObj: PropTypes.object.isRequired
};

export default WeatherContainer;
