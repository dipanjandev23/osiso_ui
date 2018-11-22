import React from 'react';

export const Bussiness =()=> {
    return (
        <div className="xs-12 boxes animated bounceIn">
            <div className="xs-12 sm-6 md-3 lg-3 xlg-3 box">
                <div className="colbox">
                    <img src={require('../../../../../assets/browser.svg')} alt="browser"/>
                    <p>SIGNUP FOR A BUSINESS PACKAGE</p>
                </div>
            </div>
            <div className="xs-12 sm-6 md-3 lg-3 xlg-3 box">
                <div className="colbox">
                    <img src={require('../../../../../assets/onlinepayment.svg')} alt="browser"/>
                    <p>MAKE A PAYMENT</p>
                </div>
            </div>
            <div className="xs-12 sm-6 md-3 lg-3 xlg-3 box">
                <div className="colbox">
                    <img src={require('../../../../../assets/calendar.svg')} alt="browser"/>
                    <p>SCHEDULE YOUR DELIVERIES</p>
                </div>
            </div>
            <div className="xs-12 sm-6 md-3 lg-3 xlg-3 box">
                <div className="colbox">
                    <img src={require('../../../../../assets/deliveryman.svg')} alt="browser"/>
                    <p>WE PICKUP AND DELIVER</p>
                </div>
            </div>
        </div>
    )
}