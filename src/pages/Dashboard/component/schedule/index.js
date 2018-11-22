import React,{Component} from 'react';
import {Row,Col,Button,Input,FormGroup,Label} from 'reactstrap';
import {withRouter} from 'react-router-dom';
import Add from '../../../../assets/add.svg';
import Minus from '../../../../assets/minus_red.svg';
import MinusP from '../../../../assets/minus.svg';
import Edit from '../../../../assets/edit.svg';
import InputCustom from '../../../../appComponents/Input';
import {listLocationUrl,getRatesUrl,getOrderHistory} from '../../../../helpers/apiEndpoints';
import swal from 'sweetalert';
import Axios from 'axios';
import Loading from '../../../../Routes/loading';
import {guid} from '../../../../helpers/helper';
import Review from '../review';
class Schedule extends Component {

    constructor(props)
    {
        super(props);
        // const locArray = sessionStorage.getItem('locArr')?JSON.parse(sessionStorage.getItem('locArr')):[];
        this.state = {
            data : {
                pickup_point: '',
                pp_street :'',
                pickup_date: new Date().toISOString().slice(0,10),
                pickup_time: '',
                description: '',
                sku: '',
                quantity:'',
                estimated_cost:0,
                total_estimated_cost:0,
                destination_street:'',
                destination:'',
                receiver_name:'',
                receiver_phone: '',
                receiver_email: '',
            },
            parcelList:[],
            locArr:[],
            isParcel:false,
            doReview:false,
            hasUpdated:false,
            userData:sessionStorage.getItem('userData')?JSON.parse(sessionStorage.getItem('userData')):{}
        }
    }

     __resetState=()=>{
         this.setState({
             data:{ ...this.state.data,
                ...{destination_street:'',
                quantity:'',
                description:'',
                destination:'',
                sku:''}
             }
            });
      } 

    onChangeInput=(e)=>{  
        if(e)
        {
            if(e.target.name === 'receiver_phone')    
            {
                if(e.target.value.length > 11) return false;
            } 
           
            this.setState({
                data: {
                    ...this.state.data,
                    [e.target.name] : e.target.value
                }
            })

            if(e.target.name === 'destination')    
            {
                this.setState({
                    hasUpdated:true
                })
            } 
        }
    }
    
    
    onScheduled=()=>{
            const parcels = sessionStorage.getItem('parcelList') ? JSON.parse(sessionStorage.getItem('parcelList')) : [];
            const {pickup_point,pp_street,pickup_date,pickup_time,receiver_name,receiver_phone,receiver_email} = this.state.data;
            const {name,phone,email,user_type} = this.state.userData;

            if(parcels.length==0)
            {
                swal ( "Warning" ,  "Atleast one parcel needs to be added" ,  "warning" );
                return false;
            }
            else if (pickup_point === '' && pp_street === '' && pickup_time === '' && pickup_date === '' && receiver_name === '' && receiver_phone === '') {
                swal ( "Warning" ,  "Mandatory fields are missing" ,  "warning" );
                return false;
            }
            const totalCost = Array.isArray(parcels) && parcels.length > 0 ? parcels.reduce((accumulator, currentValue) => accumulator + Number(currentValue.estimated_cost), 0):0;

            const parcelObj = {  
                "pickup_point":pickup_point+','+pp_street,
                "pickup_date":pickup_date,
                "pickup_time":pickup_time,
                "parcels":parcels,
                "receiver_name":receiver_name,
                "receiver_phone":receiver_phone,
                "receiver_email":receiver_email,
                "sender_name":name, 
                "sender_phone":phone,
                "sender_email":email, 
                "cost":totalCost,
                "delivery_type_id":"2",
                "payment_type_id":0,
                "user_type_id":user_type
             }

             sessionStorage.setItem('parcel',JSON.stringify(parcelObj));

            this.setState({
                doReview:true
            })

            //console.log('state',this.state)
    
    }

    onParcel=()=>{

        if(this.state.data.sku)
        {
         //   console.log('has sku');
            const indx = this.state.parcelList.findIndex(elem => elem.sku === this.state.data.sku);
            this.state.parcelList.splice(indx,1);

            this.setState({
                parcelList: [...this.state.parcelList],
                isParcel: true
            })
        }
        else{
            this.state.data.sku = guid();
        }
        this.state.data.destination = this.state.data.destination && this.state.data.destination_street ? this.state.data.destination +','+ this.state.data.destination_street : '';
        delete this.state.data.destination_street;

        const parcelObj = {  
        description: this.state.data.description,
        sku: this.state.data.sku,
        quantity:this.state.data.quantity,
        destination:this.state.data.destination,
        estimated_cost:this.state.data.estimated_cost
        }

        this.state.parcelList.push(parcelObj);
        //console.log('parcelObj',this.state.parcelList.push(parcelObj))

        this.setState({
                parcelList: [...this.state.parcelList],
                isParcel: true
        })
        sessionStorage.setItem('parcelList',JSON.stringify(this.state.parcelList))
        // return true;

    }

    onAdd=()=>{
        if(!this.state.data.quantity || !this.state.data.destination || !this.state.data.destination_street)
        {
            swal ( "Warning" ,  "Destination,Street Address,Quantity could not be blank" ,  "warning" );
            return false;
        }  
        this.onParcel();
        this.__resetState();
    }

    removeItem=(index)=>{
        const par = sessionStorage.getItem('parcelList') ? JSON.parse(sessionStorage.getItem('parcelList')):[];
        par.splice(index,1);
        this.setState({
            ...this.state,
            parcelList: par
        })
        sessionStorage.setItem('parcelList',JSON.stringify(this.state.parcelList));
    }

    editItem=(index)=>{
        const parcel = JSON.parse(sessionStorage.getItem('parcelList'));
        const obj = {
            description:parcel[index].description,
            quantity:parcel[index].quantity,  
            destination:parcel[index].destination?parcel[index].destination.split(',')[0]:'',
            destination_street:parcel[index].destination?parcel[index].destination.split(',')[1]:'',
            sku:parcel[index].sku
        }

        this.setState({
            data:{
            ...this.state.data,...obj
         }
        })
    }

    isEmptyArray=(arr)=>{
        if(arr && arr.length>0){
            return true;
        }else{
            return false;
        }
    }

   
    onReviewBack=()=>{
        this.setState({
             ...this.state,...{doReview:false}
        })
    }


    componentDidMount()
    {    
     // this.checkLimit();
      this.onListingLocations(); 
    }

    onListingLocations = () =>{
        // swal ( "Please wait..." );
        Loading // Calling Loader
        Axios({
            url: listLocationUrl,
            method: `GET`
        })
        .then (({data})=>{
            //swal ( "Success" ,  "Welcome to Osiso" ,  "success" );
            if(data.status === "success")
            {
                this.setState({ 
                    locArr : [...data.data]})
                    
               sessionStorage.setItem('locArr',JSON.stringify([...data.data]))  // Adding location list in sessionStorage  
            }
        })
        .catch(data=>{
            swal ( "Oops" ,  "Something went wrong" ,  "error" );
        })
    }

    checkLimit=()=>{
        // Loading // Calling Loader
         let userData = sessionStorage.getItem('userData') && JSON.parse(sessionStorage.getItem('userData'));
         const userId = userData && userData.user_id || 0;
         Axios({
             url:  getOrderHistory+userId+'/check-delivery-limit',
             method: `GET`
         })
         .then (({data})=>{
             //swal ( "Success" ,  "Welcome to Osiso" ,  "success" );
             if(data.status === "success")
             {
                if(data.limitOver)
                {
                    swal("Warning",'Number of order limit is over.','warning');
                    this.props.history.push('/dashboard');
                }
                else{
                }
             }
         })
         .catch(data=>{
             swal ( "Oops" ,  "Something went wrong" ,  "error" );
         })
       }

    render() {

        const {pickup_point,date,pickup_time,pp_street,description,quantity,destination_street,destination,receiver_name,receiver_email,receiver_phone} = this.state.data;
        const {locArr,parcelList,doReview} = this.state;
        return (
            <div className="xs-12">
                <div className="top">
                    <div className="box">
                        <div className="head">
                            <p>Schedule Delivery</p>
                        </div>
                        <hr/>
                        {/* <Payment data={this.state.data} getReference={this.getReference}/> */}
                        {doReview?<Review onBack={this.onReviewBack}/>:<div className="xs-12 content">
                            <div className="xs-12 sm-12 md-8 lg-8">
                                <div className="inner">
                                <div className="xs-12 top">
                                        <div className="box shadow">
                                            <div className="xs-12 head">
                                                <div className="xs-12">
                                                    <div className="xs-12">
                                                        <Label>PICKUP POINT</Label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="xs-12 content">
                                                <div className="form">
                                                    <div className="xs-12">
                                                        <div className="xs-12 sm-12 md-6 lg-6">
                                                            <div className="inner">
                                                               
                                                                    <InputCustom 
                                                                    labelname="From"
                                                                    type="select-loc"
                                                                    placeholder=""
                                                                    value={pickup_point}
                                                                    onChange={this.onChangeInput}
                                                                    name="pickup_point"
                                                                    customclass="location"
                                                                    option={locArr}/>
                                                             
                                                            </div>
                                                        </div>
                                                        <div className="xs-12 sm-12 md-6 lg-6">
                                                            <div className="inner">
                                                                
                                                                <InputCustom 
                                                                    labelname="Street Address"
                                                                    type="text"
                                                                    placeholder=""
                                                                    value={pp_street}
                                                                    onChange={this.onChangeInput}
                                                                    name="pp_street"
                                                                    customclass=""
                                                                    />
                                                               
                                                            </div>
                                                        </div>
                                                    </div>  

                                                    <div className="xs-12">
                                                        <div className="xs-12 sm-12 md-6 lg-6">
                                                            <div className="inner">
                                                            <InputCustom
                                                                labelname="Pickup Date"
                                                                type="date"
                                                                placeholder=""
                                                                value={date}
                                                                onChange={this.onChangeInput}
                                                                name="pickup_date"
                                                                customclass=""
                                                            />
                                                             
                                                            </div>
                                                        </div>
                                                        <div className="xs-12 sm-12 md-6 lg-6">
                                                            <div className="inner"> 
                                                            <InputCustom
                                                                labelname="Pickup time"
                                                                type="time"
                                                                placeholder=""
                                                                value={pickup_time}
                                                                onChange={this.onChangeInput}
                                                                name="pickup_time"
                                                                customclass=""
                                                            />
                                                            </div>
                                                        </div>
                                                    </div>  
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="xs-12 top">
                                        <div className="box shadow">
                                            <div className="xs-12 head">
                                                <div className="xs-12">
                                                    <div className="xs-8 sm-8 md-10 lg-10">
                                                        <Label>PARCEL DETAILS</Label>
                                                    </div>
                                                    <div className="xs-2 sm-2 md-1 lg-1">
                                                        <img src={Add} className="onHover" alt="add" onClick={this.onAdd}/>
                                                    </div>
                                                    <div className="xs-2 sm-2 md-1 lg-1">
                                                        <img src={Minus} className="onHover" alt="clear" onClick={this.__resetState}/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="xs-12 content">

                                                <div className="form">
                                                    <div className="xs-12">
                                                        <div className="xs-12 sm-12 md-6 lg-6">
                                                            <div className="inner">
                                                                
                                                                <InputCustom 
                                                                    labelname="To"
                                                                    type="select-loc"
                                                                    placeholder=""
                                                                    value={destination}
                                                                    onChange={this.onChangeInput}
                                                                    name="destination"
                                                                    customclass="destination"
                                                                    option={locArr}
                                                                    />
                                                                
                                                            </div>
                                                        </div>
                                                        <div className="xs-12 sm-12 md-6 lg-6">
                                                            <div className="inner">
                                                               
                                                                <InputCustom 
                                                                    labelname="Destination Address"
                                                                    type="text"
                                                                    placeholder=""
                                                                    value={destination_street}
                                                                    onChange={this.onChangeInput}
                                                                    name="destination_street"
                                                                    customclass=""
                                                                    />
                                                            </div>
                                                        </div>
                                                    </div>  
                                                    <div className="xs-12">
                                                        <div className="xs-12 sm-12 md-6 lg-6">
                                                            <div className="inner">
                                                            <InputCustom 
                                                                    labelname="Quantity"
                                                                    type="number"
                                                                    placeholder=""
                                                                    value={quantity}
                                                                    onChange={this.onChangeInput}
                                                                    name="quantity"
                                                                    customclass=""
                                                                    />
                                                            </div>
                                                        </div>
                                                        <div className="xs-12 sm-12 md-6 lg-6">
                                                            <div className="inner">
                                                            <InputCustom 
                                                                    labelname="Item Description"
                                                                    type="text"
                                                                    placeholder=""
                                                                    value={description}
                                                                    onChange={this.onChangeInput}
                                                                    name="description"
                                                                    customclass=""
                                                                    />
                                                            </div>
                                                        </div>
                                                    </div>  
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="xs-12">
                                        <div className="box shadow">
                                            <div className="xs-12 head">
                                                <div className="xs-12">
                                                    <Label>RECEIVER DETAILS</Label>
                                                </div>
                                            </div>
                                            <div className="xs-12 content">
                                                <div className="form">
                                                      
                                                    <div className="xs-12">
                                                        <div className="xs-12 sm-12 md-6 lg-6">
                                                            <div className="inner">
                                                            <InputCustom 
                                                                    labelname="Name"
                                                                    type="text"
                                                                    placeholder=""
                                                                    value={receiver_name}
                                                                    onChange={this.onChangeInput}
                                                                    name="receiver_name"
                                                                    customclass=""
                                                                    />
                                                            </div>
                                                        </div>
                                                        <div className="xs-12 sm-12 md-6 lg-6">
                                                            <div className="inner">
                                                            <InputCustom 
                                                                    labelname="Email"
                                                                    type="text"
                                                                    placeholder=""
                                                                    value={receiver_email}
                                                                    onChange={this.onChangeInput}
                                                                    name="receiver_email"
                                                                    customclass=""
                                                                    />
                                                            </div>
                                                            <div>
                                                            { new RegExp('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$').test(receiver_email) ? '':<label style={{float:'right',color:'red'}}> Email is Blank/Invalid</label>}  
                                                           </div>
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="xs-12">
                                                        <div className="xs-12 sm-12 md-6 lg-6">
                                                            <div className="inner">
                                                            <InputCustom 
                                                                    labelname="Phone Number"
                                                                    type="number"
                                                                    placeholder=""
                                                                    value={receiver_phone}
                                                                    onChange={this.onChangeInput}
                                                                    name="receiver_phone"
                                                                    customclass=""
                                                                    />
                                                            </div>

                                                            <div>
                                                            { receiver_phone ? receiver_phone.length>11 || receiver_phone.length<11 ? <label style={{float:'right',color:'red'}}> Phone Number is Blank/Invalid</label> : '' : ''}
                                                            </div>
                                                        </div>
                                                        <div className="xs-12 sm-12 md-6 lg-6">
                                                            {/* <div className="inner">
                                                            
                                                            </div> */}
                                                        </div>
                                                    </div> 

                                                    <div className="xs-12 md-12 lg-12">
                                                    <Row>
                                                        <Col lg={3}></Col>
                                                        <Col lg={6}>
                                                            <Button block onClick={this.onScheduled}>SCHEDULE</Button>
                                                        </Col>
                                                        <Col lg={3}></Col>
                                                    </Row>
                                                    </div> 
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="xs-12 sm-12 md-4 lg-4">
                                <div className="inner">
                                    <div className="xs-12 top">
                                        <div className="box shadow">
                                            <div className="xs-12 head">
                                                <div className="xs-12">
                                                    {/* <Label>SET DATE AND TIME</Label> */}
                                                </div>
                                            </div>
                                            <div className="xs-12 content">
                                                {/* <div className="form">
                                                    <div className="xs-12 btngroup top">
                                                        <div className="xs-4"><Button className="active" block>DAY</Button></div>
                                                        <div className="xs-4"><Button block>MONTH</Button></div>
                                                        <div className="xs-4"><Button block>YEAR</Button></div>
                                                    </div>  
                                                    <div className="xs-12">
                                                        <div className="xs-12">
                                                            <div className="inner">
                                                                <FormGroup>
                                                                    <Input type="text" name="pickup" placeholder="select time"/>
                                                                </FormGroup>
                                                            </div>
                                                        </div>
                                                    </div> 
                                                </div> */}

                                                 <div className="boxin" >
                                                    <label>ORDER SUMMARY</label>
                                                    {this.isEmptyArray(parcelList) ? parcelList.map((p,i)=>(
                                                        <p key={i}>Parcel SKU - {p.sku} <img src={MinusP} onClick={()=>this.removeItem(i)} alt="minus" title="minus"/>
                                                        <img src={Edit} onClick={()=>this.editItem(i)} style={{marginLeft:'5px'}} alt="edit" title="edit"/></p> 
                                                    )):sessionStorage.getItem('parcelList')?JSON.parse(sessionStorage.getItem('parcelList')).map((p,i)=>(
                                                        <p key={i}>Parcel SKU - {p.sku} <img src={MinusP} onClick={()=>this.removeItem(i)} alt="minus" title="minus"/>
                                                        <img src={Edit} onClick={()=>this.editItem(i)} style={{marginLeft:'5px'}} alt="edit" title="edit"/></p> 
                                                    )):[]}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                        }
                    </div>
                </div>
            </div>
        )
    }

    componentDidUpdate()
    {
        // console.log('update',this.state)
        if(this.state.hasUpdated )
        {
            if(this.state.data.pickup_point && this.state.data.destination)
            {
                this.setState({
                    hasUpdated:false
                })
                Axios({
                    url: getRatesUrl+'from_lga_id='+this.state.data.pickup_point+'&to_lga_id='+this.state.data.destination,
                    method: `GET`
                })
                .then (({data})=>{
                    //swal ( "Success" ,  "Welcome to Osiso" ,  "success" );
                    if(data.status === "success")
                    {
                        if(data.data.cost){
                        const estCost = {estimated_cost:data.data.cost};
                        this.setState({
                            data:{
                            ...this.state.data,...estCost
                         }
                        })
                    }
                    else{
                        this.setState({
                            data:{
                                ...this.state.data,...{destination:''}
                            }
                            })
                        swal('Sorry','Sorry we do not cover this location for now. We will update you when we do. Thank You','info'); 
                    }
                    //    console.log('state',this.state)
                    }
                    
                })
                .catch(data=>{
                    swal ( "Oops" ,  "Something went wrong" ,  "error" );
                })
            }
        }
    }
}

export default withRouter(Schedule);