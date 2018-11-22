import React,{Component} from 'react';
import {Container} from '../auth.style';
import {Link} from 'react-router-dom';
import Input from '../../../appComponents/Input';
import Button from '../../../appComponents/button';
import {forgetPassUrl} from '../../../helpers/apiEndpoints';
import Axios from 'axios';
import swal from 'sweetalert';
import Event from '../../../event';

class ForgetPassword extends Component {

    constructor()
    {
        super();
        this.state = {
            isAuth:false,
            ephone:'',
        }
    }

    onChangeEmailPass=(e)=>{
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        })
    }
    

    onSendingMsg = () =>{
        if(!this.state.ephone )
        {
            swal ( "Warning" ,  "Email or Phone Number could not be blank" ,  "warning" );
            return false;
        }
        Event.emit('load', true);
        Axios({
            url: forgetPassUrl,
            method: `POST`,
            data: {
                ephone:this.state.ephone
            }
        })
        .then (({data})=>{
            Event.emit('load', false);
            if(data.status === 'success')
            {
                swal('Success',data.message,'success');   
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
                            <h1>Forgot Password</h1>
                        </div>
                        <Input
                            labelname="Email / Phone Number"
                            type="text"
                            placeholder=""
                            value={this.state.ephone}
                            onChange={this.onChangeEmailPass}
                            name="ephone"
                        />
                        <Button
                            title="Send"
                            progress={false}
                            onAction={this.onSendingMsg}
                            customstyle={""}    
                        />
                        
                    </div>
                </div>
            </Container>
        )
    }
}

export default ForgetPassword;