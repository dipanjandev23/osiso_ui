import React, {Component} from 'react';
import {Container} from './auth.style';
import Message from '../../assets/msg.svg';
import {Row, Col, FormGroup, Label, Input, Button} from 'reactstrap';
import SignUp from './SignUp';
import Color from '../../colors';


const ConfirmEmail=(props)=> {
    return (
        <div className="xs-12 main">
        <div className="box confirmMail">
            <div className="xs-12">
                <div className="xs-12">
                <img src={Message} alt="message" className="signupMsg"/>
                <h1>We’ve sent a confirmation email to your email address, check your email and follow the link to confirm your account</h1>
                <hr/>
                <p>didn’t receive email? Use <span onClick={props.ConfirmEmail} style={{color:Color.primary,textDecoration:'underline'}}>Phone Number</span> instead</p>
            </div>
            </div>
            </div>
        </div>
    )
}

const ConfirmOTP=(props)=> {
    return (
        <div className="xs-12 main">
        <div className="box confirmMail">
        <div className="xs-12 main">
            <div className="confirmOTPbox">
                <h1>Please enter the OTP sent to your phone to confirm your account</h1>
                <Row>
                    <Col xs="12">
                        <FormGroup>
                            <Input type="text" name="" placeholder="Enter OTP" />
                        </FormGroup>
                    </Col>
                    <Col xs="12">
                        <Button color="primary" onClick={props.Verify} className="primary" size="lg" block>Verify Account</Button>
                    </Col> 
                </Row>              
                <hr/>
                <p>didn’t receive a code? Use<span style={{color:Color.primary,textDecoration:'underline'}}> Email address</span> instead</p>
            </div>
        </div>
        </div>
        </div>
    )
}

class Auth extends Component {
    constructor() {
        super();
        this.state = {
            message: 'signup'
        }
    }
    onSignUp=()=> {
        this.setState({
            message: 'confirmemail'
        })
    }
    onConfirmEmail=()=> {
        this.setState({
            message: 'confirmOTP'
        })
    }
    onVerify=()=> {
        this.setState({
            message: 'verified'
        })
    }

    render() {
        switch(this.state.message) {
            case 'signup':
            return (
                <Container>
                    <SignUp Signup={this.onSignUp}/>
                </Container>
            )
            case 'confirmemail':
            return (
                <Container>
                    <ConfirmEmail ConfirmEmail={this.onConfirmEmail}/>
                </Container>
            )
            case 'confirmOTP':
            return (
                <Container>
                    <ConfirmOTP Verify={this.onVerify}/>
                </Container>
            )
            case 'verified':
            this.props.history.push("/")
            break;
            default: 
            return (
                <div></div>
            )
        }
    }
}

export default Auth;