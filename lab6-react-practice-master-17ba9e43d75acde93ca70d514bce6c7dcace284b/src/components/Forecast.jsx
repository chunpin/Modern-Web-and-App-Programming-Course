import React from 'react';
import PropTypes from 'prop-types';
import {getForecast} from 'api/open-weather-map.js';

import './weather.css';

import ForecastDisplay from 'components/ForecastDisplay.jsx';
import WeatherForm from 'components/WeatherForm.jsx';

export default class Forecast extends React.Component {

    static propTypes = {
        masking: PropTypes.bool,
        group: PropTypes.string,
        description: PropTypes.string,
        temp: PropTypes.number,
        unit: PropTypes.string
    };

    static getInitForecastState() {
        return {
            city: 'na',
            code: -1,
            group: 'na',
            description: 'N/A',
            temp: NaN
        };
    }

    constructor(props) {
        super(props);

        this.state = {
            ...Forecast.getInitForecastState(),
            loading: false,
            masking: false
        };

        // TODO
    }


    componentDidMount() {
        this.getForecast('Hsinchu', 'metric');
    }



    render() {
        return (
            <div className={`forecast weather-bg ${this.state.group}`}>
                <div className={`mask ${this.state.masking ? 'masking' : ''}`}>
                    <h1 className='text-center'>Forecast (unit: {this.props.unit})</h1>
                    <ForecastDisplay {...this.state}/>
                    <WeatherForm city={this.state.city} unit={this.props.unit} onQuery={this.handleFormQuery}/>
                </div>
            </div>
        );
    }

    getForecast(city,unit){
        getForecast(city, unit);
    }


    handleFormQuery(city, unit) {
        this.props.onFormChange(city, unit);
    }
}
