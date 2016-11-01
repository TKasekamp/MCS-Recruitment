import {Injectable} from '@angular/core';

import {Http, Response} from '@angular/http';
import {Meteodata, Weather}           from './weather';
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
    let e: string = "";
    parseString(res.text(), function (err: any, result: any): void {
        e = result;
      }
    );
    console.log(e);
    // console.log(e['meteodata']['$']);
    let meteo: Meteodata = new Meteodata();

    meteo.time = e['meteodata']['$']['time'];
    // meteo.ts = e['meteodata']['$']['ts'].toNumber();
    for (let i in e['meteodata']['$']['data']) {
      console.log(i);
    }

    console.log(meteo);
    return meteo;
  }


  toMeteodata(result: any): Meteodata {
    let data: Weather[];
    for (let i in result['meteodata']['data']) {
      console.log(i);
    }

    return null;
  }

  private handleError(error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
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
