import React, { Component } from 'react';
import {Helmet} from "react-helmet";
import * as Routes from "./Routes";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Event from './event';



class App extends Component {
  constructor() {
    super();
    this.state = {
      isAuth: sessionStorage.getItem('userData') ? true : false,
      loading:false
    }
    
  }
  componentDidMount(){
    Event.on('load', (value) => {
      this.setState({
        ...this.state,
        loading: value
      })
    });
  }
  
  render() {
    let access;
    console.log('app',this.state.isAuth)
    if (this.state.isAuth === true) {
      access = (
        <Switch>
          <Route exact path="/" component={Routes.Home}/>
          <Route exact path="/referral/:code" component={Routes.Home}/>
          <Route path="/delivery" component={Routes.Delivery}/>
          <Route path="/schedule" component={Routes.ScheduleDelivery}/>
          <Route path="/tracking" component={Routes.Tracking}/>
          <Route path="/dashboard" component={Routes.Dashboard}/>
          <Route path="/contactus" component={Routes.Contact}/>
          <Route path="/support/:id" component={Routes.Support}/>
          <Route path="/support-list" component={Routes.SupportList}/>
          <Route path="/terms-condition" component={Routes.TermsCondition}/>
          <Route path="/privacy" component={Routes.Privacy}/>
          <Route path="/signup" component={Routes.SignUp}/>
          <Route path="/login" component={Routes.Login}/>
          <Route path="/auth" component={Routes.Auth}/>
          <Route path="/forgot-password" component={Routes.ForgotPass}/>
          <Route path="/reset-password/:token" component={Routes.ResetPass}/>
        </Switch>
      )
    }else {
      access = (
        <Switch>
          <Route exact path="/" component={Routes.Home}/>
          <Route exact path="/referral/:code" component={Routes.Home}/>
          <Route path="/signup" component={Routes.SignUp}/>
          <Route path="/login" component={Routes.Login}/>
          <Route path="/auth" component={Routes.Auth}/>
          <Route path="/contactus" component={Routes.Contact}/>
          {/* <Route path="/support" component={Routes.Support}/> */}
          {/* <Route path="/support-list" component={Routes.SupportList}/> */}
          <Route path="/terms-condition" component={Routes.TermsCondition}/>
          <Route path="/privacy" component={Routes.Privacy}/>
          <Route path="/delivery" component={Routes.Delivery}/>
          <Route path="/schedule" component={Routes.ScheduleDelivery}/>
          <Route path="/tracking" component={Routes.Tracking}/>
          <Route path="/forgot-password" component={Routes.ForgotPass}/>
          <Route path="/reset-password/:token" component={Routes.ResetPass}/>
        </Switch>
      )
    }
    return (
      <div>
        {/* {true ? <div>Loading...</div> : '' } */}
        <Helmet>
          <title>Osiso</title>
          <meta name="description" content="this is osiso" />
        </Helmet>
        <Router>
          {access}
        </Router>
        {
          this.state.loading ? <div class="loading">Loading&#8230;</div> : ''
        }
      </div>
    );
  }
}

export default App;
