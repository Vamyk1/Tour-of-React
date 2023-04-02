import React from 'react';
import {BrowserRouter, Route, Redirect, Link} from 'react-router-dom';
import Dashboard from './dashboard/Dashboard';
import HeroDetail from './hero-detail/HeroDetail';
import Heroes from './heroes/Heroes';
import './styles.css';
import './app.css';
import HeroService from './hero-service';
import MessageService from './message-service';
import Messages from './messages/Messages';

const messageService = new MessageService();
const heroService = new HeroService(messageService);

const App = () => (
  <div className="tour-of-heroes">
    <h1>Tour of Heroes</h1>
    <BrowserRouter>
      <React.Fragment>
        <nav>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/heroes">Heroes</Link>
        </nav>
        <div>
          <Route exact path="/" render={() => <Redirect to="/dashboard" />} />
          <Route path="/dashboard" render={props => <Dashboard heroService={heroService} {...props} />} />
          <Route path="/detail/:id" render={props => <HeroDetail heroService={heroService} {...props} />} />
          <Route path="/heroes" render={props => <Heroes heroService={heroService} {...props} />} />
        </div>
      </React.Fragment>
    </BrowserRouter>
    <Messages messageService={messageService} />
  </div>
);

export default App;
