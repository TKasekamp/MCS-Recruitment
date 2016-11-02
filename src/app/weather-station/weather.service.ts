import {Injectable} from '@angular/core';

import {Http, Response} from '@angular/http';
import {Meteodata}           from './weather';
import {Observable}     from 'rxjs/Observable';

///<reference path="/typings/xml2js/xml2js.d.ts"/>
import {parseString} from 'xml2js';

@Injectable()
export class WeatherService {
  // private weatherUrl = 'http://meteo.physic.ut.ee/xml/data3.php';  // URL to web API'
  private localUrl = '/assets/data/data.xml'; // Static stuff should probably be somewhere else

  constructor(private http: Http) {
  }

  getMeteodata(): Observable<Meteodata> {
    return this.http.get(this.localUrl)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response): Meteodata {
    let e: string = '';
    parseString(res.text(), function (err: any, result: any): void {
        e = result;
      }
    );
    // console.log(e);
    let meteo: Meteodata = new Meteodata();

    meteo.time = e['meteodata']['$']['time'];
    for (let i of e['meteodata']['data']) {
      switch (i['$']['id']) {
        case 'temp':
          meteo.temp = i['_'];
          break;
        case 'wind_dir':
          meteo.wind_dir = i['_'];
          break;
        case 'wind_len':
          meteo.wind_len = i['_'];
          break;
        case 'humid':
          meteo.humid = i['_'];
          break;
        case 'baro':
          meteo.baro = i['_'];
          break;
        default:
          break;
      }

    }

    console.log(meteo);
    return meteo;
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
