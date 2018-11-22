import React,{Component} from 'react';
import {NavLink, Switch, Route,Link} from 'react-router-dom';
import {Breadcrumb, BreadcrumbItem,Button,Table,Badge} from 'reactstrap';
import {Wrapper} from './tracking.style';
import Colors from '../../colors';
import Navbar from '../../appComponents/navbar';
import Input from '../../appComponents/Input';
import {Timeline, TimelineEvent} from 'react-event-timeline';
import swal from 'sweetalert';
import Axios from 'axios';
import Loading from '../../Routes/loading';
import {deliveries} from '../../helpers/apiEndpoints';
import Event from '../../event';
// import GoogleMapReact from 'google-map-react';

class Tracking extends Component {

    constructor(){
        super();

        this.state={
            data:{
                order_id:'',
                orders:[],
                orderList:[],
                showTrack:false
            }
        }

    }

    onChange=(e)=>{
        this.setState({
            data: {
                ...this.state.data,
                [e.target.name]: e.target.value
            }
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
                console.log('ret',data)
                // console.log('filtrt',filteredArr)
                const retData = {
                    order_id:this.state.data.order_id,
                    // orders:[...filteredArr]
                    orderList:[...data.data]
                }
                this.setState({ 
                    data : {
                        ...retData
                    }
                })
                // console.log('satte',this.state)                    
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
    //    this.showTrack = filteredArr.length > 0;
       if(filteredArr.length > 0) 
       {
        const retData = {
        order_id:this.state.data.order_id,
        orderList:this.state.data.orderList,
        orders:[...filteredArr],
        showTrack:true
         }
        this.setState({ 
            data : {
                ...retData
            }
        })
       }
       else{
           this.setState({
               data:{
                   ...this.state.data,...{showTrack:false}
               }
           })
       }
       
    }


    render() {
        // const defaultProps = {
        //     center: {
        //       lat: 59.95,
        //       lng: 30.33
        //     },
        //     zoom: 11
        // }
        const isAuth = sessionStorage.getItem('userData') ? true : false;
        const isBusinessUser = sessionStorage.getItem('userData') ? JSON.parse(sessionStorage.getItem('userData')).user_type === 2 ? true : false : false;
        const {orders,orderList,showTrack} = this.state.data;
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
                {/* <GoogleMapReact
                    bootstrapURLKeys={{key: "AIzaSyBu-916DdpKAjTmJNIgngS6HL_kDIKU0aU"}}
                    defaultCenter={defaultProps.center}
                    defaultZoom={defaultProps.zoom}
                /> */}

                  <Breadcrumb>
                    <BreadcrumbItem><a><Link to="/">Home</Link></a></BreadcrumbItem>
                    <BreadcrumbItem active>Order Tracking</BreadcrumbItem>
                </Breadcrumb>

                <div className="xs-12 sm-9 box">
                <div className="xs-12 header">
                    <div className="xs-11 sm-11 md-11 lg-11 xlg-11"><label>TRACK YOUR ORDER</label></div>
                    </div>
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
                            <div className="xs-12 sm-12 md-4 lg-4 xlg-4 outer bottom">
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
                               { orders.map((p,i)=>(
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
                    </div>
                </Wrapper>
                </div>
        )
    }
}

export default Tracking;