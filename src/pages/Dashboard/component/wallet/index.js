import React,{Component} from 'react';
import {Button,Input,FormGroup,Modal,ModalBody,ModalHeader} from 'reactstrap';
import Mastercard from '../../../../assets/mastercard.svg';
import Del from '../../../../assets/del.svg';
import Chip from '../../../../assets/Chip.svg';
import PaystackButton from 'react-paystack';
import swal from 'sweetalert';
import Axios from 'axios';
// import Loading from '../../../../Routes/loading';
import {getOrderHistory} from '../../../../helpers/apiEndpoints';
import Event from '../../../../event';

class Wallet extends Component {

    constructor(){
        super();
        this.state = {
           data:{
               wallet_amount:0,
               package_amount:0
           },
           fundModal:false,
           addAmount:''
        }
    }

    changeInputVal=(e)=>{
        this.setState({
            ...this.state,
            [e.target.name] : e.target.value
        })
    }

    toggleModal=()=>{
        this.setState({
            ...this.state,...{fundModal:!this.state.fundModal}
        })
    }

    componentDidMount()
    {    
      this.onListingUserDetails();  
    }

    onListingUserDetails=()=>{

        //swal('Please wait..')
        Event.emit('load', true);
        Axios({
            url: getOrderHistory + (sessionStorage.getItem('userData') ? JSON.parse(sessionStorage.getItem('userData')).user_id:'')+'/wallet',
            method: `GET`
        })
        .then (({data})=>{
            //swal ( "Success" ,  "Welcome to Osiso" ,  "success" );
            // if(data.status === "success")
            // {
            //     this.setState({ 
            //         locArr : [...data.data]})
                    
            //    sessionStorage.setItem('locArr',JSON.stringify([...data.data]))  // Adding location list in sessionStorage  
            // }
            Event.emit('load', false);
            if(data.status === 'success')
            {
               
                 this.setState({ 
                     data:{
                         ...this.state.data , wallet_amount: data.amount , package_amount: data.packageAmount
                     }
                     
                 })
            }
            else{
                Event.emit('load', false);
                swal ( "Oops" ,  data.message ,  "error" );
            }
           
            // console.log('ret',data)

        })
        .catch(data=>{
            swal ( "Oops" ,  "Something went wrong" ,  "error" );
        })
    }
    
    updateWalletAmount=()=>{

        //swal('Please wait..')
        Event.emit('load', true);
        Axios({
            url: getOrderHistory + (sessionStorage.getItem('userData') ? JSON.parse(sessionStorage.getItem('userData')).user_id:'')+'/add-fund',
            method: `PUT`,
            data:{amount:this.state.addAmount}
        })
        .then (({data})=>{
            Event.emit('load', false);
            if(data.status === 'success')
            {
                swal('Success', data.message, 'success');
                 this.setState({ 
                     data:{
                         ...this.state.data ,
                         wallet_amount: this.state.data.wallet_amount + Number(this.state.addAmount)
                     },
                     fundModal:!this.state.fundModal,
                     addAmount: ''
                 })
            }
            else{
                Event.emit('load', false);
                swal ( "Oops" ,  data.message ,  "error" );
            }


        })
        .catch(data=>{
            swal ( "Oops" ,  "Something went wrong" ,  "error" );
        })
    }

    callback = (response) => {
        console.log(response); // card charged successfully, get reference here
        if(response.status === "success")
        {
            this.updateWalletAmount()
        }else{
            swal ( "error" ,  "Something went wrong" ,  "error" ); 
        }
    }

    close =()=> {
        console.log("Payment closed");
    }

    getReference =()=> {
        //you can put any unique reference implementation code here
        let text = "";
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-.=";

        for( let i=0; i < 15; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        //console.log(text);
        return text;
    }

    render() {
        const {wallet_amount , package_amount} = this.state.data;
        const {addAmount} = this.state;
        const key = "pk_test_06f03e82b5e47a8fb8ee3a6f3df253f858a11822";
        const sender_email = sessionStorage.getItem('userData') && JSON.parse(sessionStorage.getItem('userData')).email;
        return (
            <div className="xs-12">
                <div className="xs-12 sm-12 md-6 lg-6 inner">
                    <div className="xs-12">
                        <div className="top">
                            <div className="box">
                                <div className="head">
                                    <p>Your Wallet</p>
                                    <Button className="add-fund-btn" onClick={this.toggleModal}>Add fund</Button>
                                </div>
                                <hr/>
                                <div className="xs-12 content">
                                    <div className="xs-12 cards top">
                                        <div className="xs-12 inner">
                                            <p>Your available wallet balance <h1>{wallet_amount}</h1></p><br/>
                                            <p>Your package amount <h1>{package_amount}</h1></p><br/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* View Return Payment Modal*/}
                <Modal isOpen={this.state.fundModal} toggle={this.toggleModal} className={this.props.className}>
                <ModalHeader toggle={this.toggleModal}>Fund your wallet</ModalHeader>
                <ModalBody>
                    <Input type="number" style={{marginBottom:10}} value={addAmount} name="addAmount" placeholder="Enter amount to add" onChange={this.changeInputVal}></Input>
                    {
                        addAmount && addAmount != '0'? <PaystackButton
                        text="Pay with Card/Banktransfer"
                        class="payButton"
                        callback={this.callback}
                        close={this.close}
                        disabled={false} 
                        embed={false} 
                        reference={this.getReference()}
                        email={sender_email}
                        amount={Number(addAmount) * 100}
                        paystackkey={key}
                    /> : ''
                    }
                    
                </ModalBody>
                </Modal>
                {/* View Return Payment Modal */}
            </div>
        )
    }
}

export default Wallet;