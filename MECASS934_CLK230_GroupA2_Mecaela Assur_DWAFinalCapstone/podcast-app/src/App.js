import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import Home from './components/Home';
import ShowList from './components/ShowList';
import EpisodeList from './components/EpisodeList';
import FavoritesList from './components/FavoritesList';

const App = () => {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/shows">Shows</Link>
        <Link to="/favorites">Favorites</Link>
      </nav>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/shows" component={ShowList} />
        <Route path="/shows/:id" component={ShowList} />
        <Route path="/seasons/:id" component={EpisodeList} />
        <Route path="/favorites" component={FavoritesList} />
      </Switch>
    </div>
  );
};

export default App;