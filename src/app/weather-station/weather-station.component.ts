import {Component, OnInit} from '@angular/core';

import {WeatherService} from './weather.service';
import {Meteodata} from './meteodata';

@Component({
  templateUrl: './weather-station.html',
  styleUrls: ['./weather-station.css'],
  providers: [WeatherService]
})
export class WeatherStationComponent implements OnInit {
  errorMessage: string;
  met: Meteodata;

  constructor(private weatherService: WeatherService) {
  }

  ngOnInit() {
    this.getMeteodata();
  }

  getMeteodata() {
    this.weatherService.getMeteodata()
      .subscribe(
        result => this.met = result,
        error => this.errorMessage = <any>error,
        () => console.log('data loaded'));

  }
}


