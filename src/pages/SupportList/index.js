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
    constructor() {
        super();
        this.state = {
          support:{
            message:'',
            title:'',
            description:''
          },
          supportModal:false
        }
        this.supportData = [];
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
                this.toggleModal();
                this.getSupports();
            
            }
        })
        .catch(data=>{
            swal ( "Oops" ,  "Something went wrong" ,  "error" );
        })
    }

    getSupports=()=>{
        Event.emit('load',true);
        let uId = sessionStorage.getItem('userData') && JSON.parse(sessionStorage.getItem('userData')).user_id;
        Axios({
            url: getSupports+'users/'+uId,
            method: `GET`
        })
        .then (({data})=>{
            Event.emit('load',false);
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
            Event.emit('load',false);
            swal ( "Oops" ,  "Something went wrong" ,  "error" );
        })
    }

    gotoDetails=(obj)=>{    
        this.props.history.push('/support/'+obj.id);
    }
    toggleModal=()=>{
        this.setState({
            ...this.state,
             ...{supportModal:!this.state.supportModal}
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
                    <BreadcrumbItem><a><Link to="/">Home</Link></a></BreadcrumbItem>
                    <BreadcrumbItem active>Support List</BreadcrumbItem>
                </Breadcrumb>
                       <div className="xs-12 sm-12 box">
                        <div className="xs-12 header">
                            <div className="xs-12 sm-9 md-9 lg-9 xlg-9"><label style={{color:Colors.colorBlack}}>Support List
                            </label>
                            
                            </div>
                            <div className="xs-12 sm-3 md-3 lg-3 xlg-3">
                            <Button onClick={this.toggleModal}>Add new support</Button>

                            </div>
                            </div>
                            <div className="xs-12">
                            <div style={{height:'300px',overflowY:'scroll',overflowX:'hidden'}}>
                            {
                            //   this.supportData && this.supportData.map((p,i)=>(
                                <Table responsive>
                                <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Title</th>
                                    <th>Created Date</th>
                                    <th>Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                { this.supportData.map((p,i)=>(
                                    <tr key={i}>
                                    <td>{p.id}</td>
                                    <td>{p.title}</td>
                                    <td>{p.created_at}</td>
                                    <td>{
                                        <Button onClick={()=>{this.gotoDetails(p)}} style={{height:'auto',background:Colors.primary}}>Details</Button>
                                    } </td>
                                    </tr>
                                 ))
                                }  
                                </tbody>
                                </Table> 
                            //    <Row style={{marginBottom:'10px',marginLeft:'5px',marginRight:'5px'}} key={i}>
                            //      <Col>{p.title}</Col> 
                            //      <hr/>
                            //     </Row>
                            //   ))
                            }
                            </div>
                            </div>
                    </div>

                    {/* View Ticket Modal*/}
                    <Modal isOpen={this.state.supportModal} toggle={this.toggleModal} className={this.props.className} size="lg">
                    <ModalHeader toggle={this.toggleModal}>Add you question</ModalHeader>
                    <ModalBody>
                        {
                            <div>
                            <Row>
                            <Col xs={12} >
                            <Label>
                                Title
                            </Label> 
                            <Input type="text" placeholder="title" value={this.state.support.title} name="title" onChange={this.onChangeInput}>
                            </Input>
                            </Col>
                            </Row>     
                            <Row>
                            <Col xs={12} >
                            <Label>
                                Ticket Description
                            </Label> 
                            <Input
                                type="text" placeholder="Description" value={this.state.support.description} name="description" onChange={this.onChangeInput}>
                            </Input>
                            </Col>
                            </Row> 
                            <Row style={{marginTop:10}}>
                            <Col md={{size: 6,offset: 3}}>
                            <Button onClick={this.createSupport} style={{background:'#2D9CDB'}}>Create Support</Button>
                            </Col>
                        </Row>
                    </div>
                            
                    }
                </ModalBody>
                </Modal>
                </Wrapper>
                <Footer/>
            </div>
        )
    }
}

export default Support