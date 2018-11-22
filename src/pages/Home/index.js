import React, {Component} from 'react';
import Header from './components/Header';
import SeeHow from './components/seeHow';
import ImmediateDelivery from './components/ImediateDelivery';
import {Container} from './home.style';
import Packages from './components/Packages';
import Customers from './components/Customers';
import { CreateAccount } from './components/createaccount';
import Footer from '../../appComponents/footer';
import swal from 'sweetalert';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuth: ''
        }
        if(this.props.match.params.code)
        {
            sessionStorage.setItem('refCode',this.props.match.params.code);
        }else{
            sessionStorage.setItem('refCode','');
        }

        if(sessionStorage.getItem('userData') && !JSON.parse(sessionStorage.getItem('userData')).is_active)
        {
            swal('Warning','Please complete your payment to use the business package.','warning');
        }
    }
    render() {
        const isAuth = sessionStorage.getItem('userData') ? true : false ;
        const isBusinessUser = sessionStorage.getItem('userData') ? JSON.parse(sessionStorage.getItem('userData')).user_type === 2 ? true : false : false;
        return (
            <Container>
                <Header auth={isAuth} isBusinessUser={isBusinessUser}/>
                <ImmediateDelivery />
                <SeeHow/>
                <Packages/>                
                <Customers/>
                {/* <CreateAccount/> */}
                <Footer/>
            </Container>
        )
    }
}

export default Home;