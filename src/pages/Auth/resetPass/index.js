import React,{Component} from 'react';
import {Container} from '../auth.style';
import {Link} from 'react-router-dom';
import Input from '../../../appComponents/Input';
import Button from '../../../appComponents/button';
import {resetPassUrl} from '../../../helpers/apiEndpoints';
import Axios from 'axios';
import swal from 'sweetalert';
import Event from '../../../event';

class ResetPassword extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            isMatch:false,
            password:'',
            confirm_password:'',
            token:this.props.match.params.token
        }
        // console.log('token',this.props.match.params.token);

    }

    onChangeEmailPass=(e)=>{
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        })
    }
    

    onChangingPassword = () =>{
        if(!this.state.password && !this.state.confirm_password )
        {
            swal ( "Warning" ,  "Password or Confirm Password could not be blank" ,  "warning" );
            return false;
        }
        Event.emit('load', true);
        Axios({
            url: resetPassUrl,
            method: `POST`,
            data: {
                password:this.state.password,
                token:this.state.token
            }
        })
        .then (({data})=>{
            Event.emit('load', false);
            if(data.status === 'success')
            {
                swal('Success','Password reset successfully.','success');
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

    checkPass=()=>{
        if(this.state.password === this.state.confirm_password)
        {
            return true;
        }
        else{
            return false;
        }
    }

    
    render() {

        const redColor = "#FF0000";
        const {isMatch} = this.state;
    
        return (
            <Container>
                <div className="box">
                    <div className="xs-12">
                        <div className="xs-12">
                            <h1>Reset Password</h1>
                        </div>

                        <Input
                            labelname="Password"
                            type="password"
                            placeholder=""
                            value={this.state.password}
                            onChange={this.onChangeEmailPass}
                            name="password"
                        />

                        <Input
                            labelname="Confirm Password"
                            type="password"
                            placeholder=""
                            value={this.state.confirm_password}
                            onChange={this.onChangeEmailPass}
                            name="confirm_password"
                        />
                        {this.checkPass() === false ?<span style={{color:redColor}}>Password and Confirm Password should be same.</span>:''}
                        <Button
                            title="Change Password"
                            progress={false}
                            onAction={this.onChangingPassword}
                            customstyle={""}    
                        />
                        
                    </div>
                </div>
            </Container>
        )
    }

    componentWillUpdate(){
        // if(this.state.password === this.state.confirm_password)
        // {
        //     this.setState({
        //         ...this.state,...{isMatch:true}
        //     }); 
            
        // }
        // else{
        //     this.setState({
        //         ...this.state,...{isMatch:false}
        //     }); 
            
        // }

    }
}

export default ResetPassword;