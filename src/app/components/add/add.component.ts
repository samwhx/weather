import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})

export class AddComponent implements OnInit {

  //variable
  listOfCities= [];

  //for constructor
  cityForm: FormGroup;
  //for constructor
  createFormGroup() {
    return new FormGroup({
        city: new FormControl()
    });
  }

  constructor(private weatherSvc: WeatherService,
              private route: Router) {
    this.cityForm = this.createFormGroup();
  }

  //reset button
  reset() {
    this.cityForm.reset();
  }

  //submit button
  onSubmit () {
    console.log ('Form data: ', this.cityForm.value.city);
    this.weatherSvc.addCity(this.cityForm.value.city); //add city to city list in service
    this.cityForm.reset(); //form reset
    this.weatherSvc.getCities().subscribe((value) => { //retrieve list of cities from service
      this.listOfCities = value;
    });
  }

  //delete button
  deleteCity (index) {
    console.log ('Index to be deleted: ', index);
    this.weatherSvc.deleteCity(index); //delete city from city list in service
  }

  //redirect to list page using router
  navigateToList(city){
    console.log('City Passed to Service: ', city)
    this.weatherSvc.selectCity(city);
    this.route.navigate(['/list'])
  }

  ngOnInit() {
    this.weatherSvc.getCities().subscribe((value) => { //retrieve list of cities from service
      this.listOfCities = value;
    });
  }

}
