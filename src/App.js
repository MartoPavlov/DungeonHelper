import React, {Component} from 'react';
import {Provider} from 'react-redux';
import { SnackbarProvider } from 'notistack';
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
          <SnackbarProvider maxSnack={3}>
            <Authenticator />
          </SnackbarProvider>
        </div>
      </Provider>
    );
  }
}

export default App;
