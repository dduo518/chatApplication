import React from 'react';
import { BrowserRouter as Router, Route, Redirect} from 'react-router-dom'
import { connect } from 'react-redux'
import Page from '../page';
import Login from '../page/login'
const router = ( ) => {
    return (
      <Router> 
          <Route path='/' exact component={Page} />
          <Route path="/login"  component={Login} />
      </Router>
    );
}

export default connect(
  null,
  {  }
)(router);

