import React from 'react';
import PropTypes from 'prop-types';

import './WeatherDisplay.css';

export default class WeatherDisplay extends React.Component {
    static propTypes = {
        masking: PropTypes.bool,
        group: PropTypes.string,
        description: PropTypes.string,
        temp: PropTypes.number,
        unit: PropTypes.string
    };

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div className={`weather-display ${this.props.masking
                ? 'masking'
                : ''}`}>
               
                <li>
                    <div className="forecast-date">forecast-date</div>
                    <img className="forecast-image" src={`images/w-${this.props.group}.png`}/>
                    <p className="max-temp">max-temp</p>
                    <p className="min-temp">min-temp</p>
                </li>

            </div>
        );
    }
}
