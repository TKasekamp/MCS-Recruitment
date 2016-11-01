import {Component, OnInit} from '@angular/core';

import {WeatherService} from './weather.service';
import {Meteodata} from './weather';

@Component({
  templateUrl: './weather-station.html',
  styleUrls: ['./weather-station.css'],
  providers: [WeatherService]
})
export class WeatherStationComponent implements OnInit {
  errorMessage: string;
  meteodata: Meteodata;
  time: string;
  mode = 'Observable';

  constructor(private weatherService: WeatherService) {
  }

  ngOnInit() {
    this.getMeteodata();
  }

  getMeteodata() {
    this.weatherService.getMeteodata()
      .subscribe(
        meteodata => this.meteodata = meteodata,
        error => this.errorMessage = <any>error);
  }
}


