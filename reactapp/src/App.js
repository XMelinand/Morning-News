import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';
import ScreenHome from './ScreenHome';
import ScreenArticlesBySource from './ScreenArticlesBySource';
import ScreenMyArticles from './ScreenMyArticles';
import ScreenSource from './ScreenSource';



function App() {
  return (
    <Router>
     <Switch>
       <Route exact path="/" component={ScreenHome} />
       <Route exact path="/sources" component={ScreenSource}  />
       <Route exact path="/articles-by-source/ :id" component={ScreenArticlesBySource}  />
       <Route exact path="/my-articles" component={ScreenMyArticles}  />
     </Switch>
   </Router>
  );
}

export default App;
