import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  //variables
  result = {
    coord_longitude: '',//city geo location
    coord_latitude: '',//city geo location
    weather_main: '',//group of weather params
    weather_description: '',//conditions within group
    weather_icon: '',//e.g. for 10d. url is http://openweathermap.org/img/w/10d.png
    main_temp: '',//default kelvin
    main_pressure: '',//atmospheric pressure on sea level. hPa
    main_humidity: '',//%
    main_temp_min: '',//default kelvin
    main_temp_max: '',//default kelvin
    visibility: '',//visibility in metres
    wind_speed: '',//meter/sec
    clouds: '',//cloudiness in %
    datetime: '',//UNIX epoch
    sunrise: '',//UNIX epoch
    sunset: '',//UNIX epoch
    city: '',//city name
    country: ''//country code
  };
  selectedCity: '';

  //back button
  goBack(){
    this.route.navigate(['/add']);
  }

  constructor(private weatherSvc: WeatherService,
              private route: Router
             ) { }

  ngOnInit() {
    console.log ('Selected city in service: ', this.weatherSvc.selectedCity);
    this.weatherSvc.getWeather(this.weatherSvc.selectedCity)  //everytime init (redirected from add) get the weather data for selected city recorded in service
        .subscribe((data: any) => {
          console.log('Data passed back from api: ', data);
          this.result.coord_longitude = data.coord.lon;
          this.result.coord_latitude = data.coord.lat;
          this.result.weather_main = data.weather[0].main;
          this.result.weather_description = data.weather[0].description;
          this.result.weather_icon = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
          this.result.main_temp = (data.main.temp - 273).toFixed(2)+' \xB0C'; //shows degree celcius
          this.result.main_pressure = data.main.pressure + ' hPa';
          this.result.main_humidity = data.main.humidity + ' %';
          this.result.main_temp_min = (data.main.temp_min - 273).toFixed(2)+' \xB0C'; //shows degree celcius
          this.result.main_temp_max = (data.main.temp_max - 273).toFixed(2)+' \xB0C'; //shows degree celcius
          this.result.visibility = data.visibility + 'm';
          this.result.wind_speed = data.wind.speed + ' m/s';
          this.result.clouds = data.clouds.all + ' %';
          this.result.datetime = (new Date(1000*data.dt)).toLocaleString(); //time and date. toLocaleDateString() for date only
          this.result.sunrise = (new Date(1000*data.sys.sunrise)).toLocaleTimeString(); //time only
          this.result.sunset = (new Date(1000*data.sys.sunset)).toLocaleTimeString(); //time only
          this.result.city = data.name;
          this.result.country = data.sys.country;
        })
  }

}
