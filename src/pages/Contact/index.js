import React,{Component} from 'react';
import {Wrapper} from './contact.style';
import {NavLink, Switch, Route,Link} from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import Navbar from '../../appComponents/navbar';
import Footer from '../../appComponents/footer';
import Colors from '../../colors';
import Input from '../../appComponents/Input';
import Button from '../../appComponents/button';
import swal from 'sweetalert';
import Axios from 'axios';
import Loading from '../../Routes/loading';
import {getPolicy,contactUs} from '../../helpers/apiEndpoints';
import Event from '../../event';

class Contact extends Component {
    constructor() {
        super();
        this.state = {
            data:{
                name:'',
                email_id:'',
                message:''
            },
            email:'',
            phone:'',
            address:''
        }
    }

    onChangeText=(e)=>{
        this.setState({
            data: {
                ...this.state.data,
                [e.target.name] : e.target.value
            }
        })
    }

    componentDidMount()
    {    
      this.onListingTermsCondition();  
    }

    onListingTermsCondition =()=>{
        // swal ( "Please wait..." );
        Event.emit('load',true); // Calling Loader
        Axios({
            url: getPolicy+'/contact-us',
            method: `GET`
        })
        .then (({data})=>{
            //swal ( "Success" ,  "Welcome to Osiso" ,  "success" );
            Event.emit('load',false);
            if(data.status === "success")
            {
                this.setState({ 
                    ...this.state,...{email:data.data.email,phone:data.data.phone,address:data.data.address}
                })
            }
        })
        .catch(data=>{
            Event.emit('load',false);
            swal ( "Oops" ,  "Something went wrong" ,  "error" );
        })
    }

    sendMessage=()=>{
         // swal ( "Please wait..." );
         Event.emit('load',true); // Calling Loader
         Axios({
             url: contactUs,
             method: `POST`,
             data:{...this.state.data}
         })
         .then (({data})=>{
             //swal ( "Success" ,  "Welcome to Osiso" ,  "success" );
             Event.emit('load',false);
             if(data.status === "success")
             {
                 this.setState({ 
                     data: {
                         name: '',
                         email_id: '',
                         message: ''
                     }
                 });
                 swal('Success', 'Message has been sent successfully', 'success');
             } else {
                 swal('Warning', data.message, 'warning');
             }
         })
         .catch(data=>{
            Event.emit('load',false);
             swal ( "Oops" ,  "Something went wrong" ,  "error" );
         })
    }


    render() {
        const {email,phone,address} = this.state;
        const {name,email_id,message} = this.state.data;
        const isAuth = sessionStorage.getItem('userData') ? true : false;
        const isBusinessUser = sessionStorage.getItem('userData') ? JSON.parse(sessionStorage.getItem('userData')).user_type === 2 ? true : false : false;

        return (
            <div className="xs-12 animated fadeIn">
                <Navbar
                    isauth={isAuth}
                    bgcolor={Colors.primary}
                    color={Colors.colorWhite}
                    isBusinessUser={isBusinessUser}
                />
                <Wrapper>
                <Breadcrumb>
                    <BreadcrumbItem><a><Link to="/">Home</Link></a></BreadcrumbItem>
                    <BreadcrumbItem active>Contact Us</BreadcrumbItem>
                </Breadcrumb>
                    <div className="xs-12 sm-12">
                       <div className="xs-12 sm-5">

                       <div className="box-text">
                        <h4>CONTACT US</h4>
                        <div className="xs-12 sm-12 md-12 lg-12 xlg-12" style={{padding:10}}>
                        <div className="xs-3 sm-1 md-1 lg-1 xlg-1">
                        <img src={require('../../assets/conhome.svg')} alt="Home" style={{height:24}}/>
                        </div>
                        <div className="xs-9 sm-11 md-11 lg-11 xlg-11">
                        <label>{address}</label>
                        </div>
                        </div>

                        <div className="xs-12 sm-12 md-12 lg-12 xlg-12" style={{padding:10}}>
                        <div className="xs-3 sm-1 md-1 lg-1 xlg-1">
                        <img src={require('../../assets/conemail.svg')} alt="Email" style={{height:24}}/>
                        </div>
                        <div className="xs-9 sm-11 md-11 lg-11 xlg-11">
                        <label>{email}</label>
                        </div>
                        </div>

                        <div className="xs-12 sm-12 md-12 lg-12 xlg-12" style={{padding:10}}>
                        <div className="xs-3 sm-1 md-1 lg-1 xlg-1">
                        <img src={require('../../assets/conphone.svg')} alt="Phone" style={{height:24}}/>
                        </div>
                        <div className="xs-9 sm-11 md-11 lg-11 xlg-11">
                        <label>{phone}</label>
                        </div>
                        </div>

                       </div>
                       </div>

                       <div className="xs-12 sm-7">
                       <div className="xs-12 sm-9 box">
                        <div className="xs-12 header" style={{textAlign:"center"}}>
                            <div className="xs-12 sm-12 md-12 lg-12 xlg-12"><label style={{color:Colors.colorBlack}}>Let's hear from you</label></div>
                            </div>
                            <div className="xs-12">
                                <div className="xs-12 sm-12 md-12 lg-12 xlg-12 outer bottom">
                                    <Input
                                        labelname=""
                                        type="text"
                                        placeholder="Your Name"
                                        value={name}
                                        name="name"
                                        customclass=""
                                        onChange={this.onChangeText}
                                    />

                                    
                                </div>
                            </div>
                            <div className="xs-12">
                                <div className="xs-12 sm-12 md-12 lg-12 xlg-12 outer bottom">
                                    <Input
                                        labelname=""
                                        type="text"
                                        placeholder="Email Address"
                                        value={email_id}
                                        name="email_id"
                                        customclass=""
                                        onChange={this.onChangeText}
                                    />

                                    
                                </div>
                            </div>

                            <div className="xs-12">
                                <div className="xs-12 sm-12 md-12 lg-12 xlg-12 outer bottom">
                                    <Input
                                        labelname=""
                                        type="textarea"
                                        placeholder="Your Message"
                                        value={message}
                                        name="message"
                                        customclass=""
                                        onChange={this.onChangeText}
                                    />

                                    
                                </div>
                            </div>

                            <div className="btn">
                                        <Button
                                            title="Send message"
                                            onAction={()=>{this.sendMessage()}}
                                            progress={false}
                                            bgcolor={Colors.primary}
                                        />
                                    </div>
                            
                            </div>
                       </div>
                       
                    </div>
           
                    {/* <Switch>
                        {this.props.location.state !== undefined ? <Route exact path={this.props.match.path} render={()=><Info immediate={this.props.location.state} step={this.onStep}/>}/> : <Route exact path={this.props.match.path} render={()=><Info immediate={this.state.value} step={this.onStep}/>}/>}
                        <Route exact path={`${this.props.match.path}/review`} render={()=><Confirm step={this.onStep}/>}/>
                        <Route exact path={`${this.props.match.path}/payment`} component={Payment}/>
                    </Switch> */}
                </Wrapper>
                <Footer/>
            </div>
        )
    }
}

export default Contact