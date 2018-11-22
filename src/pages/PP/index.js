import React,{Component} from 'react';
import {Wrapper} from './pp.style';
import {NavLink, Switch, Route,Link} from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import Navbar from '../../appComponents/navbar';
import Footer from '../../appComponents/footer';
import Colors from '../../colors';
import Input from '../../appComponents/Input';
import Button from '../../appComponents/button';
import swal from 'sweetalert';
import Axios from 'axios';
import Loading from '../../Routes/loading';
import {getPolicy} from '../../helpers/apiEndpoints';

class PP extends Component {
    constructor() {
        super();
        this.state = {
          title:'',
          description:''
        }
    }

    componentDidMount()
    {    
      this.onListingPrivacy();  
    }

    onListingPrivacy = () =>{
        // swal ( "Please wait..." );
        Loading // Calling Loader
        Axios({
            url: getPolicy+'/privacy-policy',
            method: `GET`
        })
        .then (({data})=>{
            //swal ( "Success" ,  "Welcome to Osiso" ,  "success" );
            if(data.status === "success")
            {
                console.log('test',data)
                this.setState({ 
                    ...this.state,...{title:data.data.title,description:data.data.body}
                })

                // sessionStorage.setItem('locArr',JSON.stringify([...data.data]))  // Adding location list in sessionStorage  
            }
        })
        .catch(data=>{
            swal ( "Oops" ,  "Something went wrong" ,  "error" );
        })
    }

    render() {
        const {title,description} = this.state;
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
                    <BreadcrumbItem active>Privacy Policy</BreadcrumbItem>
                </Breadcrumb>
                       <div className="xs-12 sm-12 box">
                        <div className="xs-12 header" style={{textAlign:"center"}}>
                            <div className="xs-12 sm-12 md-12 lg-12 xlg-12"><label style={{color:Colors.colorBlack}}>{title}</label></div>
                            </div>
                            <div className="xs-12">
                                <div className="xs-12 sm-12 md-12 lg-12 xlg-12 outer bottom">
                                   <p>{description}</p> 
                                </div>
                            </div>
                        </div>
                </Wrapper>
                <Footer/>
            </div>
        )
    }
}

export default PP