import React from 'react';
import {Link} from 'react-router-dom';
import './heroes.css';

export default class Heroes extends React.Component {
  constructor(props) {
    super(props);

    this.state = {heroes: [], heroName: ''};

    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    this.getHeroes();
  }

  getHeroes() {
    this.props.heroService.getHeroes().then(response => this.setState({heroes: response}));
  }

  add(name) {
    name = name.trim();
    if (!name) return;

    this.props.heroService.addHero({name}).then(() => {
      this.getHeroes();
    });
  }

  delete(hero) {
    this.props.heroService.deleteHero(hero).then(() => this.getHeroes());
  }

  handleChange(event) {
    this.setState({heroName: event.target.value});
  }

  render() {
    const heroes = [];
    for (let hero of this.state.heroes) {
      heroes.push(
        <li key={hero.id}>
          <Link to={`/detail/${hero.id}`}>
            <span className="badge">{hero.id}</span> {hero.name}
          </Link>
          <button className="heroes-btn delete" title="delete hero" onClick={() => this.delete(hero)}>
            {' '}
            x
          </button>
        </li>
      );
    }

    return (
      <React.Fragment>
        <div>
          <h2>My Heroes</h2>
          <label>
            Hero name: <input onChange={this.handleChange} value={this.state.heroName} />
          </label>
          <button className="heroes-btn" onClick={() => this.add(this.state.heroName)}>
            add
          </button>
        </div>
        <ul className="heroes">{heroes}</ul>
      </React.Fragment>
    );
  }
}
