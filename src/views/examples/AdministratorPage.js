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
import { Button,Label, FormGroup,Input,NavItem,NavLink,Nav,TabContent,TabPane,Container,Row,Col,Form,Table,Modal,FormText,Text
} from "reactstrap";

// core components
import ExamplesNavbar from 'components/Navbars/ExamplesNavbar.js';
import ProfilePageHeader from 'components/Headers/ProfilePageHeader.js';
import DemoFooter from 'components/Footers/DemoFooter.js';
import { isFlowBaseAnnotation } from "@babel/types";

class AdministratorPage extends Component {
  constructor(props)
  {
    super(props);
    this.state = {
     changeData: false,
     changePass: false,
     temp: true,
     name:"",
     surname:"",
     email:"",
     clinic: "",
     name1:"",
     surname1:"",
     password:"",
     pass1:"",
     pass2:"",
     temp1:false,
     surnameText: "",
     nameText: "",
     message:""
    };

    this.updateOneAdministrator = this.updateOneAdministrator.bind(this);
    this.setujAdmina = this.setujAdmina.bind(this);
  }
      
  doc = document.documentElement.classList.remove("nav-open");
 
  //React.useEffect(() => {
    //document.body.classList.add("landing-page");
    //return function cleanup() {
      //document.body.classList.remove("landing-page");
   // };
 // });

 changePassword = event => {
    event.preventDefault();
    let pom1 = this.state.password1;
    let pom2 = this.state.password11;
    alert(pom1)
    alert(pom2)
    if(pom1!=pom2){
        this.setState({message : "Lozinke se moraju poklapati!"});
    }
    else if(pom1 === undefined || pom1 === ""){
      this.setState({message : "Lozinke se moraju poklapati!"});
    }
    else{
      this.state.password = this.state.password1;
      this.setState({changePass :false});
      this.state.password1=""
      this.state.password11=""
    }

}

setujAdmina(response) {
  this.setState({name:response.data.user.name, email:response.data.user.email,
    surname:response.data.user.surname,password:response.data.user.password,clinic:response.data.clinic}) ;

}

componentDidMount(){
  axios({
    method: 'get',
    url: 'http://localhost:8099/getAdministrator',
  }).then((response) => {
    console.log(response);
      this.setujAdmina(response);
  }, (error) => {
    console.log(error);
  });
}


updateOneAdministrator = event =>{
    event.preventDefault();
    let isOk = true;

    let nameMy = this.state.name1;
    let surnameMy = this.state.surname1;


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
  

      if(isOk){
        
      this.state.name = this.state.name1
      this.state.surname = this.state.surname1
        let data = {
        "user":{
          "name": this.state.name ,
          "surname": this.state.surname ,
          "email": this.state.email ,
          "password":this.state.password
        },
          
          "clinic":this.state.clinic
        };
        let pom = this.state.email;

        axios({
          method: 'post',
          url: 'http://localhost:8099/updateAdministrator/email',
          data: data ,
          ContentType: 'application/json'
        }).then((response) => {
          console.log(response);
          this.setState({changeData:false})
        }, (error) => {
          console.log(error);
        });

        this.setState({changeData:false})
      }
}
 
nameValidation(e) {
  this.setState({name1 : e.target.value});
  let sun = e.target.value;
  if(sun===''){
    this.setState({nameText : "Ovo polje ne moze biti prazno"});
    this.state.flag1 = false
  }
  else if(!sun[0].match('[A-Z]')){
    this.setState({nameText : "Ime mora da pocinje velikim slovom"});
    this.state.flag1 = false
  }
  else{
    this.setState({nameText : ""});
    this.state.flag1 = true
  }
  
}


surnameValidation(e) {
  this.setState({surname1 : e.target.value});
  let sun = e.target.value;
  if(sun===''){
    this.setState({surnameText : "Ovo polje ne moze biti prazno"});
    this.state.flag2 = false
  }
  else if(!sun[0].match('[A-Z]')){
    this.setState({surnameText : "Prezime mora da pocinje velikim slovom"});
    this.state.flag2 = false
  }
  else{
    this.setState({surnameText : ""});
    this.state.flag2 = true
  }

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
}


pass1Validation(e) {
  this.setState({password1 : e.target.value});
  let sun = e.target.value;
  if(sun===''){
    this.setState({password1Validation : "Ovo polje ne moze biti prazno"});
  }
  else if(sun!=''){
    this.setState({password1Validation : ""});
  }
  else{
    alert(sun)
    this.setState({password1Validation : ""});
  }
}

pass2Validation(e) {
  this.setState({password11 : e.target.value});
  let sun = e.target.value;
  this.state.password11 = sun;
  if(sun===''){
    this.setState({password11Validation : "Ovo polje ne moze biti prazno"});
  }
  else if(sun!=undefined && this.state.password1!=e.target.value){
    this.setState({password11Validation: "Lozinke se moraju poklapati"})
  }
  else if(sun === this.state.password1) {
    this.setState({password11Validation: ""})
  }
  else{
    this.setState({password11Validation : ""});
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
              <h6 className="description">Administrator</h6>
            </div>
          </div>
          <Row>
            <Col className="ml-auto mr-auto text-center" md="6">
              <p font size="3" color="red">
                Ovdje su Vasi neki podaci
              </p>
              <br />
            </Col>
          </Row>
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
        <Input  name="password1"  value = {this.state.password1}  onChange={(event) => this.pass1Validation(event)} type="password"  />
        <p style={{color:'red'}} > {this.state.password1Validation} </p>
        </FormGroup>
        <FormGroup>
        <label>Potvrda lozinke</label>
        <Input  name="password11"  value = {this.state.password11} onChange={(event) => this.pass2Validation(event)}  type="password"  />
        <label color="red" name="password11Validation" > </label>
        <p style={{color:'red'}} > {this.state.password11Validation} </p>
        </FormGroup>
        <Button block className="btn-round" color="info"   >
       Sacuvaj izmjene
        </Button>
        </Form>
</div>
</Modal>

<Modal  modalClassName="modal-register" isOpen={this.state.changeData}>
<div className="modal-header no-border-header text-center">
          <button
            aria-label="Close"
            className="close"
            data-dismiss="modal"
            type="button"
            onClick={event => this.setState({changeData:false,name1:'',surname1:''})} // na izlaz
          >
          <span aria-hidden={true}>�</span>
          </button>
          </div>
          <div className="modal-body"> 
          <Form onSubmit={this.updateOneAdministrator}>
                  <FormGroup>
                  <label>Ime</label>
                  <Input name="name" value = {this.state.name1} onChange={(event) => this.nameValidation(event)} type="text"  />
                  <p style={{color:'red'}} > {this.state.nameText} </p>
                  </FormGroup>
                  <FormGroup>
                  <label>Prezime</label>
                  <Input name="surname"  value = {this.state.surname1} onChange={(event) => this.surnameValidation(event)}  type="text" />
                  <p style={{color:'red'}} > {this.state.surnameText} </p>
                  </FormGroup>     
                  <p style={{color:'red'}} > {this.state.message} </p>
                  <Button block className="btn-round" color="info"    >
                    Sacuvaj
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
                  <label>Klinika</label>
                  <Input  name="clinic"   disabled={this.state.temp} type="text" value = {this.state.clinic}/>
                  </FormGroup>
                  <Button block className="btn-round" color="info"  onClick={event => this.setState({changePass: true})}   >
                   Promijeni lozinku
                  </Button>       
                  <Button block className="btn-round" color="info"  onClick={event => this.setState({changeData:true,name1:this.state.name,surname1:this.state.surname})}    >
                    Izmijeni podatke
                  </Button>
                  </Form>         
             </Col>
 </Container>
      </div>
 
    </>
    )};
}
export default AdministratorPage;


