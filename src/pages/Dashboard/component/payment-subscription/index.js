import React,{Component} from 'react';
import {withRouter} from 'react-router-dom';
import {Row, Col,FormGroup,Button} from 'reactstrap';
import CreditCard from '../../../../../src/assets/creditcard.svg';
// import BankTransfer from '../../../assets/banktransfer.svg';
// import MotorBike from '../../../../assets/motorbike.svg';
import Axios from 'axios';
import swal from 'sweetalert';
import PaystackButton from 'react-paystack';
import {getOrderHistory} from '../../../../helpers/apiEndpoints';
import Event from '../../../../event';
// import Loading from '../../../../Routes/loading';
 

const PaymentComp=(props)=> {
    const {getReference,close,callback} = props;
    const key = "pk_test_06f03e82b5e47a8fb8ee3a6f3df253f858a11822";
    const sender_email = props.sender_email;
    let tot_cal_cost = props.cost * 100;
    return (
        <div className="xs-12 animated fadeIn">
            <Row className="box-resize">
                <Col>
                    {/* <h2>Complete your business package subscription</h2> */}
                </Col>
            </Row>
            <div className="xs-12 box-payment space">
                {/* Payment Options */}
                {/* <hr/> */}
                <Row className="inner">
                    <Col xs={12} sm={12} md={12} lg={12}>
                        <div className="minibox-payment">
                            <img src={CreditCard} alt="creditcard" style={{marginBottom:10}}/>
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
                </Row>
            </div>
        </div>
    )
}

class PaymentSubscription extends Component {
    constructor(props) {
        super(props);
        this.state = {
            businessPackageAmt:props.businessCost,
            user_id:sessionStorage.getItem('userData') && JSON.parse(sessionStorage.getItem('userData')).user_id,
            ifReturn:props.ifReturn
        }
        // console.log('satte',this.state)
    }
    callback = (response) => {
        //console.log(response); // card charged successfully, get reference here
        if(response.status === "success")
        {
            if(this.state.ifReturn)
            {
                this.props.onReturnPaymentDone(); // On Return payment completed 
            }
            else if(sessionStorage.getItem('business_package_id'))
            {
                this.props.onPaymentDone(); // On payment completed
            }else{
                this.onSubmit();
            }
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

           // console.log('upgrade', text)
        return text;
    }

    onSubmit=()=>{
        const { user_id } = this.state;
        // Loading
        Event.emit('load',true);
        Axios({
            url: getOrderHistory+user_id+'/renew-subscription',
            method: `PUT`,
            header: {
                "ContentType":"application/json"
            },
            data:{}
        })
        .then (({data})=>{
            Event.emit('load',false);
            swal ( "Success" ,  "Successfully subscribed the business package." ,  "success" );
            this.props.onSuccess();

        })
        .catch(data=>{
            console.log(data);
            Event.emit('load',false);
            swal ( "error" ,  "Something went wrong" ,  "error" );
        })
    }

    // onSuccess=()=>{
    //     return true;
    // }

    render() {
        const { businessPackageAmt } = this.state;
        const sender_email = sessionStorage.getItem('userData') && JSON.parse(sessionStorage.getItem('userData')).email || '';
        return (
            <div>
                <PaymentComp                 
                    onDelivery={this.onSubmit}
                    getReference={this.getReference}
                    close={this.close}
                    callback={this.callback}
                    retriveDelivery={this.retriveDelivery}
                    cost={businessPackageAmt}
                    sender_email={sender_email}
                /> 
            </div>
        )
    }
}

export default withRouter(PaymentSubscription);