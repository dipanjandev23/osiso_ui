import React,{Component} from 'react';
import {Container} from '../auth.style';
import {Link} from 'react-router-dom';
import Input from '../../../appComponents/Input';
import Button from '../../../appComponents/button';
import {loginUrl} from '../../../helpers/apiEndpoints';
import Axios from 'axios';
import swal from 'sweetalert';
import Event from '../../../event';

class Login extends Component {

    constructor()
    {
        super();
        this.state = {
            isAuth:false,
            email:'',
            password:''
        }
    }

    onChangeEmailPass=(e)=>{
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        })
    }
    

    onSignin = () =>{
        if(!this.state.email || !this.state.password)
        {
            swal ( "Warning" ,  "Email or Password could not be blank" ,  "warning" );
            return false;
        }
        Event.emit('load', true);
        Axios({
            url: loginUrl,
            method: `POST`,
            data: {
                email:this.state.email,
                password:this.state.password
            }
        })
        .then (({data})=>{
            Event.emit('load', false);
            if(data.status === 'success')
            {
                if(data.data.user_type.id === 3 || data.data.user_type.id === 4)
                {
                    swal('Warning','Not Accessible','warning')
                    return false;
                }
                const userName = (data.data.user_type.id === 1) ? data.data.name : data.data.business_name;
                const userObj = {"user_id":data.data.user_id,"user_type":data.data.user_type.id,"name":userName,"email":data.data.email,"phone":data.data.phone_number,"ref_code":data.data.ref_code,"is_active":data.data.is_activated,"auto_renewal":data.data.auto_renewal};
                swal ( "Success" ,  "Welcome to Osiso" ,  "success" );
                sessionStorage.setItem('userData',JSON.stringify(userObj));
                window.location.reload();
                this.props.history.push('/');
            }else{
                swal ( "Warning" ,  data.message ,  "warning" );
            }
            
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
        return (
            <Container>
                <div className="box">
                    <div className="xs-12">
                        <div className="xs-12">
                            <h1>Login</h1>
                        </div>
                        <Input
                            labelname="Email"
                            type="email"
                            placeholder=""
                            value={this.state.email}
                            onChange={this.onChangeEmailPass}
                            name="email"
                        />
                        <Input
                            labelname="Password"
                            type="password"
                            placeholder=""
                            value={this.state.password}
                            onChange={this.onChangeEmailPass}
                            name="password"
                        />
                        <Button
                            title="Login"
                            progress={false}
                            onAction={this.onSignin}
                            customstyle={""}    
                        />
                        <div className="xs-12 center">
                            <span>Don't have an Account?</span> 
                            {/* <Link to="/signup">Sign Up</Link> */}
                        </div>

                        <div className="xs-12 center">
                             <Link to="/forgot-password">Forgot Password?</Link>
                        </div>

                    </div>
                </div>
            </Container>
        )
    }
}

export default Login;