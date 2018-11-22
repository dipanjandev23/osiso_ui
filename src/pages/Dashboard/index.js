import React,{Component} from 'react';
import Header from './component/header';
import {Wrapper} from './dashboard.style';
import {Route,Switch} from 'react-router-dom';
import Home from './component/home';
import Report from './component/report';
import Schedule from './component/schedule';
import Immediate from './component/immediate';
import Wallet from './component/wallet';
import Referrals from './component/referrals';
import Payment from './component/payment';
import Profile from './component/profile';

class Dashboard extends Component {   
    render() {
        return (
            <Wrapper>
                <Header/>
                <div className="xs-12 content">
                    <Switch>
                        <Route exact path={`${this.props.match.path}`} component={Home}/>
                        <Route path={`${this.props.match.path}/report`} component={Report}/>
                        <Route path={`${this.props.match.path}/schedule`} component={Schedule}/>
                        <Route path={`${this.props.match.path}/immediate`} component={Immediate}/>
                        <Route path={`${this.props.match.path}/wallet`} component={Wallet}/>
                        <Route path={`${this.props.match.path}/referrals`} component={Referrals}/>
                        <Route path={`${this.props.match.path}/payments`} component={Payment}/>
                        <Route path={`${this.props.match.path}/profile`} component={Profile}/>
                    </Switch>
                </div>
            </Wrapper>
        )
    }
}
export default Dashboard;