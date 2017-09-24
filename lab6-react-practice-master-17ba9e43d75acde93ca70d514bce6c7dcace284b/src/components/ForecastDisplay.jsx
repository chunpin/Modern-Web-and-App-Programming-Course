import React from 'react';
import PropTypes from 'prop-types';

import './WeatherDisplay.css';

export default class ForecastDisplay extends React.Component {
    static propTypes = {
        masking: PropTypes.bool,
        group: PropTypes.string,
        description: PropTypes.string,
        temp: PropTypes.number,
    };

    constructor(props) {
        super(props);
        this.populateHtml = this.populateHtml.bind(this);
        this.getWeatherGroup = this.getWeatherGroup.bind(this);
    }

    getWeatherGroup(code) {
        let group = 'na';
        if (200 <= code && code < 300) {
            group = 'thunderstorm';
        } else if (300 <= code && code < 400) {
            group = 'drizzle';
        } else if (500 <= code && code < 600) {
            group = 'rain';
        } else if (600 <= code && code < 700) {
            group = 'snow';
        } else if (700 <= code && code < 800) {
            group = 'atmosphere';
        } else if (800 === code) {
            group = 'clear';
        } else if (801 <= code && code < 900) {
            group = 'clouds';
        }
        return group;
    }

    populateHtml(){
        if(this.props.weather_list){
            const data = this.props.weather_list;
            const html = data.map(function (item){
                return ( 
                   <li>
                          <div className="forecast-date">forecast-date</div>
                          <div className="forecast-week-day">forecast-date</div>
                          {/*<img className="forecast-image" src={`images/w-${this.getWeatherGroup(item.weather[0].id)}.png`}/>*/}
                          <p className="max-temp">max-temp</p>
                          <p className="min-temp">min-temp</p>
                   </li>   
                );
            });

            return html;


        } else {
            return 'data is not there just yet.';
        }
       
    }
   

    

    render() {
        return (
            <div className={`weather-display ${this.props.masking
                ? 'masking'
                : ''}`}>
              
                <ul>
                    {this.populateHtml()}
                </ul>


            </div>
        );
    }
}
