import React from 'react';
import PropTypes from 'prop-types';
import cookie from 'react-cookie';
import {
    Form,
    Input,
    Button,
    ButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';

import './WeatherForm.css';

export default class WeatherForm extends React.Component {
    static propTypes = {
        city: PropTypes.string,
        unit: PropTypes.string
    };

    static getUnitString(unit) {
        return unit === 'metric' ? 'C' : 'F';
    }

    constructor(props) {
        super(props);

        this.inputEl = null;
        this.state = {
            inputValue: props.city,
            tempToggle: false,
            unit: props.unit
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleMetricUnit = this.handleMetricUnit.bind(this);
        this.handleImperialUnit = this.handleImperialUnit.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTempToggle = this.handleTempToggle.bind(this);
        this.handleFavorite = this.handleFavorite.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            inputValue: nextProps.city,
            unit: nextProps.unit
        });
    }

    render() {
        return (
            <div className='weather-form'>
                <Form className='form-inline justify-content-center'>
                    <Input type='text' name='city' getRef={el => {this.inputEl = el}} value={this.state.inputValue} onChange={this.handleInputChange}></Input>&nbsp;
                    <ButtonDropdown type='buttom' isOpen={this.state.tempToggle} toggle={this.handleTempToggle}>
                        <DropdownToggle type='button' caret color="secondary">
                            &ordm; {WeatherForm.getUnitString(this.state.unit)}
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem type='button' onClick={this.handleMetricUnit}>&ordm; C</DropdownItem>
                            <DropdownItem type='button' onClick={this.handleImperialUnit}>&ordm; F</DropdownItem>
                        </DropdownMenu>
                    </ButtonDropdown>&nbsp;
                    <Button color="info" onClick={this.handleSubmit}>Check</Button>
                    <Button color="info" onClick={this.handleFavorite}><i className="fa fa-heart" aria-hidden="true"></i></Button>
                </Form>
            </div>
        );
    }

    handleInputChange(e) {
        this.setState({inputValue: e.target.value});
    }

    handleMetricUnit(e) {
        this.setState({unit: 'metric'});
    }

    handleImperialUnit(e) {
        this.setState({unit: 'imperial'});
    }

    handleSubmit(e) {
        e.preventDefault();

        this.inputEl.blur();
        if (this.state.inputValue && this.state.inputValue.trim()) {
            this.props.onQuery(this.state.inputValue, this.state.unit);
        } else {
            this.state.inputEl = this.props.city;
        }
    }

    handleFavorite(e) {
        e.preventDefault();

        // load favorite city from cookie first
        let temp = cookie.load('city');
        if (!Array.isArray(temp))
            temp = []

        // add another city in temp array and save into cookie
        if (temp.indexOf(this.state.inputValue) === -1) {
            temp.push(this.state.inputValue);
            cookie.save('city', temp);
        }
    }

    handleTempToggle(e) {
        this.setState((prevState, props) => ({
            tempToggle: !prevState.tempToggle
        }));
    }
}
