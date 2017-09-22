import React from 'react';
import PropTypes from 'prop-types';

import './weather.css';

import ForecastDisplay from 'components/ForecastDisplay.jsx';
import WeatherForm from 'components/WeatherForm.jsx';


import {getForecast} from 'api/open-weather-map.js';

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

        this.handleFormQuery = this.handleFormQuery.bind(this);
        // TODO
    }


    componentDidMount() {
        this.getForecast('Hsinchu', 'metric');
    }


    componentWillReceiveProps(nextProps) {
        if(nextProps.city !== this.props.city || nextProps.unit !== this.props.unit)
            this.getForecast(nextProps.city, nextProps.unit);
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

    getForecast(city, unit) {
        this.setState({
            loading: true,
            masking: true,
            city: city // set city state immediately to prevent input text (in WeatherForm) from blinking;
        }, () => { // called back after setState completes
            getForecast(city, unit).then(weather => {
                this.setState({
                    ...weather,
                    loading: false
                });
            }).catch(err => {
                console.error('Error getting weather', err);

                this.setState({  
                    ...Forecast.getInitWeatherState(unit),
                    loading: false
                }, () => this.notifyUnitChange(unit));
            });
        });

        setTimeout(() => {
            this.setState({
                masking: false
            });
        }, 600);
    }


    handleFormQuery(city, unit) {
        this.props.onFormChange(city, unit);
    }
}
