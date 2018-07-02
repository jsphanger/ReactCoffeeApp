import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Prismic from 'prismic-javascript';
import Header from './components/Header.js';
import HomePage from './pages/HomePage.js';
import Article from './pages/Article.js';

import './assets/css/main.css';
import './App.css';

const NoMatch = ({ location }) => (
  <div>
    <h3>
      No matching page found!
    </h3>
  </div>
);

class App extends Component {

  render() {
    return (
        <div>
          <Header />
          
          <Router>
            <div>
              <Switch>
                <Route exact path="/" component={HomePage}/>
                <Route exact path="/article/:id" component={Article}/>
                <Route component={NoMatch} />
              </Switch>
            </div>
          </Router>
        </div>

    );
  }
}

export default App;
