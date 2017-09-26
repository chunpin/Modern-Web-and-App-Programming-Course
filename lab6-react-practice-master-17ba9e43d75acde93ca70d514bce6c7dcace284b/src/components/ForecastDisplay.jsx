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
        console.log('ForecastDisplay Coponent', this.props.weather_list);
    }

   
   componentWillReceiveProps(nextProps){
        console.log('componentWillReceiveProps');
        console.log('this.props', this.props.weather_list);
        this.populateHtml(this.props.weather_list);
   }

    populateHtml(data = this.props.weather_list){
            if(data){
                data.map(function (item){
                    return <ForecastDisplayList weatherList={item} />;
                });
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
