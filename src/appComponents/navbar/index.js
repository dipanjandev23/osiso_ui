import React,{Component} from 'react';
import {Link,withRouter} from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
// import DateTimePicker from 'react-datetime-picker';
import Input from '../../appComponents/Input';
import { Wrapper,ShortNavContent,ValidationContent } from './navbar.style';
import Colors from '../../colors';
import TimePicker from 'react-time-picker'
import swal from 'sweetalert';
import Axios from 'axios';
import {getOrderHistory} from '../../helpers/apiEndpoints';
import Event from '../../event';


  class Navbar extends Component {
    constructor(props) {
        super(props); 
        this.state = {
          isOpen: false,
          isPopupAlive: false,
          date: new Date() ,
          time:'10:00',
          hasData:true
        };
    }
    toggle=()=> {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    openClosePopup=()=> {
        this.setState({
            isPopupAlive: !this.state.isPopupAlive
        })
        
    }

    chooseDate = () =>{
        // Loading // Calling Loader

        if(this.state.isPopupAlive)
        {
            if(!this.state.date || !this.state.time)
            {
                this.setState({
                    hasData:false
                })
                return false;
            }
            this.openClosePopup()
            sessionStorage.setItem('schedule_datetime',JSON.stringify({'sDate':this.state.date,'sTime':this.state.time}))
            sessionStorage.setItem('from_menu','1');
            this.props.history.push('/schedule')
        }

        // let userData = sessionStorage.getItem('userData') && JSON.parse(sessionStorage.getItem('userData'));
        // const userId = userData && userData.user_id || 0;
        // Axios({
        //     url:  getOrderHistory+userId+'/check-delivery-limit',
        //     method: `GET`
        // })
        // .then (({data})=>{
        //     //swal ( "Success" ,  "Welcome to Osiso" ,  "success" );
        //     if(data.status === "success")
        //     {
        //        if(!data.limitOver)
        //        {
                
        //        }
        //        else{
        //            swal("Warning",'Number of order limit is over.','warning');
        //        }
        //     } else {
        //         console.log(data);
        //     }
        // })
        // .catch(data=>{
        //     swal ( "Oops" ,  "Something went wrong" ,  "error" );
        // })
        
    }

      onChange = time  => this.setState({ time  })

      handleChange=(event)=> {
        this.setState({date: event.target.value});
      }

      handleChangeTime=(event)=> {
        this.setState({time: event.target.value});
      }

      logOut=()=>{
        // sessionStorage.setItem('userData','')
        sessionStorage.clear();
        this.props.history.push('/');
      }

      checkLimit=(url)=>{
        // this.props.history.push(url);
       // Loading // Calling Loader
        // let userData = sessionStorage.getItem('userData') && JSON.parse(sessionStorage.getItem('userData'));
        // const userId = userData && userData.user_id || 0;
        // Axios({
        //     url:  getOrderHistory+userId+'/check-delivery-limit',
        //     method: `GET`
        // })
        // .then (({data})=>{
        //     //swal ( "Success" ,  "Welcome to Osiso" ,  "success" );
        //     if(data.status === "success")
        //     {
        //        if(!data.limitOver)
        //        {
        //         this.props.history.push(url)
        //        }
        //        else{
        //            swal("Warning",'Number of order limit is over.','warning');
        //        }
        //     } else {
        //         console.log(data);
        //     }
        // })
        // .catch(data=>{
        //     swal ( "Oops" ,  "Something went wrong" ,  "error" );
        // })
      }

      goTopackage = () => {
        sessionStorage.setItem('home.toPack', "1");
        this.props.history.push('/');
        setTimeout(() => Event.emit('toPack',true), 0);
    }
    
    render() {
        const width = window.innerWidth;
        const { bgcolor,isauth,color,frmPage,isBusinessUser } = this.props;
        const { isOpen,isPopupAlive,hasData } = this.state;
        const hasAccess = sessionStorage.getItem('userData') && JSON.parse(sessionStorage.getItem('userData')).is_active;
        // const isBusinessUser = sessionStorage.getItem('userData') ? JSON.parse(sessionStorage.getItem('userData')).user_type === 2 ? true : false : false;
        return (
            <div>
            <Wrapper bgcolor={width > 1023 ? bgcolor : Colors.primary} color={color} width={width}>            
                    {isauth === false ? 
                        <div className="xs-12 fullnav" style={{height:0}}> 
                            <span>
                                <a className="link">
                                    <img src={require('../../assets/osiso-logo.png')} alt="logo" className="logoPos"/>
                                </a>
                            </span>
                           
                            {/* <span> */}
                                {/* <Link to="/signup">Sign up</Link> */}
                                {/* <Link to="/auth">Sign up</Link> */}
                                
                            {/* </span> */}

                            <span>
                                <Link to="/delivery">Immediate delivery</Link>
                            </span> 
                            <span className="cp"><a onClick={this.openClosePopup}>Schedule delivery</a>  
                                {/* <Link to="/schedule">Schedule delivery</Link> */}
                            </span>      
                            {
                                !frmPage ?  <span>
                                <a onClick={this.goTopackage} style={{cursor:'pointer'}}>Packages</a>
                                </span>  : ''
                            }
                            
                            <span>
                                <Link to="/tracking">Order tracking</Link>
                            </span>  
                            <span>
                                <Link to="/contactus">Contact</Link>
                            </span>
                            <span>
                                <Link to="/login">Login</Link>
                            </span>    
                              
                              
                            <span>
                                <a className="link" href="https://www.facebook.com/Osisong-407276206407939/">
                                    <img src={require('../../assets/fb.svg')} alt="fb" />
                                </a>
                                <a className="link" href="https://twitter.com/Osiso_ng">
                                    <img src={require('../../assets/tw.svg')} alt="twitter" />
                                </a>
                                <a className="link" href="https://www.instagram.com/osiso.ng/">
                                    <img src={require('../../assets/ig.svg')} alt="fb" />
                                </a>
                                <a className="link" >
                                    <img src={require('../../assets/whatsapp.svg')} alt="whatsapp" />
                                </a>
                            </span> 
                        </div>  
                    :
                        <div className="xs-12 fullnav" style={{height:0}}>
                             <span>
                                <a className="link">
                                    <img src={require('../../assets/osiso-logo.png')} alt="logo" className="logoPos"/>
                                </a>
                            </span>
                           
                            {/* <span className="cp"><a onClick={this.openClosePopup}>Schedule delivery</a>  
                             </span>  */}
                             <span>
                                <Link to="/delivery">Immediate delivery</Link>
                            </span> 
                            { isBusinessUser ? 
                                <span className="cp"><a onClick={this.openClosePopup}>Schedule delivery</a>  
                               </span> 
                               : 
                               ''
                            }

                            {
                                frmPage ?  <span>
                                <a onClick={this.goTopackage}  style={{cursor:'pointer'}}>Packages</a>
                                </span>  : ''
                            }
                                 
                            <span>
                                <Link to="/tracking">Order tracking</Link>
                            </span>    
                             
                             {
                                 hasAccess ?
                               <span>
                                 <Link to="/dashboard">Dashboard</Link>
                                </span> 
                                 :
                                <span>
                                    {/* <Link >Dashboard</Link> */}
                                    <a>Dashboard</a>
                                </span>
                             }
                           
                            <span>
                                <Link to="/contactus">Contact</Link>
                            </span>  
                           
                            <span className="userDisplay">
                             Hi, {sessionStorage.getItem('userData')?JSON.parse(sessionStorage.getItem('userData')).name:''}   
                            </span>  
                            <span className="cp">
                                <a onClick={this.logOut}>Logout</a>
                            </span>     
                            <span>
                                <a className="link" href="https://www.facebook.com/Osisong-407276206407939/">
                                    <img src={require('../../assets/fb.svg')} alt="fb" />
                                </a>
                                <a className="link" href="https://twitter.com/Osiso_ng">
                                    <img src={require('../../assets/tw.svg')} alt="fb" />
                                </a>
                                <a className="link" href="https://www.instagram.com/osiso.ng/">
                                    <img src={require('../../assets/ig.svg')} alt="fb" />
                                </a>
                                <a className="link" >
                                    <img src={require('../../assets/whatsapp.svg')} alt="whatsapp" />
                                </a>
                            </span> 
                            
                        </div>
                       
                    } 
                     {isPopupAlive === true ?
                        <Modal isOpen={this.state.isPopupAlive} toggle={this.openClosePopup} className={this.props.className}>
                        <ModalHeader >Schedule Date Time</ModalHeader>
                        <ModalBody>
                           <div className="row">
                           <div className="col-md-6">
                           <Input
                            labelname="Schedule Date"
                            type="date"
                            placeholder="Set a pickup date"
                            value={this.state.date}
                            onChange={this.handleChange}
                            name="pickup_date"
                            customclass=""
                        />

                         {/* <Input
                            labelname="Schedule Time"
                            type="time"
                            placeholder="Set a pickup time"
                            value={this.state.time}
                            onChange={this.handleChangeTime}
                            name="pickup_time"
                            customclass=""
                        /> */}

                         
                           </div>
                           <div className="col-md-6">
                           <label>Schedule Time</label>
                           <TimePicker onChange={this.onChange}
                            value={this.state.time}/>
                           </div>
                           </div> 
                        { !hasData ? <ValidationContent >Schedule Date Time Required</ValidationContent> :''}
                        </ModalBody>
                        <ModalFooter>
                          <Button color="primary" onClick={this.chooseDate}>Choose</Button>{' '}
                          <Button color="secondary" onClick={this.openClosePopup}>Cancel</Button>
                        </ModalFooter>
                      </Modal>
                      
                       :''}
                <div className="xs-12 shortnav">             
                    <span className="menu">
                        <img onClick={this.toggle} src={require('../../assets/menu.svg')} alt="menu" />
                    </span> 
                    <span className="social">
                        <a className="link" href="https://www.facebook.com/Osisong-407276206407939/">
                            <img src={require('../../assets/fb.svg')} alt="fb" />
                        </a>
                        <a className="link" href="https://twitter.com/Osiso_ng">
                            <img src={require('../../assets/tw.svg')} alt="fb" />
                        </a>
                        <a className="link" href="https://www.instagram.com/osiso.ng/">
                            <img src={require('../../assets/ig.svg')} alt="fb" />
                        </a>
                        <a className="link" >
                            <img src={require('../../assets/whatsapp.svg')} alt="whatsapp" />
                        </a>
                    </span> 
                </div>
            </Wrapper>
            {isOpen === true ?
                <ShortNavContent>
                    {isauth === true ? 
                        <div>
                             <p>
                                <Link to="/delivery">Immediate delivery</Link>
                            </p> 
                            { isBusinessUser ? 
                               <p>
                               <Link to="/schedule">Schedule delivery</Link>
                               </p> 
                               : 
                               ''
                            }
                                
                            <p>
                                <a onClick={this.goTopackage} style={{cursor:'pointer'}}>Packages</a>
                            </p>
                            <p>
                                <Link to="/tracking" className="link">Order tracking</Link>
                            </p>  
                            
                            {
                                 hasAccess ?
                                 <p>
                                 <Link to="/dashboard">Dashboard</Link>
                                 </p>
                                 :
                                <p>
                                    {/* <Link >Dashboard</Link> */}
                                    <a>Dashboard</a>
                                </p>
                             }
                            <p>
                                 <Link to="/contactus">Contact</Link>    
                            </p>  
                            <p className="userDisplay">
                             Hi, {sessionStorage.getItem('userData')?JSON.parse(sessionStorage.getItem('userData')).name:''}   
                            </p>  
                            <p className="cp">
                                <a onClick={this.logOut}>Logout</a>
                            </p> 
                        </div>
                    :
                        <div>
                            <p>
                                <Link to="/">Home</Link>
                            </p> 
                            <p>
                                <Link to="/delivery">Immediate delivery</Link>
                            </p>
                            <p>
                                <a onClick={this.openClosePopup}>Schedule delivery</a>  
                                {/* <Link to="/schedule">Schedule delivery</Link> */}
                            </p>   
                            
                            <p>
                                <a onClick={this.goTopackage} style={{cursor:'pointer'}}>Packages</a>
                            </p>
                            <p>
                                <Link to="/tracking" className="link">Order tracking</Link>
                            </p> 
                            <p>
                                 <Link to="/contactus">Contact</Link>    
                            </p> 
                            <p>
                                <Link to="/login">Login</Link>
                            </p> 
                            
                        </div>
                    }
                </ShortNavContent>
            : null}
            </div>
        )
    }
}

export default withRouter(Navbar)