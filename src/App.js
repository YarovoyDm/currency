import React from 'react';
import ConfirmExchange from './Components/ConfirmExchange/ConfirmExchange'
import Exchange from './Components/Exchange/Exchange'
import Success from './Components/Success/Success';
import { Switch, Route } from 'react-router-dom';

import './App.css';

class App extends React.Component {

  render() {
    return <div>
      <Switch>
        <Route path='/confirm/success' component={Success} />
        <Route path='/confirm' component={ConfirmExchange} />
        <Route path='/' exact={true} component={Exchange} />
      </Switch>
    </div>
  }
}

export default App;