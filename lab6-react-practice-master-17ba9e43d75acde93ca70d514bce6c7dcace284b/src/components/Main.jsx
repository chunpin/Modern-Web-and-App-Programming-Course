import React from 'react';
import cookie from 'react-cookie';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    NavDropdown,
    DropdownItem,
    DropdownToggle,
    DropdownMenu
} from 'reactstrap';

import Today from 'components/Today.jsx';
import Forecast from 'components/Forecast.jsx';

import './Main.css';

export default class Main extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            unit: 'metric',
            city: 'Hsinchu',
            navbarToggle: false,
            dropdownOpen: false,
            favorite: []
        };

        this.handleNavbarToggle = this.handleNavbarToggle.bind(this);
        this.handleDropdownToggle = this.handleDropdownToggle.bind(this);
        this.handleFormChange = this.handleFormChange.bind(this);
        this.handleDropdownClick = this.handleDropdownClick.bind(this);
    }

    render() {
        return (
            <Router>
                <div className={`main bg-faded ${this.state.group}`}>
                    <div className='container'>
                        <Navbar color="faded" light toggleable>
                            <NavbarToggler right onClick={this.handleNavbarToggle}/>
                            <NavbarBrand className='text-info' href="/">WeatherMood</NavbarBrand>
                            <Collapse isOpen={this.state.navbarToggle} navbar>
                                <Nav navbar>
                                    <NavItem>
                                        <NavLink tag={Link} to='/'>Today</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink tag={Link} to='/forecast'>Forecast</NavLink>
                                    </NavItem>
                                    <NavDropdown isOpen={this.state.dropdownOpen} toggle={this.handleDropdownToggle}>
                                        <DropdownToggle nav caret>
                                            Favorite City
                                        </DropdownToggle>
                                        <DropdownMenu> {
                                                this.state.favorite.map(m => (<DropdownItem type='button' key={m} onClick={this.handleDropdownClick}>{m}</DropdownItem>))
                                            }
                                        </DropdownMenu>
                                    </NavDropdown>
                                </Nav>

                                <span className='navbar-text ml-auto'>DataLab</span>
                            </Collapse>
                        </Navbar>
                    </div>

                    <Route exact path="/" render={() => (
                        <Today city={this.state.city} unit={this.state.unit} onFormChange={this.handleFormChange} />
                    )}/>
                    <Route exact path="/forecast" render={() => (
                        <Forecast unit={this.state.unit} onUnitChange={this.handleUnitChange} />
                    )}/>
                </div>
            </Router>
        );
    }

    handleDropdownClick(e) {
        this.setState({
            city: e.target.textContent
        });
        // console.log(e.target.textContent);
    }

    handleNavbarToggle() {
        this.setState((prevState, props) => ({
            navbarToggle: !prevState.navbarToggle
        }));
    }

    handleDropdownToggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen,
            favorite: cookie.load('city')
        });
    }

    handleFormChange(city, unit) {
        this.setState({
            unit: unit,
            city: city
        });
    }
}
