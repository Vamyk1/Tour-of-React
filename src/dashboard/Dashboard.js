import React from 'react';
import {Link} from 'react-router-dom';
import './dashboard.css';
import HeroSearch from '../hero-search/HeroSearch';

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {heroes: []};
  }

  componentWillMount() {
    this.getHeroes();
  }

  getHeroes() {
    this.props.heroService.getHeroes().then(response => this.setState({heroes: response}));
  }

  render() {
    const heroes = [];
    for (let hero of this.state.heroes.slice(1, 5)) {
      heroes.push(
        <Link className="col-1-4" to={`/detail/${hero.id}`} key={hero.id}>
          <div className="module hero">
            <h4>{hero.name}</h4>
          </div>
        </Link>
      );
    }

    return (
      <React.Fragment>
        <h3 className="dashboard-title">Top Heroes</h3>
        <div className="grid grid-pad">{heroes}</div>
        <HeroSearch heroService={this.props.heroService} />
      </React.Fragment>
    );
  }
}
