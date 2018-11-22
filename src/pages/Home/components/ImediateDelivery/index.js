import React from 'react';
import {Link} from 'react-router-dom';
import {listLocationUrl,getRatesUrl} from '../../../../helpers/apiEndpoints';
import Input from '../../../../appComponents/Input';
import Axios from 'axios';
import swal from 'sweetalert';
import Loading from '../../../../Routes/loading';



class ImmediateDelivery extends React.Component {
    constructor() {
        super();
        this.state = {
            immediate: {
                from: '',
                to: '',
                estimated_cost: ''
            },
            locArr:[],
            hasUpdated:false
        }
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
                    locArr : [...data.data]
                })
            }
        })
        .catch(data=>{
            swal ( "Oops" ,  "Something went wrong" ,  "error" );
        })
    }

    // onNext=()=>
    // {
    //     if(!this.state.immediate.from || !this.state.immediate.to)
    //     {
    //         swal ( "Warning" ,  "Please Select Pickup and Destination Address" ,  "warning" );
    //     }
    // }


    onChange=(e)=>{
        this.setState({
            immediate:{
                ...this.state.immediate,
                [e.target.name]: e.target.value
            }
        })

        this.setState({
            hasUpdated:true
        })
    }

      componentDidMount()
      {
         this.onListingLocations();  
      }

    render() {
        const { from,to,estimated_cost } = this.state.immediate;
        const { locArr } = this.state;
        return (
            <div className="xs-12 immediate" id="deliv">
                <div className="Box">
                    <div className="header">
                        <img src={require('../../../../assets/flash.svg')} alt="flash"/> 
                        <span>Immediate Delivery</span>
                    </div>
                    <hr/>
                    <div className="xs-12 content">
                        <div className="xs-12 sm-12 md-4 lg-4 xlg-4 outer bottom">
                            <Input
                                labelname="From"
                                type="select-loc"
                                placeholder="Enter a Pick Up Location"
                                value={from}
                                onChange={this.onChange}
                                name="from"
                                customclass="location"
                                option={locArr}
                            />
                        </div>
                        <div className="xs-12 sm-12 md-4 lg-4 xlg-4 outer bottom">
                            <Input
                                labelname="To"
                                type="select-loc"
                                placeholder="Enter a Destination Location"
                                value={to}
                                onChange={this.onChange}
                                name="to"
                                customclass="destination"
                                option={locArr}
                            />

                        </div>
                        <div className="xs-12 sm-12 md-3 lg-3 xlg-3 outer bottom">
                            {/* <Input
                                labelname="Parcel Weight"
                                type="select-loc"
                                value={weight}
                                onChange={this.onChange}
                                name="weight"
                                customclass="weight"
                                placeholder="Select Parcel Weight"
                                option={locArr}
                            /> */} 

                            <div className="xs-12 estimate" style={{marginTop:40}}><p>Estimated Cost: {estimated_cost?<span>N{estimated_cost}</span>:''}</p></div>

                        </div>
                        <div className="xs-12 sm-12 md-1 lg-1 xlg-1 outer bottom">
                           {/* { from && to ? <Link to={{ pathname: '/delivery', state: { from, to, estimated_cost } }}><img src={require('../../../../assets/right.svg')} alt="right"/></Link> : 
                            <a><img src={require('../../../../assets/right.svg')} alt="right"/></a>}  */}

                            { <Link to={{ pathname: '/delivery', state: { from, to, estimated_cost } }}><img src={require('../../../../assets/right.svg')} alt="right"/></Link>} 
                        </div>
                        {/* <div className="xs-12 estimate"><p>Estimated Cost: <span>N3,500</span></p></div> */}
                    </div>
                </div>
            </div>
        )
    }

    componentDidUpdate()
    {
        if(this.state.hasUpdated)
        {
            if(this.state.immediate.from && this.state.immediate.to)
            {
                this.setState({
                    hasUpdated:false
                })
                Axios({
                    url: getRatesUrl+'from_lga_id='+this.state.immediate.from+'&to_lga_id='+this.state.immediate.to,
                    method: `GET`
                })
                .then (({data})=>{
                    //swal ( "Success" ,  "Welcome to Osiso" ,  "success" );
                    if(data.status === "success")
                    {
                        if(data.data.cost){
                            const immediate = {estimated_cost:data.data.cost};
                            this.setState({
                                immediate:{
                                    ...this.state.immediate,
                                    ...immediate
                                }
                            })
                        }
                        else{
                            this.setState({
                                immediate: {
                                    from: '',
                                    to: '',
                                    estimated_cost: ''
                                }
                            })
                            
                           swal('Sorry','Sorry we do not cover this location for now. We will update you when we do. Thank You','info'); 
                        }
                        
                    }
                })
                .catch(data=>{
                  
                        swal ( "Oops" ,  "Something went wrong" ,  "error" );
                })
            }
        }
        
    }

   
}

export default ImmediateDelivery;