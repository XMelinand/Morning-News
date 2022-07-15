import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';
import ScreenHome from './ScreenHome';
import ScreenArticlesBySource from './ScreenArticlesBySource';
import ScreenMyArticles from './ScreenMyArticles';
import ScreenSource from './ScreenSource';
import wishList from './reducers/article';
import userToken from './reducers/userToken';
import setLang from './reducers/setLang';

import {Provider} from 'react-redux';
import {createStore, combineReducers}  from 'redux';

const store = createStore(combineReducers({wishList, userToken, setLang}));





function App() {
  return (
    <Provider store={store}>   

    <Router>
     <Switch>
       <Route exact path="/" component={ScreenHome} />
       <Route exact path="/sources" component={ScreenSource}  />
       <Route exact path="/articles-by-source/:id" component={ScreenArticlesBySource}  />
       <Route exact path="/my-articles" component={ScreenMyArticles}  />
     </Switch>
   </Router>

   </Provider>
  );
}

export default App;
