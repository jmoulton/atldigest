import React, {Component} from 'react';

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
  render() {
    this.fetchWeatherData();

    return (
      <weatherDetails/>
    );
  }

  fetchWeatherData() {
    fetch('http://api.wunderground.com/api/8199454bb35e779a/conditions/q/GA/Atlanta.json')
      .then(response => {
        return (response.json());
      }).then(json => {
        console.log(json);
        return (json);
      }).catch(ex => {
        console.log('parsing failed', ex);
        return (ex);
      });
  }
}

export default WeatherContainer;
