import React,{Component} from 'react';
import {Wrapper} from './delivery.style';
import {NavLink, Switch, Route,Link} from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import Info from './component/info';
import Confirm from './component/confirm';
import Payment from './component/payment';
import Colors from '../../colors';
import Navbar from '../../appComponents/navbar';
import Footer from '../../appComponents/footer';

class Delivery extends Component {
    constructor() {
        super();
        this.state = {
            steps: 1,
            value: {
                from:'',
                to:'',
                weight: ''
            }
        }
    }
    onStep=(num)=>{
        this.setState({
            steps: num
        })
    }
    render() {
        const {steps} = this.state;
        const isAuth = sessionStorage.getItem('userData') ? true : false;
        const isBusinessUser = sessionStorage.getItem('userData') ? JSON.parse(sessionStorage.getItem('userData')).user_type === 2 ? true : false : false;
        return (
            <div className="xs-12 animated fadeIn">
                <Navbar
                    isauth={isAuth}
                    bgcolor={Colors.primary}
                    color={Colors.colorWhite}
                    frmPage={true}
                    isBusinessUser={isBusinessUser}
                />

                <Wrapper>
                <Breadcrumb>
                    <BreadcrumbItem><a><Link to="/">Home</Link></a></BreadcrumbItem>
                    <BreadcrumbItem active>Immediate Delivery</BreadcrumbItem>
                </Breadcrumb>
                    <div className="xs-12 top show">
                        <div className="xs-4 nav_box f">
                            <NavLink exact to={this.props.match.url} activeClassName="active"><p className="navs">ORDER INFORMATION</p></NavLink>
                        </div>
                        <div className="xs-4 nav_box">
                            {steps > 1 ? 
                            <NavLink to={`${this.props.match.url}/review`} activeClassName="active"><p className="navs">REVIEW AND CONFIRM</p></NavLink> : 
                            <p className="navs">REVIEW AND CONFIRM</p>
                            }
                        </div>
                        <div className="xs-4 nav_box l">
                            {steps > 2 ? 
                            <NavLink to={`${this.props.match.url}/payment`} activeClassName="active"><p className="navs">PAYMENT</p></NavLink> : 
                            <p className="navs">PAYMENT</p>
                            }
                        </div>
                    </div>
                    <div className="xs-12 top hidden">
                        <div className="xs-4 nav_box f">
                            <NavLink exact to={this.props.match.url} activeClassName="active"><p className="navs" >1</p></NavLink>
                        </div>
                        <div className="xs-4 nav_box">
                            <NavLink to={`${this.props.match.url}/review`} activeClassName="active"><p className="navs">2</p></NavLink>
                        </div>
                        <div className="xs-4 nav_box l">
                            <NavLink to={`${this.props.match.url}/payment`} activeClassName="active"><p className="navs">3</p></NavLink>
                        </div>
                    </div>
                    <Switch>
                        {this.props.location.state !== undefined ? <Route exact path={this.props.match.path} render={()=><Info immediate={this.props.location.state} step={this.onStep}/>}/> : <Route exact path={this.props.match.path} render={()=><Info immediate={this.state.value} step={this.onStep}/>}/>}
                        <Route exact path={`${this.props.match.path}/review`} render={()=><Confirm step={this.onStep}/>}/>
                        <Route exact path={`${this.props.match.path}/payment`} component={Payment}/>
                    </Switch>
                </Wrapper>
                <Footer/>
            </div>
        )
    }
}

export default Delivery