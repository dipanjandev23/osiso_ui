import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import {Row, Col,FormGroup,Button} from 'reactstrap';
import CreditCard from '../../../../assets/creditcard.svg';
import BankTransfer from '../../../../assets/banktransfer.svg';
import Wallet from '../../../../assets/wallet.svg';
import MotorBike from '../../../../assets/motorbike.svg';
import Axios from 'axios';
import swal from 'sweetalert';
import { withRouter } from 'react-router-dom';
import PaystackButton from 'react-paystack';
import {deliveries,signupUrl,loginUrl} from '../../../../helpers/apiEndpoints';
import Event from '../../../../event';
 
const QuickLogIn=(props)=> {
    const { parcs,onSubmit,onSkip } = props;
    const data =  {
        fullname: parcs.sender_name,
        phone: parcs.sender_phone,
        email: parcs.sender_email,
        password: '',
        address : 'Test Address', // This needs to be fixed
        usertype_id: parcs.user_type_id
    }
    const onChange=(e)=>{
        data.password = e.target.value;
    }

    return (
        <div className="xs-12 animated fadeIn">
            <Row>
                <Col>
                    <h2>Create an OSISO account, just add a password</h2>
                </Col>
            </Row>
            <div className="xs-12 box">
            {/* <div className="xs-12 box space"></div> */}
                Payment Options
                <hr/>
                <div className="xs-12 sm-12 md-6 lg-6 center-div">
                <div className="inner">
                    <p style={{textAlign: 'center'}}>Add a password and Proceed to payment</p>
                    <Col xs={12} sm={12} md={12} lg={12}>
                        <FormGroup>
                            <input type="password" placeholder="Password" style={{textAlign: 'center'}} onChange={onChange}/>
                        </FormGroup>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12}>
                        <FormGroup>
                            <Button onClick={()=>onSubmit(data)} className="bgBlue butFullWidth noBottomSpace">Create and proceed to payment</Button>
                        </FormGroup>
                    </Col>
                    
                    {/* <Col xs={12} sm={12} md={12} lg={12}>
                        <FormGroup>
                            <Button onClick={onSkip} className="bgOrange butFullWidth">Skip and proceed to payment</Button>
                        </FormGroup>
                    </Col> */}
                </div>
                </div>
            </div>
        </div>
    )
}

const DoLogIn=(props)=> {
    const { parcs,onSubmit,onSkip } = props;
    const data =  {
        email: parcs.sender_email,
        password: ''
        
    }
    const onChange=(e)=>{
        data.password = e.target.value;
    }

    return (
        <div className="xs-12 animated fadeIn">
            <Row>
                <Col>
                    <h2>Login to OSISO account, just enter your password</h2>
                </Col>
            </Row>
            <div className="xs-12 box">
            {/* <div className="xs-12 box space"></div> */}
                
                <div className="xs-12 sm-12 md-6 lg-6 center-div">
                <div className="inner">
                    <p style={{textAlign: 'center'}}>Enter password and Proceed to payment</p>
                    <Col xs={12} sm={12} md={12} lg={12}>
                        <FormGroup>
                            <input type="password" placeholder="Password" style={{textAlign: 'center'}} onChange={onChange}/>
                        </FormGroup>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12}>
                        <FormGroup>
                            <Button onClick={()=>onSubmit(data)} className="bgBlue butFullWidth noBottomSpace">Login and proceed to payment</Button>
                        </FormGroup>
                    </Col>
                    <Col>
                        <Link to="/forgot-password">Forgot Password ?</Link>
                    </Col>
                    {/* <Col xs={12} sm={12} md={12} lg={12}>
                        <FormGroup>
                            <Button onClick={onSkip} className="bgOrange butFullWidth">Skip and proceed to payment</Button>
                        </FormGroup>
                    </Col> */}
                </div>
                </div>
            </div>
        </div>
    )
}


const PaymentComp=(props)=> {
    const {data,getReference,close,callback,retriveDelivery} = props;
    const key = "pk_test_06f03e82b5e47a8fb8ee3a6f3df253f858a11822";
    const discountedAmt = sessionStorage.getItem('parcel') ? Number(JSON.parse(sessionStorage.getItem('parcel')).discountedAmt) : 0;
    let totCost = 0;
    if(discountedAmt > 0){
        totCost = discountedAmt;
    }else{
        totCost = Array.isArray(data.parcels) && data.parcels.length > 0 ? data.parcels.reduce((accumulator, currentValue) => accumulator + currentValue.estimated_cost, 0):0;
    }
    totCost = totCost * 100;
    console.log('data',totCost)
    return (
        <div className="xs-12 animated fadeIn">
            <Row>
                <Col>
                    <h2>Select your preferred payment method</h2>
                </Col>
            </Row>
            <div className="xs-12 box space">
                Payment Options
                <hr/>
                <Row className="inner">
                    <Col xs={12} sm={12} md={4} lg={4}>
                        <div className="minibox">
                            <img src={CreditCard} alt="creditcard"/>
                            <h5>              
                                <PaystackButton
                                    text="Pay with Card/Banktransfer"
                                    class="payButton"
                                    callback={callback}
                                    close={close}
                                    disabled={false} 
                                    embed={false} 
                                    reference={getReference()}
                                    email={data.sender_email}
                                    amount={totCost}
                                    paystackkey={key}
                                />
                            </h5>
                        </div>
                    </Col>
                    <Col xs={12} sm={12} md={4} lg={4}>
                        <div className="minibox" onClick={()=>retriveDelivery(3)}>
                            <img src={Wallet} alt="Wallet"/>
                            <h5>Wallet</h5>
                        </div>
                    </Col>
                    <Col xs={12} sm={12} md={4} lg={4}>
                        <div className="minibox" onClick={()=>retriveDelivery(1)}>
                            <img src={MotorBike} alt="POS"/>
                            <h5>Pay on Pickup (POS)</h5>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

class Payment extends Component {
    constructor() {
        super();
        const parcel = JSON.parse(sessionStorage.getItem("parcel"));
        this.state = {
            isAuth: sessionStorage.getItem('userData')?true:false,
            step: 1,
            data: parcel
        }
    }
    callback = (response) => {
        console.log(response); // card charged successfully, get reference here
        if(response.status === "success")
        {
            this.onSubmit(response);
        }else{
            swal ( "error" ,  "Something went wrong" ,  "error" ); 
        }
    }

    close = () => {
        console.log("Payment closed");
    }

    getReference = () => {
        //you can put any unique reference implementation code here
        let text = "";
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-.=";

        for( let i=0; i < 15; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }

    onCreatePassword=(value)=>{
        if(!value.password)
        {
            swal('Warning','Password is blank','warning')
            return false;
        }
        Event.emit('load', true);
        Axios({
            url: signupUrl,
            method: `POST`,
            header: {
                "ContentType":"application/json"
            },
            data: value
        })
        .then (({data})=>{
            Event.emit('load', false);
            if(data.status === 'success')
            {
            swal ( "Success" ,  "Welcome to Osiso" ,  "success" );
            const userObj = {"user_id":data.data.id,"user_type":data.data.usertype_id,"name":data.data.fullname,"email":data.data.email,"phone":data.data.phone_number,"ref_code":data.data.referred_code,"is_active":data.data.is_activated};
            sessionStorage.setItem('userData',JSON.stringify(userObj));

            this.setState({
                isAuth: true,
                step: 2
            })
            }
            else{
                swal ( "Warning" , data.message ,  "warning" ); //  (This has to be removed later)
                this.setState({
                    isAuth: false,
                    step: 3
                })
            }

        })
        .catch(data=>{
            console.log('eror',data)
            Event.emit('load', false);
            swal ( "error" ,  "Something went wrong" ,  "error" ); 
        })
    }

    onDoLogin=(value)=>{
    
         if(!value.password)
         {
             swal('Warning','Password is blank','warning')
             return false;
         }
         Event.emit('load', true);
         Axios({
             url: loginUrl,
             method: `POST`,
             header: {
                 "ContentType":"application/json"
             },
             data: value
         })
         .then (({data})=>{
            Event.emit('load', false);
             if(data.status === 'success')
            {

                if(data.data.user_type.id === 3 || data.data.user_type.id === 4)
                {
                    swal('Warning','Not Accessible','warning')
                    return false;
                }

                const userObj = {"user_id":data.data.user_id,"user_type":data.data.user_type.id,"name":data.data.name,"email":data.data.email,"phone":data.data.phone_number,"ref_code":data.data.ref_code,"is_active":data.data.is_activated};
                swal ( "Success" ,  "Welcome to Osiso" ,  "success" );
                sessionStorage.setItem('userData',JSON.stringify(userObj));
                this.setState({
                    isAuth: true,
                    step: 2
                })
            }
            else{
                swal ( "Warning" ,  data.message ,  "warning" );
            }
         })
         .catch(data=>{
             console.log('eror',data)
             Event.emit('load', false);
             swal ( "error" ,  "Something went wrong" ,  "error" ); 
         })
     }


    onSkip=()=>{
        this.setState({
            isAuth: true,
            step: 2
        })
    }
    onSubmit=({ transaction, reference })=>{
        const { data } = this.state;
        data.payment_type_id = 2;
        data.user_id = sessionStorage.getItem('userData') ? JSON.parse(sessionStorage.getItem('userData')).user_id:'';

        if(data.discountedAmt > 0){
            data.cost = data.discountedAmt;
        }else{
            data.cost = Array.isArray(data.parcels) && data.parcels.length > 0 ? data.parcels.reduce((accumulator, currentValue) => accumulator + currentValue.estimated_cost, 0):0;            
        }
        data.parcels.forEach(element => {
            delete element.estimated_cost
        });
        data.txn = transaction;
        data.reference = reference;
        data.pickup_point = data.pickup_point && data.pp_street ? data.pickup_point +','+ data.pp_street : '';
        delete data.pp_street;
        console.log('data',data);
        Event.emit('load', true);
        Axios({
            url: deliveries,
            method: `POST`,
            header: {
                "ContentType":"application/json"
            },
            data: data
        })
        .then (({data})=>{
            Event.emit('load', false);
            if(data.status == 'success')
            {
                swal ( "Success" ,  "Delivery Sent Successfully" ,  "success" );
                sessionStorage.removeItem("parcel");
                sessionStorage.removeItem("locArr");
                sessionStorage.removeItem("parcelList");
                sessionStorage.removeItem("schedule_datetime");
                this.props.history.push('/');
                window.location.reload();
            }
            else{
                swal('Warning',data.message,'warning');
            }
            
        })
        .catch(data=>{
            Event.emit('load', false);
            swal ( "error" ,  "Something went wrong" ,  "error" );
        })
    }
    retriveDelivery =(payment_id)=>{
        const fulldata  = JSON.parse(sessionStorage.getItem('parcel'));
        fulldata.payment_type_id = payment_id;
        fulldata.user_id = sessionStorage.getItem('userData') ? JSON.parse(sessionStorage.getItem('userData')).user_id:'';
        if(fulldata.discountedAmt > 0){
            fulldata.cost = fulldata.discountedAmt;
        }else{
            fulldata.cost = Array.isArray(fulldata.parcels) && fulldata.parcels.length > 0 ? fulldata.parcels.reduce((accumulator, currentValue) => accumulator + currentValue.estimated_cost, 0):0;
        }
        fulldata.parcels.forEach(element => {
            delete element.estimated_cost
        });
        fulldata.pickup_point = fulldata.pickup_point && fulldata.pp_street ? fulldata.pickup_point +','+ fulldata.pp_street : '';
        delete fulldata.pp_street;
        // console.log('fulldata',fulldata);
        Event.emit('load', true);
        Axios({
            url: deliveries,
            method: `POST`,
            header: {
                "ContentType":"application/json"
            },
            data: fulldata
        })
        .then (({data})=>{
            Event.emit('load', false);
            if (data.status === 'success') {
                swal ( "Success" ,  "Delivery Sent Successfully" ,  "success" );
                sessionStorage.removeItem("parcel");
                sessionStorage.removeItem("locArr");
                sessionStorage.removeItem("parcelList");
                sessionStorage.removeItem("schedule_datetime");
                this.props.history.push('/');
                window.location.reload();
            } else {
                swal('Warning', data.message, 'warning');
            }
        })
        .catch(data=>{
            Event.emit('load', false);
            swal ( "error" ,  "Something went wrong" ,  "error" );
        })

    }
    render() {
        const { isAuth,step,data } = this.state;
        return (
            <div>
                {isAuth === false && step === 1 ? 
                    <QuickLogIn 
                        parcs={data} 
                        onSubmit={this.onCreatePassword} 
                        onSkip={this.onSkip}
                    /> : 
                    step === 3 ?
                    <DoLogIn 
                        parcs={data} 
                        onSubmit={this.onDoLogin} 
                        onSkip={this.onSkip}
                    /> :
                    <PaymentComp 
                        data={data} 
                        onDelivery={this.onSubmit}
                        getReference={this.getReference}
                        close={this.close}
                        callback={this.callback}
                        retriveDelivery={this.retriveDelivery}
                    /> 
                }
            </div>
        )
    }
}

export default withRouter(Payment);