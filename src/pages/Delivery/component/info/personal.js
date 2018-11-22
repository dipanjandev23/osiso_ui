import React from 'react';
import Input from '../../../../appComponents/Input';

export const Personal=(props)=> {
    const { email,phone,fname,lname,getSenderDetails,onSubmit } = props;
    return (
        <div className="xs-12 sm-9 box">
            <div className="xs-12 header">
                <div><label>YOUR DETAILS</label></div>
            </div>
            <div className="xs-12 outer bottom">
            <div className="xs-12 sm-12 md-6 lg-6 xlg-6 outer bottom">
                <Input
                        labelname="First Name"
                        type="text"
                        placeholder=""
                        value={fname}
                        onChange={getSenderDetails}
                        name="sender_fname"
                        customclass=""
                    />
            </div>

            <div className="xs-12 sm-12 md-6 lg-6 xlg-6 outer bottom">
                <Input
                        labelname="Surname"
                        type="text"
                        placeholder=""
                        value={lname}
                        onChange={getSenderDetails}
                        name="sender_lname"
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
                        onChange={getSenderDetails}
                        name="sender_phone"
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
                        onChange={getSenderDetails}
                        name="sender_email"
                        customclass=""
                    />
                 <div>
                { new RegExp('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$').test(email) ? '':<label style={{float:'right',color:'red'}}> Email is blank/Invalid</label>}
                 </div>
                </div>
            </div>            
            {/* <Row>
                <Col xs={8} sm={9} md={9} lg={10} className="header">
                    <Label>Sending as</Label><br/>
                    <FormGroup check inline>
                        <Input className="check" type="checkbox" name="individual" />{''} Individual
                    </FormGroup>
                    <FormGroup check inline>
                        <Input className="check" type="checkbox" name="company" />{''} Company
                    </FormGroup>
                </Col>
                <Col xs={4} sm={3} md={3} lg={2}>
                    <FormGroup>
                        
                    </FormGroup>
                </Col>
            </Row> */}
            <div className="xs-12">
            
                <div className="xs-12 sm-12 md-8 lg-8">
                    
                    <div className="xs-6 sm-6 md-4 lg-4">
                    <div className="divText">Sending as</div>
                    <label className="container">Individual
                    <input type="radio" name="user_type_id" value="1"  onChange={getSenderDetails}/>
                    <span className="checkmark"></span>
                    </label>
                    </div>
                    {/* <div className="divText">Sending as</div>
                    <input type="radio" class="rButton" name="send" /><span className="rtext">Individual</span>
                    </div> */}
                    <div className="xs-6 sm-6 md-4 lg-4" style={{marginTop:42}}>
                    {/* <input type="radio" class="rButton" name="send" /><span className="rtext">Company</span> */}
                    <label className="container">Company
                    <input type="radio" name="user_type_id" value="2"  onChange={getSenderDetails}/>
                    <span className="checkmark"></span>
                    </label>
                    </div>
                 </div>
                <div className="xs-12 sm-12 md-4 lg-4">
                <img onClick={onSubmit} src={require('../../../../assets/right.svg')} alt="right" style={{float:"right",marginTop:20}}/>
                </div>
            </div>
        </div>
    )
}