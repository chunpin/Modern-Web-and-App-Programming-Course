import React from 'react';

import './ForecastDisplayList.css';

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

    getTimeInAmOrPm(data){
        const time = data.split(' ')[1];
        const numberOfHour = parseInt(time,10); // 00:00:00
        let timeOutPut ='';

        if(numberOfHour === 0 ){
            timeOutPut =  12 + ' AM';
            return timeOutPut;
        } else if(numberOfHour > 0 &&  numberOfHour < 12 ){
            timeOutPut = '0' + numberOfHour + ' AM';
            return timeOutPut;
        } else if(numberOfHour === 12 ) {
            timeOutPut = numberOfHour   + ' PM';
            return timeOutPut;
        } else {
            timeOutPut = numberOfHour - 12  + ' PM';
            return timeOutPut;
        }
    } 


    // prettyPrintAmOrPm(dateString){ 
    //      const time = dateString.split(' ')[1];
    //      const numberOfHour = parseInt(time,10); // 00:00:00
    //      const label = numberOfHour >= 12 ? 'PM' : 'AM';
    //      let result =  numberOfHour % 12;
    //      result = result ? result= '0' + result : 12;
    //      return result + ' ' + label ;
    // }


    getTime (data){
        const time = data.split(' ')[1]; //21:00:00
        return time;
    }

    getDate (data){
        const date = data.split(' ')[0];
        return date;
    }

    getWeekDay(dateAndTime, index){
        console.log('index', index);
        const date = this.getDate(dateAndTime);
        const time = this.getTime(dateAndTime);

        if(index < 8 ){
            const html = <div className="divider">TOMORROW</div>
            return html;
        } else {
            const html = <div className="divider">{date}</div>;
            return html;
        }

       
    }



    render() {
        return (
                <div className="forecast-list-wrapper">

                     {this.props.index === 0 ? 
                        <div className="forecast-date">NOW</div>
                        :
                        <div className="forecast-date">{this.getTimeInAmOrPm(this.props.time)}</div>
                     }

    			     <img className="forecast-image" src={`images/w-${this.getWeatherGroup(this.props.weatherCode)}.png`} />
    			     <div className="temp-max">{this.props.temp_max}</div>
    			     <div className="temp-min">{this.props.temp_min}</div>

                     {this.props.time.split(' ')[1] === '21:00:00' ? 

                     // now we want to print out 'tomorrow' or 'date' depending on the index and time
                     // by passing the props into getWeeDay function, and return html back to here.
                        this.getWeekDay(this.props.time, this.props.index)

                     : 
                     '' 
                     } 
                </div>
        );
    }
}







 