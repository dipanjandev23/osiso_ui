import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import ReactPlayer from 'react-player'
import Button from '../../../../appComponents/button';
import Axios from 'axios';
import swal from 'sweetalert';
import {listPackagesUrl,getOrderHistory} from '../../../../helpers/apiEndpoints';
import Loading from '../../../../Routes/loading';
import Payment from '../../../Auth/payment';
import Event from '../../../../event';

class Packages extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            packages:[],
            isSignedUp:false,
            user_id:'',
            email:''
        }
    }

    onBusinessSignup=(business_package_id,price)=>{

        sessionStorage.setItem('business_package_id',business_package_id);
        sessionStorage.setItem('package_price',price);

        if(sessionStorage.getItem('userData')){
            Axios({
                url: getOrderHistory+JSON.parse(sessionStorage.getItem('userData')).user_id+'/convert-to-business-user',
                method: `PUT`,
                data: {packageId:sessionStorage.getItem('business_package_id')}
            })
            .then (({data})=>{
                if(data.status === 'success')
                {
                    swal ( "Success" ,  "Welcome to Osiso" ,  "success" );
                    sessionStorage.setItem('refCode','');
                    sessionStorage.setItem('business_package_id','');
                    //this.props.Signup(); Later we'll change this
                    //this.props.history.push("/");
                    let userObj = sessionStorage.getItem('userData') && JSON.parse(sessionStorage.getItem('userData'));
                    userObj.is_active = false;
                    userObj.user_type = 2;
                    sessionStorage.setItem('userData',JSON.stringify(userObj));
                    this.setState({
                        ...this.state,...{user_id:data.data.id,email:data.data.email,isSignedUp:true}
                    })
                    window.location.reload();
                }
                else if(data.status === 'error'){
                    swal ( "Warning" ,  data.message ,  "warning" );
                }
            })
            .catch(data=>{
                swal ( "Oops" ,  "Something went wrong" ,  "error" );
            })
        }
        else{
            this.props.history.push("/auth");
        }
    }

    componentDidMount()
    {
       this.onListingPackages();  
        const scrollToPack = () => {
            sessionStorage.removeItem('home.toPack');
            const packElem = document.getElementById('pack');
           if (packElem) {
               window.scrollTo({ top: packElem.offsetTop, behavior: 'smooth' }); //Scroll to packages section when comes from dashboard
           }
        }
       if (sessionStorage.getItem('home.toPack')) {
           scrollToPack();
        } else {
            Event.on('toPack', () => scrollToPack());
        }
    }

    onListingPackages = () =>{
        // swal ( "Please wait..." );
        Loading // Calling Loader
        Axios({
            url: listPackagesUrl,
            method: `GET`
        })
        .then (({data})=>{
            //swal ( "Success" ,  "Welcome to Osiso" ,  "success" );
            if(data.status === 'success')
            {
                data.data.forEach(element => {
                    element['textArr'] = element.text.split(','); 
                });
                this.setState({
                    packages : data.data
                })
            }
        })
        .catch(data=>{
            swal ( "Oops" ,  "Something went wrong" ,  "error" );
        })
    }

    render() {
        const { packages} = this.state;
        return (
            <div className="xs-12 main_pack">
                <div className="xs-12 packages" id="pack" name="pack">
                    <div className="xs-12 top">
                        <h1 className="title">PACKAGES TO FIT YOUR  BUDGET</h1>
                        <p className="lead">We’ve got business type that cover all sizes and budgets</p>
                    </div>
                    <div className="xs-12 pack_box">
                        {packages.map((p,i)=>(
                            <div className="xs-12 sm-6 md-3 lg-3 xlg-3" key={p.id}>
                            <div className="b1">
                                <img src={p.image} alt="box"/>
                                <h1>{p.name}</h1>
                                <h2 className={p.class}>N{p.price}</h2>
                                <div className="features">
                                    <p>{p.textArr[0]}</p>
                                    <p>{p.textArr[1]}</p>
                                    <p>{p.textArr[2]}</p>
                                    <p>{p.textArr[3]}</p>
                                    <p>{p.textArr[4]}</p>
                                </div>
                            </div>
                            <div className="xs-12 btn">
                                <Button
                                    title="Subscribe"
                                    onAction={()=>{this.onBusinessSignup(p.id,p.price)}}
                                    progress={false}
                                    bgcolor={p.color}
                                    >
                                </Button>
                            </div>
                            </div>
                        ))}
                    </div>
                    {/* <div className="xs-12 video">
                        <ReactPlayer 
                            url='https://youtu.be/UtF6Jej8yb4' 
                            width='100%'
                            height='100%'
                        />
                    </div> */}
                </div>

                 {/* // Payment here */}
                 {/* {this.state.isSignedUp ? <Payment senderEmail={this.state.email} user_id={this.state.user_id}></Payment>: ''}   */}
            </div>
        )
    }   
}

export default withRouter(Packages);