import { BillType } from '../Helper/BillType'
import { ServiceService } from '../service.service'
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
interface IElectrictyBill {
    get_Monthly_Unit_Data(type: BillType, dno: string, voltage: string, startdate: string, enddate: string, url: string): any;
}
@Injectable({
    providedIn: 'root'
})
export class consumeUnits implements IElectrictyBill {
    constructor(private serviceService: ServiceService) { }

    public get_Monthly_Unit_Data(type: BillType, dno: string, voltage: string, startdate: string, enddate: string, url: string): any {
        switch (type) {
            case BillType.Electricity:
                return this.serviceService.GetConsumedElectricityData(dno, voltage, startdate, enddate, url);
                break;
            //gas stetement can come here
            // case BillType.Gas:
            //     return 
        }
    }
}
