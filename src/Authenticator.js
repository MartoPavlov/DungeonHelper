import React, {Component} from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom'
import {connect} from 'react-redux';
import CreateCharacter from './pages/CreateCharacter';
import Login from './pages/Login';
import Register from './pages/Register';
import SelectCharacter from './pages/SelectCharacter';
import Character from './pages/Character';
import {setUser} from './redux/index';
import Firebase from './firebase/Firebase';
import If from './components/If';
import LoadingScreen from './LoadingScreen';

class Authenticator extends Component {
  constructor() {
    super();
    this.state = {
      done: false,
    };
  }

  componentDidMount() {
    Firebase.auth().onAuthStateChanged((user) => {
      this.props.setUser(user);
      this.setState({done: true});
    });
  }

  renderLoadingScreen() {
    return <LoadingScreen />;
  }

  render() {
    return (
      <Router>
        <If condition={this.state.done} els={this.renderLoadingScreen()}>
          <Route exact path="/" component={Login} />
          <Route path="/create" component={CreateCharacter} />
          <Route path="/register" component={Register} />
          <Route path="/select" component={SelectCharacter} />
          <Route path="/character" render={(props) => {
            return <Character {...props} />;
          }} />
        </If>
      </Router>
    );
  }
}

const mapDispatchToState = (dispatch) => {
  return {
    setUser: (user) => dispatch(setUser(user))
  };
}

export default connect(null, mapDispatchToState)(Authenticator)
