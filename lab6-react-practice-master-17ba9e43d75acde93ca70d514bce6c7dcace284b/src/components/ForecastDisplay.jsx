import React from 'react';
import PropTypes from 'prop-types';

import ForecastDisplayList from 'components/ForecastDisplayList.jsx';

import { Table } from 'reactstrap';


import './ForecaseDisplay.css';

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
            week_day:this.getWeekDayOfToday(),

        }

        this.getNearestTime = this.getNearestTime.bind(this);
    }


    getNearestTime(date){
        const dateAndTime = date.split(' ');
        const time = dateAndTime[1];
        return time;
    }


    getWeekDayOfToday(){
        const today = new Date();
        const weekday = today.getDay();
        switch(weekday){
            case 0:
                return 'Sunday';
                break;
            case 1:
                return 'Monday';
                break;
            case 2:
                return 'Tuesday';
                break;
            case 3:
                return 'Wednesday';
                break;
            case 4:
                return 'Thursday';
                break;
            case 5:
                return 'Friday';
                break;
            case 6:
                return 'Saturday';
                break;
            default:
                return new Date();
        }

       
    }


   
   
    componentWillReceiveProps(nextProps){
         console.log('componentWillReceiveProps');
         console.log('this.props', this.props.weather_list);
         // put this,props.weather_list into state when succussfully reicev the data
         if(this.props.weather_list){
             this.setState({
                 weather_list:this.props.weather_list,
                 nearest_time:this.getNearestTime(this.props.weather_list[0].dt_txt),
             })    
         }
         
 
    }


                    

    

    render() {
        return (
            <div className={`weather-card weather-display ${this.props.masking
                ? 'masking'
                : ''}`}>
                
               <h2 className="location">{this.props.city}</h2>
               <div className="date-wrapper">
                    <h2 className="date-weekday">{this.state.week_day} </h2>
                    <h2 className="date-time">{this.state.nearest_time}</h2>
               </div>
               

                <Table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Username</th>
                        </tr>
                    </thead>
                     <tbody>
                       { this.state.weather_list.map(item=> 
                             // if item.dt_txt === '00:00:00' , insert one empty <tr> ,
                             // else rendering ForecastDisplayList component as usuall while passing the props into it.
                               true? 'hi': 'nothing'
                        
                                // <ForecastDisplayList 
                                //     key={item.dt}
                                //     weatherCode={item.weather[0].id}
                                //     time={item.dt_txt}
                                //     temp_avg={item.main.temp}
                                //     temp_max={item.main.temp_max}
                                //     temp_min={item.main.temp_min} 
                                // />
                    
                            ) 
                        }
                         </tbody>
                </Table>

               

            </div>
        );
    }
}

{/* this.getTime(item.dt_txt) === '00:00:00' ? <span>divider</span> : '' */}
