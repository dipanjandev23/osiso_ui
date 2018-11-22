import React from 'react';
import {withRouter} from 'react-router-dom';
import Colors from '../../../../colors';
import Button from '../../../../appComponents/button';

export const CreateAccount = withRouter((props)=> {
    return (
        <div className="xs-12 create_main">
            <div className="create_box">
                <div className="xs-12">
                    <div className="xs-12 sm-12 md-9 lg-9 xlg-9">
                        <h1 className="creatAccH1">Ready to experience fastest quality delivery service today? </h1>
                    </div>
                    <div className="xs-12 sm-12 md-3 lg-3 xlg-3">
                        <Button
                            title="Create Account"
                            onAction={()=>props.history.push('/signup')}
                            progress={false}
                            bgcolor={Colors.colorOrange}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
})