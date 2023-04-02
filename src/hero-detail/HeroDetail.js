import React from 'react';
import './hero-detail.css';

export default class HeroDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {hero: null};

    this.getHero = this.getHero.bind(this);
    this.goBack = this.goBack.bind(this);
    this.save = this.save.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    this.getHero();
  }

  getHero() {
    const {params} = this.props.match;

    this.props.heroService.getHero(params.id).then(response => {
      this.setState({hero: response});
    });
  }

  goBack() {
    this.props.history.goBack();
  }

  save() {
    this.props.heroService.updateHero(this.state.hero).then(() => this.props.history.push('/dashboard'));
  }

  handleChange(event) {
    const hero = Object.assign({}, this.state.hero);
    hero.name = event.target.value;

    this.setState({hero: hero});
  }

  render() {
    let hero = null;
    if (this.state.hero) {
      hero = (
        <div className="hero-detail">
          <h2>{this.state.hero.name} Details</h2>
          <div>
            <span>id: </span>
            {this.state.hero.id}
          </div>
          <div>
            <label>
              name:
              <input placeholder="name" onChange={this.handleChange} />
            </label>
          </div>
        </div>
      );
    }

    return (
      <React.Fragment>
        {hero}
        <button className="goback" onClick={this.goBack}>
          {' '}
          go back
        </button>
        <button className="save" onClick={this.save}>
          {' '}
          save
        </button>
      </React.Fragment>
    );
  }
}
