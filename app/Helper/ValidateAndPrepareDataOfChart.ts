import { ValidatonMsg } from "src/environments/environment";
export class ValidateAndPrepareDataOfChart {
  VoltageLevel: string;
  DNORegion: string;
  startdate: string;
  enddate: string;
  constructor(VoltageLevel: string, DNORegion: string, startdate: string, enddate: string) {
    this.VoltageLevel = VoltageLevel;
    this.DNORegion = DNORegion;
    this.startdate = startdate,
      this.enddate = enddate
  }
  formatDate(date: string) {
    let getindex = date.split('-');
    let dd = getindex[0].substring(getindex[0].length, getindex[0].length - 2);
    let mm = getindex[1];
    let yy = getindex[2];
    return mm + '/' + dd + '/' + yy;
  }
  validateDateFormat(): any {
    let startdate = this.formatDate(this.startdate);
    let enddate = this.formatDate(this.enddate);
    if ((Date.parse(startdate) >= Date.parse(enddate))) {
      return ValidatonMsg.DateValidation;
    }
    else if ((new Date(startdate).toString() === 'Invalid Date') || (new Date(enddate).toString() === 'Invalid Date')) {
      return ValidatonMsg.DateFormat;
    }
    else if (!this.VoltageLevel || !this.DNORegion || this.VoltageLevel.length == 0 || Number(this.DNORegion) === 0 ||
    Number(this.DNORegion).toString() === 'NaN') {
      return ValidatonMsg.VoltageLevelOrDNORegionIsnull;
    }
    else {
      this.SetPersistEntries();
      return '';
    }
  }

  WrapInJSON() {
    return { 'id':Math.random(),'dno': this.DNORegion, 'voltage': this.VoltageLevel, 'startdate': this.startdate, 'enddate': this.enddate };
  }
  SetPersistEntries() {
    let obj = localStorage.getItem('SearchHitory');
    let newobj = JSON.parse(obj || '[]');
    newobj.push(this.WrapInJSON());
    localStorage.setItem('SearchHitory', JSON.stringify(newobj));
  }
  getPersistEntries() {
    return JSON.parse(localStorage.getItem('SearchHitory') || '[]');
  }
  clearLocalStorage(){
    if(this.localStorageSize()>5000){
      localStorage.clear();
    }
  }
  getFormattedDate(unbakedDate: string) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let getindex = unbakedDate.split('-');
    let dd = getindex[0].substring(getindex[0].length, getindex[0].length - 2);
    let mm = getindex[1];
    let yy = getindex[2];
    return dd + ' ' + months[Number(mm) - 1] + ' ' + yy;
  }
  localStorageSize(){
      return new Blob(Object.values(localStorage)).size;;
  };
}