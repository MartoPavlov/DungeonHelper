import React, {Component} from 'react';
import {Provider} from 'react-redux';
// import { Route, BrowserRouter as Router } from 'react-router-dom'
// import CreateCharacter from './pages/CreateCharacter';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import SelectCharacter from './pages/SelectCharacter';
// import Character from './pages/Character';
import "./App.css";
import store from './redux/store';
import Authenticator from './Authenticator';

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: '',
    }
  }


  render() {
    return (
      <Provider store={store}>
        <div className="App">
          {/* <Router>
            <div>
              <Route exact path="/" component={Login} />
              <Route path="/create" component={CreateCharacter} />
              <Route path="/register" component={Register} />
              <Route path="/select" component={SelectCharacter} />
              <Route path="/character" render={(props) => {
                return <Character {...props} />;
              }} />
            </div>
          </Router> */}
          <Authenticator />
        </div>
      </Provider>
    );
  }
}

export default App;
