import React,{Component} from 'react';  
import {Row,Col,Button,Input,Badge} from 'reactstrap'; 
import swal from 'sweetalert';
import Axios from 'axios';
import Loading from '../../../../Routes/loading';
import {getOrderHistory} from '../../../../helpers/apiEndpoints';
import Event from '../../../../event';
// import LineChart from 'react-linechart';
class Report extends Component {

    constructor(){
        super();
        this.state = {
            userData:sessionStorage.getItem('userData')?JSON.parse(sessionStorage.getItem('userData')):{},
            searchInput:'',
            orders:[],
            totalDelivery:0,
            maxDelivery:0,
            remainingDelivery:0,
            returns:0
        }
    }

    onChangeHandler=(e)=>{
        const orders = sessionStorage.getItem('orderList') ? JSON.parse(sessionStorage.getItem('orderList')) : [];
        let filter =  orders.filter(elem=> {return elem.waybill_number.toLowerCase().includes(e.target.value.toLowerCase())});
        let obj={};
        obj.searchInput =  e.target.value;
        // if(filter.length == 0)
        // {
        //  obj.orders = sessionStorage.getItem('orderList') ? JSON.parse(sessionStorage.getItem('orderList')) : [];
        // }
        // else
        // {
         obj.orders = filter;
        // }
        
        this.setState({
            ...this.state,...obj
        })

      }

    componentDidMount()
    {    
      this.onListingOrders();  
      this.onListingOrderStats();
    }

    onListingOrders = () =>{
        // swal ( "Please wait..." );
        Event.emit('load', true); // Loader
        Axios({
            url: getOrderHistory+this.state.userData.user_id+'/order-history',
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
                    ...{orders : [...data.deliveries]}
                })

                sessionStorage.setItem('orderList',JSON.stringify(data.deliveries));
             }
            //console.log('ret',this.state)

        })
        .catch(data=>{
            Event.emit('load', false);
            swal ( "Oops" ,  "Something went wrong" ,  "error" );
        })
    }

    onListingOrderStats = () =>{
        // swal ( "Please wait..." );
        Event.emit('load', true); // Calling Loader
        Axios({
            url: getOrderHistory+this.state.userData.user_id+'/check-delivery-limit',
            method: `GET`
        })
        .then (({data})=>{
            Event.emit('load', false);
            if(data.status === 'success')
            {
                // data.deliveries.forEach(element => {
                //     const newDate = new Date(element.created_at)
                //     element.orderDate = newDate.getDate() +'/'+ (newDate.getMonth() + 1) +'/'+ newDate.getFullYear();
                // });

                // this.setState({ 
                //     orders : [...data.deliveries]
                // })

                // sessionStorage.setItem('orderList',JSON.stringify(data.deliveries));
                this.setState({
                    ...this.state,...{totalDelivery:data.totalDeliveries,maxDelivery:data.maxDelivery,remainingDelivery: (data.maxDelivery - data.totalDeliveries),returns:data.returns}
                })
                console.log('ret',data)
             }
            //console.log('ret',this.state)

        })
        .catch(data=>{
            Event.emit('load', false);
            swal ( "Oops" ,  "Something went wrong" ,  "error" );
        })
    }

    render() {
        const {orders,searchInput,totalDelivery,maxDelivery,remainingDelivery,returns} = this.state;
        let hidden;
        if (window.innerWidth < 450) {
            hidden = "hidden";
        }
        return (
            <div className="xs-12">
                <Row>
                    <Col lg={6}>
                        
                    {/* <Row className="top">
                            <Col>
                                <div className="box">
                                    <div className="head">
                                        <p>Your Order History</p>
                                    </div>
                                    <hr/>
                                    <div className="content">
                                        <Row className="field">
                                            <Input type="text" placeholder="Enter order ID to search" value={searchInput} onChange={this.onChangeHandler}/>
                                        </Row>
                                    </div>
                                    <div className="head">
                                        <Row>
                                            <Col><p>History</p></Col>
                                            <Col className={`${hidden}`} style={{textAlign:'center'}}><p>Order ID</p></Col>
                                            <Col style={{textAlign:'center'}}><p>Amount</p></Col>
                                            <Col><p>Status</p></Col>
                                        </Row>
                                    </div>
                                    <hr/>
                                    <div className="content">
                                    {orders.map((p,i)=>(
                                             <Row className="top table" key={i}>
                                             <Col xs={4} lg={3}><p>{p.orderDate}</p></Col>
                                             <Col className={`${hidden}`} lg={3}><p>{p.waybill_number}</p></Col>
                                             <Col xs={4} lg={3}><p>N{p.cost}</p></Col>
                                             <Col xs={4} lg={3}><Badge color="warning" className="badge-style">{p.delivery_status.name}</Badge></Col>
                                             </Row>
                                            ))}
                                    </div>
                                </div>
                            </Col>
                        </Row> */}



                        <Row>
                            <Col>
                                <div className="box">
                                    <div className="head">
                                        <p>Order Statistics</p>
                                    </div>
                                    <hr/>
                                   
                                    <div className="content">
                                         <Row>
                                             <Col>
                                             <p style={{fontWeight:600}}>Maximum Deliveries</p>
                                             </Col>
                                             <Col>
                                             {maxDelivery}
                                             </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                            <p style={{fontWeight:600}}>Used Deliveries</p>                                            
                                            </Col>
                                            <Col>
                                               {totalDelivery<0 ? `0 (${Math.abs(totalDelivery)} left from previous package)` : totalDelivery}
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                            <p style={{fontWeight:600}}>Remaining Deliveries</p>

                                            </Col>

                                            <Col>
                                            {remainingDelivery}
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                            <p style={{fontWeight:600}}>Total Returns</p>
                                            </Col>

                                            <Col>
                                            {returns}
                                            </Col>

                                        </Row>                                                                    
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                    <Col lg={6}>
                        {/* <Row className="top">
                            <Col>
                                <div className="box">
                                    <div className="head">
                                        <Row>
                                            <Col lg={6}>
                                                Order Chart
                                            </Col>
                                            <Col lg={6}>
                                                <Row className="well">
                                                    <Col>daily</Col>
                                                    <Col>weekly</Col>
                                                    <Col className="active">monthly</Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </div>
                                    <hr/>
                                    <div className="content">
                                        <LineChart 
                                            width={400}
                                            height={300}
                                            data={data}
                                            hideXLabel={true}
                                            hideYLabel={true}
                                            yMin={0}
                                            yMax={10}
                                        />
                                    </div>
                                </div>
                            </Col>
                        </Row> */}
                        <Row>
                            {/* <Col>
                                <div className="box">
                                    <div className="head">
                                        <p>Order Statistics</p>
                                    </div>
                                    <hr/>
                                   
                                    <div className="content">
                                         <Row>
                                             <Col>
                                             <p style={{fontWeight:600}}>Maximum Deliveries</p>
                                             </Col>
                                             <Col>
                                             {maxDelivery}
                                             </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                            <p style={{fontWeight:600}}>Used Deliveries</p>                                            
                                            </Col>
                                            <Col>
                                               {totalDelivery<0 ? `0 (${Math.abs(totalDelivery)} left from previous package)` : totalDelivery}
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                            <p style={{fontWeight:600}}>Remaining Deliveries</p>

                                            </Col>

                                            <Col>
                                            {remainingDelivery}
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                            <p style={{fontWeight:600}}>Total Returns</p>
                                            </Col>

                                            <Col>
                                            {returns}
                                            </Col>

                                        </Row>                                                                    
                                    </div>
                                </div>
                            </Col> */}
                        </Row>


                        {/* <Row>
                            <Col>
                                <div className="box">
                                    <div className="head">
                                        <p>Invoices</p>
                                    </div>
                                    <hr/>
                                    <div className="head">
                                        <Row>
                                            <Col xs={2} sm={2} md={2} lg={2}><p>No.</p></Col>
                                            <Col xs={5} sm={5} md={5} lg={5}><p>Client</p></Col>
                                            <Col xs={3} sm={3} md={3} lg={3}><p>Amount</p></Col>
                                            <Col xs={2} sm={2} md={2} lg={2}><p>Date</p></Col>
                                        </Row>
                                    </div>
                                    <hr/>
                                    <div className="content">
                                        <Row className="top table">
                                            <Col xs={2} sm={2} md={2} lg={2}><p>001</p></Col>
                                            <Col xs={5} sm={5} md={5} lg={5}><p>Pontus Vernbloom</p></Col>
                                            <Col xs={3} sm={3} md={3} lg={3}><p>N3,000</p></Col>
                                            <Col xs={2} sm={2} md={2} lg={2}><p>24/10/18</p></Col>
                                        </Row>                                                                         
                                        <Row className="top table">
                                            <Col xs={2} sm={2} md={2} lg={2}><p>001</p></Col>
                                            <Col xs={5} sm={5} md={5} lg={5}><p>Pontus Vernbloom</p></Col>
                                            <Col xs={3} sm={3} md={3} lg={3}><p>N3,000</p></Col>
                                            <Col xs={2} sm={2} md={2} lg={2}><p>24/10/18</p></Col>
                                        </Row>                                                                         
                                        <Row className="top table">
                                            <Col xs={2} sm={2} md={2} lg={2}><p>001</p></Col>
                                            <Col xs={5} sm={5} md={5} lg={5}><p>Pontus Vernbloom</p></Col>
                                            <Col xs={3} sm={3} md={3} lg={3}><p>N3,000</p></Col>
                                            <Col xs={2} sm={2} md={2} lg={2}><p>24/10/18</p></Col>
                                        </Row>                                                                         
                                        <Row className="top table">
                                            <Col xs={2} sm={2} md={2} lg={2}><p>001</p></Col>
                                            <Col xs={5} sm={5} md={5} lg={5}><p>Pontus Vernbloom</p></Col>
                                            <Col xs={3} sm={3} md={3} lg={3}><p>N3,000</p></Col>
                                            <Col xs={2} sm={2} md={2} lg={2}><p>24/10/18</p></Col>
                                        </Row>                                                                         
                                    </div>
                                </div>
                            </Col>
                        </Row> */}
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Report;