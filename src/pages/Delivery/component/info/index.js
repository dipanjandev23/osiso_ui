import React,{Component} from 'react';
import Parcel from './parcel';
import {Receiver} from './receiver';
import {Personal} from './personal';
import {PickupPoint} from './pickup-point';
import {withRouter} from 'react-router-dom';
import {guid} from '../../../../helpers/helper';
import swal from 'sweetalert';
import Axios from 'axios';
import Loading from '../../../../Routes/loading';
import {listLocationUrl} from '../../../../helpers/apiEndpoints';


class Info extends Component {
    constructor(props) {
        super(props);
        const { from,to,weight,estimated_cost } = props.immediate;
        const parcel = JSON.parse(sessionStorage.getItem("parcel"));
        if (parcel) {
            this.state = {
                data: parcel,
                isParcel: true,
                parcelData:{},
                locArr:sessionStorage.getItem('locArr')?JSON.parse(sessionStorage.getItem('locArr')):[]
            }
        }else {
            this.state = {
                data: {
                    // pickup_point: from || '',
                    pickup_point: from,
                    pp_street :'',
                    // destination: to || '',
                    // destination_street:'',
                    pickup_date: new Date().toISOString().slice(0,10),
                    pickup_time: '',
                    parcels: [], 
                    receiver_name: '',
                    receiver_fname: '',
                    receiver_lname: '',
                    receiver_phone: '',
                    receiver_email: '',
                    sender_name: '',
                    sender_fname: '',
                    sender_lname: '',
                    sender_phone: '',
                    sender_email: '',
                    cost: 0.00,
                    delivery_type_id: '1',
                    payment_type_id: '',
                    user_type_id:''
                },
                samplew: weight,
                isParcel: false,
                parcelData:'',
                locArr:[]        
            }
        }

        // console.log('state onload',this.state)

    }
    onChange=(e)=>{  
        if(e.target.name === 'receiver_phone' || e.target.name === 'sender_phone')    
        {
            if(e.target.value.length > 11) return false;
        } 
        this.setState({
            data: {
                ...this.state.data,
                [e.target.name] : e.target.value
            }
        })
    }
    removeItem=(index)=>{
        const par = this.state.data.parcels;
        par.splice(index,1);
        this.setState({
            data: {
                ...this.state.data,
                parcels: par
            }
        })

        sessionStorage.setItem('parcelList',JSON.stringify(this.state.data.parcels))
        return true;
    }

    editItem=(index)=>{
        const parcel = this.state.data.parcels[index];
        this.setState({parcelData:parcel})
    }

    onParcel=(value)=>{

        if(value.estimated_cost === 0){
            value.estimated_cost = this.props.immediate.estimated_cost;
        }
    
        if(value.sku)
        {
         //   console.log('has sku');
            const indx = this.state.data.parcels.findIndex(elem => elem.sku === value.sku);
            this.state.data.parcels.splice(indx,1);

            this.setState({
                data:{...this.state.data,
                    parcels: [...this.state.data.parcels]
                },
                isParcel: true
            })
        }
        else{
            value.sku = guid();
        }
        value.destination = value.destination && value.destination_street ? value.destination +','+ value.destination_street : '';
        delete value.destination_street;
        this.state.data.parcels.push(value);
        this.setState({
            data:{...this.state.data,
                parcels: [...this.state.data.parcels]
            },
            isParcel: true
        })
        // console.log('inddex',this.state.data.parcels)
        sessionStorage.setItem('parcelList',JSON.stringify(this.state.data.parcels))
        return true;

    }
    onSubmit=()=>{
        const { pickup_point,pickup_date,receiver_email,receiver_fname,receiver_lname,receiver_phone,sender_email,sender_fname,sender_lname,sender_phone,pickup_time,user_type_id } = this.state.data;
        const isParcel = sessionStorage.getItem('parcelList') && JSON.parse(sessionStorage.getItem('parcelList')).length > 0 ? true : false;

        if (pickup_point !== '' && pickup_date !== '' && isParcel === true && receiver_fname !== '' && receiver_lname !== '' && receiver_phone !== '' && sender_fname !== '' && sender_lname !== '' && sender_phone !== '' && sender_email !== '' && pickup_time !== '' && user_type_id !== '') {
            this.props.step(2);
            let modifiedState = this.state.data;
            modifiedState['sender_name'] = this.state.data.sender_fname +' '+ this.state.data.sender_lname;
            modifiedState['receiver_name'] = this.state.data.receiver_fname +' '+ this.state.data.receiver_lname;
            sessionStorage.setItem("parcel", JSON.stringify(this.state.data));
            this.props.history.push('delivery/review');
        }
        else if(!isParcel)
        {
            swal ( "Warning" ,  "Please add parcel details to proceed" ,  "warning" )
        }else {
            swal ( "Oops" ,  "Please Fill in All Details!" ,  "error" )
        }
    }

    componentDidMount()
    {    
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

    render() {
        
        const {samplew,parcelData,locArr} = this.state;

        const { pickup_point,pp_street,destination,destination_street,pickup_date,parcels,receiver_email,receiver_name,receiver_phone,sender_email,sender_name,sender_phone,pickup_time } = this.state.data;

        return (
            <div className="xs-12 animated fadeIn">
                <div>
                    {/* <div className="xs-12 sm-12 md-8 lg-9 xlg-9 outer"> */}
                    <div className="xs-12 sm-12 md-12 lg-12 xlg-12 outer">
                        <div>
                            <PickupPoint 
                                getPickupPointData={this.onChange}
                                pickup_point={pickup_point}
                                pp_street_address={pp_street}
                                pickup_time={pickup_time}
                                locArr={locArr}
                          />
                            <Parcel 
                                getParcelDetails={this.onChange}
                                // pickup={pickup_point}
                                destination={destination}
                                destination_street={destination_street}
                                date={pickup_date}
                                // time={pickup_time}
                                getParcel={this.onParcel}
                                parceldetails={samplew}
                                onEdit={parcelData}
                                onRemove={this.removeItem}
                                locArr={locArr}
                                pickupPoint={pickup_point}
                                destination={this.props.immediate.to}
                            />
                            <Receiver
                                email={receiver_email}
                                name={receiver_name}
                                phone={receiver_phone}
                                getReceiverDetails={this.onChange}
                            />
                           
                            <Personal
                                email={sender_email}
                                name={sender_name}
                                phone={sender_phone}
                                getSenderDetails={this.onChange}
                                onSubmit={this.onSubmit}
                            />
                        </div>
                    </div>
                    <div className="xs-12 sm-12 md-4 lg-3 xlg-3 outer">
                        {/* <div className="boxin">
                            <label>ORDER SUMMARY</label>
                            {parcels.map((p,i)=>(
                                <p key={i}>Parcel SKU -{p.sku} <img src={Minus} onClick={()=>this.removeItem(i)} alt="minus" title="minus"/>
                                <img src={Edit} onClick={()=>this.editItem(i)} style={{marginLeft:'5px'}} alt="edit" title="edit"/></p> 
                            ))}
                        </div> */}
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Info);