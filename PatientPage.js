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
import ProfilePageHeader from 'components/Headers/ProfilePageHeader.js';

class RegisterPage extends Component {
  constructor(props)
  {
    super(props);
    this.state = {
      showProfile: true ,      
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
      message: "" ,
      clinics: [] ,
      types: [] ,
      pretragaTip: "" ,  
      pretragaDatum: "" ,
      hiddenForm: false ,
      filterOcena: 0      // 0 for rating, 1 for checkup price
    };

    this.editPatient = this.editPatient.bind(this) ;
    this.validateEmptyFields = this.validateEmptyFields.bind(this) ;    
    this.handleMatching = this.handleMatching.bind(this) ;
    this.onDismiss = this.onDismiss.bind(this) ;
    this.cancelSearch = this.cancelSearch.bind(this) ;
    this.getProfile = this.getProfile.bind(this) ;
    this.getAllClinics = this.getAllClinics.bind(this) ;
    this.getAllCheckupTypes = this.getAllCheckupTypes.bind(this) ;
    this.srchClinics = this.srchClinics.bind(this) ;
    this.clinicFilter = this.clinicFilter.bind(this) ;
  }
      
  doc = document.documentElement.classList.remove("nav-open");
  /*eff = useEffect(() => {
    document.body.classList.add("register-page");
    return function cleanup() {
      document.body.classList.remove("register-page");
    };
  });*/

  componentDidMount(){
    this.setState({showProfile: true})
    this.getProfile();
    this.getAllClinics();
    this.getAllCheckupTypes();
   }

   clinicFilter = () => {
    let parametar = this.state.filterOcena
    let klinike = this.state.clinics
    if (parametar == "")
      alert("polje za filtriranje je prazno")
    else {

      axios({
        method: 'post',
        url: 'http://localhost:8099/filterClinic/' + parametar ,
        data: klinike
      }).then((response)=>{       
        this.setState({clinics: response.data}) ;
        
      },(error)=>{
        console.log(error);
      });
  }


}

  cancelSearch = () => {
    this.setState({hiddenForm: false})
    this.getAllClinics();
  }

   srchClinics = () => {
      let parametri = []
      parametri.push(this.state.pretragaTip)
      parametri.push(this.state.pretragaDatum)

    axios({
      method: 'post',
      url: 'http://localhost:8099/searchClinic' ,
      data: parametri
    }).then((response)=>{       
      this.setState({clinics: response.data}) ;
      
    },(error)=>{
      console.log(error);
    });

    this.setState({hiddenForm: true})
   }

   getAllCheckupTypes = () => {
     let tipovi = []
     let i;

    axios({
      method: 'get',
      url: 'http://localhost:8099/checkUpType/allTypes'      
    }).then((response)=>{  
      for (i=0 ; i < response.data.length ; i++) {
        tipovi.push(response.data[i].name)
      }
      this.setState({types: tipovi}) ;
      this.setState({types: [...this.state.types, "DERMATOLOŠKI"]})
    },(error)=>{
      console.log(error);
    });
   }

  validateEmptyFields = () => {     
      if (this.state.name == "" || this.state.surname == "" || this.state.email == "" || this.state.jbo == "" || this.state.phone == "" || this.state.adress == "" || this.state.city == "" || this.state.statee == "" )
      {
          this.state.notFilledError = true;
      }
  }


  onDismiss = () => this.setState({showResponse: !this.showResponse});

  getAllClinics = () => {
    axios({
      method: 'get',
      url: 'http://localhost:8099/getClinics'      
    }).then((response)=>{       
      this.setState({clinics: response.data}) ;
      
    },(error)=>{
      console.log(error);
    });
  }

  handleMatching = (event) => {
    if (this.state.password != event.target.value)
      {
        this.setState({formValid: true, passErrorText: "Lozinke se ne poklapaju."});    // disabling submit button
      } else {
        this.setState({formValid: false, passErrorText: ""});
      }
  }

  getProfile = () => {
    //this.setState({showProfile: false}) ;
    let AuthStr = 'Bearer '.concat(localStorage.getItem("ulogovan"));

    axios({
      method: 'get',
      url: 'http://localhost:8099/getPatientProfile',
      headers: { "Authorization": AuthStr }
    }).then((response)=>{      
      this.setState({name:response.data.user.name, email:response.data.user.email,surname:response.data.user.surname,phone:response.data.phoneNumber,password:response.data.user.password,
                    jbo: response.data.jbo , adress: response.data.address , city: response.data.city , statee : response.data.state
      
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
            method: 'post',
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
          
      }
  };

  

  

  
  render() {
    return (
    <div>
      <Alert color="info" isOpen={this.state.showResponse} toggle={this.onDismiss}>
            <b>{this.state.message}</b> 
      </Alert>
      <ExamplesNavbar showProfileEvent={() => this.setState({showProfile: false})}/>
      <ProfilePageHeader />
      <div className="section profile-content">
        <Container >
          <div className="owner">            
            <div className="name">
                           
            </div>
          </div>          
          <br />

        

    <Modal  modalClassName="modal-register" isOpen={this.state.changePass}>
<div className="modal-header no-border-header text-center">
          <button
            aria-label="Close"
            className="close"
            data-dismiss="modal"
            type="button"
            onClick={event => this.setState({changePass:false, password1:"",password11:""})} // na izlaz 
          >
          <span aria-hidden={true}>�</span>
          </button>
          </div>
          <div className="modal-body"> 
          <Form onSubmit={this.changePassword} > 
        <FormGroup>
        <label>Nova lozinka</label>
        <Input  name="password1"  value = {this.state.password1}  onChange={(event) => this.validacija3(event)} type="password"  />
        <p style={{color:'red'}} > {this.state.password1Validation} </p>
        </FormGroup>
        <FormGroup>
        <label>Potvrda lozinke</label>
        <Input  name="password11"  value = {this.state.password11} onChange={(event) => this.validacija4(event)}  type="password"  />
        <label color="red" name="password11Validation" > </label>
        <p style={{color:'red'}} > {this.state.message1} </p>
        </FormGroup>
        <Button block className="btn-round" color="info"   >
       Sacuvaj izmjene
        </Button>
        </Form>
</div>
</Modal>

<section className="bar pt-0" hidden={this.state.hiddenForm}>
     	<div className="content"  >
               <div className="row">
               <div className="col-sm-3">
                        <div className="form-group">
                            <label>Tip pregleda</label>
                            <select className="form-control" value={this.state.pretragaTip} onChange = {event => this.setState({pretragaTip: event.target.value})} >
                            {this.state.types.map(type => (
                                <option key={type}>
                                    {type}                                    
                                </option>
                    ))} 
                            </select>                            
                        </div>
                      </div>    
                                       
                  <div className="col-sm-3 col-md-3">
                        <div className="form-group">
                          <label>Datum</label>
                          <input type="date" className="form-control" value={this.state.pretragaDatum} onChange = {event => this.setState({pretragaDatum: event.target.value})}/>
                        </div>
                      </div>                                          
                                           
                      <div className="col-sm-3">
                      <div className="form-group">
                        <label></label>
                        <Button onClick={this.srchClinics} block className="btn-round form-control" color="info">Pretraži</Button>
                      </div> </div>
                      </div>                      
         </div>
  </section> 

  <section className="bar pt-0" hidden={!this.state.hiddenForm}>
          <div className="row">            
              <div  className="col-sm-3">
                  <Input name="filter[0]" type="text" placeholder="filtriraj po oceni" value={this.state.filterOcena} onChange={event => this.setState({filterOcena: event.target.value })} />
              </div>
                {/*<div  className="col-sm-3">
                <Input name="filter[0]" type="text" value={this.state.filter[0]} onChange={event => this.setState({filter: [...this.state.filter, event.target.value]})} />
                            </div>  */}                     
            <div  className="col-md-3">
                <Button block className="btn-round" color="info" onClick={this.cancelSearch}>Poništi pretragu</Button>
            </div>
            <div  className="col-md-3">    
                <Button block className="btn-round" color="info" onClick={this.clinicFilter}>Filtriraj rezultate</Button>
            </div>
          </div>
  </section> 

<section className="bar pt-0">
          <div className="row">
     <div  className="col-md-12">
            <p className="text lead">Izbor klinika klinickog centra</p>
            <div className="box mt-0 mb-lg-0">
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th className="text-primary font-weight-bold">Naziv klinike</th>
                      <th className="text-primary font-weight-bold">Grad</th>
                      <th className="text-primary font-weight-bold">Adresa klinike</th>
                      <th className="text-primary font-weight-bold">Prosečna ocena</th>
                      {/*<th>Cena pregleda</th> */}              
                    </tr>
                  </thead>
                  <tbody>  
                  {this.state.clinics.map(clinic => (
                    <tr key={clinic.name}>
                        <td>{clinic.name}</td>
                        <td>{clinic.city}</td>
                        <td>{clinic.address}</td>
                        <td>{clinic.rating}</td>
                    </tr>
                    ))}
                    
                  </tbody>
                </table>
              </div>
            </div>
          </div>    
    </div>
    </section>    

    <Col className="ml-auto mr-auto" md="6"> 
    <Form onSubmit={this.editPatient} hidden={this.state.showProfile}>
                  <FormGroup>
                    <label className="text-primary font-weight-bold">JBO</label>
                    <Input name="jbo" type="text" value={this.state.jbo} onChange={event => this.setState({jbo: event.target.value})} disabled="true"/>
                  </FormGroup>
                  <FormGroup>
                    <label className="text-primary font-weight-bold"> Email</label>
                    <Input name="email" type="text" value={this.state.email} onChange={event => this.setState({email: event.target.value})} disabled="true"/>
                  <FormText color="danger">{this.state.emailErrorText}</FormText>
                  </FormGroup>
                  <FormGroup>
                    <label className="text-primary font-weight-bold">Ime</label>
                    <Input name="name" type="text" value={this.state.name} onChange={event => this.setState({name: event.target.value})} />
                  </FormGroup>
                  <FormGroup>
                    <label className="text-primary font-weight-bold">Prezime</label>
                    <Input  name="surname" type="text" value={this.state.surname} onChange={event => this.setState({surname: event.target.value})} />
                  </FormGroup>                                   
                  <FormGroup>
                    <label className="text-primary font-weight-bold">Telefon</label>
                    <Input  name="phoneNumber" type="text" value={this.state.phone} onChange={event => this.setState({phone: event.target.value})}/>
                  </FormGroup>
                  <FormGroup>
                    <label className="text-primary font-weight-bold">Adresa</label>
                    <Input  name="adress"  type="text" value={this.state.adress} onChange={event => this.setState({adress: event.target.value})}/>
                  </FormGroup>
                  <FormGroup>
                    <label className="text-primary font-weight-bold">Grad</label>
                    <Input  name="city"  type="text" value={this.state.city} onChange={event => this.setState({city: event.target.value})} />
                  </FormGroup>
                  <FormGroup>
                    <label className="text-primary font-weight-bold">Država</label>
                    <Input  name="statee" type="text" value={this.state.statee} onChange={event => this.setState({statee: event.target.value})} />
                  </FormGroup>
                  <p className="text-danger font-weight-bold" >{this.state.formErrorText}</p>                  
                  <Button block className="btn-round" color="info" disabled={this.state.formValid}>
                    Izmeni podatke
                  </Button>
                  </Form>
                       
             </Col>
 </Container>
      </div>
                      
    </div>
    )};
}

export default RegisterPage;
