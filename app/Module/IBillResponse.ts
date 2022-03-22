export interface IRespone {
    status: string
    data: Data
  }
  
  export interface Data {
    dnoRegion: string
    voltageLevel: string
    data: Daum[]
  }
  
  export interface Daum {
    Overall: number
    unixTimestamp: number
    Timestamp: string
  }
  