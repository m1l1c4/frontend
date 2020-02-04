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
import React from "react";
import { Link } from "react-router-dom";
// nodejs library that concatenates strings
import classnames from "classnames";
import axios from 'axios';
// reactstrap components
import {
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Button,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown
} from "reactstrap";

let ulogovani = "";

function ExamplesNavbar(props){
  const [navbarColor, setNavbarColor] = React.useState("navbar-transparent");
  const [navbarCollapse, setNavbarCollapse] = React.useState(false);

  let token = localStorage.getItem("ulogovan");
    let AuthStr = 'Bearer '.concat(token);
    axios({
      method: 'get' ,    
      url: 'http://localhost:8099/getUser' ,           
      headers: { "Authorization": AuthStr }   
      }).then((response) => {
        if (response.data != null)
        {
          ulogovani = response.data.type;
        }
        else{
          ulogovani = "";
        }
      }, (error) => {
      });

  const toggleNavbarCollapse = () => {
    setNavbarCollapse(!navbarCollapse);
    document.documentElement.classList.toggle("nav-open");
  };

  React.useEffect(() => {
    const updateNavbarColor = () => {
      if (
        document.documentElement.scrollTop > 299 ||
        document.body.scrollTop > 299
      ) {
        setNavbarColor("");
      } else if (
        document.documentElement.scrollTop < 300 ||
        document.body.scrollTop < 300
      ) {
        setNavbarColor("navbar-transparent");
      }
    };

    window.addEventListener("scroll", updateNavbarColor);

    return function cleanup() {
      window.removeEventListener("scroll", updateNavbarColor);
    };
  });
  return (
    <Navbar
      className={classnames("fixed-top", navbarColor)}
      color-on-scroll="300"
      expand="lg"
    >
      <Container>
        <div className="navbar-translate">
          <NavbarBrand
            data-placement="center"
            to="/register-page"
            target="_blank"            
            tag={Link}
          >
            Klinički centar
          </NavbarBrand>
          
            <span className="navbar-toggler-bar bar1" />
            <span className="navbar-toggler-bar bar2" />
            <span className="navbar-toggler-bar bar3" />
          
        </div>
        <Collapse
          className="justify-content-end"
          navbar
          isOpen={navbarCollapse}
        >
         

          <Nav navbar>
            <NavbarBrand onClick={props.showLogin} hidden={props.hideLoginEvent}
                color="neutral" className="btn-link">
                  <i className="nc-icon nc-book-bookmark" /> Prijavi se
            </NavbarBrand>
            <NavbarBrand onClick={props.showProfileEvent} hidden={props.hideProfilEvent}
                color="neutral" className="btn-link">
                  <i className="nc-icon nc-book-bookmark" /> Profil
            </NavbarBrand>
            <NavbarBrand onClick={props.showRegister} hidden={props.hideRegisterEvent}
                color="neutral" className="btn-link" >
                  <i className="nc-icon nc-book-bookmark" /> Registruj se
            </NavbarBrand>
            <NavbarBrand onClick={props.showNewWorker}
                color="neutral" className="btn-link" hidden={(ulogovani !== "ADMINISTRATOR" && ulogovani !== "CCADMIN") || props.sakrij}>
                  <i className="nc-icon nc-book-bookmark" /> Novi radnik
            </NavbarBrand> 
            <NavbarBrand onClick={props.showNewAppointment}
                color="neutral" className="btn-link" hidden={ulogovani !== "ADMINISTRATOR" || props.sakrij}>
                  <i className="nc-icon nc-book-bookmark" /> Brzi pregled
            </NavbarBrand>
            <NavbarBrand onClick={props.recipes}
                color="neutral" className="btn-link" hidden={ulogovani !== "MEDICINAR"  || props.sakrij}>
                  <i className="nc-icon nc-book-bookmark" /> Recepti
            </NavbarBrand>
            <NavbarBrand onClick={props.showTypeSearch}
                color="neutral" className="btn-link" hidden={ulogovani !== "ADMINISTRATOR"  || props.sakrij}>
                  <i className="nc-icon nc-book-bookmark" /> Tipovi pregleda
            </NavbarBrand>
            <NavbarBrand onClick={props.showCodebook}
                color="neutral" className="btn-link" hidden={ulogovani !== "CCADMIN"  || props.sakrij}>
                  <i className="nc-icon nc-book-bookmark" /> Šifarnik
            </NavbarBrand>
            <NavbarBrand onClick={props.showRegistrationRequests}
                color="neutral" className="btn-link" hidden={(ulogovani !== "CCADMIN" && ulogovani !== "ADMINISTRATOR")  || props.sakrij}>
                  <i className="nc-icon nc-book-bookmark" /> Zahtevi
            </NavbarBrand>
            <NavbarBrand onClick={props.kartonEvent} hidden={props.hideKarton}
                color="neutral" className="btn-link">
                  <i className="nc-icon nc-book-bookmark" /> Zdravstveni karton
            </NavbarBrand>
            <NavbarBrand onClick={props.clickQuick} hidden={props.hideAllQuicksEvent}
                color="neutral" className="btn-link">
                  <i className="nc-icon nc-book-bookmark" /> Predefinisani pregledi
            </NavbarBrand>
            <NavbarBrand onClick={props.displayHistory} hidden={props.hidePregledi}
                color="neutral" className="btn-link">
                  <i className="nc-icon nc-book-bookmark" /> Pregledi  {  /*kod pacijenta za istoriju pregleda*/}
            </NavbarBrand>
            <NavbarBrand onClick={props.displayClinics} hidden={ulogovani !== "PACIJENT" && props.sakrij}
                color="neutral" className="btn-link">
                  <i className="nc-icon nc-book-bookmark" /> Klinike  {  /*kod pacijenta za istoriju pregleda*/}
            </NavbarBrand>
            <NavbarBrand onClick={props.saleShow}
                color="neutral" className="btn-link" hidden={ulogovani !== "ADMINISTRATOR"  || props.sakrij}>
                  <i className="nc-icon nc-book-bookmark" /> Sale
            </NavbarBrand>
            <NavbarBrand onClick={props.doktoriShow}
                color="neutral" className="btn-link"  hidden={ulogovani != "ADMINISTRATOR"  || props.sakrij}>
                  <i className="nc-icon nc-book-bookmark" /> Doktori
            </NavbarBrand>
            <NavbarBrand onClick={props.doktoriShow}
                color="neutral" className="btn-link"  hidden={props.hideClinics}>
                  <i className="nc-icon nc-book-bookmark" /> Klinike
            </NavbarBrand>
            <NavbarBrand onClick={props.showClinicPage}
                color="neutral" className="btn-link" hidden={ulogovani !== "ADMINISTRATOR"  || props.sakrij}>
                  <i className="nc-icon nc-book-bookmark" /> Klinika
            </NavbarBrand>
            <NavbarBrand onClick={props.showClinicPage}
                color="neutral" className="btn-link" hidden={ulogovani !== "CCADMIN"  || props.sakrij}>
                  <i className="nc-icon nc-book-bookmark" /> Dodaj kliniku
            </NavbarBrand> 
                                 
            <NavbarBrand onClick={props.logoutEvent} hidden={props.hideLogOut}
                color="neutral" className="btn-link">
                  <i className="nc-icon nc-book-bookmark" /> Odjavi se
            </NavbarBrand>
            
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
}

export default ExamplesNavbar;
