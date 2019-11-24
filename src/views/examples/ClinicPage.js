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

class ClinicPage extends Component {
    constructor(props)
    {
      super(props);
      this.state = {
        newRoomShow: false,
        name: "" ,
        city: "" ,
        address: "" ,
        rooms: [],
        roomName: "",
        roomNumber: undefined,
        roomNumVal: "",
        roomNameVal: "",
        clinicNameVal: "",
        cityVal: "",
        addressVal: "",
        roomVal: "",
      };

      this.addClinic = this.addClinic.bind(this) ;
      this.addRoom = this.addRoom.bind(this);
    }
    deleteRoom(name, e){
        const items = this.state.rooms.filter(room => room.name !== name);
        this.setState({ rooms: items });
    };
    roomNumberValidation(e){
        this.setState({roomNumber:e.target.value})
        let number = e.target.value;
        if (number === undefined || number === '')
            this.setState({roomNumVal:"Broj sale je obavezno polje"})
        else if (number <= 0)
            this.setState({roomNumVal:"Broj sale mora biti pozitivan."})
        else
            this.setState({roomNumVal:""})
    };

    roomNameValidation(e){
        this.setState({roomName:e.target.value})
        let name = e.target.value;
        if (name === undefined || name === '')
            this.setState({roomNameVal:"Naziv sale je obavezno polje."})
        else
            this.setState({roomNameVal:""})
    };

    clinicNameValidation(e){
        this.setState({name:e.target.value})
        let name = e.target.value;
        if (name === undefined || name === '')
            this.setState({clinicNameVal:"Naziv klinike je obavezno polje."})
        else if(!name[0].match('[A-Z0-9]'))
            this.setState({clinicNameVal:"Naziv klinike mora pocinjati velikim slovom ili brojem."})
        else
            this.setState({clinicNameVal:""})
    };

    cityValidation(e){
        this.setState({city:e.target.value})
        let city = e.target.value;
        if (city === undefined || city === '')
            this.setState({cityVal:"Naziv grada je obavezno polje."})
        else if(!city[0].match('[A-Z]'))
            this.setState({cityVal:"Naziv grada mora pocinjati velikim slovom."})
        else
            this.setState({cityVal:""})
    };

    addressValidation(e){
        this.setState({address:e.target.value})
        let address = e.target.value;
        if (address === undefined || address === '')
            this.setState({addressVal:"Adresa klinike je obavezno polje."})
        else if(!address[0].match('[A-Z]'))
            this.setState({addressVal:"Adresa mora pocinjati velikim slovom."})
        else
            this.setState({addressVal:""})
    };

    doc = document.documentElement.classList.remove("nav-open");

    addRoom = event => {
        event.preventDefault();

        let number = this.state.roomNumber;
        let name = this.state.roomName;
        let ok = true;

        if (number === undefined || number === ''){
            this.setState({roomNumVal:"Broj sale je obavezno polje"})
            ok = false;
        }
        else if (number <= 0){
            this.setState({roomNumVal:"Broj sale mora biti pozitivan."})
            ok = false;
        }
        else
            this.setState({roomNumVal:""})
        
        if (name === undefined || name === ''){
            this.setState({roomNameVal:"Naziv sale je obavezno polje"})
            ok = false;
        }
        else
            this.setState({roomNameVal:""})
        
        if(ok){
            let data = {
            "name": this.state.roomName ,
            "number": this.state.roomNumber ,
            };        
            this.state.rooms.push(data)
            this.setState({newRoomShow: false});
            this.setState({roomVal:""})
        }
  };

    addClinic = event => {
        event.preventDefault();

        let name = this.state.name;
        let city = this.state.city;
        let address = this.state.address;
        let ok = true;

        if (name === undefined || name === ''){
            this.setState({clinicNameVal:"Naziv klinike je obavezno polje."})
            ok = false;
        }
        else if(!name[0].match('[A-Z0-9]')){
            this.setState({clinicNameVal:"Naziv klinike mora pocinjati velikim slovom ili brojem."})
            ok = false;
        }
        else
            this.setState({clinicNameVal:""})

        if (city === undefined || city === ''){
            this.setState({cityVal:"Naziv grada je obavezno polje."})
            ok = false;
        }
         else if(!city[0].match('[A-Z]')){
             this.setState({cityVal:"Naziv grada mora pocinjati velikim slovom."})
             ok = false;
         }
         else
             this.setState({cityVal:""})

        if (address === undefined || address === ''){
             this.setState({addressVal:"Adresa klinike je obavezno polje."})
             ok = false;
        }
         else if(!address[0].match('[A-Z]')){
             this.setState({addressVal:"Adresa mora pocinjati velikim slovom."})
             ok = false;
         }
         else
             this.setState({addressVal:""})
         
         if (this.state.rooms.length == 0){
             ok = false;
             this.setState({roomVal:"Klinika mora imati bar jednu salu."})
         }

        if (ok){
            let data = {
            "name": this.state.name ,
            "city": this.state.city ,
            "address": this.state.address ,
            "rooms": this.state.rooms
            };

            axios({
            method: 'post',
            url: 'http://localhost:8099/clinic',
            data: data ,
            ContentType: 'application/json'
            }).then((response) => {
                console.log(response);
                alert("Klinika je uspjesno dodata")
                this.setState({name:"", city:"", address:"", rooms:[]})
            }, (error) => {
            console.log(error);
            });

            this.setState({registerShow: false});
        }
  };
  

  render(){
      return(
        <>
        <ExamplesNavbar />
        <ProfilePageHeader />
        <div className="section profile-content">
        <Container>
            <Col className="ml-auto mr-auto" md="6">
                <h3>Nova klinika</h3>
                <br></br>
                <br></br>
                <Modal modalClassName="modal-register" isOpen={this.state.newRoomShow}>
      
                <div className="modal-header no-border-header text-center">
                    <button
                        aria-label="Close"
                        className="close"
                        data-dismiss="modal"
                        type="button"
                        onClick={() => this.setState({newRoomShow: false, roomNumVal:"", roomNameVal:""})}
                    >
                    <span aria-hidden={true}>×</span>
                    </button>
                    <h3 className="title mx-auto">Nova sala</h3>
                </div>
                <div className="modal-body">                       
                        <Form onSubmit={this.addRoom}>
                            <FormGroup>
                            <label>Naziv</label>
                            <Input name="roomName" type="text" onChange={(event) => this.roomNameValidation(event)} />
                            <p style={{color:'red'}}>{this.state.roomNameVal}</p>
                            </FormGroup>
                            <FormGroup>
                            <label>Broj</label>
                            <Input name="roomNumber" type="number" onChange={(event) => this.roomNumberValidation(event)} />
                            <p style={{color:'red'}}>{this.state.roomNumVal}</p>
                            </FormGroup>           
                            <Button block className="btn-round" color="info">
                                 Dodaj salu
                            </Button>
                            </Form>
                </div>
                </Modal>
                <Form onSubmit={this.addClinic}>
                  <FormGroup>
                  <label>Naziv:</label>
                  <Input name="name" type="text" value={this.state.name} onChange={(event) => this.clinicNameValidation(event)} />
                  <p style={{color:'red'}}>{this.state.clinicNameVal}</p>
                  </FormGroup>
                  <FormGroup>
                  <label>Grad:</label>
                  <Input name="city" type="text" value={this.state.city} onChange={(event) => this.cityValidation(event)} />
                  <p style={{color:'red'}}>{this.state.cityVal}</p>
                  </FormGroup>
                  <FormGroup>
                  <label>Adresa</label>
                  <Input name="address" type="text" value={this.state.address} onChange={(event) => this.addressValidation(event)} />
                  <p style={{color:'red'}}>{this.state.addressVal}</p>
                  </FormGroup>
                  <FormGroup>
                  <label>Sale:</label>
                            <Label  name="rooms" type="text" /> <ul className="list-group">
                    {this.state.rooms.map(room => (
                        <li 
                        key={room.name}
                        className="list-group-item list-group-item-primary"
                        >
                        {room.name} - {room.number}
                        <button
                            aria-label="Close"
                            className="close"
                            data-dismiss="modal"
                            type="button"
                            onClick={(e) => this.deleteRoom(room.name, e)}
                        >
                        <span aria-hidden={true}>×</span>
                        </button>
                        </li>
                    ))}
                    </ul>
                    <p style={{color:'red'}}>{this.state.roomVal}</p>
                  <Button className="btn-round" color="default" outline onClick={event => this.setState({newRoomShow: true})}>
                    <i className="fa fa-cog" /> Nova sala
                  </Button>
                  </FormGroup>
         
                  <Button block className="btn-round" color="info" >
                    Dodaj kliniku
                  </Button>
                  </Form>
            </Col>
            
        </Container>
      </div>
      <DemoFooter />
    </>
  )};
}

export default ClinicPage;
