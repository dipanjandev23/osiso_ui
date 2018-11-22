import React from 'react';
import Input from '../../../../appComponents/Input';

export const Receiver=(props)=> {
    const { email,phone,lname,fname,getReceiverDetails } = props;
    return (
        <div className="xs-12 sm-9 box">
            <div className="xs-12 header">
                <div><label>RECEIVER DETAILS</label></div>
            </div>
            <div className="xs-12 outer bottom">
            <div className="xs-12 sm-12 md-6 lg-6 xlg-6 outer bottom">
                <Input
                        labelname="First Name"
                        type="text"
                        placeholder=""
                        value={fname}
                        onChange={getReceiverDetails}
                        name="receiver_fname"
                        customclass=""
                    />
            </div>
                
            <div className="xs-12 sm-12 md-6 lg-6 xlg-6 outer bottom">
                <Input
                        labelname="Surname"
                        type="text"
                        placeholder=""
                        value={lname}
                        onChange={getReceiverDetails}
                        name="receiver_lname"
                        customclass=""
                    />
            </div>

            </div>
            <div className="xs-12">
                <div className="xs-12 sm-12 md-6 lg-6 xlg-6 outer bottom">
                    <Input
                        labelname="Phone Number"
                        type="number"
                        placeholder=""
                        value={phone}
                        onChange={getReceiverDetails}
                        name="receiver_phone"
                        customclass=""
                    />
                    <div>
                     { phone ? phone.length>11 || phone.length<11 ? <label style={{float:'right',color:'red'}}> Phone Number is Blank/Invalid</label> : '' : ''}
                     </div>
                </div>
                <div className="xs-12 sm-12 md-6 lg-6 xlg-6 outer bottom">
                    <Input
                        labelname="Email"
                        type="email"
                        placeholder=""
                        value={email}
                        onChange={getReceiverDetails}
                        name="receiver_email"
                        customclass=""
                    />

                    <div>
                { new RegExp('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$').test(email) ? '':<label style={{float:'right',color:'red'}}> Email is Blank/Invalid</label>}
                
            </div>
                </div>
            </div>
            
        </div>
    )
}