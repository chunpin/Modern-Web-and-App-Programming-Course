import React from 'react';
import PropTypes from 'prop-types';

import ForecastDisplayList from 'components/ForecastDisplayList.jsx';


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
    }

   

    populateHtml(){
        if(this.props.weather_list){
            const data = this.props.weather_list;
            const html = data.map(function (item){
                console.log(item);
                return <ForecastDisplayList weatherList = {item} />;
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
