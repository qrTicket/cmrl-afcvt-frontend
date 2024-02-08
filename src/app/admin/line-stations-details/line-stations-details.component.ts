import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Line } from '../_models/lines.model';
import { LinesService } from '../_services/lines.service';
import { StationService } from '../_services/station.service';

@Component({
  selector: 'app-line-stations-details',
  templateUrl: './line-stations-details.component.html',
  styleUrls: ['./line-stations-details.component.scss']
})
export class LineStationsDetailsComponent implements OnInit {
  lineId: number;
  line: Line;
  stationList: any;
  linecode: string;
  stationCount:number;
  constructor(
    private activeRouter: ActivatedRoute,
    private linesService: LinesService,
    private stationService: StationService
  ) { }

  ngOnInit() {

    this.activeRouter.paramMap.subscribe((params) => {
        this.lineId = +params.get("id");
        if (this.lineId) {
            console.log(this.lineId)
            this.getLine(this.lineId);
            
        }
    });
  }

  getLine(id: number) {
    this.linesService.getLineById(id).subscribe((line: Line) => {
      this.line = line["data"];
      console.log(line["data"])
      this.getStationList(line["data"].lineCode);
    }),
    (error: any) => {
    };
  }

   //get station list by line code
   getStationList(linecode){
    console.log(linecode);
    this.stationService.getStationByLineCode(linecode).subscribe(
        (res)=>{
            this.stationList= res['data'];
            this.stationCount=res['data'].length;
            console.log(res);
        }
    )
}
  

}
