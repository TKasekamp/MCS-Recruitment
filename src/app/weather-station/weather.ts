export class Weather {
  temp: number;
  humid: number;
  baro: number;
  wind_dir: number;
  wind_len: number;

  constructor(temp: number, humid: number, baro: number, wind_dir: number, wind_len: number) {
    this.temp = temp;
    this.humid = humid;
    this.baro = baro;
    this.wind_dir = wind_dir;
    this.wind_len = wind_len;
  }
}

export class Meteodata {
  time: string;
  ts: number;
  data: Weather[];

  constructor(time: string, ts: number, data: Weather[]) {
    this.time = time;
    this.ts = ts;
    this.data = data;
  }

}
