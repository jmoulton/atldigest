import React, {Component} from 'react';
import MartaContainer from './Marta';
import WeatherContainer from './Weather';

class MainSection extends Component {

  renderMarta() {
    return (
      <div>
        <MartaContainer/>
        <WeatherContainer/>
      </div>
    );
  }

  render() {
    return (
      <section className="main">
        {this.renderMarta()}
      </section>
    );
  }
}

export default MainSection;
