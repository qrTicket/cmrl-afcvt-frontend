import { Line } from './lines.model';
export class Station {
  id: number;
  stationCode: string;
  stationName: string;
  latitude: string;
  longitude: string;
  contactNum: string;
  junction : number;
  status? : string;
  address : string;
  stationLinks: [
    {
        lineCode: string;
        prevStationCode: String;
        nextStationCode: String;
    }
  ];
  // lineCode: string;
  //lineId: string;
  // id: Line;
  //lineName: Line;
  // line1: string;
  // line2: string;
  // line3: string;
  // line4: string;
  // junction: any;
  // createdDate: any;
  // updateDate: any;
  // modifyDateTime: any;
  // updateDateTime: any;
}
