import React,{Component} from 'react';
import {withRouter} from 'react-router-dom';
import {Row, Col,FormGroup,Button,Input} from 'reactstrap';
import CreditCard from '../../../../src/assets/creditcard.svg';
// import BankTransfer from '../../../assets/banktransfer.svg';
// import MotorBike from '../../../../assets/motorbike.svg';
import Axios from 'axios';
import swal from 'sweetalert';
import PaystackButton from 'react-paystack';
import {getOrderHistory,promo} from '../../../helpers/apiEndpoints';
import Event from '../../../event';
// import Loading from '../../../../Routes/loading';
 

const PaymentComp=(props)=> {
    const {getReference,close,callback} = props;
    const key = "pk_test_06f03e82b5e47a8fb8ee3a6f3df253f858a11822";
    const sender_email = props.sender_email;
    let tot_cal_cost = props.cost * 100;


    return (
        <div className="xs-12 animated fadeIn">
            
           
            <div className="xs-12 box-payment space">
                {/* Payment Options */}
                <hr/>
                <Row className="inner">
                    <Col xs={12} sm={12} md={12} lg={12}>
                        <div className="minibox-new">
                            <img src={CreditCard} alt="creditcard" style={{marginBottom:10}}/>
                                        
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
                         
                        </div>
                    </Col>
                    {/* <Col xs={12} sm={12} md={4} lg={4}>
                        <div className="minibox">
                            <img src={BankTransfer} alt="banktransfer"/>
                            <h5>Mobile Transfer</h5>
                        </div>
                    </Col>
                    <Col xs={12} sm={12} md={4} lg={4}>
                        <div className="minibox" onClick={retriveDelivery}>
                            <img src={MotorBike} alt="banktransfer"/>
                            <h5>Pay on Pickup</h5>
                        </div>
                    </Col> */}
                </Row>
            </div>
        </div>
    )
}

class Payment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sender_email:props.senderEmail,
            cost:JSON.parse(sessionStorage.getItem("package_price")),
            user_id:props.user_id,
            promocode:''
        }
        this.hasDiscount=false;
    }

    onChangeInput=(e)=>{
        this.setState({
                ...this.state,
                [e.target.name]: e.target.value
        })    
    }

    promocodeDiscount = () =>{
        // swal ( "Please wait..." );
        // const userId = JSON.parse(sessionStorage.getItem("userData")).user_id;
        Event.emit('load', true); // Calling Loader
        Axios({
            url: promo+'/'+this.state.promocode+'/user/any',
            method: `GET`
        })
        .then (({data})=>{
            Event.emit('load', false);
            if(data.status === 'success')
            {
                this.hasDiscount = data.discount > 0 ? true : false;
                this.state.cost = this.state.cost - (this.state.cost * data.discount) / 100 ;
                this.setState({...this.state});
            } else {
                swal('Warning', data.message, 'warning');
            }
        })
        .catch(data=>{
            Event.emit('load', false);
            swal ( "Oops" ,  "Something went wrong" ,  "error" );
        })
    }

    callback = (response) => {
        console.log(response); // card charged successfully, get reference here
        if(response.status === "success")
        {
            this.onSubmit();
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

        return text;
    }

    onSubmit=()=>{
        const { sender_email,cost,user_id } = this.state;
        // Loading
        swal('Please wait..')
        Axios({
            url: getOrderHistory+user_id+'/change-active-status',
            method: `PATCH`,
            header: {
                "ContentType":"application/json"
            },
            data:{isActivated:true}
        })
        .then (({data})=>{
            swal ( "Success" ,  "Successfully subscribed the business package." ,  "success" );
            sessionStorage.removeItem("package_price");
            this.props.history.push('/');
            window.location.reload();
        })
        .catch(data=>{
            console.log(data);
            swal ( "error" ,  "Something went wrong" ,  "error" );
        })
    }
   
    render() {
        const { sender_email,cost,user_id,promocode } = this.state;
        return (
            <div>
                <Row className="box-resize">
                <Col>
                    <h2>Complete your business package subscription</h2>
                </Col>
               </Row>

                 <Row style={{marginTop:10}}> 
                     <Col xs={12} sm={12} md={8} lg={8}>
                     <Input type="text" style={{marginBottom:10}} name="promocode" value={promocode} placeholder="Enter your promocode here" onChange={this.onChangeInput}></Input>                         
                     </Col>    
                     <Col xs={12} sm={12} md={4} lg={4}>
                     <Button onClick={this.promocodeDiscount} style={{fontSize:14,background:'#2D9CDB'}}>Use Promocode</Button>                     
                     </Col>  
                </Row>
                {
                    this.hasDiscount ?
                    <Row>
                    <Col>
                    <h5>Discounted Amount : {this.state.cost}</h5>
                    </Col>
                    </Row>
                    :''
                }
                <PaymentComp                 
                    onDelivery={this.onSubmit}
                    getReference={this.getReference}
                    close={this.close}
                    callback={this.callback}
                    retriveDelivery={this.retriveDelivery}
                    cost={cost}
                    sender_email={sender_email}
                    user_id={user_id}
                /> 
            </div>
        )
    }
}

export default withRouter(Payment);