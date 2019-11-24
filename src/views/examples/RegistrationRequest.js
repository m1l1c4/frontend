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
    Button,
    Label,
    Form,
    FormGroup,
    Input,
    Modal,
    NavItem,
    NavLink,
    Nav,
    TabContent,
    TabPane,
    Container,
    Row,
    Col
} from "reactstrap";

// core components
import ExamplesNavbar from 'components/Navbars/ExamplesNavbar.js';
import ProfilePageHeader from 'components/Headers/ProfilePageHeader.js';
import DemoFooter from 'components/Footers/DemoFooter.js';
import { sign } from "crypto";

class RegistrationRequest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showTextArea: true,
            explanation: "",
            explVal: "",
            temp: "",
            requests: []
        };

    }
    deleteRequest(email) {
        const items = this.state.requests.filter(request => request.email !== email);
        this.setState({ requests: items });
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

    reject(email, e){
        e.preventDefault();
        this.setState({temp:email})
        this.setState({explVal:""})
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
        axios({
            method: 'get',
            url: 'http://localhost:8099/patientsRequests',            
        }).then((response) => {
            console.log(response);
            this.setState({requests:response.data})
        }, (error) => {
            console.log(error);
        });
    }


    render() {
        return (
            <>
                <ExamplesNavbar />
                <ProfilePageHeader />
                <div className="section profile-content">
                <div id="wrapper">

                    <section class="section lb">

                            <div class="container">
                                <div class="section-title text-center">
                                    <h3 hidden={this.state.requests.length == 0}>Pregled pristiglih zahteva za registraciju</h3>
                                    <h3 hidden={this.state.requests.length > 0}>Trenutno nemate novih zahteva za registraciju</h3>
                                    <br></br>
                                    <br></br>
                                </div>
                                <ul className="list-group">
                                    {this.state.requests.map(request => (
                                        <li key={request.email}>
                                            <div class="col-lg-12 col-md-12">
                                                <div class="blog-box" >
                                                    <div class="blog-desc">
                                                        <h4>{request.name} {request.surname}</h4>
                                                        <p>Email: {request.email}</p>
                                                        <p>JBO: {request.jbo} </p>
                                                        <p>Telefon: {request.phone}</p>
                                                        <p>Adresa: {request.address}</p>
                                                        <p>Grad: {request.city} </p>
                                                        <p>Država: {request.state}</p>
                                                        <span hidden={request.email != this.state.temp}>
                                                            <br></br>
                                                            <label>Unesite razlog za odbijanje zahteva:</label>
                                                            <Input name="explanation" type="textarea" onChange={(event) => this.explanationValidation(event)} />
                                                            <p style={{ color: 'red' }}>{this.state.explVal}</p>
                                                            <br></br>
                                                        </span>
                                                        <div  hidden={request.email == this.state.temp}>
                                                            <button style ={{"margin-right":150, position: 'absolute', right: 0}} class="btn btn-primary" color="default" outline
                                                                onClick={(e) => this.approve(request.email, e)}>
                                                                Prihvati
                                                            </button>
                                                            <button style ={{"margin-right":30, position: 'absolute', right: 0}} class="btn btn-primary" color="info" outline
                                                                onClick={(e) => this.reject(request.email, e)}>
                                                                Odbij
                                                            </button>
                                                            <br></br>
                                                        </div>
                                                        <div  hidden={request.email != this.state.temp}>
                                                            <button style ={{"margin-right":150, position: 'absolute', right: 0}} class="btn btn-primary" color="default" outline
                                                                onClick={(e) => this.sendAnswer(request.email, e)}>
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

                        </div>
                </div>
                <DemoFooter />
            </>
        )
    };
}

export default RegistrationRequest;
