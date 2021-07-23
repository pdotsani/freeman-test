import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import './App.css';
import Movie from "./movie/Movie";

import Popular from './popular/Popular';
import SearchBody from './search/SearchBody';
import SearchInput from './search/SearchInput';

function App() {
  
  return (
    <Router>
      <div>
        <div>Movie App!</div>
        <SearchInput />
      </div>
      <Switch>
        <Route path="/search">
          <SearchBody />
        </Route>
        <Route path="/movie/:movieId">
          <Movie />
        </Route>
        <Route path="/">
          <Popular />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
