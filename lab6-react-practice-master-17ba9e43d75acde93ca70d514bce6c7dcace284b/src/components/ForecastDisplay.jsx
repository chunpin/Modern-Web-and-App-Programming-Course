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
        this.state = {
            weather_list:[],
        }
    }

   
   componentWillReceiveProps(nextProps){
        console.log('componentWillReceiveProps');
        console.log('this.props', this.props.weather_list);
        // put this,props.weather_list into state when succussfully reicev the data
        if(this.props.weather_list){
            this.setState({
                weather_list:this.props.weather_list
            })    
        }
        

   }


                    

    

    render() {
        return (
            <div className={`weather-display ${this.props.masking
                ? 'masking'
                : ''}`}>
 
               <ul>
                   { this.state.weather_list.map(item=> 
                    <ForecastDisplayList 
                        key={item.dt}
                        weatherCode={item.weather[0].id}
                        time={item.dt_txt}
                        temp_avg={item.main.temp}
                        temp_max={item.main.temp_max}
                        temp_min={item.main.temp_min} 
                    />) 

                    }
               </ul>

            </div>
        );
    }
}
