import React,{Component} from 'react';
import {Link,withRouter} from 'react-router-dom';
import { Container } from '../auth.style';
import Input from '../../../appComponents/Input';
import Button from '../../../appComponents/button';
import {signupUrl} from '../../../helpers/apiEndpoints';
import Payment from '../../Auth/payment';
import Axios from 'axios';
import swal from 'sweetalert';
import Event from '../../../event';

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                business_name: '',
                address: '',
                business_description: '',
                email: '',
                password:'',
                phone: '',
                business_package_id:sessionStorage.getItem('business_package_id') || '',
                auto_renewal : false
                
            },
            isSignedUp:false,
            user_id:''
        }
    }
    onChange=(e)=>{
        if(e.target.name === 'phone')    
        {
            if(e.target.value.length > 11) return false;
        } 
        this.setState({
            data: {
                ...this.state.data,
                [e.target.name]: e.target.value
            }
        })
    }

    onCheckboxClick=(e)=>{
        this.setState({
            data:{
                ...this.state.data,
                [e.target.name]: e.target.checked
            }
        });
    }

    onSignup = () =>{
        if(!this.state.data.email)
        {
            swal ("Warning", "Email id is mandatory",'warning' );
            return false;  
        }
        else if(!this.state.data.phone)
        {
            swal ("Warning", "Phone number is mandatory",'warning' );
            return false;
        }
        else if(!this.state.data.password)
        {
            swal ("Warning", "Password is mandatory",'warning' );
            return false;
        }

        Event.emit('load', true);

        Axios({
            url: signupUrl,
            method: `POST`,
            data: {...this.state.data,"usertype_id":2,"refCode":sessionStorage.getItem('refCode') || ''}
        })
        .then (({data})=>{
            Event.emit('load', false);
            if(data.status === 'success')
            {
                swal ( "Success" ,  "Welcome to Osiso" ,  "success" );
                sessionStorage.setItem('refCode','');
                sessionStorage.setItem('business_package_id','');
                // this.props.Signup(); Later we'll change this
                //this.props.history.push("/");
                this.setState({
                    ...this.state,...{user_id:data.data.id,isSignedUp:true}
                })
            }
            else if(data.status === 'error'){
                
                swal ( "Warning" ,  data.message ,  "warning" );
            }
            // console.log('return',data)
            // this.setState({
            //     isAuth: true,
            //     step: 2
            // })
        })
        .catch(data=>{
            Event.emit('load', false);
            swal ( "Oops" ,  "Something went wrong" ,  "error" );
        })
    }
    render() {
        const {isSignedUp} = this.state;
        return (
            <Container>
                <div className="box">
                {
                    !isSignedUp ?               
                    <div className="xs-12">
                        <div className="xs-12">
                            <h1>Sign Up</h1>
                        </div>
                        <Input
                            labelname="Business Name"
                            type="text"
                            placeholder=""
                            value={this.state.data.business_name}
                            onChange={this.onChange}
                            name="business_name"
                        />
                        <Input
                            labelname="Address"
                            type="text"
                            placeholder="Enter to search for a location"
                            value={this.state.data.address}
                            onChange={this.onChange}
                            name="address"
                        />
                        <Input
                            labelname="Business Description"
                            type="text"
                            placeholder="Tell us briefly what your business is all about"
                            value={this.state.data.business_description}
                            onChange={this.onChange}
                            name="business_description"
                        />
                        <Input
                            labelname="Email Address"
                            type="text"
                            placeholder=""
                            value={this.state.data.email}
                            onChange={this.onChange}
                            name="email"
                        />
                        <div style={{display:'inline-block',width:'100%'}}>
                { new RegExp('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$').test(this.state.data.email) ? '' :<label style={{float:'right',color:'red'}}> Email is Invalid</label>}
                    </div>
                        <Input
                            labelname="Password"
                            type="password"
                            placeholder=""
                            value={this.state.data.password}
                            onChange={this.onChange}
                            name="password"
                        />
                        <Input
                            labelname="Phone Number"
                            type="number"
                            placeholder=""
                            value={this.state.data.phone}
                            onChange={this.onChange}
                            name="phone"
                        />
                         {/* <div> */}
                        { this.state.data.phone ? this.state.data.phone.length>11 || this.state.data.phone.length<11 ? <label style={{float:'right',color:'red'}}> Phone Number is Invalid</label> : '' : ''}
                        {/* </div> */}
                        
                        <div class="checkbox">
                        <input type="checkbox" id="checkbox_1" onClick={this.onCheckboxClick} name="auto_renewal" value={this.state.data.auto_renewal}/>
                        <label for="checkbox_1">Auto renew package</label>
                    </div>
                        <Button
                            title="Sign Up"
                            progress={false}
                            onAction={this.onSignup}
                            customstyle={""}    
                        />
                        <div className="xs-12 center">
                            <span>Already a User?</span> <Link to="/login">Sign in</Link>
                        </div>
                    </div>
                    :
                    // Payment here
                    <Payment senderEmail={this.state.data.email} user_id={this.state.user_id}></Payment>
                    }
                </div>
            </Container>
        )
    }

    // componentWillUpdate(){
    //     this.setState({
    //         ...this.state,...{isSignedUp:true}
    //     })
    // }
}

export default withRouter(SignUp);
