import * as React from 'react';
import { hot } from 'react-hot-loader/root';
import { Router, Route, Switch } from 'react-router';
import { Root } from 'app/containers/Root';
import { HomePage } from './containers/HomePage';

export const App = hot(({ history }) => (
  <Root>
    <Router history={history}>
      <Switch>
        <Route path="/" component={HomePage} />
      </Switch>
    </Router>
  </Root>
));
