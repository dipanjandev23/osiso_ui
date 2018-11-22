import React,{Component} from 'react';
import {Row,Col,Button,FormGroup,Input,Badge,Modal,ModalHeader,ModalBody,ModalFooter,ListGroup,ListGroupItem,Table,Label } from 'reactstrap';
// import Star from '../../../../assets/star.svg';
// import Fb from '../../../../assets/fb.svg';
// import Ig from '../../../../assets/ig.svg';
// import Tw from '../../../../assets/tw.svg';
import swal from 'sweetalert';
import Axios from 'axios';
import Loading from '../../../../Routes/loading';
import PaymentSubscription from '../payment-subscription';
// import Tracking from '../../../../pages/Tracking';
import {getOrderHistory,deliveries,getTickets} from '../../../../helpers/apiEndpoints';
import StarRatingComponent from 'react-star-rating-component';
import {Timeline, TimelineEvent} from 'react-event-timeline';
import Colors from '../../../../colors';
import Event from '../../../../event';


class Home extends Component {

    constructor(props){
        super(props);
        this.state = {
            data:{
                userData:sessionStorage.getItem('userData')?JSON.parse(sessionStorage.getItem('userData')):{},
                rating:0,
                order_id:'',
                statusList:[],
                orderList:[],
                showTrack:false
            },
            tickets:{
                title:'',
                description:'',
                message:''
            },
            selectedOrderId: '',
            orders:[],
            hirePackages:[],
            modal:false,
            paymentModal:false,
            orderModal:false,
            ticketModal:false,
            subscriptionStatus:false,
            businessPackageAmt:0,
            selectedBusinessPackageId:0,
            searchInput:''
        }
        console.log(this.state.data.userData);
        var deliveryId;
        var orderId;
        // var parcel
        this.parcelList = [];
        this.parcelId='';
        this.ticketData = [];
        this.wayBillNumber='';
    }

    onChangeInput=(e)=>{  
        this.setState({
            tickets: {
                ...this.state.tickets,
                [e.target.name] : e.target.value
            }
        })
    }

      toggle=()=> {
        this.setState({
          modal: !this.state.modal
        });
      }

      togglePayment=()=> {
        this.setState({
          paymentModal: !this.state.paymentModal
        });
      }

      
      toggleOrder=()=> {
        this.setState({
            orderModal: !this.state.orderModal
        });
      }

      toggleTicket=()=> {
        this.setState({
            ticketModal: !this.state.ticketModal
        });
      }
      
      
    
    getID=(id)=>{
       this.deliveryId = id;
        // console.log('id',id)
    }

    getOrderDetails=(orderId,wayBillNumber)=>{
    Event.emit('load', true); //Loader
    this.orderId = wayBillNumber;
    Axios({
        url: deliveries+'/'+orderId+'/parcels',
        method: `GET`
    })
    .then (({data})=>{
        Event.emit('load', false);
        if(data.status === 'success')
        {
           // this.onListingOrders();
            // console.log('return',data)
            this.parcelList = [...data.parcels];
            this.toggleOrder();
        }
        
    })
    .catch(data=>{
        Event.emit('load', false);
        swal ( "Oops" ,  "Something went wrong" ,  "error" );
    })

    }

    onStarClick=(nextValue, prevValue, name)=> {
        // const obj = {
        //     rating: nextValue,
        //     userData:sessionStorage.getItem('userData')?JSON.parse(sessionStorage.getItem('userData')):{} 
        // }

        // console.log('star',nextValue)

        // this.setState({ 
        //     data:{
        //     ...this.state.data,...{rating: nextValue}
        //     }
        // })

        //console.log('this.deliveryId',this.deliveryId )
        //const uId =  sessionStorage.getItem('userData')?JSON.parse(sessionStorage.getItem('userData')).user_id:{} ;
        Event.emit('load', true); // Calling Loader
        Axios({
            url: deliveries+'/'+this.deliveryId+'/rating',
            method: `POST`,
            data:{
                rating: nextValue
            }
        })
        .then (({data})=>{
            Event.emit('load', false);
            if(data.status === 'success')
            {
                this.onListingOrders();
                // console.log('return',data)
            }
            
        })
        .catch(data=>{
            Event.emit('load', false);
            swal ( "Oops" ,  "Something went wrong" ,  "error" );
        })

      }

      onChange=(e)=>{
        this.setState({
            data: {
                ...this.state.data,
                [e.target.name]: e.target.value
            }
        })
     }

     onChangeHandler=(e)=>{
        const orders = sessionStorage.getItem('orderList') ? JSON.parse(sessionStorage.getItem('orderList')) : [];
        let filter =  orders.filter(elem=> {return elem.waybill_number.toLowerCase().includes(e.target.value.toLowerCase())});
        let obj={};
        obj.searchInput =  e.target.value;
         obj.orders = filter;
        
        this.setState({
            ...this.state,...obj
        })

      }

      trackOrder=()=>{
        // swal ( "Please wait..." );
        if(!this.state.data.order_id){
            swal('Warning','Please enter Order Id to track','warning')
            return false;
        }
        Event.emit('load', true); // Calling Loader
        Axios({
            url: deliveries+'/'+'track-history',
            method: `POST`,
            data:{orderId:this.state.data.order_id}
        })
        .then (({data})=>{
            //swal ( "Success" ,  "Welcome to Osiso" ,  "success" );
            Event.emit('load', false);
            if(data.status === "success")
            {
                // const filteredArr = data.data.filter(elem=> elem.delivery_status > 2)
                // console.log('filtrt',filteredArr)
                const retData = {
                    userData:sessionStorage.getItem('userData')?JSON.parse(sessionStorage.getItem('userData')):{},
                    rating:this.state.data.rating,
                    order_id:this.state.data.order_id,
                    // statusList:[...filteredArr]
                    orderList:[...data.data]
                }
                this.setState({  
                    ...this.state,
                    data : {
                        ...retData
                    },
                    selectedOrderId: this.state.data.order_id
                })
                // console.log('satte',this.state)                    
            }
            else {
                Event.emit('load', false);
                swal('Warning', data.message || "Something went wrong", 'warning');
            }
        })
        .catch(data=>{
            Event.emit('load', false);
            swal ( "Oops" ,  "Something went wrong" ,  "error" );
        })
    }

    checkStatus=(indx)=>{
        const deliveryArr = this.state.data.orderList[indx].history;  
        const filteredArr = deliveryArr.filter(elem=> elem.delivery_status > 2);
        // this.showTrack = filteredArr.length > 0;
        if(filteredArr.length > 0) 
        {
         const retData = {
         userData:sessionStorage.getItem('userData')?JSON.parse(sessionStorage.getItem('userData')):{},
         rating:this.state.data.rating,
         order_id:this.state.data.order_id,
         orderList:this.state.data.orderList,
         statusList:[...filteredArr],
         showTrack:true
          }
         this.setState({ 
            ...this.state,
             data : {
                 ...retData
             }
             
         })
        }
        else{
            this.setState({
                ...this.state,
                data:{
                    ...this.state.data,...{showTrack:false}
                }
            })
        }
        
     }

    getHirePackages=()=>{

        Event.emit('load', true); // Calling Loader
        
        Axios({
            url: getOrderHistory+this.state.data.userData.user_id+'/higher-packages',
            method: `GET`
        })
        .then (({data})=>{
            Event.emit('load', false);
            if(data.status === 'success')
            {
                this.setState({ 
                   ...this.state , ...{hirePackages:data.packages}
                })
                this.toggle();
               // console.log('state',this.state)
            }else{
                swal('Warning',data.message,'warning');
                sessionStorage.setItem('home.toPack', "1");
                this.props.history.push('/');
            }
            
        })
        .catch(data=>{
            Event.emit('load', false);
            swal ( "Oops" ,  "Something went wrong" ,  "error" );
        })
    }

    openPaymentUpgrade=(id,price)=>{
        this.setState({
            ...this.state,...{selectedBusinessPackageId:id,businessPackageAmt:price}
        })
        sessionStorage.setItem('business_package_id',id);
        this.togglePayment();
    }

    upgradePackages=()=>{
        Event.emit('load', true); // Calling Loader
        Axios({
            url: getOrderHistory+this.state.data.userData.user_id+'/business-package/'+this.state.selectedBusinessPackageId,
            method: `PUT`
        })
        .then (({data})=>{
            Event.emit('load', false);
            if(data.status === 'success')
            {
                swal("Success",data.message,'success');
                this.toggle();
                this.togglePayment();
                sessionStorage.removeItem('business_package_id');
                window.location.reload();
               
            }
        })
        .catch(data=>{
            Event.emit('load', false);
            swal ( "Oops" ,  "Something went wrong" ,  "error" );
        })
    }

    onReturnPaymentDone=()=>{
        Event.emit('load', true); // Calling Loader
        Axios({
            url: deliveries+'/return-parcel/'+this.parcelId,
            method: `POST`
        })
        .then (({data})=>{
            Event.emit('load', false);
            if(data.status === 'success')
            {
                this.togglePayment();
                swal("Success",'Return initiated successfully','success');
                const indx = this.parcelList.findIndex(elem=>elem.id === this.parcelId);
                this.parcelList[indx].return = {};
                this.setState({...this.state});
                window.location.reload();

            }
        })
        .catch(data=>{
            Event.emit('load', false);
            swal ( "Oops" ,  "Something went wrong" ,  "error" );
        })
    }
    returnParcel=(id,indx)=>{
        this.parcelId = id;
        this.togglePayment();
    }
      
    componentDidMount()
    {    
      this.onListingOrders();  
      this.getSubscriptionStatus();
      //this.getRating();
    }

    getRating=()=> {
        Loading // Calling Loader
        
        Axios({
            url: getOrderHistory+this.state.data.userData.user_id+'/rate',
            method: `GET`
        })
        .then (({data})=>{

            if(data.status === 'success')
            {
                this.setState({ 
                    data:{
                        rating: data.rating,
                        userData:sessionStorage.getItem('userData')?JSON.parse(sessionStorage.getItem('userData')):{} 
                     }
                })
            }
        })
        .catch(data=>{
            swal ( "Oops" ,  "Something went wrong" ,  "error" );
        })

      }

    onListingOrders = () =>{
        // swal ( "Please wait..." );
        Event.emit('load', true); // Calling Loader
        Axios({
            url: getOrderHistory+this.state.data.userData.user_id+'/order-history',
            method: `GET`
        })
        .then (({data})=>{
            Event.emit('load', false);
            if(data.status === 'success')
            {
                    data.deliveries.forEach(element => {
                        const newDate = new Date(element.created_at)
                        element.orderDate = newDate.getDate() +'/'+ (newDate.getMonth() + 1) +'/'+ newDate.getFullYear();
                    });
                    this.setState({ 
                        ...this.state,
                        orders : [...data.deliveries]
                    })
                
                
                // console.log('ret',this.state)
            }
        })
        .catch(data=>{
            Event.emit('load', false);
            swal ( "Oops" ,  "Something went wrong" ,  "error" );
        })
    }

    getSubscriptionStatus=()=>{
        Event.emit('load', true); // Calling Loader
        Axios({
            url: getOrderHistory+this.state.data.userData.user_id+'/subscription-status',
            method: `GET`
        })
        .then (({data})=>{
            Event.emit('load', false);
            if(data.status === 'success')
            {
                this.setState({ 
                    ...this.state,...{subscriptionStatus:data.subscription_status}
                })
            }
        })
        .catch(data=>{
            Event.emit('load', false);
            swal ( "Oops" ,  "Something went wrong" ,  "error" );
        })
    }

    getPackageAmount=()=>{
        Event.emit('load', true); // Calling Loader
        Axios({
            url: getOrderHistory+this.state.data.userData.user_id+'/business-package-amount',
            method: `GET`
        })
        .then (({data})=>{
            Event.emit('load', false);
            if(data.status === 'success')
            {
                this.setState({ 
                    ...this.state,...{businessPackageAmt:data.amount,paymentModal:true}
                })
            }
            else{
                swal('Warning',data.message,'warning');
            }
        })
        .catch(data=>{
            Event.emit('load', false);
            swal ( "Oops" ,  "Something went wrong" ,  "error" );
        })
    }

    successCall=()=>{
        this.togglePayment();
        this.getSubscriptionStatus();
    }

    getTickets=(tId,waybill_number)=>{
        Event.emit('load', true);
        this.orderId = tId;
        this.wayBillNumber = waybill_number;
        Axios({
            url: getTickets+'deliveries/'+tId,
            method: `GET`
        })
        .then (({data})=>{
            Event.emit('load', false);
            if(data.status === 'success')
            {
                this.toggleTicket();
                this.ticketData = data.ticket;
                this.setState({ ...this.state });
                // this.setState({ 
                //     ...this.state,...{businessPackageAmt:data.amount,paymentModal:true}
                // })
            }
        })
        .catch(data=>{
            Event.emit('load', false);
            swal ( "Oops" ,  "Something went wrong" ,  "error" );
        })
    }

    raiseTicket=()=>{
        let inputObj = {
            title:this.state.tickets.title,
            description:this.state.tickets.description,
            user_id:JSON.parse(sessionStorage.getItem('userData')).user_id,
            delivery_id:this.orderId
        }
        Axios({
            url: getTickets,
            method: `POST`,
            data:inputObj   
        })
        .then (({data})=>{
            if(data.status === 'success')
            {
                swal ( "Success" ,  "Ticket created successfully." ,  "success" );
                this.toggleTicket();
            }
        })
        .catch(data=>{
            swal ( "Oops" ,  "Something went wrong" ,  "error" );
        })
    }

    sendMessage=()=>{
        let payload = {
            body: this.state.tickets.message,
            user_id: JSON.parse(sessionStorage.getItem('userData')).user_id
        }
        Axios({
            url: getTickets + this.ticketData.id + '/add-message',
            method: `POST`,
            data:payload   
        })
        .then (({data})=>{
            if(data.status === 'success')
            {
                this.ticketData.ticket_messages.push({ ...data.ticketMessage, sent_by: 'me' });
                this.setState({ 
                    tickets: {
                        ...this.state.tickets,
                        message: ''
                    }
                });    
            }
        })
        .catch(data=>{
            swal ( "Oops" ,  "Something went wrong" ,  "error" );
        })
    }

    onCheckboxClick=(e)=>{
        Event.emit('load', true); // Calling Loader
        Axios({
            url: getOrderHistory+this.state.data.userData.user_id+'/update-auto-renewal',
            method: `PUT`,
            data: { autoRenewal: !this.state.data.userData.auto_renewal }
        })
        .then (({data})=>{
            Event.emit('load', false);
            if(data.status === 'success')
            {
                this.setState({ 
                   data: {
                       ...this.state.data,
                       userData: {
                           ...this.state.data.userData,
                           auto_renewal: !this.state.data.userData.auto_renewal
                       }
                    }
                })
                sessionStorage.setItem('userData', JSON.stringify(this.state.data.userData));
            }
            else{
                swal('Warning',data.message,'warning');
            }
        })
        .catch(data=>{
            Event.emit('load', false);
            swal ( "Oops" ,  "Something went wrong" ,  "error" );
        })
    };

    render() {
        let hidden;
        if (window.innerWidth < 450) {
            hidden = "hidden";
        }
        // console.log('this.props.onSuccess()',this.props.onSuccess)
        const {orders,hirePackages,subscriptionStatus,businessPackageAmt,searchInput} = this.state;
        const hasAccess = sessionStorage.getItem('userData') && JSON.parse(sessionStorage.getItem('userData')).user_type == 2;
        const autoRenewal = sessionStorage.getItem('userData') && JSON.parse(sessionStorage.getItem('userData')).auto_renewal;
        console.log(autoRenewal);
        // console.log('ba',businessPackageAmt)
        // const {rating} = this.state.data;
        const {statusList,orderList,showTrack} = this.state.data;
        const PC = "cursor:pointer;"
        return (

            <div className="xs-12">
                <Row>
                <Col lg={9}>
                        <Row className="top">
                            <Col>
                                <div className="box">
                                    <div className="head">
                                        <p>Overview</p>
                                    </div>
                                    <hr/>
                                    <div className="content">
                                    <Row className="field" style={{marginBottom:5}}>
                                            <Input type="text" placeholder="Enter order ID to search" value={searchInput} onChange={this.onChangeHandler}/>
                                    </Row>
                                    <Row className="top">
                                     <Col>
                                        <div className="box">
                                        <Table responsive>
                                        <thead>
                                        <tr>
                                            <th>Date</th>
                                            <th>Order ID</th>
                                            <th>Amount</th>
                                            {/* <th>Status</th> */}
                                            <th>Rating</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {orders.map((p,i)=>(
                                            <tr key={i}>
                                            <td>{p.orderDate}</td>
                                            <td className="onHoverUnder" onClick={()=>{this.getOrderDetails(p.id,p.waybill_number)}} title="Click to view the order details">{p.waybill_number}</td>
                                            <td>N{p.cost}</td>
                                            {/* <td><Badge color="warning" className="badge-style">{p.delivery_status.name}</Badge></td> */}
                                            <td><StarRatingComponent 
                                                name="rate1"
                                                starCount={5}
                                                value={p.rating}
                                                onStarClick={(e)=>{this.getID(p.id);
                                                this.onStarClick(e)}}/></td>
                                                <td><a className="onHoverComplain" onClick={()=>{this.getTickets(p.id,p.waybill_number)}}>Complain</a></td>
                                         </tr>
                                        ))
                                        }       
                                        </tbody>
                                        </Table>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </Col>
                        </Row>
                        <Row className="top">
                            <Col lg={12}>
                               
                                <div className="box">
                                    <div className="head">
                                        <p>Track an Order</p>
                                    </div>
                                    <hr/>
                                    <div className="content">
                                    <div className="xs-12">
                                    <div className="xs-12 sm-12 md-8 lg-8 xlg-8 outer bottom">
                                        <Input
                                            labelname=""
                                            type="text"
                                            placeholder="Enter Order ID"
                                            value={this.state.data.order_id}
                                            onChange={this.onChange}
                                            name="order_id"
                                            customclass=""
                                        />                
                                        </div>
                                        <div className="xs-12 sm-12 md-4 lg-4 xlg-4 outer bottom text">
                                        <Button className="bgBlue" onClick={this.trackOrder}>Track</Button>
                                        
                                   </div>
                             </div>

                             <div className="xs-12">
                        <Table responsive>
                        <thead>
                        <tr>
                            <th>Description</th>
                            <th>Status</th>
                        </tr>
                        </thead>
                    <tbody>
                    {orderList && orderList.map((p,i)=>(
                        <tr key={i}>
                        <td>{p.description}</td>
                        <td><a style={{cursor:'Pointer',textDecoration:'Underline'}} onClick={()=>{this.checkStatus(i)}}>Check status</a></td>
                        </tr>
                     ))
                    }  
                    </tbody>
                    </Table> 
                        { 
                           showTrack ?
                          <Timeline>
                               { statusList.map((p,i)=>(
                                    <TimelineEvent title={'ORDER ID - '+this.state.data.order_id}
                                    createdAt={p.created_at}
                                    icon={''}
                                    key={i}>
                                    {p.name}
                                </TimelineEvent>
                                ))}
                            </Timeline>
                             :<p>No Tracking Update Yet</p>     
                        }    
                            
                        </div>

                            {/* <div className="xs-12 row-pad">
                            {
                                statusList && statusList.length>0?<Timeline>
                                { statusList.map((p,i)=>(
                                        <TimelineEvent title={'ORDER ID - ' + this.state.selectedOrderId}
                                        createdAt={p.created_at}
                                        icon={''}
                                        key={i}>
                                        {p.name}
                                    </TimelineEvent>
                                    ))}
                                </Timeline>
                                :<p>No Tracking Update Yet</p>     
                            }    
                                
                            </div> */}
                            </div>
                                </div>
                            </Col>
                            {/* <Col lg={6}> */}
                            {/* <div className="box">
                                    <div className="head">
                                        <p>Invite Users</p>
                                    </div>
                                    <hr/>
                                    <div className="content">
                                        <Row>
                                            <Col className="form">
                                                <p>Share your referral links for discounts on every invite</p>
                                                <InputGroup className="top">
                                                    <Input placeholder="https://jgk5493&?referrer42"/>
                                                    <InputGroupAddon addonType="append"><Button className="bgOrange">copy</Button></InputGroupAddon>
                                                </InputGroup>
                                                <Row>
                                                    <Col><img src={Fb} alt="fb"/></Col>
                                                    <Col><img src={Tw} alt="tw"/></Col>
                                                    <Col><img src={Ig} alt="ig"/></Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </div>
                                </div> */}
                            {/* </Col> */}
                        </Row>
                        {/* <Row className="top">
                            <Col>
                                <div className="box">
                                    <div className="head">
                                        <p>Invite Users</p>
                                    </div>
                                    <hr/>
                                    <div className="content">
                                        <Row>
                                            <Col className="form">
                                                <p>Share your referral links for discounts on every invite</p>
                                                <InputGroup className="top">
                                                    <Input placeholder="https://jgk5493&?referrer42"/>
                                                    <InputGroupAddon addonType="append"><Button className="bgOrange">copy</Button></InputGroupAddon>
                                                </InputGroup>
                                                <Row>
                                                    <Col><img src={Fb} alt="fb"/></Col>
                                                    <Col><img src={Tw} alt="tw"/></Col>
                                                    <Col><img src={Ig} alt="ig"/></Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                            </Col>
                        </Row> */}
                    </Col>

                    <Col lg={3}>
                        
                    <Row>
                        {/* <Col className="text border" xs={12} lg={6}>
                            <p>Rate our service</p>
                            <Row>
                            <StarRatingComponent 
                                name="rate1" 
                                starCount={5}
                                value={rating}
                                onStarClick={this.onStarClick}
                                />
                            </Row>
                        </Col> */}
                        <Col className="text" xs={12} lg={12}> 
                        <div className="box">
                        <div className="head">
                            <p>Package Overview</p>
                        </div>
                        <hr/>
                        <div className="content">
                            <p>upgrade to a business package today! its cheaper</p>
                            <Button onClick={this.getHirePackages}>See more</Button>
                            {subscriptionStatus || !hasAccess?'':<Button onClick={this.getPackageAmount}>Renew package</Button>}

                            <div class="checkbox">
                            <input type="checkbox" id="checkbox_1" onClick={this.onCheckboxClick} name="auto_renewal" checked={this.state.data.userData.auto_renewal}/>
                            <label for="checkbox_1">Auto renew package</label>
                            </div>
                            </div>
                            </div>
                        </Col>
                    </Row>
                    </Col>
                    
                </Row>
                 {/* View Hire Packages */}
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                <ModalHeader toggle={this.toggle}>Upgrade Business Packages</ModalHeader>
                <ModalBody>
                <ListGroup>
                    { hirePackages && hirePackages.length > 0 ? hirePackages.map((p,i)=>(
                        //  <ListGroupItem  key={i} onClick={() => {this.upgradePackages(p.id);this.openPaymentUpgrade(p.id)}} className="modalItemDesign"> {p.name}</ListGroupItem>
                        <ListGroupItem  key={i} onClick={() => this.openPaymentUpgrade(p.id,p.price)} className="modalItemDesign"> {p.name}</ListGroupItem>
                    )):
                    <span>No packages available.</span>
                    }
                    </ListGroup>
                </ModalBody>
                </Modal>
                {/* View Hire Packages */}

                {/* View Payment Modal*/}
                <Modal isOpen={this.state.paymentModal} toggle={this.togglePayment} className={this.props.className} >
                <ModalHeader toggle={this.togglePayment}>Renew your package</ModalHeader>
                <ModalBody>
                    <PaymentSubscription businessCost={businessPackageAmt} onSuccess={this.successCall} onPaymentDone={this.upgradePackages} ifRuturn={false}></PaymentSubscription>
                </ModalBody>
                </Modal>
                {/* View Payment Modal */}

                {/* View Order Modal*/}
                <Modal isOpen={this.state.orderModal} toggle={this.toggleOrder} className={this.props.className} size="lg">
                <ModalHeader toggle={this.toggleOrder}>Order Details - Order Id ({this.orderId})</ModalHeader>
                <ModalBody>
                <Table responsive>
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>From</th>
                        <th>To</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    { this.parcelList.map((p,i)=>(
                        <tr key={i}>
                        <td>{p.id}</td>
                        <td>{p.from}</td>
                        <td>{p.destination}</td>
                        <td>{p.description}</td>
                        <td><Badge color="warning" className="badge-style">{p.delivery_status.name}</Badge></td>
                        <td>{
                            !p.return ? <Button onClick={()=>{this.returnParcel(p.id,i)}} style={{height:'auto',background:Colors.colorRed}} disabled={p.delivery_status.id != 5}>Return</Button> : <span style={{color:Colors.primary}}>Returned</span> 
                        } </td>
                        </tr>
                     ))
                    }  
                    </tbody>
                    </Table> 
                </ModalBody>
                </Modal>
                {/* View Order Modal */}

                {/* View Return Payment Modal*/}
                <Modal isOpen={this.state.paymentModal} toggle={this.togglePayment} className={this.props.className}>
                <ModalHeader toggle={this.togglePayment}>Return Charges</ModalHeader>
                <ModalBody>
                    <PaymentSubscription businessCost={500} ifReturn={true} onReturnPaymentDone={this.onReturnPaymentDone}></PaymentSubscription>
                </ModalBody>
                </Modal>
                {/* View Return Payment Modal */}


                {/* View Ticket Modal*/}
                <Modal isOpen={this.state.ticketModal} toggle={this.toggleTicket} className={this.props.className} size="lg">
                <ModalHeader toggle={this.toggleTicket}>Ticket for OrderId - {this.wayBillNumber}</ModalHeader>
                <ModalBody>
                    {
                        !this.ticketData ?
                            <div>
                            <Row>
                            <Col xs={12} >
                            <Label>
                                Title
                            </Label> 
                            <Input type="text" placeholder="Ticket title" value={this.state.tickets.title} name="title" onChange={this.onChangeInput}>
                            </Input>
                            </Col>
                            </Row>     
                            <Row>
                            <Col xs={12} >
                            <Label>
                                Ticket Description
                            </Label> 
                            <Input
                                type="text" placeholder="Description" value={this.state.tickets.description} name="description" onChange={this.onChangeInput}>
                            </Input>
                            </Col>
                            </Row> 
                            <Row style={{marginTop:10}}>
                            <Col md={{size: 6,offset: 3}}>
                            <Button onClick={this.raiseTicket} style={{background:'#2D9CDB'}}>Create Ticket</Button>
                            </Col>
                        </Row>
                    </div>:
                            <div>
                               
                            <Row>
                            <Col xs={12} >
                            <Label style={{fontWeight:'600'}}>
                                {this.ticketData.title}
                            </Label> 
                            </Col>
                            </Row>     
                            <Row>
                            <Col xs={12} >
                            <Label>
                                {this.ticketData.description}
                            </Label> 
                            </Col>
                            </Row> 
                            <hr/>
                            <div style={{height:'300px',overflowY:'scroll',overflowX:'hidden'}}>
                            {
                              this.ticketData.ticket_messages && this.ticketData.ticket_messages.map((p,i)=>(
                               <Row style={{marginBottom:'10px',marginLeft:'5px',marginRight:'5px'}}>
                                 <Col xs={12} md={{size: 6,offset: p.sent_by == 'me' ? 6 : 0}} style={{background: p.sent_by == 'me' ? '#6185ba' : '#777',padding:'15px',borderRadius:'5px'}}>
                                <Label style={{color:'#fff'}}>Message: {p.body}</Label><br/>
                                <Label style={{color:'#fff'}}>Sent By : {p.sent_by.toUpperCase()}</Label><br/>
                                <Label style={{color:'#fff'}}>Date : {p.created_at}</Label>
                                {/* <hr/> */}
                                </Col>  
                                </Row>
                               
                               
                              ))
                            }
                            </div>
                            {
                                this.ticketData.status != 'closed' ?
                                <div>
                                <Row>
                                <Col>
                                <Input type="textarea" value={this.state.tickets.message} name="message" onChange={this.onChangeInput}></Input>                                
                                </Col>
                                </Row>
                                <Row style={{marginTop:10}}>
                                <Col md={{size: 6,offset: 3}}>
                                <Button onClick={this.sendMessage} style={{background:'#2D9CDB'}}>Send Message</Button>
                                </Col>
                                </Row>
                                </div>: ''
                            }
                            
                    </div>
                    }
                </ModalBody>
                </Modal>
                {/* View Return Payment Modal */}
            </div>
        )
    }
}

export default Home