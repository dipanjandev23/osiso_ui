import React from "react"
// import TimePicker from 'react-time-picker'
import Input from '../../../../appComponents/Input';

export const PickupPoint = (props) =>
{
    const {pickup_point,date,time,pp_street_address,getPickupPointData,locArr} = props;
        return(
            <div className="xs-12 sm-9 box">
            <div className="xs-12 header">
                <div className="xs-11 sm-11 md-11 lg-11 xlg-11"><label>PICKPOINT DETAILS</label></div>
                </div>
                <div className="xs-12">
                    <div className="xs-12 sm-12 md-6 lg-6 xlg-6 outer bottom">
                        <Input
                            labelname="From"
                            type="select-loc"
                            placeholder="Select Pickup point"
                            value={pickup_point}
                            onChange={getPickupPointData}
                            name="pickup_point"
                            customclass="location"
                            option={locArr}
                        />

                         
                    </div>
                    <div className="xs-12 sm-12 md-6 lg-6 xlg-6 outer bottom">
                        <Input
                            labelname="Street Address"
                            type="text"
                            placeholder=""
                            value={pp_street_address}
                            onChange={getPickupPointData}
                            name="pp_street"
                            customclass=""
                        />
                    </div>
                  </div>
                  <div className="xs-12">
                     <div className="xs-12 sm-12 md-6 lg-6 xlg-6 outer bottom">
                        <Input
                            labelname="Pickup Date"
                            type="date"
                            placeholder="Set a pickup date"
                            value={date}
                            onChange={getPickupPointData}
                            name="pickup_date"
                            customclass=""
                        />
                        {/* <TimePicker onChange={getPickupPointData}
                            value={pickup_time}
                            name="pickup_time"/> */}
                    </div>

                    <div className="xs-12 sm-12 md-6 lg-6 xlg-6 outer bottom">
                        <Input
                            labelname="Pickup time"
                            type="time"
                            placeholder=""
                            value={time}
                            onChange={getPickupPointData}
                            name="pickup_time"
                            customclass=""
                        />

                        {/* <TimePicker onChange={getPickupPointData}
                            value={pickup_time}
                            name="pickup_time"/> */}
                    </div>

                  </div>
                </div>
        )
    
}