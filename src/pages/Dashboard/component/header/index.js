import React,{Component} from 'react';
import {Row, Col} from 'reactstrap';
import Home from '../../../../assets/home.svg';
import ScaleUp from '../../../../assets/scaleup.svg';
import Time from '../../../../assets/time.svg';
import Wallet from '../../../../assets/wallet.svg';
import Profile from '../../../../assets/refferp.svg';
import Reffer from '../../../../assets/reffer.svg';
import {Link,withRouter} from 'react-router-dom';
import swal from 'sweetalert';
import Axios from 'axios';
import {getOrderHistory} from '../../../../helpers/apiEndpoints';

class Header extends Component {

    constructor(props){
        super(props);
        this.state = {
            isLimitOver:false
        };
    }
    onChange=(e)=> {
        switch (e.target.value) {
            case "home":
            this.props.history.push(this.props.match.url);
            break;
            case "report": 
            this.props.history.push(`${this.props.match.url}/report`);
            break;
            case "schedule": 
            this.props.history.push(`${this.props.match.url}/schedule`);
            break;
            case "immediate": 
            this.props.history.push(`${this.props.match.url}/immediate`);
            break;
            case "wallet": 
            this.props.history.push(`${this.props.match.url}/wallet`);
            break;
            case "referrals": 
            this.props.history.push(`${this.props.match.url}/referrals`);
            break;
            case "profile": 
            this.props.history.push(`${this.props.match.url}/profile`);
            break;
            default: 
            break;
        }
    }

    checkLimit=()=>{
        // Loading // Calling Loader
         let userData = sessionStorage.getItem('userData') && JSON.parse(sessionStorage.getItem('userData'));
         const userId = userData && userData.user_id || 0;
         Axios({
             url:  getOrderHistory+userId+'/check-delivery-limit',
             method: `GET`
         })
         .then (({data})=>{
             //swal ( "Success" ,  "Welcome to Osiso" ,  "success" );
             if(data.status === "success")
             {
                this.setState({
                    isLimitOver:data.limitOver
                  })
             } 
         })
         .catch(data=>{
             swal ( "Oops" ,  "Something went wrong" ,  "error" );
         })
       }

       sendAlert=()=>{
        swal("Warning",'Number of order limit is over.','warning');
       }

       componentDidMount()
       {    
         //this.checkLimit();  
       }


    render() {
        let hidden = "";
        let show = "hidden";
        if (window.innerWidth < 980) {
            hidden = "hidden";
            show = "show";
        }else {
            hidden = "";
            show = "hidden";
        }
        const isBusinessUser = sessionStorage.getItem('userData') ? JSON.parse(sessionStorage.getItem('userData')).user_type === 2 ? true : false : false;
        const {isLimitOver} = this.state;
         
        return (
            <div className="xs-12 header">
                <Row className="logo">
                    <Col className="text">DASHBOARD</Col>
                    <Col className="btn right"><Link to="/">BACK</Link></Col>
                </Row>
                {
                    isBusinessUser ? <Row className={`nav ${hidden}`}>
                    <Col xs={1}><Link to={this.props.match.url}><img src={Home} alt="home"/> <span>Home</span></Link></Col>
                    <Col xs={2}><Link to={`${this.props.match.url}/report`}><img src={ScaleUp} alt="report"/> <span>Report</span></Link></Col>
                    <Col xs={2}><Link to={`${this.props.match.url}/schedule`}><img src={Time} alt="schedule"/> <span>Scheduled Delivery</span></Link></Col>
                    <Col xs={2}><Link to={`${this.props.match.url}/immediate`}><img src={Time} alt="immediate"/> <span>Immediate Delivery</span></Link></Col>
                    <Col xs={1}><Link to={`${this.props.match.url}/wallet`}><img src={Wallet} alt="wallet"/> <span>Wallet</span></Link></Col>
                    <Col xs={2}><Link to={`${this.props.match.url}/referrals`}><img src={Reffer} alt="referrals"/> <span>Referrals</span></Link></Col>
                    <Col xs={2}><Link to={`${this.props.match.url}/profile`}><img src={Profile} alt="profile"/> <span>Profile</span></Link></Col>
                </Row> :
                <Row className={`nav ${hidden}`}>
                <Col xs={2}><Link to={this.props.match.url}><img src={Home} alt="home"/> <span>Home</span></Link></Col>
                <Col xs={2}><Link to={`${this.props.match.url}/report`}><img src={ScaleUp} alt="report"/> <span>Report</span></Link></Col>
                <Col xs={2}><Link to={`${this.props.match.url}/immediate`}><img src={Time} alt="immediate"/> <span>Immediate Delivery</span></Link></Col>
                <Col xs={2}><Link to={`${this.props.match.url}/wallet`}><img src={Wallet} alt="wallet"/> <span>Wallet</span></Link></Col>
                <Col xs={2}><Link to={`${this.props.match.url}/referrals`}><img src={Reffer} alt="referrals"/> <span>Referrals</span></Link></Col>
                <Col xs={2}><Link to={`${this.props.match.url}/profile`}><img src={Profile} alt="profile"/> <span>Profile</span></Link></Col>
                </Row>
                }
               
                <Row className={`nav ${show}`}>
                    <select name="navs" onChange={this.onChange}>
                        <option value="home">Home</option>
                        <option value="report">Report</option>
                        {isBusinessUser?<option value="schedule">Schedule Delivery</option>:''}
                        <option value="immediate">Immediate Delivery</option>
                        <option value="wallet">Wallet</option>
                        <option value="referrals">Referrals</option>
                        <option value="profile">Profile</option>
                    </select>
                </Row>  
            </div>
        )
    }
}

export default withRouter(Header)



// Previous logic 

// case "schedule": 
// !this.state.isLimitOver ? this.props.history.push(`${this.props.match.url}/schedule`) : this.sendAlert();
// break;
// case "immediate": 
// !this.state.isLimitOver ? this.props.history.push(`${this.props.match.url}/immediate`) : this.sendAlert();
// this.checkLimit('/immediate')
// break;


// {
//     !isLimitOver ? 
//     <Col xs={2}><Link to={`${this.props.match.url}/schedule`}><img src={Time} alt="home"/> <span>Scheduled Delivery</span></Link></Col>
//     :
//     <Col xs={2}><Link to="/dashboard" onClick={()=>{this.sendAlert()}}><img src={Time} alt="home"/> <span>Scheduled Delivery</span></Link></Col>
// }
// {
//     !isLimitOver ? 
//     <Col xs={2}><Link to={`${this.props.match.url}/immediate`}><img src={Time} alt="home"/> <span>Immediate Delivery</span></Link></Col>
//     :
//     <Col xs={2}><Link to="/dashboard" onClick={()=>{this.sendAlert()}}><img src={Time} alt="home"/> <span>Immediate Delivery</span></Link></Col>
// }


// {
//     !isLimitOver ? 
//     <Col xs={2}><Link to={`${this.props.match.url}/immediate`}><img src={Time} alt="home"/> <span>Immediate Delivery</span></Link></Col>
//     :
//     <Col xs={2}><Link to="" onClick={()=>{this.sendAlert()}}><img src={Time} alt="home"/> <span>Immediate Delivery</span></Link></Col>
// }