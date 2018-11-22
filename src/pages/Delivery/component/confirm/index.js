import React,{Component} from 'react';
import {Row, Col, Button,Input} from 'reactstrap';
import Parcel from '../../../../assets/parcel.svg';
import {Link,withRouter} from 'react-router-dom';
import swal from 'sweetalert';
import Axios from 'axios';
import {getOrderHistory,deliveries,promo} from '../../../../helpers/apiEndpoints';
import Event from '../../../../event';

class Confirm extends Component {
    constructor() {
        super();
        const parcel = JSON.parse(sessionStorage.getItem("parcel"));
        this.state = {
            data: parcel,
            totalCost:0,
            openPayment:false,
            promoCode:''
        }
        this.promocode='';
        this.discount=0;
        this.discountedAmt = 0;
    }

    onChangeInput=(e)=>{ 
        this.setState({
            ...this.state,
            [e.target.name] : e.target.value
        })
    }

    promocodeDiscount = () =>{
        // swal ( "Please wait..." );
        const userId = JSON.parse(sessionStorage.getItem("userData")).user_id;
        Event.emit('load', true); // Calling Loader
        Axios({
            url: promo+'/'+this.state.promoCode+'/user/'+userId,
            method: `GET`
        })
        .then (({data})=>{
            Event.emit('load', false);
            if(data.status === 'success')
            {
                this.discount = data.discount;
                this.discountedAmt = this.state.totalCost - (this.state.totalCost * this.discount) / 100 ;
                let parcelData = sessionStorage.getItem('parcel') && JSON.parse(sessionStorage.getItem('parcel'));
                parcelData["discountedAmt"] = this.discountedAmt;
                parcelData["promoCode"] = this.state.promoCode;
                sessionStorage.setItem('parcel',JSON.stringify(parcelData));
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

    onListingOrderStats = () =>{
        const totCost = Array.isArray(this.state.data.parcels) && this.state.data.parcels.length > 0 ? this.state.data.parcels.reduce((accumulator, currentValue) => accumulator + currentValue.estimated_cost, 0):0;
        if(!sessionStorage.getItem('userData'))
        {
            this.setState({
                ...this.state,...{openPayment:true,totalCost:totCost}
            });
            return;
        }
        const userId = JSON.parse(sessionStorage.getItem('userData')).user_id;
        Event.emit('load', true); // Calling Loader
        Axios({
            url: getOrderHistory+userId+'/check-delivery-limit',
            method: `GET`
        })
        .then (({data})=>{
            Event.emit('load', false);
            if(data.status === 'success')
            {
                if(data.limitOver){
                    this.setState({
                        ...this.state,...{openPayment:true,totalCost:totCost}
                    })
                }
                else{
                    this.setState({
                        ...this.state,...{totalCost:totCost}
                    });
                }
             }

        })
        .catch(data=>{
            Event.emit('load', false);
            swal ( "Oops" ,  "Something went wrong" ,  "error" );
        })
    }

    onPayment=()=>{
        const {data} = this.state;
        data.payment_type_id = 4;
        data.user_id = sessionStorage.getItem('userData') ? JSON.parse(sessionStorage.getItem('userData')).user_id:'';
        this.discountedAmt > 0 ? data.cost = this.state.totalCost = this.discountedAmt : data.cost = this.state.totalCost ;
        //data.cost = this.state.totalCost = this.discountedAmt;
        data.parcels.forEach(element => {
            delete element.estimated_cost
        });
        data.pickup_point = data.pickup_point && data.pp_street ? data.pickup_point +','+ data.pp_street : '';
        data.promoCode = this.state.promoCode;
        delete data.pp_street;
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
    
    render() {
        const { receiver_email,receiver_name,receiver_phone,parcels,sender_email,sender_name,sender_phone,cost,pickup_time } = this.state.data;
        const { totalCost,openPayment,promoCode } = this.state;
        // console.log('satte',this.onPayment())

        return (
            <div className="xs-12 animated fadeIn">
                <Row>
                    <Col>
                        <h2>Review your order below</h2>
                    </Col>
                </Row>
                <div className="xs-12 box">
                    <Row className="inner">
                        <Col xs={12} sm={12} md={4} lg={4} className="send top">
                            Sender details
                            <hr/>
                            <h4>{sender_name}</h4>
                            <p><b>Tel:</b> {sender_phone}</p>
                            <p><b>Email:</b> {sender_email}</p>
                        </Col>
                        <Col xs={12} sm={12} md={4} lg={4} className="top">
                            Parcel description
                            <hr/>
                            {parcels.map((p,i)=>(
                                <span key={i}>
                                    <img src={Parcel} alt="parcel"/>
                                    <p>{p.description}</p>
                                    {/* <p><b>Parcel weight:</b> {p.weight} kg</p> */}
                                    <p><b>Quantity:</b> {p.quantity}</p>
                                    <p><b>Pickup time:</b> {pickup_time}</p>
                                    <p><b>Cost:</b> N {p.estimated_cost}</p>
                                    <hr/>
                                </span>
                            ))}
                            {
                                openPayment?
                                <span>
                                    <Input type="text" style={{marginBottom:10}} name="promoCode" value={promoCode} onChange={this.onChangeInput}></Input>    
                                    <Button onClick={this.promocodeDiscount}>Use Promocode</Button>
                                </span>:''
                            }
                           
                        </Col>
                        <Col xs={12} sm={12} md={4} lg={4}>
                            Deliver to
                            <hr/>
                            <h4>{receiver_name}</h4>
                            <p><b>Tel:</b> {receiver_phone}</p>
                            <p><b>Email:</b> {receiver_email}</p>
                            <h3>Total Cost : N {totalCost}</h3>
                            { openPayment?
                            <h3>Discounted Cost : N {this.discountedAmt}</h3>
                              : ''       
                            }
                        </Col>
                    </Row>
                    <hr/>
                    <Row>
                        <Col xs={12} sm={12} md={4} lg={4} onClick={this.props.history.goBack}><Button className="bgOrange">Go back &amp; Edit</Button></Col>
                        {
                        openPayment?
                        <Col xs={12} sm={12} md={{size: 4,offset: 2}} lg={{size: 4,offset: 4}} className="right" onClick={()=>this.props.step(3)}><Button className="bgBlue"><Link exact to={`./payment`}>Confirm &amp; continue</Link></Button></Col>
                        : 
                        <Col xs={12} sm={12} md={{size: 4,offset: 2}} lg={{size: 4,offset: 4}} className="right" onClick={()=>this.onPayment()}><Button className="bgBlue">Confirm &amp; continue</Button></Col>
                         } 
                    </Row>
                </div>
            </div>
        )
    }

    componentDidMount()
    {
        // const totCost = Array.isArray(this.state.data.parcels) && this.state.data.parcels.length > 0 ? this.state.data.parcels.reduce((accumulator, currentValue) => accumulator + currentValue.estimated_cost, 0):0;
        // this.setState({
        //     ...this.state,...{totalCost:totCost}
        // });
        this.onListingOrderStats();
    }
}

export default withRouter(Confirm);