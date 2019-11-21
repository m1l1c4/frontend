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

// reactstrap components
import {
  Button,
  Label,
  FormGroup,
  Input,
  NavItem,
  NavLink,
  Nav,
  TabContent,
  TabPane,
  Container,
  Row,
  Col,
  Form,
  Table,
  Modal,
  FormText,
  Text
} from "reactstrap";

// core components
import ExamplesNavbar from 'components/Navbars/ExamplesNavbar.js';
import ProfilePageHeader from 'components/Headers/ProfilePageHeader.js';
import DemoFooter from 'components/Footers/DemoFooter.js';

class MedicalWorkerPage extends Component {
  constructor(props)
  {
    super(props);

    this.state = {
      dataShow: false,
      name: "Dragana" ,
      surname: "Mihajlovic" ,
      email: "draganamihajlovic55@yahoo.com" ,
      phone: "53745745733" ,
      clinic: "Foca" ,
      raiting: "10" ,
      workingTime: "8-15h" ,
      temp:true,
      temp1:false,
      password:"dfhsdfhdh54",
      name1:"",
      surname1:"",
      phone1:"",
      password1:"",
      password11:"",
      message:"",
      nameValidation:"",
      surnameValidation:"",
      phoneValidation:"",
      password1Validation:"",
      password11Validation:""
    };

    this.updateOneWorker = this.updateOneWorker.bind(this);
   
  }
      
  doc = document.documentElement.classList.remove("nav-open");
 
  //React.useEffect(() => {
    //document.body.classList.add("landing-page");
    //return function cleanup() {
      //document.body.classList.remove("landing-page");
   // };
 // });

 
 updateOneWorker = event => {
  event.preventDefault();
  this.state.temp1 = false;
  this.state.name = this.state.name1
  this.state.surname = this.state.surname1
  this.state.password = this.state.password11
  this.state.phone = this.state.phone1
  let isOk = true;

  if(this.state.name1===''){
    this.setState({nameValidation : "Ovo polje ne moze biti prazno"});
    isOk = false;
  }
  else if(!this.state.name1[0].match('[A-Z]')){
    this.setState({nameValidation : "Ime mora da pocinje velikim slovom"});
    isOk = false;
  }
  else{
    this.setState({nameValidation : ""});
  }

  if(this.state.surname1===''){
    this.setState({surnameValidation : "Ovo polje ne moze biti prazno"});
    isOk = false;
  }
  else if(!this.state.surname1[0].match('[A-Z]')){
    this.setState({surnameValidation : "Prezime mora da pocinje velikim slovom"});
    isOk = false;
  }
  else{
    this.setState({surnameValidation : ""});
  }

  if(this.state.nameValidation==='Ovo polje ne moze biti prazno' || this.state.surnameValidation==='Ovo polje ne moze biti prazno' || this.state.phoneValidation==='Ovo polje ne moze biti prazno' || this.state.password1 === 'Ovo polje ne moze biti prazno' || this.state.password11==='Ovo polje ne moze biti prazno'){
      isOk = false;
      this.state.message = 'Polja ne smiju biti prazna !'
  }
  else if(this.state.name==='' || this.state.name1 === '' || this.state.surname1 === '' || this.state.phone === '' || this.state.password1 === '' || this.state.password11 == ''){
    isOk = false;
    this.state.message = 'Polja ne smiju biti prazna !'

  }
  else if( this.state.nameValidation==='Ime mora da pocinje velikim slovom' || this.state.surnameValidation === 'Prezime mora da pocinje velikim slovom'){
    isOk = false;
    this.state.message = 'Ime i prezime moraju da pocnu velikim slovom!'
  }
  else if(this.state.password1 === 'Ovo polje ne moze biti prazno' || this.state.password11==='Ovo polje ne moze biti prazno' || this.state.pasword11 ==='Lozinke se moraju podudarati'){
    isOk = false;
    this.state.message = 'Neispravne lozinke!';
  }
  else{
    this.state.message = '';
  }


  let data = {
    "user":{
      "name": this.state.name ,
      "surname": this.state.surname ,
      "email": this.state.email ,
      "password": this.state.password
    },
     "phone": this.state.phone ,
    
  };

  if(isOk){
    axios({
      method: 'post',
      url: 'http://localhost:8088/updateMedicalWorker/1',
      data: JSON.stringify(data)
    }).then((response) => {
      console.log(response);
      alert('Uspjesna izmjena podataka!')
    }, (error) => {
      console.log(error);
    });
    this.setState({dataShow: false});

  }
};

validacija(e) {
  this.setState({name1 : e.target.value});
  let sun = e.target.value;
  if(sun===''){
    this.setState({nameValidation : "Ovo polje ne moze biti prazno"});
  }
  else if(!sun[0].match('[A-Z]')){
    this.setState({nameValidation : "Ime mora da pocinje velikim slovom"});
  }
  else{
    this.setState({nameValidation : ""});
  }
  
  e.preventDefault();
}


validacija1(e) {
  this.setState({surname1 : e.target.value});
  let sun = e.target.value;
  if(sun===''){
    this.setState({surnameValidation : "Ovo polje ne moze biti prazno"});
  }
  else if(!sun[0].match('[A-Z]')){
    this.setState({surnameValidation : "Prezime mora da pocinje velikim slovom"});
  }
  else{
    this.setState({surnameValidation : ""});
  }
  
  e.preventDefault();
}

validacija2(e) {
  this.setState({phone1 : e.target.value});
  let sun = e.target.value;
  if(sun===''){
    this.setState({phoneValidation : "Ovo polje ne moze biti prazno"});
  }
  else if(sun!=''){
    this.setState({phoneValidation : ""});
  }
  else{
    this.setState({phoneValidation : ""});
  }
  
  e.preventDefault();
}


validacija3(e) {
  this.setState({password1 : e.target.value});
  let sun = e.target.value;
  if(sun===''){
    this.setState({password1Validation : "Ovo polje ne moze biti prazno"});
  }
  else if(sun!=''){
    this.setState({password1Validation : ""});
  }
  else{
    this.setState({password1Validation : ""});
  }
  
  e.preventDefault();
}


validacija4(e) {
  this.setState({password11 : e.target.value});
  let sun = e.target.value;
  if(sun==='' || sun === undefined){
    this.setState({password11Validation : "Ovo polje ne moze biti prazno"});
  }
  else if(this.state.password1!=this.state.password11  && this.state.password11!='' && this.state.password1!=''){
    this.setState({password11Validation : "Lozinke se moraju podudarati"});
  }
  else{
    this.setState({password11Validation : ""});
  }
  
  
  e.preventDefault();
}

render() {
  return (
    <>


      <ExamplesNavbar />

      <ProfilePageHeader />

      <div className="section profile-content">
        <Container>
          <div className="owner">
            <div className="avatar">
              <img
                alt="..."
                className="img-circle img-no-padding img-responsive"
                src={require("assets/img/hc-complete-resize.jpg")}
              />
            </div>
            <div className="name">
              <h4 className="title">
                Dragana Mihajlovic<br />
              </h4>
              <h6 className="description">Medicinski radnik</h6>
            </div>
          </div>
          <Row>
            <Col className="ml-auto mr-auto text-center" md="6">
              <p font size="3" color="red">
                Ovdje su neki podaci o medicinskom radniku.
              </p>
              <br />
             
            </Col>
          </Row>
          <br />

     <Modal modalClassName="modal-register" isOpen={this.state.temp1}>
      <div className="modal-header no-border-header text-center">
          <button
            aria-label="Close"
            className="close"
            data-dismiss="modal"
            type="button"
            onClick={event => this.setState({temp1:true,name1:'',surname1:'', phone1:'',password1:''})}
            onClick={() => this.setState({temp1: false})}
          >
          <span aria-hidden={true}>×</span>
          </button>
          </div>
          <div className="modal-body"> 
          <Form onSubmit={this.updateOneWorker}>
                  <FormGroup>
                  <label>Ime</label>
                  <Input name="name1"  value={this.state.name1}  onChange={(event) => this.validacija(event)} type="text"  />
                  <p style={{color:'red'}} > {this.state.nameValidation} </p>
                  </FormGroup>
                  <FormGroup>
                  <label>Prezime</label>
                  <Input name="surname1" value = {this.state.surname1} onChange={(event) => this.validacija1(event)} type="text" />
                  <p style={{color:'red'}} > {this.state.surnameValidation} </p>
                  </FormGroup>
                  <FormGroup>
                  <label>Telefon</label>
                  <Input  name="phone1"  value = {this.state.phone1} onChange={(event) => this.validacija2(event)} type="number"  />
                  <p style={{color:'red'}} > {this.state.phoneValidation} </p>
                  </FormGroup>
                  <FormGroup>
                  <label>Lozinka</label>
                  <Input  name="password1"  value = {this.state.password1} onChange={(event) => this.validacija3(event)} type="password"  />
                  <p style={{color:'red'}} > {this.state.password1Validation} </p>
                  </FormGroup>
                  <FormGroup>
                  <label>Potvrda lozinke</label>
                  <Input  name="password11"  value = {this.state.password11} onChange={(event) => this.validacija4(event)} type="password"  />
                  <label color="red" name="password11Validation" > </label>
                  <p style={{color:'red'}} > {this.state.password11Validation} </p>
                  </FormGroup>
                  <Button block className="btn-round" color="info"   >
                    Izmijeni podatke
                  </Button>
                  <p style={{color:'red'}} > {this.state.message} </p>
                  </Form>         
             </div>
    </Modal>

    <Col className="ml-auto mr-auto" md="6"> 
          <Form>
                  <FormGroup>
                  <label>Ime</label>
                  <Input name="name" disabled={this.state.temp} value = {this.state.name} type="text"  />
                  </FormGroup>
                  <FormGroup>
                  <label>Prezime</label>
                  <Input name="surname" disabled={this.state.temp} value = {this.state.surname} type="text" />
                  </FormGroup>
                  <FormGroup>
                  <label>Email</label>
                  <Input name="email" disabled={this.state.temp} value = {this.state.email} type="text" />
                  </FormGroup>
                  <FormGroup>
                  <label>Telefon</label>
                  <Input  name="phone" disabled={this.state.temp} value = {this.state.phone} type="number"  />
                  </FormGroup>
                  <FormGroup>
                  <label>Klinika</label>
                  <Input  name="clinic"   disabled={this.state.temp} type="text" value = {this.state.clinic}/>
                  </FormGroup>
                  <FormGroup>
                  <label>Ocjena</label>
                  <Input name="raiting"  disabled={this.state.temp} type="number" value = {this.state.raiting}/>
                  </FormGroup>
                  <FormGroup>
                  <label>Radno vrijeme</label>
                  <Input  name="workingTime"  disabled={this.state.temp} type="text" value = {this.state.workingTime}/>
                  </FormGroup>                 
                  <Button block className="btn-round" color="info"  onClick={event => this.setState({temp1:true,name1:this.state.name,surname1:this.state.surname, phone1:this.state.phone,password1:this.state.password})}    >
                    Izmijeni podatke
                  </Button>
                  </Form>         
             </Col>
 </Container>
      </div>
 
    </>
    )};
}
export default MedicalWorkerPage;
