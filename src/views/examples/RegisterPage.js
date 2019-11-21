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
      loginDisable: true
    };

    this.sendRegistration = this.sendRegistration.bind(this) ;
    this.validateEmptyFields = this.validateEmptyFields.bind(this) ;
    this.validateLoginFields = this.validateLoginFields.bind(this) ;
    this.handleMatching = this.handleMatching.bind(this) ;
    this.onDismiss = this.onDismiss.bind(this) ;
    this.cleanAll = this.cleanAll.bind(this) ;
    this.mailValidation = this.mailValidation.bind(this) ;
    this.sendLogin = this.sendLogin.bind(this) ;
  }
      
  doc = document.documentElement.classList.remove("nav-open");
  /*eff = useEffect(() => {
    document.body.classList.add("register-page");
    return function cleanup() {
      document.body.classList.remove("register-page");
    };
  });*/

  validateEmptyFields = () => {     
      if (this.state.name == "" || this.state.surname == "" || this.state.email == "" || this.state.jbo == "" || this.state.phone == "" || this.state.adress == "" || this.state.city == "" || this.state.statee == "" )
      {
          this.state.notFilledError = true;
      }
  }

  validateLoginFields = () => {     
    if (this.state.email == "" || this.state.password == "" )
    {
        this.state.notFilledError = true;
    }
}

  onDismiss = () => this.setState({showResponse: !this.showResponse});

  cleanAll = () => this.setState({registerShow: false, name: "" , surname: "", email: "" , jbo: "", password: "",passConf: "" , phone: "" , adress: "" , city: "" , statee: "" , formValid: false  , notFilledError: false ,
                    formErrorText: "" , emailErrorText: "" , loginShow: false ,
                    passErrorText: ""})

  handleMatching = (event) => {
    if (this.state.password != event.target.value)
      {
        this.setState({formValid: true, passErrorText: "Lozinke se ne poklapaju."});    // disabling submit button
      } else {
        this.setState({formValid: false, passErrorText: ""});
      }
  }

  mailValidation = (event) => {
    const regex = /\S+@\S+\.\S+/;
     if ( !regex.test(event.target.value) )   //email not appropriate
     {
        this.setState({formValid: false, loginDisable: true, emailErrorText: "Neispravan mejl. Ocekivan unos je u obliku local@domain."})
     } else {
      this.setState({formValid: true, emailErrorText: "", loginDisable: false})
     }
  }

  sendRegistration = event => {
        event.preventDefault();

        this.validateEmptyFields();
        
        if (this.state.notFilledError)
        {
            this.setState({formErrorText: "Sva polja su obavezna. Molim vas popunite prazna polja."})
        } else {

          let data = {
            "name": this.state.name ,
            "surname": this.state.surname ,
            "email": this.state.email ,
            "jbo": this.state.jbo ,
            "phone": this.state.phone ,
            "adress": this.state.adress ,
            "city": this.state.city ,
            "state": this.state.statee,
            "password":this.state.password
          };

          axios({
            method: 'post',
            url: 'http://localhost:8088/register',
            data: data ,
            ContentType: 'application/json'
          }).then((response) => {
            if (response.status == 200)
              this.setState({showResponse: true}) ;
          }, (error) => {
            console.log(error);
          });

          this.cleanAll();
          
      }
  };

  sendLogin = event => {
    event.preventDefault();

    this.validateLoginFields();
    
    if (this.state.notFilledError)
    {
        this.setState({formErrorText: "Sva polja su obavezna. Molim vas popunite prazna polja."})
    } else {

      let data = {        
        "email": this.state.email ,        
        "password":this.state.password
      };

      axios({
        method: 'post',
        url: 'http://localhost:8088/login',
        data: data ,
        ContentType: 'application/json'
      }).then((response) => {
        if (response.status == 200)
          this.setState({showResponse: true}) ;
      }, (error) => {
        console.log(error);
      });

      this.cleanAll();
      
  }
};

  
  render() {
    return (
    <div>
      <Alert color="info" isOpen={this.state.showResponse} toggle={this.onDismiss}>
            <b>Vaš zahtev za registraciju je uspešno poslat.</b> 
      </Alert>
      <ExamplesNavbar showRegister={() => this.setState({registerShow: true})} showLogin={() => this.setState({loginShow: true})}/>
      <div
        className="page-header"
        style={{
          backgroundImage: "url(" + require("assets/img/hc-complete-resize.jpg") + ")"
        }}
      >        
      </div>      
      <Modal modalClassName="modal-register" isOpen={this.state.registerShow}>      
        <div className="modal-header no-border-header text-center">
            <button
              aria-label="Close"
              className="close"
              data-dismiss="modal"
              type="button"
              onClick={() => this.cleanAll()}
            >
            <span aria-hidden={true}>×</span>
            </button>
            <h3 className="title mx-auto">Dobrodošli!</h3>
        </div>
        <div className="modal-body">                       
                <Form onSubmit={this.sendRegistration}>
                  <FormGroup>
                    <label className="text-primary font-weight-bold">JBO</label>
                    <Input name="jbo" placeholder="jedinstveni broj osiguranika" type="text" value={this.state.jbo} onChange={event => this.setState({jbo: event.target.value})} />
                  </FormGroup>
                  <FormGroup>
                    <label className="text-primary font-weight-bold"> Email</label>
                    <Input name="email" placeholder="email" type="text" value={this.state.email} onChange={event => this.setState({email: event.target.value})} onBlur={this.mailValidation}/>
                  <FormText color="danger">{this.state.emailErrorText}</FormText>
                  </FormGroup>
                  <FormGroup>
                    <label className="text-primary font-weight-bold">Ime</label>
                    <Input name="name" placeholder="ime" type="text" value={this.state.name} onChange={event => this.setState({name: event.target.value})} />
                  </FormGroup>
                  <FormGroup>
                    <label className="text-primary font-weight-bold">Prezime</label>
                    <Input  name="surname" placeholder="prezime" type="text" value={this.state.surname} onChange={event => this.setState({surname: event.target.value})} />
                  </FormGroup>
                  <FormGroup>
                    <label className="text-primary font-weight-bold">Lozinka</label>
                    <Input  name="password" placeholder="lozinka" type="password" value={this.state.password} onChange={event => this.setState({password: event.target.value})} />
                  </FormGroup>
                  <FormGroup>
                    <label className="text-primary font-weight-bold">Potvrdi lozinku</label>
                    <Input placeholder="lozinka" type="password" value={this.state.passConf} onBlur={this.handleMatching} onChange={event => this.setState({passConf: event.target.value})}/>
                  <FormText color="danger">{this.state.passErrorText}</FormText>
                  </FormGroup>
                  <FormGroup>
                    <label className="text-primary font-weight-bold">Telefon</label>
                    <Input  name="phoneNumber" placeholder="telefon" type="text" value={this.state.phone} onChange={event => this.setState({phone: event.target.value})}/>
                  </FormGroup>
                  <FormGroup>
                    <label className="text-primary font-weight-bold">Adresa</label>
                    <Input  name="adress" placeholder="adresa" type="text" value={this.state.adress} onChange={event => this.setState({adress: event.target.value})}/>
                  </FormGroup>
                  <FormGroup>
                    <label className="text-primary font-weight-bold">Grad</label>
                    <Input  name="city" placeholder="grad" type="text" value={this.state.city} onChange={event => this.setState({city: event.target.value})} />
                  </FormGroup>
                  <FormGroup>
                    <label className="text-primary font-weight-bold">Država</label>
                    <Input  name="statee" placeholder="država" type="text" value={this.state.statee} onChange={event => this.setState({statee: event.target.value})} />
                  </FormGroup>
                  <p className="text-danger font-weight-bold" >{this.state.formErrorText}</p>                  
                  <Button block className="btn-round" color="info" disabled={this.state.formValid}>
                    Registruj se
                  </Button>
                  </Form>
                
        </div>
        </Modal>
        
        <Modal modalClassName="modal-login" isOpen={this.state.loginShow}>      
        <div className="modal-header no-border-header text-center">
            <button
              aria-label="Close"
              className="close"
              data-dismiss="modal"
              type="button"
              onClick={() => this.cleanAll()}
            >
            <span aria-hidden={true}>×</span>
            </button>
            <h3 className="title mx-auto">Dobrodošli!</h3>
        </div>
        <div className="modal-body">                       
                <Form onSubmit={this.sendRegistration}>                  
                  <FormGroup>
                    <label className="text-primary font-weight-bold"> Email</label>
                    <Input className="form-control" name="email" placeholder="email" type="text" value={this.state.email} onChange={event => this.setState({email: event.target.value})} onBlur={this.mailValidation}/>
                  <FormText color="danger">{this.state.emailErrorText}</FormText>
                  </FormGroup>                  
                  <FormGroup>
                    <label className="text-primary font-weight-bold">Lozinka</label>
                    <Input  name="password" className="form-control" placeholder="lozinka" type="password" value={this.state.password} onChange={event => this.setState({password: event.target.value})} />
                  </FormGroup>               
                  <p className="text-danger font-weight-bold" >{this.state.formErrorText}</p>                  
                  <Button block className="btn-round" color="info" disabled={this.state.loginDisable}>
                    Prijavi se
                  </Button>
                  </Form>
                
        </div>
        </Modal>
    </div>
    )};
}

export default RegisterPage;
