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

  private extractData(res: Response) {
    // console.error(res.text());

    let j = parseString(res.text(), function (err, result) {
        // console.error(result)
        return result;
      }
    );
    console.error(j);
    return j;
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
