import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import { Wrapper } from './header.style';
import Button from '../../../../appComponents/button';
import Navbar from '../../../../appComponents/navbar';
import Colors from '../../../../colors';
import {Modal,ModalHeader,ModalBody} from 'reactstrap';
import PaymentSubscription from '../Header/payment-subscription';
import Axios from 'axios';
import swal from 'sweetalert';
import {getOrderHistory} from '../../../../helpers/apiEndpoints';

class Header extends Component {
    constructor(props){
        super(props);
        this.state={
            businessPackageAmt:0,
            paymentModal:false
        }
    }

    togglePayment=()=>{
        this.setState({
            ...this.state,...{paymentModal : !this.state.paymentModal} 
        })
    }

    getBusinessAmount=()=>{
        let uData = sessionStorage.getItem('userData') && JSON.parse(sessionStorage.getItem('userData'));
        Axios({
            url: getOrderHistory+uData.user_id+'/business-package-amount',
            method: `GET`,
            header: {
                "ContentType":"application/json"
            }
        })
        .then (({data})=>{
            if(data.status === 'success')
            {
                this.setState({
                    ...this.state,...{businessPackageAmt:data.amount,paymentModal : !this.state.paymentModal}
                })
            }
        })
        .catch(data=>{
            console.log(data);
            swal ( "error" ,  "Something went wrong" ,  "error" );
        })
    }

    updateToActive=()=>{
        let uData = sessionStorage.getItem('userData') && JSON.parse(sessionStorage.getItem('userData'));
        swal('Please wait..')
        Axios({
            url: getOrderHistory+uData.user_id+'/change-active-status',
            method: `PATCH`,
            header: {
                "ContentType":"application/json"
            },
            data:{isActivated:true}
        })
        .then (({data})=>{
            if(data.status === 'success')
            {
                swal ( "Success" ,  "Subscription activated successfully." ,  "success" );
                uData.is_active = true;
                sessionStorage.setItem('userData',JSON.stringify(uData));
                this.togglePayment();
                window.location.reload();
            }
        })
        .catch(data=>{
            console.log(data);
            swal ( "error" ,  "Something went wrong" ,  "error" );
        })
    }


    render() {
        const isBusinessUser = sessionStorage.getItem('userData') ? JSON.parse(sessionStorage.getItem('userData')).user_type === 2 ? true : false : false;
        const isUserActive = sessionStorage.getItem('userData') && JSON.parse(sessionStorage.getItem('userData')).is_active;
        const {businessPackageAmt} = this.state;
        const wd = '100%';
        return (
            <Wrapper>
                <div className="xs-12">
                    <Navbar
                        isauth={this.props.auth}
                        bgcolor={`transparent`}
                        color={Colors.colorWhite}
                        isBusinessUser={isBusinessUser}
                    />
                    <div className="content">
                        <h1 className="title">DELIVER WITH EASE</h1>
                        <p className="lead">At Osiso, we are passionate about speedy delivery and quality customer service.</p> 
                        <p className="lead">We offer unbeatable prices on immediate deliveries across different locations in Lagos, and our business plans are tailored to suit your business needs.</p>
                        <div className="btn" style={{width:wd}}>
                        <div className="row">
                            <div className="col-md-2 col-xs-12">
                            <Button
                                title="Get Started"
                                onAction={()=>{this.props.history.push("/delivery")}}
                                progress={false}
                                bgcolor={Colors.colorOrange}
                            />
                            </div>
                            <div className="col-md-2 col-xs-12">
                            {
                                isUserActive != null  && !isUserActive ? <Button
                                title="Activate subscription"
                                onAction={()=>{this.getBusinessAmount()}}
                                progress={false}
                                bgcolor={Colors.primary}
                            /> : ''
                            }
                            </div>
                        </div>
                        </div>
                    </div>
                </div>

                {/* View Payment Modal*/}
                <Modal isOpen={this.state.paymentModal} toggle={this.togglePayment} className={this.props.className}>
                <ModalHeader toggle={this.togglePayment}>Activate your subscription</ModalHeader>
                <ModalBody>
                    <PaymentSubscription businessCost={businessPackageAmt} onPaymentDone={this.updateToActive}></PaymentSubscription>
                </ModalBody>
                </Modal>
                {/* View Payment Modal */}
            </Wrapper>
        )
    }
}

export default withRouter(Header);