import React,{Component} from 'react';
import {Link,withRouter} from 'react-router-dom';
import { Wrapper} from './footer.style';
import Input from '../Input';
import Button from '../button';
import Colors from '../../colors';
import Axios from 'axios';
import swal from 'sweetalert';
import Loading from '../../Routes/loading';
import Event from '../../event';

import {newsletter} from '../../helpers/apiEndpoints';

 class Footer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            newsletterEmail: ''
        }
    }
    onChangeInput = (e) => {
        this.setState({
            newsletterEmail: e.target.value
        });
    }
    submitEmailForNewsletter = () => {
        // Loading // Calling Loader
        Event.emit('load', true);
        Axios({
            url: newsletter,
            method: `POST`,
            data: { email: this.state.newsletterEmail }
        })
        .then (({data})=>{
            Event.emit('load', false);
            //swal ( "Success" ,  "Welcome to Osiso" ,  "success" );
            if(data.status === "success")
            {
                swal('Success', data.message, 'success');
                this.setState({
                    newsletterEmail: ''
                });
            } else {
                swal('Warning', data.message, 'warning');
            }
        })
        .catch(data=>{
            Event.emit('load', false);
            swal ( "Oops" ,  "Something went wrong" ,  "error" );
        })
    }

    goTopackage = () => {
        sessionStorage.setItem('home.toPack', "1");
        this.props.history.push('/');
        setTimeout(() => Event.emit('toPack',true), 0);
    }
    render() {
        return (
            <div className="xs-12">
                <Wrapper> 
                    <div className="xs-12 footer">
                        <div className="xs-12 sm-3 md-3 lg-3 xlg-3 fot">
                            <li>2018, OSISO. ALL rights reserved</li>
                        </div>
                        <div className="xs-12 sm-2 md-2 lg-2 xlg-2 fot">
                            <li className="head">Company</li>
                            {/* <li>About</li> */}
                            <li>
                            <Link to="/contactus" style={{color:Colors.colorWhite,textDecoration:'none'}}>Contact Us</Link></li>
                            {/* <li>Leadership</li> */}
                            <li><Link to="/privacy" style={{color:Colors.colorWhite,textDecoration:'none'}}>Privacy Policy</Link></li>
                            <li><Link to="/terms-condition" style={{color:Colors.colorWhite,textDecoration:'none'}}>Terms and Conditions</Link> </li>
                            {sessionStorage.getItem('userData') ? <li> <Link to="/support-list" style={{color:Colors.colorWhite,textDecoration:'none'}}>Support</Link></li> : ''}
                        </div>
                        <div className="xs-12 sm-2 md-2 lg-2 xlg-2 fot">
                            <li className="head">Quick Links</li>
                            <li><Link to="/login" style={{color:Colors.colorWhite,textDecoration:'none'}}>Login</Link></li>
                            {/* <li>Signup</li> */}
                            {/* <li><a onClick={()=>{this.props.history.push("/delivery")}} style={{color:Colors.colorWhite,textDecoration:'none'}}>Immediate Delivery</a></li> */}
                            <li>
                             <Link to="/delivery" style={{color:Colors.colorWhite,textDecoration:'none'}}>Immediate Delivery</Link>
                            </li>
                            <li>
                            <Link to="/schedule" style={{color:Colors.colorWhite,textDecoration:'none'}}>Scheduled Delivery</Link>
                            </li>
                            <li><a style={{color:Colors.colorWhite,textDecoration:'none',cursor:'pointer'}} onClick={this.goTopackage}>Business Packages</a></li>
                        </div>
                        <div className="xs-12 sm-2 md-2 lg-2 xlg-2 fot">
                            <li className="head">Quick Social Links</li>
                            <li>
                                <span><img src={require('../../assets/fb.svg')} alt="fb"/></span>
                                <span><img src={require('../../assets/tw.svg')} alt="tw"/></span>
                                <span><img src={require('../../assets/ig.svg')} alt="ig"/></span>
                                <span><img src={require('../../assets/whatsapp.svg')} alt="wp"/></span>
                            </li>
                        </div>
                        <div className="xs-12 sm-3 md-3 lg-3 xlg-3 fot">
                            <li className="head">Newsletter</li>
                                <Input
                                    labelname=""
                                    type="text"
                                    placeholder="Enter your email address"
                                    value={this.state.newsletterEmail}
                                    onChange={this.onChangeInput}
                                    name=""
                                    customclass="bgwhite"
                                />
                                <Button title="Submit" progress={false} onAction={this.submitEmailForNewsletter} />
                        </div>
                    </div>
                </Wrapper>
            </div>
        )
    }
}

export default withRouter(Footer)