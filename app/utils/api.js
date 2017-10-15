var axios = require('axios');

var id = "YOUR_CLIENT_ID";
var sec = "YOUR_SECRET_ID";
var params = "?client_id=" + id + "&client_secret=" + sec;



function handleError (error) {
  console.warn(error);
  return null;
}



//Need to pass an object with 5 days
// Date, sky, low, high, humidity
function createDateObject(data){
  let date = null;
  return data.reduce((weather,current,i)=>{
    //write each unique date in
    if(date !== current.dt_txt.slice(0,10)){
      weather.push({
        date: current.dt_txt.slice(0,10)
      });
    }
    date = current.dt_txt.slice(0,10);
    return weather;
  },[]);
}

function modifyDate(data,weatherArr){
  let dayOfWeek;
  let month;
  let dateOfMonth;
  let d = new Date();
  let dayIndex = d.getDay();
  let weekday = [];
  weekday[0] =  "Sun";
  weekday[1] = "Mon";
  weekday[2] = "Tue";
  weekday[3] = "Wed";
  weekday[4] = "Thu";
  weekday[5] = "Fri";
  weekday[6] = "Sat";

  weatherArr.map((day,i)=>{

    if(dayIndex === 7){ dayIndex = 0}
    dayOfWeek = weekday[dayIndex];
    dayIndex++;

    month = parseInt(day.date.slice(5,7));
    if(month === 1){month = 'Jan'}
    if(month === 2){month = 'Feb'}
    if(month === 3){month = 'Mar'}
    if(month === 4){month = 'Apr'}
    if(month === 5){month = 'May'}
    if(month === 6){month = 'June'}
    if(month === 7){month = 'July'}
    if(month === 8){month = 'Aug'}
    if(month === 9){month = 'Sept'}
    if(month === 10){month = 'Oct'}
    if(month === 11){month = 'Nov'}
    if(month === 12){month = 'Dec'}

    dateOfMonth = parseInt(day.date.slice(8));

    day.formattedDate = `${dayOfWeek}, ${month} ${dateOfMonth}`;

    return day;
  })
  return weatherArr;
};

function addSkyCondition(data,weatherArr){
  weatherArr.map((day,i)=>{
    data.map((obj)=>{
      if(obj.dt_txt.slice(0,10)===day.date){
        day['condition'] = obj.weather[0].description;
      }
    })
  })
  return weatherArr;
};

function addHighTemp(data,weatherArr){
    weatherArr.map((day)=>{
      data.map((obj)=>{
        if( obj.dt_txt.slice(0,10) === day.date &&
          ( day.high === undefined ||
            day.high < Math.round(obj.main.temp_max)
          )){
          day.high = Math.round(obj.main.temp_max);
          }
      })
    })

    return weatherArr;
  }

  function addLowTemp(data,weatherArr){
      weatherArr.map((day)=>{
        data.map((obj)=>{
          if( obj.dt_txt.slice(0,10) === day.date &&
            ( day.low === undefined ||
              day.low > Math.round(obj.main.temp_min)
            )){
            day.low = Math.round(obj.main.temp_min);
            }
        })
      })

      return weatherArr;
    }

    function addHumidity(data,weatherArr){
      weatherArr.map((day,i)=>{
        data.map((obj)=>{
          if(obj.dt_txt.slice(0,10)===day.date){
            day.humidity = obj.main.humidity;
          }
        })
      })
      return weatherArr;
    };
    function addIcon(data,weatherArr){
      weatherArr.map((day,i)=>{
        data.map((obj)=>{
          if(obj.dt_txt.slice(0,10)===day.date){
            let icon = obj.weather[0].icon.replace('n','d');
            day['icon'] = `http://openweathermap.org/img/w/${icon}.png`;
          }
        })
      })
      return weatherArr;
    };



module.exports = {
  battle: function (players) {
    return axios.all(players.map(getUserData))
      .then(sortPlayers)
      .catch(handleError)
  },


  getWeather: function (city) {
    return axios.get('http://api.openweathermap.org/data/2.5/forecast?q=' + city + ',us&units=imperial&appid=ed79256fb9d63ba693167c9ce1725994')
    .then(function (res){
      console.log(res.data.list)
      let data = res.data.list;
      //Take the huge data dump and clean it so that we have the exact data that we need for an array of 5 objects representing the 5-day forecast.
      let weatherArr = createDateObject(data);
      weatherArr = modifyDate(data,weatherArr);
      weatherArr = addSkyCondition(data,weatherArr);
      weatherArr = addHighTemp(data,weatherArr);
      weatherArr = addLowTemp(data,weatherArr);
      weatherArr = addHumidity(data,weatherArr);
      weatherArr = addIcon(data,weatherArr);
      //The 5 day forecast will sometimes return 6 days. This is likely due to timezones and the every 3-hour nature of the data.
      if(weatherArr.length === 6){weatherArr.pop()}
      return weatherArr;
    })
  },


};
