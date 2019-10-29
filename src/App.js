import React from 'react';
import {Provider} from 'react-redux';
import { Route, BrowserRouter as Router } from 'react-router-dom'
import './App.css';
import CreateCharacter from './pages/CreateCharacter';
import Login from './pages/Login';
import Register from './pages/Register';
import SelectCharacter from './pages/SelectCharacter';
import store from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <div>
            <Route exact path="/" component={Login} />
            <Route path="/create" component={CreateCharacter} />
            <Route path="/register" component={Register} />
            <Route path="/select" component={SelectCharacter} />
          </div>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
