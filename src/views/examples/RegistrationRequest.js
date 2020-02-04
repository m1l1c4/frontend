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
import React, { Component } from "react";
import axios from 'axios';
// reactstrap components
import {
    Input
} from "reactstrap";
 
// core components
import ExamplesNavbar from 'components/Navbars/ExamplesNavbar.js';
import ProfilePageHeader from 'components/Headers/ProfilePageHeader.js';
import DemoFooter from 'components/Footers/DemoFooter.js';
 
class RegistrationRequest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showTextArea: true,
            explanation: "",
            explVal: "",
            explanationForVacation:"",
            expValVac:"",
            temp: "",
            requests: [],
            requestsForRoom: [],
            requestsForVacation:[],
            temp1:"",
            reason:"",
        };
 
    }
    deleteRequest(email) {
        const items = this.state.requests.filter(request => request.user.email !== email);
        this.setState({ requests: items });
    };
 
     deleteRequestVacation(email) {
        const items = this.state.requestsForVacation.filter(request => request.medicalWorker.user.email !== email);
        this.setState({ requestsForVacation: items });
    };
 
    doc = document.documentElement.classList.remove("nav-open");
 
    explanationValidation(e) {
        this.setState({ explanation: e.target.value })
        let expl = e.target.value;
        if (expl === undefined || expl === '')
            this.setState({ explVal: "Morate navesti razlog za odbijanje zahteva za registraciju." })
        else
            this.setState({ explVal: "" })
    };
 
    explanationValidationForVacation(e) {
        this.setState({ reason: e.target.value })
        let expl = e.target.value;
        if (expl === undefined || expl === '')
            this.setState({ explValVac: "Morate navesti razlog za odbijanje zahteva za odmor ili odsustvo" })
        else
            this.setState({ explValVac: "" })
    };
 
 
    reject(email, e){
        e.preventDefault();
        this.setState({temp:email})
        this.setState({explVal:""})
    }
 
   
    rejectV(email, e){
        e.preventDefault();
        this.setState({temp1:email})
        this.setState({explValVac:""})
        this.setState({reason:""})
    }
 
    zakazi = (id) =>{
        this.props.history.push('/checkup/' + id);
    }
 
    sendAnswerVacation(email, sun, e){
        e.preventDefault();
 
                    let pom;
                    for(let i=0; i<this.state.requestsForVacation.length; i++){
                        if(this.state.requestsForVacation[i].medicalWorker.user.email === email){
                            pom = this.state.requestsForVacation[i];
                        }
                    }
                    let token = localStorage.getItem("ulogovan")
                    let AuthStr = 'Bearer '.concat(token);
                    axios({
                        method: 'post',
                        url: 'http://localhost:8099/requestVacation/ok',
                        data: pom,
                        headers: { "Authorization": AuthStr }  
                      }).then((response) => {
                        console.log(response);
                        this.deleteRequestVacation(email);
                      }, (error) => {
                        console.log(error);
                        if(error.status === "ALREADY_REPORTED")
                        alert("Greska")
                      });
               
    }
 
 
    sendRejectVacation(email, sun, e){
        e.preventDefault();
        let expl = this.state.reason;
        let ok = true;
 
        if (expl === undefined || expl === '') {
            this.setState({ explValVac: "Morate navesti razlog za odbijanje zahteva za odmor." })
            ok = false;
        }
        else
            this.setState({ explValVac: "" })
                if(ok){
                    let pom;
                    for(let i=0; i<this.state.requestsForVacation.length; i++){
                        if(this.state.requestsForVacation[i].medicalWorker.user.email === email){
                            pom = this.state.requestsForVacation[i];
                        }
                    }
                    let token = localStorage.getItem("ulogovan")
                    let AuthStr = 'Bearer '.concat(token);
                    axios({
                        method: 'post',
                        url: 'http://localhost:8099/requestVacation/' + expl,
                        data: pom,
                        headers: { "Authorization": AuthStr }  
                      }).then((response) => {
                        console.log(response);
                        this.deleteRequestVacation(email);
                      }, (error) => {
                        console.log(error);
                        if(error.status === "ALREADY_REPORTED")
                        alert("Greska")
                      });
                }
    }
 
    sendAnswer(email, e) {
        e.preventDefault();
 
        let expl = this.state.explanation;
        let ok = true;
 
        if (expl === undefined || expl === '') {
            this.setState({ explVal: "Morate navesti razlog za odbijanje zahteva za registraciju." })
            ok = false;
        }
        else
            this.setState({ explVal: "" })
 
        if (ok) {
           
            let text = []
            text.push(this.state.explanation);
            text.push(email);
   
            /*let data = {
                "text": text,
            };*/
 
 
            axios({
                method: 'post',
                url: 'http://localhost:8099/sendConfirm',
                data: text,                
            }).then((response) => {
                console.log(response);
                //alert(response.data)
            }, (error) => {
                console.log(error);
            });
 
            this.deleteRequest(email);
        }
   
    };
 
    approve(email, e){
        e.preventDefault();
 
        let text = []
        text.push("approved");
        text.push(email);
 
        axios({
            method: 'post',
            url: 'http://localhost:8099/sendConfirm' ,
            data: text ,            
        }).then((response) => {
            console.log(response);
            //alert(response.data)
        }, (error) => {
            console.log(error);
        });
 
        this.deleteRequest(email);
    }
 
    componentDidMount(){
        let token = localStorage.getItem("ulogovan")
        let AuthStr = 'Bearer '.concat(token);
        axios({
            method: 'get',
            url: 'http://localhost:8099/getRequestForVacation',
             headers: { "Authorization": AuthStr } ,          
        }).then((response) => {
            console.log(response);
            this.setState({requestsForVacation:response.data})
        }, (error) => {
            console.log(error);
        });
 
        axios({
            method: 'get',
            url: 'http://localhost:8099/patientsRequests',            
        }).then((response) => {
            console.log(response);
            this.setState({requests:response.data})
        }, (error) => {
            console.log(error);
        });
        axios({
            method: 'get',
            url: 'http://localhost:8099/requestsForRoom',  
            headers: { "Authorization": AuthStr }          
        }).then((response) => {
            console.log(response);
            let pom = [];
            for(let i =0; i<response.data.length; i++){
                pom.push(response.data[i]);
            }
            this.setState({requestsForRoom:pom})
        }, (error) => {
            console.log(error);
        });
    }
 
    logoutUser = () => {  
        localStorage.removeItem('ulogovan')
        this.redirect()
       
      }
 
      redirect = () => {
        this.props.history.push('/register-page');
      }
 
      showClinicPage = () =>{
        this.props.history.push('/clinic-page');
      }
 
      showCodebook = () =>{
        this.props.history.push('/codebook-page');
      }
   
      render() {
        return (
          <>
           
            <ExamplesNavbar logoutEvent={this.logoutUser}
                      hideQuickEvent = {true}
                      hideRecipes = {true}
                      hideCheckupTypes = {true}
                      hideClinic = {true}
                      hideCheckup = {true}
                      hideRooms = {true}
                      hideDoctors = {true}
                      hideClinics = {true}
                      hideRegisterEvent = {true}
                      hideLoginEvent = {true}                        
                      showClinicPage={()=> this.showClinicPage()}
                      showCodebook={()=> this.showCodebook()}
            />
                <ProfilePageHeader />
                <div className="section profile-content">
                <div id="wrapper">
 
                    <section class="section lb">
 
                            <div class="container">
                                <div class="section-title text-center">
                                    <h3 hidden={this.state.requests.length === 0}>Pregled pristiglih zahteva za registraciju</h3>
                                    <h3 hidden={this.state.requests.length > 0}>Trenutno nemate novih zahteva za registraciju</h3>
                                    <br></br>
                                    <br></br>
                                </div>
                                <ul className="list-group">
                                    {this.state.requests.map(request => (
                                        <li key={request.user.email}>
                                            <div class="col-lg-12 col-md-12">
                                                <div class="blog-box" >
                                                    <div class="blog-desc">
                                                        <h4>{request.name} {request.surname}</h4>
                                                        <p>Email: {request.user.email}</p>
                                                        <p>JBO: {request.jbo} </p>
                                                        <p>Telefon: {request.phoneNumber}</p>
                                                        <p>Adresa: {request.address}</p>
                                                        <p>Grad: {request.city} </p>
                                                        <p>Država: {request.state}</p>
                                                        <span hidden={request.user.email !== this.state.temp}>
                                                            <br></br>
                                                            <label>Unesite razlog za odbijanje zahteva:</label>
                                                            <Input name="explanation" type="textarea" onChange={(event) => this.explanationValidation(event)} />
                                                            <p style={{ color: 'red' }}>{this.state.explVal}</p>
                                                            <br></br>
                                                        </span>
                                                        <div  hidden={request.user.email === this.state.temp}>
                                                            <button style ={{"margin-right":150, position: 'absolute', right: 0}} class="btn btn-primary" color="default" outline
                                                                onClick={(e) => this.approve(request.user.email, e)}>
                                                                Prihvati
                                                            </button>
                                                            <button style ={{"margin-right":30, position: 'absolute', right: 0}} class="btn btn-primary" color="info" outline
                                                                onClick={(e) => this.reject(request.user.email, e)}>
                                                                Odbij
                                                            </button>
                                                            <br></br>
                                                        </div>
                                                        <div  hidden={request.user.email !== this.state.temp}>
                                                            <button style ={{"margin-right":150, position: 'absolute', right: 0}} class="btn btn-primary" color="default" outline
                                                                onClick={(e) => this.sendAnswer(request.user.email, e)}>
                                                                Pošalji
                                                            </button>
                                                            <button style ={{"margin-right":30, position: 'absolute', right: 0}} class="btn btn-primary" color="info" outline
                                                                onClick={(e) => this.setState({temp:""})}>
                                                                Odustani
                                                            </button>
                                                            <br></br>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    ))}</ul>
                            </div>
                            </section>
 
 
                            <section class="section lb">
 
<div class="container">
    <div class="section-title text-center">
        <h3 hidden={this.state.requestsForRoom.length === 0}>Pregled pristiglih zahteva za rezervisanje sala za pregled ili operaciju</h3>
        <h3 hidden={this.state.requestsForRoom.length > 0}>Trenutno nemate novih zahteva za rezervisanje</h3>
        <br></br>
        <br></br>
    </div>
    <ul className="list-group">
        {this.state.requestsForRoom.map(request => (
            <li key={request.id}>
                <div class="col-lg-12 col-md-12">
                    <div class="blog-box" >
                        <div class="blog-desc">
                            <h4> Zahtjevi </h4>
                            <p>Pacijent: {request.patient.user.name}  {request.patient.user.surname}</p>
                            <p>Doktor: {request.medicalWorker.user.name} {request.medicalWorker.user.surname} </p>
                            <p>Tip:  {request.type}</p>
                                <button style ={{"margin-right":150, position: 'absolute', right: 0}} class="btn btn-primary" color="default" outline
                                    onClick={() => this.zakazi(request.id)}>  
                                    Zakazi pregled
                                </button>
                                <br></br>
                        </div>
                    </div>
                </div>
            </li>
        ))}</ul>
</div>
</section>
 
 
<section class="section lb">
<div class="container">
                                <div class="section-title text-center">
                                    <h3 hidden={this.state.requestsForVacation.length === 0}>Pregled pristiglih zahteva za godisnji odmor</h3>
                                    <h3 hidden={this.state.requestsForVacation.length > 0}>Trenutno nemate novih zahteva za godisnji odmor</h3>
                                    <br></br>
                                    <br></br>
                                </div>
                                <ul className="list-group">
                                    {this.state.requestsForVacation.map(request => (
                                        <li key={request.medicalWorker.user.email}>
                                            <div class="col-lg-12 col-md-12">
                                                <div class="blog-box" >
                                                    <div class="blog-desc">
                                                        <h4>{request.medicalWorker.user.name} {request.medicalWorker.user.surname}</h4>
                                                        <p>Email: {request.medicalWorker.user.email}</p>
                                                        <p>Telefon: {request.medicalWorker.phone}</p>
                                                        <p>Tip: {request.typeOfAbsence}</p>
                                                        <p>Od: {request.startVacation[2]} - {request.startVacation[1]} - {request.startVacation[0]}</p>
                                                        <p>Do: {request.endVacation[2]} - {request.endVacation[1]} - {request.endVacation[0]}</p>
                                                        <span hidden={request.medicalWorker.user.email !== this.state.temp1}>
                                                            <br></br>
                                                            <label>Unesite razlog za odbijanje zahtijeva:</label>
                                                            <Input name="explanation" type="textarea" onChange={(event) => this.explanationValidationForVacation(event)} />
                                                            <p style={{ color: 'red' }}>{this.state.explValVac}</p>
                                                            <br></br>
                                                        </span>
                                                        <div  hidden={request.medicalWorker.user.email === this.state.temp1}>
                                                            <button style ={{"margin-right":150, position: 'absolute', right: 0}} class="btn btn-primary" color="default" outline
                                                                onClick={(e) => this.sendAnswerVacation(request.medicalWorker.user.email, "", e)}>
                                                                Prihvati
                                                            </button>
                                                            <button style ={{"margin-right":30, position: 'absolute', right: 0}} class="btn btn-primary" color="info" outline
                                                                onClick={(e) => this.rejectV(request.medicalWorker.user.email, e)}>
                                                                Odbij
                                                            </button>
                                                            <br></br>
                                                        </div>
                                                        <div  hidden={request.medicalWorker.user.email !== this.state.temp1}>
                                                            <button style ={{"margin-right":150, position: 'absolute', right: 0}} class="btn btn-primary" color="default" outline
                                                                onClick={(e) => this.sendRejectVacation(request.medicalWorker.user.email, "odbio", e)}>
                                                                Pošalji
                                                            </button>
                                                            <button style ={{"margin-right":30, position: 'absolute', right: 0}} class="btn btn-primary" color="info" outline
                                                                onClick={(e) => this.setState({temp1:""})}>
                                                                Odustani
                                                            </button>
                                                            <br></br>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    ))}</ul>
                            </div>
 
 
                            </section>
 
 
                        </div>
                </div>
                <DemoFooter />
            </>
        )
    };
}
 
export default RegistrationRequest;
