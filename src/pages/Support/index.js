import React,{Component} from 'react';
import {Wrapper} from './support.style';
import {NavLink, Switch, Route,Link} from 'react-router-dom';
import {Breadcrumb, BreadcrumbItem,Row,Col,Button,FormGroup,Input,Badge,Modal,ModalHeader,ModalBody,ModalFooter,ListGroup,ListGroupItem,Table,Label } from 'reactstrap';
import Navbar from '../../appComponents/navbar';
import Footer from '../../appComponents/footer';
import Colors from '../../colors';
import swal from 'sweetalert';
import Axios from 'axios';
// import Loading from '../../../../Routes/loading';
import {getSupports} from '../../helpers/apiEndpoints';
import Event from '../../event';

class Support extends Component {
    constructor(props) {
        super(props);
        this.state = {
          support:{
            message:'',
            title:'',
            description:''
          }
        }
        this.supportData = [];
        this.supportId=this.props.match.params.id;
    }

    onChangeInput=(e)=>{  
        this.setState({
            support: {
                ...this.state.support,
                [e.target.name] : e.target.value
            }
        })
    }

    sendMessage=()=>{
        let payload = {
            body: this.state.support.message,
            user_id: JSON.parse(sessionStorage.getItem('userData')).user_id
        }
        Axios({
            url: getSupports + this.supportData.id + '/add-message',
            method: `POST`,
            data:payload   
        })
        .then (({data})=>{
            if(data.status === 'success')
            {
                console.log('after',data)
               this.supportData.support_messages.push({ ...data.supportMessage, sent_by: 'me' });
                this.setState({ 
                    support: {
                        ...this.state.support,
                        message: ''
                    }
                });    
            }
        })
        .catch(data=>{
            swal ( "Oops" ,  "Something went wrong" ,  "error" );
        })
    }

    createSupport=()=>{
        let inputObj = {
            title:this.state.support.title,
            description:this.state.support.description,
            user_id:JSON.parse(sessionStorage.getItem('userData')).user_id
        }
        Axios({
            url: getSupports,
            method: `POST`,
            data:inputObj   
        })
        .then (({data})=>{
            if(data.status === 'success')
            {
                swal ( "Success" ,  "Support created successfully." ,  "success" );
            
            }
        })
        .catch(data=>{
            swal ( "Oops" ,  "Something went wrong" ,  "error" );
        })
    }

    getSupports=()=>{
        Event.emit('load', true);
        let uId = sessionStorage.getItem('userData') && JSON.parse(sessionStorage.getItem('userData')).user_id;
        Axios({
            url: getSupports+this.supportId+'/user/'+uId,
            method: `GET`
        })
        .then (({data})=>{
            Event.emit('load', false);
            if(data.status === 'success')
            {
                // this.toggleTicket();
                    this.supportData = data.support;
                    this.setState({ ...this.state });
                // this.setState({ 
                //     ...this.state,...{businessPackageAmt:data.amount,paymentModal:true}
                // })
            }
        })
        .catch(data=>{
            Event.emit('load', false);
            swal ( "Oops" ,  "Something went wrong" ,  "error" );
        })
    }

    componentDidMount(){
        this.getSupports();
    }
    render() {
        const {steps} = this.state;
        const isAuth = sessionStorage.getItem('userData') ? true : false;
        const isBusinessUser = sessionStorage.getItem('userData') ? JSON.parse(sessionStorage.getItem('userData')).user_type === 2 ? true : false : false;
        return (
            <div className="xs-12 animated fadeIn">
                <Navbar
                    isauth={isAuth}
                    bgcolor={Colors.primary}
                    color={Colors.colorWhite}
                    isBusinessUser={isBusinessUser}
                />
                <Wrapper>
                <Breadcrumb>
                    <BreadcrumbItem><a><Link to="/support-list">Support List</Link></a></BreadcrumbItem>
                    <BreadcrumbItem active>Support</BreadcrumbItem>
                </Breadcrumb>
                       <div className="xs-12 sm-12 box">
                        <div className="xs-12 header" style={{textAlign:"center"}}>
                            <div className="xs-12 sm-12 md-12 lg-12 xlg-12"><label style={{color:Colors.colorBlack}}>Support</label></div>
                            </div>
                            <div className="xs-12">
                            <Row>
                            <Col xs={12} >
                            <Label style={{fontWeight:'600'}}>
                                {this.supportData.title} {this.supportData.status === 'closed' ? <span style={{color:Colors.colorRed}}>(Closed)</span> : ''}
                            </Label> 
                            </Col>
                            </Row>     
                            <Row>
                            <Col xs={12} >
                            <Label>
                                {this.supportData.description}
                            </Label> 
                            </Col>
                            </Row> 
                            <hr/>
                            <div style={{height:'300px',overflowY:'scroll',overflowX:'hidden'}}>
                            {
                              this.supportData.support_messages && this.supportData.support_messages.map((p,i)=>(
                               <Row style={{marginBottom:'10px',marginLeft:'5px',marginRight:'5px'}} key={i}>
                                 <Col xs={12} md={{size: 6,offset: p.sent_by == 'me' ? 6 : 0}} style={{background: p.sent_by == 'me' ? '#6185ba' : '#777',padding:'15px',borderRadius:'5px'}}>
                                <Label style={{color:'#fff'}}>Message: {p.body}</Label><br/>
                                <Label style={{color:'#fff'}}>Sent By : {p.sent_by.toUpperCase()}</Label><br/>
                                <Label style={{color:'#fff'}}>Date : {p.created_at}</Label>
                                {/* <hr/> */}
                                </Col>  
                                </Row>
                              ))
                            }
                            </div>
                            {
                                this.supportData.status != 'closed' ?
                                <div>
                                <Row>
                                <Col>
                                <Input type="textarea" value={this.state.support.message} name="message" onChange={this.onChangeInput}></Input>                                
                                </Col>
                                </Row>
                                <Row style={{marginTop:10}}>
                                <Col md={{size: 6,offset: 3}}>
                                <Button onClick={this.sendMessage} style={{background:'#2D9CDB'}}>Send Message</Button>
                                </Col>
                                </Row>
                                </div>: ''
                            }
                            
                    </div>
                    
                    </div>

                </Wrapper>
                <Footer/>
            </div>
        )
    }
}

export default Support