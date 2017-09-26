import React from 'react';

export default class ForecastDisplayList extends React.Component {
   
    constructor(props) {
        super(props);
        this.getWeatherGroup = this.getWeatherGroup.bind(this);
        console.log('this.props', this.rpops.weatherList);
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


    

    render() {
        return (
        	<li>
                          <div className="forecast-date">forecast-date</div>
                          <div className="forecast-week-day">forecast-date</div>
                          <img className="forecast-image" src={`images/w-${this.getWeatherGroup(this.props.weatherList.weather[0].id)}.png`}/>
                          {/*<h2>{this.props.weather[0].id}</h2>*/}
                          <p className="max-temp">max-temp</p>
                          <p className="min-temp">min-temp</p>
            </li>  
        );
    }
}







 