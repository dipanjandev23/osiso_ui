import React from 'react';

export const Immediate =()=> {
    return (
        <div className="xs-12 boxes animated bounceIn">
            <div className="xs-12 sm-6 md-3 lg-3 xlg-3 box">
                <div className="colbox">
                    <img src={require('../../../../../assets/browser.svg')} alt="browser"/>
                    <p>CREATE YOUR ORDER</p>
                </div>
            </div>
            <div className="xs-12 sm-6 md-3 lg-3 xlg-3 box">
                <div className="colbox">
                    <img src={require('../../../../../assets/order.svg')} alt="browser"/>
                    <p>PACKAGE YOUR PARCEL</p>
                </div>
            </div>
            <div className="xs-12 sm-6 md-3 lg-3 xlg-3 box">
                <div className="colbox">
                    <img src={require('../../../../../assets/motorbike.svg')} alt="browser"/>
                    <p>WE PICK UP YOUR PARCEL</p>
                </div>
            </div>
            <div className="xs-12 sm-6 md-3 lg-3 xlg-3 box">
                <div className="colbox">
                    <img src={require('../../../../../assets/deliveryman.svg')} alt="browser"/>
                    <p>WE DELIVER YOUR PARCEL</p>
                </div>
            </div>
        </div>
    )
}