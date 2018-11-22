import React,{Component} from 'react';
import {Button,Input,InputGroup,InputGroupAddon} from 'reactstrap';
import Fb from '../../../../assets/fb.svg';
import Ig from '../../../../assets/ig.svg';
import Tw from '../../../../assets/tw.svg';
import swal from 'sweetalert';
import Axios from 'axios';
// import Loading from '../../../../Routes/loading';
import {getOrderHistory} from '../../../../helpers/apiEndpoints';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import Event from '../../../../event';

class Referrals extends Component {

    constructor()
    {
        const refCode = sessionStorage.getItem('userData') ? JSON.parse(sessionStorage.getItem('userData')).ref_code : '';
        super();
        this.state={
            data:{
                discountAmt:0,
                signupUser:0,
                activeUser:0
            },
            refCodeUrl:'http://13.232.68.60/referral/'+refCode,
            copied:false
        }
    }

    

    componentDidMount()
    {    
      this.gettingRatingDetails();  
    }

    gettingRatingDetails = () =>{
        // swal ( "Please wait..." );
        const user_id = sessionStorage.getItem('userData') ? JSON.parse(sessionStorage.getItem('userData')).user_id : '';
        // Loading // Calling Loader
        Event.emit('load', true);
        Axios({
            url: getOrderHistory+user_id+'/referred-details',
            method: `GET`
        })
        .then (({data})=>{
            Event.emit('load', false);
            if(data.status === 'success')
            {
               
                this.setState({ 
                    data:{
                        ...data.data
                    }
                })
                
             }
            console.log('ret',this.state)

        })
        .catch(data=>{
            Event.emit('load', false);
            swal ( "Oops" ,  "Something went wrong" ,  "error" );
        })
    }


    render() {

        const {refCodeUrl} = this.state; 
        const {discountAmt,signupUser,activeUser} = this.state.data;
        return (
            <div className="xs-12">
                <div className="xs-12 sm-12 md-6 lg-6 inner">
                    <div className="xs-12">
                        <div className="top">
                            <div className="box">
                                <div className="head">
                                    <p>Invite Users</p>
                                </div>
                                <hr/>
                                <div className="xs-12 content">
                                    <div className="form">
                                        <div className="xs-12"><p>Share your referral links for discounts on every invite</p></div>
                                        <div className="xs-12 sm-12 md-12 lg-12">
                                            <div className="xs-12 sm-12 md-8 lg-8">
                                               <Input value={refCodeUrl} disabled/>
                                            </div>
                                            <div className="xs-12 sm-12 md-4 lg-4">
                                                 <CopyToClipboard text={refCodeUrl}
                                                    onCopy={() => this.setState({copied: true})}>
                                                    <button className="bgOrange">Copy to clipboard</button>
                                                </CopyToClipboard>
                                            </div>
                                                {this.state.copied ? <span style={{color: 'orange'}}>Copied.</span> : null}
                                                {/* <InputGroupAddon addonType="append"><Button className="bgOrange">copy</Button></InputGroupAddon> */}
                                            
                                        </div>
                                        <div className="xs-12">
                                            <div className="xs-4"><img src={Fb} alt="fb"/></div>
                                            <div className="xs-4"><img src={Tw} alt="tw"/></div>
                                            <div className="xs-4"><img src={Ig} alt="ig"/></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xs-12 sm-12 md-6 lg-6 inner">
                    <div className="xs-12">
                        <div className="top">
                            <div className="box">
                                <div className="head">
                                    <p>Your referral stats</p>
                                </div>
                                <hr/>
                                <div className="xs-12 content">
                                    <div className="xs-12 ref">
                                        <div className="xs-4">
                                            <h1>N{discountAmt}</h1>
                                            <p>Discounts earned</p>
                                        </div>
                                        <div className="xs-4">
                                            <h1>{signupUser}</h1>
                                            <p>Total signups</p>
                                        </div>
                                        <div className="xs-4">
                                            <h1>{activeUser}</h1>
                                            <p>Total active referrals</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Referrals;