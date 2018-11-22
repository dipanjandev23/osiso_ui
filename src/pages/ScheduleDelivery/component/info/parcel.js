import React from 'react';
import Input from '../../../../appComponents/Input';
import Minus from '../../../../assets/minus.svg';
import Edit from '../../../../assets/edit.svg';
import {getRatesUrl} from '../../../../helpers/apiEndpoints';
import Axios from 'axios';
import swal from 'sweetalert';

class Parcel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                description: '',
                sku: '',
                quantity:'',
                destination_street:'',
                destination:'',
                estimated_cost:0
            },
            parcelList:[],
            hasUpdated:false
        }

        this.baseState = this.state.data;
       
    }
   
    __resetState=()=>{
        this.setState({
            data:{...this.state.data,...this.baseState}});
        
     } 

    onChange=(e)=>{
        this.setState({
            data: {
                ...this.state.data,
                [e.target.name]: e.target.value
            }
        })

        if(e.target.name === 'destination')
        {
            this.setState({
                hasUpdated:true
            })
        }


        // console.log('state',this.state.data)
    }
    onAdd=()=>{
        if(!this.state.data.quantity || !this.state.data.destination || !this.state.data.destination_street)
        {
            swal ( "Warning" ,  "Destination,Street Address,Quantity could not be blank" ,  "warning" );
            return false;
        }
        const ret = this.props.getParcel(this.state.data);
        const localParcel= JSON.parse(sessionStorage.getItem('parcelList'));
        
        if(ret)
        {
            this.setState({parcelList:[...localParcel]})
        }
        this.__resetState();    
    }

    removeItem=(index)=>{
        const retRemove = this.props.onRemove(index); // Calling remove item in index.js(Parent Component)
        const localParcel= JSON.parse(sessionStorage.getItem('parcelList'));
        if(retRemove)
        {
            this.setState({parcelList:[...localParcel]})
        }
        this.__resetState(); 
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

    componentWillMount(){
        this.setState({
            data:{
            ...this.state.data,...{destination:this.props.destination}
            }
        })
    }

    render() {
       
        const {
            // pickup,time,getParcelDetails,onEdit,
            locArr} = this.props;
        const {description,quantity,destination_street,destination} = this.state.data;
        const {parcelList} = this.state;
        // const option = [1,2,3,4,5,6,7,7.5];

        return (
            <div>
            <div className="xs-12 sm-9 box">
                <div className="xs-12 header">
                    <div className="xs-9 sm-10 md-10 lg-10 xlg-10"><label>PARCEL DETAILS</label></div>
                    <div className="xs-2 sm-1 md-1 lg-1 xlg-1"><img src={require('../../../../assets/add.svg')} alt="add" onClick={this.onAdd} title="Add parcel"/></div>
                    <div className="xs-1 sm-1 md-1 lg-1 xlg-1"><img src={require('../../../../assets/minus_red.svg')} alt="minus" onClick={this.__resetState} title="Clear"/></div>
                    {/* <div className="xs-1 sm-1 md-1 lg-1 xlg-1"><label onClick={this.__resetState} className="lblanchor">Clear</label></div> */}
                </div>
                <div className="xs-12">
                    <div className="xs-12 sm-12 md-6 lg-6 xlg-6 outer bottom">
                    <Input
                            labelname="To"
                            type="select-loc"
                            placeholder="Select Destination"
                            value={destination}
                            onChange={this.onChange}
                            name="destination"
                            customclass="destination"
                            option={locArr}
                        />
                    </div>
                    <div className="xs-12 sm-12 md-6 lg-6 xlg-6 outer bottom">
                        <Input
                            labelname="Destination Street"
                            type="text"
                            placeholder=""
                            value={destination_street}
                            onChange={this.onChange}
                            name="destination_street"
                            customclass=""
                        />
                    </div>
                </div>
                <div className="xs-12">
                    <div className="xs-12 sm-12 md-6 lg-6 xlg-6 outer bottom">
                        {/* <Input
                            labelname=""
                            type="select"
                            placeholder="Parcel weight"
                            value={weight}
                            onChange={this.onChange}
                            name="weight"
                            customclass=""
                            option={option}
                        /> */}
                        <Input
                            labelname="Quantity"
                            type="number"
                            placeholder=""
                            value={quantity}
                            onChange={this.onChange}
                            name="quantity"
                            customclass=""
                        />
                        </div>
                        <div className="xs-12 sm-12 md-6 lg-6 xlg-6 outer bottom">
                        <Input
                            labelname="Item Description"
                            type="text"
                            placeholder=""
                            value={description}
                            onChange={this.onChange}
                            name="description"
                            customclass=""
                        />
                    </div>
                 </div>
                <div>
                    <div className="xs-12 sm-12 md-6 lg-6 xlg-6 outer bottom">
                        
                    </div>
                    <div className="xs-12 sm-12 md-6 lg-6 xlg-6 outer bottom">
                        
                    </div>
                </div>
            </div>
            <div className="xs-12 sm-3" style={{padding:5}}>
            <div className="boxin" >
                    <label>ORDER SUMMARY</label>
                    {this.isEmptyArray(parcelList) ? parcelList.map((p,i)=>(
                        <p key={i}>Parcel SKU - {p.sku} <img src={Minus} onClick={()=>this.removeItem(i)} alt="minus" title="minus"/>
                        <img src={Edit} onClick={()=>this.editItem(i)} style={{marginLeft:'5px'}} alt="edit" title="edit"/></p> 
                    )):sessionStorage.getItem('parcelList')?JSON.parse(sessionStorage.getItem('parcelList')).map((p,i)=>(
                        <p key={i}>Parcel SKU - {p.sku} <img src={Minus} onClick={()=>this.removeItem(i)} alt="minus" title="minus"/>
                        <img src={Edit} onClick={()=>this.editItem(i)} style={{marginLeft:'5px'}} alt="edit" title="edit"/></p> 
                    )):[]}
                </div>
            </div>
            </div>
        )
    }

    componentDidUpdate()
    {
        if(this.state.hasUpdated )
        {
            if(this.props.pickupPoint && this.state.data.destination)
            {
                this.setState({
                    hasUpdated:false
                })
                Axios({
                    url: getRatesUrl+'from_lga_id='+this.props.pickupPoint+'&to_lga_id='+this.state.data.destination,
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
                       // console.log('state',this.state)
                    }
                })
                .catch(data=>{
                    swal ( "Oops" ,  "Something went wrong" ,  "error" );
                })
            }
        }
    }
}

export default Parcel;