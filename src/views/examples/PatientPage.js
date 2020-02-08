/*!

=========================================================
* Paper Kit React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-kit-react

* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/paper-kit-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React , {Component} from "react";
import axios from 'axios';
import "assets/css/bootstrap.min.css";
// reactstrap components
import { Button, Alert, Form, FormGroup, Input, Container, Row, Col, Modal, FormText } from "reactstrap";

// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import RegisterModal from "components/RegisterModal";

class RegisterPage extends Component {
  constructor(props)
  {
    super(props);
    this.state = {
      showProfile: false ,      
      registerShow: false,
      loginShow: false,
      name: "" ,
      surname: "" ,
      email: "" ,
      jbo: "" ,
      password: "",
      passConf: "" ,
      phone: "" ,
      adress: "" ,
      city: "" ,
      statee: "" ,
      formValid: false  ,   // enable/disable submit button depending on form validation
      notFilledError: false ,
      formErrorText: "" ,
      passErrorText: "" ,
      emailErrorText: "" ,
      emailValid: true ,
      showResponse: false ,
      loginDisable: true ,
      message: ""
    };

    this.editPatient = this.editPatient.bind(this) ;
    this.validateEmptyFields = this.validateEmptyFields.bind(this) ;    
    this.handleMatching = this.handleMatching.bind(this) ;
    this.onDismiss = this.onDismiss.bind(this) ;
    
    this.getProfile = this.getProfile.bind(this) ;
    
    this.getUlogovani = this.getUlogovani.bind(this) ;
  }
      
  doc = document.documentElement.classList.remove("nav-open");
  /*eff = useEffect(() => {
    document.body.classList.add("register-page");
    return function cleanup() {
      document.body.classList.remove("register-page");
    };
  });*/

  componentDidMount(){
    this.setState({showProfile: false})
    
   }

  validateEmptyFields = () => {     
      if (this.state.name == "" || this.state.surname == "" || this.state.email == "" || this.state.jbo == "" || this.state.phone == "" || this.state.adress == "" || this.state.city == "" || this.state.statee == "" )
      {
          this.state.notFilledError = true;
      }
  }


  onDismiss = () => this.setState({showResponse: !this.showResponse});

  

  handleMatching = (event) => {
    if (this.state.password != event.target.value)
      {
        this.setState({formValid: true, passErrorText: "Lozinke se ne poklapaju."});    // disabling submit button
      } else {
        this.setState({formValid: false, passErrorText: ""});
      }
  }

  getProfile = (event) => {
    axios({
      method: 'get',
      url: 'http://localhost:8099/getPatientData',
    }).then((response)=>{      
      this.setState({name:response.data.user.name, email:response.data.user.email,surname:response.data.user.surname,phone:response.data.phoneNumber,password:response.data.user.password,
                    jbo: response.data.jbo , adress: response.data.adress , city: response.data.city , statee : response.data.state
      
      })
      
    },(error)=>{
      console.log(error);
    });
  }

  editPatient = event => {
        event.preventDefault();

        this.validateEmptyFields();
        
        if (this.state.notFilledError)
        {
            this.setState({formErrorText: "Sva polja su obavezna. Molim vas popunite prazna polja."})
        } else {

          let user = {
            "name": this.state.name ,
            "surname": this.state.surname ,
            "email": this.state.email ,
            "password":this.state.password,
            "enabled": true
          };

          let data = {
            "user": user,
            "jbo": this.state.jbo ,
            "phoneNumber": this.state.phone ,
            "address": this.state.adress ,
            "city": this.state.city ,
            "state": this.state.statee,
            "email": this.state.email ,
          };

          axios({
            method: 'put',
            url: 'http://localhost:8099/editPatient', 
            data: data ,
            ContentType: 'application/json'            
          }).then((response) => {
            if (response.status == 200)
              {
                if (response.data != null)
                this.setState({name:response.data.user.name, email:response.data.user.email,surname:response.data.user.surname,phone:response.data.phoneNumber,password:response.data.user.password,
                  jbo: response.data.jbo , adress: response.data.adress , city: response.data.city , statee : response.data.state
    
    })
              }
          }, (error) => {
            console.log(error);
          });

          this.cleanAll();
          
      }
  };

  getUlogovani = (token) => {
    let AuthStr = 'Bearer '.concat(token);
    let data = token

    axios({
      method: 'post' ,    
      url: 'http://localhost:8099/getUser' ,  
      data: data ,      
      headers: { "Authorization": AuthStr }   
    }).then((response) => {
      if (response.data != null)
      {
        if(response.data.type === "PACIJENT"){          
          this.props.history.pushState(null, 'patient-page');         
        }
          
      }
        
    }, (error) => {
      {
        this.setState({message: "Neuspesno dobavljanje korisnika.", showResponse: true}) ;
      }
    });
  }

  

  
  render() {
    return (
    <div>
      <Alert color="info" isOpen={this.state.showResponse} toggle={this.onDismiss}>
            <b>{this.state.message}</b> 
      </Alert>
      <ExamplesNavbar showProfileEvent={this.getProfile}/>
      <div
        className="page-header"
        style={{
          backgroundImage: "url(" + require("assets/img/hc-complete-resize.jpg") + ")"
        }}
      >        
      </div>
       <div className="section profile-content">  
        <div id="wrapper">
        
      <Form onSubmit={this.editPatient} className={this.state.showProfile ? '' : 'hidden'}>
        <Container>
              <Row>
                  <Col xs="3">
                    <label className="text-primary font-weight-bold">JBO</label>
                  </Col>
                  <Col>
                    <Input name="jbo" editable="false" type="text" value={this.state.jbo} />
                  </Col>
              </Row>
              <Row>
                  <Col xs="3">
                    <label className="text-primary font-weight-bold"> Email</label>                    
                  </Col>
                  <Col>
                    <Input name="email" editable="false" type="text" value={this.state.email} />
                  </Col>
              </Row>
              <Row>
                  <Col xs="3">
                    <label className="text-primary font-weight-bold">Ime</label>                    
                  </Col>
                  <Col>
                    <Input name="name"  type="text" value={this.state.name} onChange={event => this.setState({name: event.target.value})} />
                  </Col>
              </Row>
              <Row>
                  <Col xs="3">
                    <label className="text-primary font-weight-bold">Prezime</label>                    
                  </Col>
                  <Col>
                  <Input  name="surname"  type="text" value={this.state.surname} onChange={event => this.setState({surname: event.target.value})} />
                  </Col>
              </Row>
              <Row>
                  <Col xs="3">
                    <label className="text-primary font-weight-bold">Lozinka</label>                    
                  </Col>
                  <Col>
                    <Input  name="password" type="password" value={this.state.password} onChange={event => this.setState({password: event.target.value})} />
                  </Col>
              </Row>
              <Row>
                  <Col xs="3">
                    <label className="text-primary font-weight-bold">Telefon</label>                    
                  </Col>
                  <Col>
                    <Input  name="phoneNumber"  type="text" value={this.state.phone} onChange={event => this.setState({phone: event.target.value})}/>
                  </Col>
              </Row>
              <Row>
                  <Col xs="3">
                    <label className="text-primary font-weight-bold">Adresa</label>                    
                  </Col>
                  <Col>
                    <Input  name="adress" type="text" value={this.state.adress} onChange={event => this.setState({adress: event.target.value})}/>
                  </Col>
              </Row>              
              <Row>
                  <Col xs="3">
                    <label className="text-primary font-weight-bold">Grad</label>                    
                  </Col>
                  <Col>
                    <Input  name="city" type="text" value={this.state.city} onChange={event => this.setState({city: event.target.value})} />                   
                  </Col>
              </Row>
              <Row>
                  <Col xs="3" className="ml-auto mr-auto" md="3">
                    <label className="text-primary font-weight-bold">Država</label>              
                  </Col>
                  <Col>
                    <Input  name="statee" type="text" value={this.state.statee} onChange={event => this.setState({statee: event.target.value})} />
                  </Col>
              </Row>
              <Row>
                  <Col xs="3">
                    <label className="text-primary font-weight-bold"></label>              
                  </Col>
                  <Col>
                    <Input type="button" value="IZMENI PODATKE"/>
                  </Col>
              </Row>
            </Container>
         </Form>
         
         </div>
        </div>
    </div>
    )};
}

export default RegisterPage;
