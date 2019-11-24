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
import { isFlowBaseAnnotation } from "@babel/types";

class MedicalWorkerPage extends Component {
  constructor(props)
  {
    super(props);

    this.state = {
      dataShow: false,
      name: "" ,
      surname: "" ,
      email: "" ,
      phone: "" ,
      clinic: "" ,
      raiting: "10" ,
      workingTime: "8-15h" ,
      temp:true,
      temp1:false,
      password:"",
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
      password11Validation:"",
      flag1: true,
      flag2: true,
      flag3: true,
      flag4: true,
      flag5: true,
      changePass: false,
      message1:""
      
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


 componentDidMount(){
  axios({
    method: 'get',
    url: 'http://localhost:8099/getMedicalWorker',
  }).then((response)=>{
    console.log(response);
    this.setState({name:response.data.user.name, email:response.data.user.email,surname:response.data.user.surname,phone:response.data.phone,password:response.data.user.password})
  },(error)=>{
    console.log(error);
  });
 }
   

 updateOneWorker = event => {
    event.preventDefault();
    let isOk = true;

      let nameMy = this.state.name1
      let surnameMy = this.state.surname1;
      let phoneMy = this.state.phone1

      if (nameMy === undefined || nameMy === ''){
        this.setState({nameValidation:"Ime je obavezno polje."})
        isOk = false;
      }
      else if(!nameMy[0].match('[A-Z]')){
        this.setState({nameValidation:"Ime mora pocinjati velikim slovom."})
        isOk = false;
     }
      else{
        this.setState({nameValidation:""})
      }

      if (surnameMy === undefined || surnameMy === ''){
        this.setState({surnameValidation:"Prezime je obavezno polje."})
        isOk = false;
      }
      else if(!surnameMy[0].match('[A-Z]')){
        this.setState({surnameValidation:"Prezime mora pocinjati velikim slovom."})
        isOk = false;
     }
      else{
        this.setState({surnameValidation:""})
      }

      if (phoneMy === undefined || phoneMy === ''){
        this.setState({phoneValidation:"Telefon je obavezno polje."})
        isOk = false;
      }
      else{
        this.setState({phoneValidation:""})
      }
      

  if(isOk){

    this.state.name = this.state.name1
    this.state.surname = this.state.surname1
    this.state.phone = this.state.phone1
        let data = {
        "user":{
          "name": this.state.name ,
          "surname": this.state.surname ,
          "email": this.state.email ,
          "password": this.state.password
        },
        "phone": this.state.phone ,
      };


    axios({
      method: 'post',
      url: 'http://localhost:8099/updateMedicalWorker',
      data: data
    }).then((response) => {
      console.log(response);
      alert('Uspjesna izmjena podataka!')
      this.setState({temp1: false});
    }, (error) => {
      console.log(error);
    });
    this.setState({temp1: false});

    //this.setState({temp1: false});
  }
  
};

validacija(e) {
  this.setState({name1 : e.target.value});
  let sun = e.target.value;
  if(sun===''){
    this.setState({nameValidation : "Ovo polje ne moze biti prazno"});
    this.state.flag1 = false
  }
  else if(!sun[0].match('[A-Z]')){
    this.setState({nameValidation : "Ime mora da pocinje velikim slovom"});
    this.state.flag1 = false
  }
  else{
    this.setState({nameValidation : ""});
    this.state.flag1 = true
  }
  
  e.preventDefault();
}


validacija1(e) {
  this.setState({surname1 : e.target.value});
  let sun = e.target.value;
  if(sun===''){
    this.setState({surnameValidation : "Ovo polje ne moze biti prazno"});
    this.state.flag2 = false
  }
  else if(!sun[0].match('[A-Z]')){
    this.setState({surnameValidation : "Prezime mora da pocinje velikim slovom"});
    this.state.flag2 = false
  }
  else{
    this.setState({surnameValidation : ""});
    this.state.flag2 = true
  }

  e.preventDefault();
}

validacija2(e) {
  this.setState({phone1 : e.target.value});
  let sun = e.target.value;
  if(sun===''){
    this.setState({phoneValidation : "Ovo polje ne moze biti prazno"});
    this.state.flag3 = false
  }
  else if(sun!=''){
    this.setState({phoneValidation : ""});
    this.state.flag3 = false
  }
  else{
    this.setState({phoneValidation : ""});
    this.state.flag3 = true
  }
  e.preventDefault();
}


validacija3(e) {
  this.setState({password1 : e.target.value});
  let sun = e.target.value;
  if(sun===''){
    this.setState({password1Validation : "Ovo polje ne moze biti prazno"});
    this.state.flag4 = false
  }
  else if(sun!=''){
    this.setState({password1Validation : ""});
    this.state.flag4 = false
  }
  else{
    alert(sun)
    this.setState({password1Validation : ""});
    this.state.flag4 = true
  }

  e.preventDefault();
}


validacija4(e) {
  this.setState({password11 : e.target.value});
  let sun = e.target.value;
  this.state.password11 = sun;
  if(sun===''){
    this.setState({password11Validation : "Ovo polje ne moze biti prazno"});
    this.state.flag5 = false
  }
  else if(sun!=undefined && this.state.password1!=e.target.value){
    this.setState({password11Validation: "Lozinke se moraju poklapati"})
    this.state.flag5 = false
  }
  else if(sun === this.state.password1) {
    this.state.flag5 = true;
    this.setState({password11Validation: ""})
  }
  else{
    this.setState({password11Validation : ""});
    this.state.flag5 = true;
  }

  e.preventDefault();
}

changePassword = event => {
  event.preventDefault();
  this.state.changeData = true;
  let pom1 = this.state.password1;
  let pom2 = this.state.password11;
  alert(pom1)
  alert(pom2)
  if(pom1!=pom2){
      this.setState({message1 : "Lozinke se moraju poklapati!"});
  }
  else if(pom1 === undefined || pom1 === ""){
    this.setState({message1 : "Lozinke se moraju poklapati!"});
  }
  else{
    this.state.password = this.state.password1;
    this.setState({changePass:false});
    this.state.password1=""
    this.state.password11=""
  }
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
            onClick={event => this.setState({temp1:false,name1:'',surname1:'', phone1:'',password1:''})} // na izlaz
          >
          <span aria-hidden={true}>�</span>
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
                  <Button block className="btn-round" color="info"  onClick={event => this.setState({changePass: true})}  >

                Promijeni lozinku
                  </Button>

                  <Button block className="btn-round" color="info"  >
                    Izmijeni podatke
                  </Button>
                  <p style={{color:'red'}} > {this.state.message} </p>
                  </Form>         
             </div>
    </Modal>



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


