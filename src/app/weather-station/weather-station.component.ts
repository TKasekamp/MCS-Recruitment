import {Component, OnInit} from '@angular/core';

import {WeatherService} from './weather.service';
import {Weather} from './weather';

@Component({
  templateUrl: './weather-station.html',
  styleUrls: ['./weather-station.css'],
  providers: [WeatherService]
})
export class WeatherStationComponent implements OnInit {
  errorMessage: string;
  weathers: Weather[];
  time: string;
  mode = 'Observable';

  constructor(private weatherService: WeatherService) {
  }

  ngOnInit() {
    this.getWeathers();
  }

  getWeathers() {
    this.weatherService.getWeathers()
      .subscribe(
        weathers => this.weathers = weathers,
        // time => this.time = time,
        error => this.errorMessage = <any>error);
  }
}


