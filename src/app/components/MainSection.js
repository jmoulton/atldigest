import React, {Component} from 'react';
import MartaContainer from './Marta';

class MainSection extends Component {

  renderMarta() {
    return (
      <MartaContainer/>
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
