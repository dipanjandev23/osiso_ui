import React,{Component} from 'react';
import {withRouter} from 'react-router-dom';
import {Row, Col,FormGroup,Button} from 'reactstrap';
import CreditCard from '../../../../assets/creditcard.svg';
import BankTransfer from '../../../../assets/banktransfer.svg';
import Wallet from '../../../../assets/wallet.svg';
import MotorBike from '../../../../assets/motorbike.svg';
import Axios from 'axios';
import swal from 'sweetalert';
import PaystackButton from 'react-paystack';
import {deliveries,signupUrl} from '../../../../helpers/apiEndpoints';
import Event from '../../../../event';
// import Loading from '../../../../Routes/loading';
 

const PaymentComp=(props)=> {
    const {getReference,close,callback,retriveDelivery,showPayBtn} = props;
    const key = "pk_test_06f03e82b5e47a8fb8ee3a6f3df253f858a11822"; // pk_test_2f1870db0a9e8454c19e47c9ab9179521046f8fa
    const sender_email = sessionStorage.getItem('userData') ? JSON.parse(sessionStorage.getItem('userData')).email:'';
    const parcelList = sessionStorage.getItem('parcelList') ? JSON.parse(sessionStorage.getItem('parcelList')) : [];
    const discountedAmt = sessionStorage.getItem('parcel') ? Number(JSON.parse(sessionStorage.getItem('parcel')).discountedAmt) : 0;
    let tot_cal_cost = 0;
    if(discountedAmt > 0){
        tot_cal_cost = discountedAmt;
    }else{
        tot_cal_cost = Array.isArray(parcelList) && parcelList.length > 0 ? parcelList.reduce((accumulator, currentValue) => accumulator + currentValue.estimated_cost, 0):0;
    }
    tot_cal_cost = tot_cal_cost * 100;
    return (
        <div className="xs-12 animated fadeIn">
            <Row className="box-resize">
                <Col>
                    <h2>Select your preferred payment method</h2>
                </Col>
            </Row>
            <div className="xs-12 box-payment space">
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
                                    email={sender_email}
                                    amount={tot_cal_cost}
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
    constructor(props) {
        super(props);
        const parcel = JSON.parse(sessionStorage.getItem("parcel"));
        this.state = {
            isAuth: false,
            step: 1,
            data: parcel
        }
        this.showPayBtn = false;
    }
    componentDidMount() {
        if (!this.showPayBtn) {
            this.showPayBtn = true;
            this.setState({ ...this.state });
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

    close =()=> {
        console.log("Payment closed");
    }

    getReference =()=> {
        //you can put any unique reference implementation code here
        let text = "";
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-.=";

        for( let i=0; i < 15; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        //console.log(text);
        return text;
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
        delete data.pp_street;
        //console.log(data);
        // Loading
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
            if(data.status == 'success'){

                swal ( "Success" ,  "Delivery Sent Successfully" ,  "success" );
                sessionStorage.removeItem("parcel");
                sessionStorage.removeItem("locArr");
                sessionStorage.removeItem("parcelList");
                sessionStorage.removeItem("schedule_datetime");
                this.props.history.push('/dashboard');
                window.location.reload();
            }
            else{
                swal ( "Warning" ,  data.message ,  "warning" );
            }
            
        })
        .catch(data=>{
            console.log(data);
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
        delete fulldata.pp_street;
        // Loading
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
            if(data.status === 'success')
            {
                swal ( "Success" ,  "Delivery Sent Successfully" ,  "success" );
                sessionStorage.removeItem("parcel");
                sessionStorage.removeItem("locArr");
                sessionStorage.removeItem("parcelList");
                sessionStorage.removeItem("schedule_datetime");
                this.props.history.push('/dashboard');
                window.location.reload();
            }
            else{
                swal ( "Warning" ,  data.message ,  "warning" );
                console.log('Err:'+ data.message)
            }
        })
        .catch(data=>{
            console.log(data);
            Event.emit('load', false);
            swal ( "error" ,  "Something went wrong" ,  "error" );
        })

    }
    render() {
        const { isAuth,step,data } = this.state;
        return (
            <div>
                <PaymentComp 
                    data={data} 
                    onDelivery={this.onSubmit}
                    getReference={this.getReference}
                    close={this.close}
                    callback={this.callback}
                    retriveDelivery={this.retriveDelivery}
                    showPayBtn={this.showPayBtn}
                /> 
                {/* <PaymentComp 
                    data={data} 
                    onDelivery={this.onSubmit}
                    getReference={this.getReference}
                    close={this.close}
                    callback={this.callback}
                    retriveDelivery={this.retriveDelivery}
                />  */}
            </div>
        )
    }
}

export default withRouter(Payment);