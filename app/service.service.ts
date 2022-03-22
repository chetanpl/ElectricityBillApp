import { Injectable } from '@angular/core';
import {ConfigureURL} from './../environments/environment'; 
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {IRespone} from '../app/Module/IBillResponse'
@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  constructor(private httpClient: HttpClient) { }

    public GetConsumedElectricityData(dno: string,voltage:string,startdate:string, enddate:string,url:string): Observable<IRespone>{
    const completeURl=ConfigureURL.BarChartApIURL+url;
      return this.httpClient.get<IRespone>(completeURl);
  }
}

