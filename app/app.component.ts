import { Component, OnInit, ViewChild } from '@angular/core';
import { BarchartComponent } from './chart/barchart/barchart.component';
import { ServiceService } from '../app/service.service'
import { IRespone } from '../app/Module/IBillResponse';
import { ValidateAndPrepareDataOfChart } from '../app/Helper/ValidateAndPrepareDataOfChart'
//import { FormsModule } from '@angular/forms';
import { IConfig } from '../app/Module/IBillRequest'
import { BillType } from './Helper/BillType';
import { consumeUnits } from './Helper/ICommon';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild(BarchartComponent) child!: BarchartComponent;
  title = 'FetchRecord';
  response = Response;
  dno: string = '12';
  voltage: string = 'HV';
  startdate = '02-02-2022';
  enddate = '13-02-2022';
  ApiResult: any;
  FilteredDataIsReadyForChart: any;
  UiValidationMsg = '';
  PersistData: any;
  constructor(private serviceService: ServiceService, private consumeUnits: consumeUnits) {
  }

  ngOnInit(): void {
    let validateInputs = new ValidateAndPrepareDataOfChart(this.voltage, this.dno, this.startdate, this.enddate);
    this.PersistData = validateInputs.getPersistEntries();
  }
  ConsumeAPI(): void {
    let totalconsumption: number = 0;
    let count: number = 0;
    let prev: any;
    let validateInputs = new ValidateAndPrepareDataOfChart(this.voltage, this.dno, this.startdate, this.enddate);
    this.UiValidationMsg = validateInputs.validateDateFormat();
    if (this.UiValidationMsg === '') {    
      let url = `${this.dno}&voltage=${this.voltage}&start=${this.startdate}&end=${this.enddate}`;
      this.consumeUnits.get_Monthly_Unit_Data(BillType.Electricity, this.dno, this.voltage, this.startdate, this.enddate, url).subscribe((x: IConfig) => {
        this.ApiResult = x;
        // collection of average perday electricity
        let singleproduct = this.ApiResult.data.data.map((d: any) => {
          let date = validateInputs.getFormattedDate(d.Timestamp)
          if (!prev) {
            totalconsumption += d.Overall;
            count += 1;
            prev = date;
          } else if (prev === date) {
            totalconsumption += d.Overall;
            count += 1;
          }
          else if (prev !== date) {
            let average: number = 0;
            average = totalconsumption = totalconsumption / count;
            let re = { 'Overall': average, 'unixTimestamp': count, 'Timestamp': validateInputs.getFormattedDate(d.Timestamp) }
            prev = date;
            totalconsumption = 0;
            count = 0;
            totalconsumption += d.Overall;
            return re;
          }
          return { 'Overall': 0, 'unixTimestamp': 0, 'Timestamp': '' }
        });
        let removeNullItem = singleproduct.filter((d: any) => {
          return d.Overall != 0;
        });
        this.FilteredDataIsReadyForChart = new Array();
        removeNullItem.map((e: any) => {
          this.FilteredDataIsReadyForChart.push([e.Timestamp, e.Overall, '#479bad']);
        });
        this.FilteredDataIsReadyForChart.unshift(["Element", "Density", { role: "style" }]);
        this.child.drawChart(this.FilteredDataIsReadyForChart);
        
      },
        (error: any) => {
          console.log(error);
        },
        () => {
          // 'onCompleted' callback.
          // No error
       this.PersistData=   validateInputs.getPersistEntries();
       
        });
    }
  }

  loading = true;
  Edit(storage: any) {
    this.dno=storage.dno;
    this.voltage=storage.voltage;
    this.startdate=storage.startdate;
    this.enddate = storage.enddate;
  
   }
}