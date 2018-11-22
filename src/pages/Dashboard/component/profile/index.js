import React,{Component} from 'react';  
import {Row,Col,Button,Badge,Label} from 'reactstrap';
import Input from '../../../../appComponents/Input'; 
import swal from 'sweetalert';
import Axios from 'axios';
// import Loading from '../../../../Routes/loading';
import {getOrderHistory} from '../../../../helpers/apiEndpoints';
import Event from '../../../../event';

// import LineChart from 'react-linechart';
class Profile extends Component {

    constructor(){
        super();
        this.state = {
           data:{
               business_name:'',
               fullname:'',
               business_address:'',
               business_description:'',
               phone_number:'',
               email:'',
               img_url:''
           },
           imgArr:[]
        }
    }

    onChangeInput=(e)=>{  
        if(e)
        {
            if(e.target.name === 'phone_number')    
            {
                if(e.target.value.length > 11) return false;
            } 
           
            this.setState({
                data: {
                    ...this.state.data,
                    [e.target.name] : e.target.value
                }
            })

            console.log('state',this.state)

        }
    }
    changeEvent=(e)=>{

        this.setState({
            imgArr:e.target.files
        })

        console.log("File : " + this.state);

        // var photo = document.getElementById("photo");
    // the file is the first element in the files property
    // var file = photo.files[0];

    // console.log("File name: " + file.fileName);
    // console.log("File size: " + file.fileSize);
    }

    componentDidMount()
    {    
      this.onListingUserDetails();  
    }

    onListingUserDetails=()=>{
        // swal ( "Please wait..." );
        console.log('url', getOrderHistory)
        // Loading // Calling Loader
        Event.emit('load', true); // For loader
        Axios({
            url: getOrderHistory + (sessionStorage.getItem('userData') ? JSON.parse(sessionStorage.getItem('userData')).user_id:''),
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
            Event.emit('load', false); // For loader
            if(data.status === 'success')
            {
                const userObj = {
                    business_name:data.user.business_name,
                    fullname:data.user.fullname,
                    business_address:data.user.address,
                    business_description:data.user.business_description,
                    phone_number:data.user.phone,
                    email:data.user.email,
                    img_url:'data:image/png;base64,'+ data.image
                 }
            
                 this.setState({ 
                     data:{
                         ...this.state.data , ...userObj
                     }
                     
                 })

                let userParsedObj = JSON.parse(sessionStorage.getItem('userData'));
                if(userParsedObj.user_type === 2 ) // Business user
                {
                    userParsedObj.name = this.state.data.business_name;
                }
                else
                {
                    userParsedObj.name = this.state.data.fullname;
                }

                sessionStorage.setItem('userData',JSON.stringify(userParsedObj));

            }
            else{
                swal ( "Oops" ,  data.message ,  "error" );
            }
           
            // console.log('ret',data)

        })
        .catch(data=>{
            Event.emit('load', false); // For loader
            swal ( "Oops" ,  "Something went wrong" ,  "error" );
        })
    }

    updateProfile=()=> {
        // Loading // Calling 
        // console.log('satte',this.state)
        if(!this.state.data.phone_number){
            swal('Warning','Phone number is mandatory','warning');
            return false;
        }
        // const userObj = {
        //     business_name: this.state.data.business_name,
        //     address: this.state.data.business_address,
        //     business_description : this.state.data.business_description,
        //     phone:this.state.data.phone_number,
        //     email:this.state.data.email
        //  }
         var formData = new FormData();
         formData.append('business_name',this.state.data.business_name)
         formData.append('fullname',this.state.data.fullname)
         formData.append('address',this.state.data.business_address)
         formData.append('business_description',this.state.data.business_description)
         formData.append('phone',this.state.data.phone_number)
         formData.append('email',this.state.data.email)
         formData.append('image',this.state.imgArr[0])

         Event.emit('load', true); // For loader
        Axios({
            url: getOrderHistory + (sessionStorage.getItem('userData') ? JSON.parse(sessionStorage.getItem('userData')).user_id:''),
            method: `PATCH`,
            data:formData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then (({data})=>{
            Event.emit('load', false); // For loader
            if(data.status === 'success')
            {
                this.onListingUserDetails();
                swal ( "Success" ,  "Profile Updated" ,  "success" );
            }
            else
            {
                swal ( "Error", data.message,'error')
            }
            // if(data.status === "success")
            // {
            //     this.setState({ 
            //         locArr : [...data.data]})
                    
            //    sessionStorage.setItem('locArr',JSON.stringify([...data.data]))  // Adding location list in sessionStorage  
            // }
            
       
            
            // console.log('update',data)

        })
        .catch(data=>{
            Event.emit('load', false); // For loader
            swal ( "Oops" ,  "Something went wrong" ,  "error" );
        })
    }

    render() {
        const {business_name,fullname,business_address,business_description,phone_number,email} = this.state.data;
        const user_type = JSON.parse(sessionStorage.getItem('userData')).user_type;
        let hidden;
        if (window.innerWidth < 450) {
            hidden = "hidden";
        }
        return (
            <Row>
                <Col lg={2}></Col>
                <Col lg={8}>
                <div className="xs-12">
                <div className="top">
                    <div className="box">
                        <div className="head profile-header">
                            <p>Edit your profile</p>
                        </div>
                        <hr/>
                        
                            <div className="xs-12">
                                <div className="inner">
                                <div className="xs-12 top">
                                        <div className="box shadow">
                                            
                                            <div className="xs-12 content">
                                                <div className="form">
                                                    <div className="xs-12 lg-12">
                                                            <div className="inner">
                                                                    <img src={this.state.data.img_url} className="img-profile"/>
                                                            <Row>
                                                                <Col lg={3}></Col>
                                                                <Col lg={6}>
                                                                <div className="input-group mb-3">
                                                                <div className="input-group-prepend">
                                                                    {/* <span className="input-group-text" id="inputGroupFileAddon01"></span> */}
                                                                </div>
                                                                <div className="custom-file">
                                                                    <input type="file" className="custom-file-input" id="photo" accept="image/*" aria-describedby="inputGroupFileAddon01" onChange={this.changeEvent}/>
                                                                    <label className="custom-file-label" htmlFor="inputGroupFile01">Choose file</label>
                                                                </div>
                                                                </div>
                                                                </Col>
                                                                </Row>    
                                                            
                                                            </div>
                                                       
                                                    </div> 

                                                    <div className="xs-12">
                                                        <div className="xs-6">
                                                            <div className="inner">
                                                               {user_type === 2 ? 
                                                               <Input 
                                                               labelname="Business Name"
                                                               type="text"
                                                               placeholder=""
                                                               value={business_name}
                                                               onChange={this.onChangeInput}
                                                               name="business_name"
                                                               customclass=""
                                                               /> :

                                                               <Input 
                                                                    labelname="Name"
                                                                    type="text"
                                                                    placeholder=""
                                                                    value={fullname}
                                                                    onChange={this.onChangeInput}
                                                                    name="fullname"
                                                                    customclass=""
                                                                    />
                                                            }
                                                                    
                                                             
                                                            </div>
                                                        </div>
                                                        <div className="xs-6">
                                                            <div className="inner">
                                                            {user_type === 2 ? 
                                                                <Input
                                                                    labelname="Business Address"
                                                                    type="text"
                                                                    placeholder=""
                                                                    value={business_address}
                                                                    onChange={this.onChangeInput}
                                                                    name="business_address"
                                                                    customclass=""
                                                                    />
                                                                    :
                                                                    <Input
                                                                    labelname="Address"
                                                                    type="text"
                                                                    placeholder=""
                                                                    value={business_address}
                                                                    onChange={this.onChangeInput}
                                                                    name="business_address"
                                                                    customclass=""
                                                                    />
                                                                    }
                                                               
                                                            </div>
                                                        </div>
                                                    </div>  

                                                    <div className="xs-12">
                                                       
                                                            <div className="inner">
                                                            {/* {user_type === 2 ? 
                                                                <Input
                                                                    labelname="Business Address"
                                                                    type="text"
                                                                    placeholder=""
                                                                    value={business_address}
                                                                    onChange={this.onChangeInput}
                                                                    name="business_address"
                                                                    customclass=""
                                                                    />
                                                                    :
                                                                    <Input 
                                                                    labelname="Description"
                                                                    type="text"
                                                                    placeholder=""
                                                                    value={business_description}
                                                                    onChange={this.onChangeInput}
                                                                    name="business_description"
                                                                    customclass=""
                                                                    />
                                                            } */}
                                                             <Input 
                                                                    labelname="Description"
                                                                    type="text"
                                                                    placeholder=""
                                                                    value={business_description}
                                                                    onChange={this.onChangeInput}
                                                                    name="business_description"
                                                                    customclass=""
                                                                    />
                                                            </div>
                                                      
                                                        
                                                    </div>  
                                                    <div className="xs-12">
                                                        <div className="xs-6">
                                                            <div className="inner">
                                                               
                                                                    <Input 
                                                                    labelname="Phone Number"
                                                                    type="text"
                                                                    placeholder=""
                                                                    value={phone_number}
                                                                    onChange={this.onChangeInput}
                                                                    name="phone_number"
                                                                    customclass=""
                                                                    />

                                                             <div>
                                                            { phone_number ? phone_number.length>11 || phone_number.length<11 ? <label style={{float:'right',color:'red'}}> Phone Number is Blank/Invalid</label> : '' : ''}
                                                            </div>
                                                             
                                                            </div>
                                                        </div>
                                                        <div className="xs-6">
                                                            <div className="inner">
                                                                
                                                                <Input
                                                                    labelname="Email Address"
                                                                    type="text"
                                                                    placeholder=""
                                                                    value={email}
                                                                    onChange={this.onChangeInput}
                                                                    name="email"
                                                                    customclass=""
                                                                    />

                                                            <div>
                                                            { new RegExp('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$').test(email) ? '':<label style={{float:'right',color:'red'}}> Email is Blank/Invalid</label>}  
                                                           </div>
                                                               
                                                            </div>
                                                        </div>
                                                    </div>  
                                                  
                                                </div>

                                                 <div className="xs-12 md-12 lg-12">
                                                 <Row>
                                                     <Col lg={3}></Col>
                                                     <Col lg={6}>
                                                        <Button block onClick={this.updateProfile} className="btn-profile">Update profile</Button>
                                                     </Col>
                                                     <Col lg={3}></Col>
                                                 </Row>
                                                </div> 
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </Col>
                <Col lg={2}></Col>
            </Row>
        )
    }
}

export default Profile;