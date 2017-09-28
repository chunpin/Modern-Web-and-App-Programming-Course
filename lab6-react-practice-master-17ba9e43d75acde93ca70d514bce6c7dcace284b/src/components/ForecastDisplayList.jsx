import React from 'react';

export default class ForecastDisplayList extends React.Component {
   
    constructor(props) {
        super(props);
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

    getTime (data){
        const time = data.split(' ')[1];
        return time;

    }



    render() {
        return (
                <tr>
        	     <th className="forecast-date">{this.props.time}</th>
	        	 <td>
			     <img className="forecast-image" src={`images/w-${this.getWeatherGroup(this.props.weatherCode)}.png`} />
			     </td>
			     <td className="temp-max">{this.props.temp_max}</td>
			     <td className="temp-min">{this.props.temp_min}</td>
                </tr>
        );
    }
}







 