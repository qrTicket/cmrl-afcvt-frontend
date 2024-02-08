// import { Product } from '../../equipment/_models/product.model';
// import { TerminalService } from 'src/app/equipment/_services/terminal.service';
// import { Terminal } from 'src/app/equipment/_models/terminal.model';
// import {Line} from '../../admin/_models/lines.model';
// import {Station} from '../../admin/_models/station.model';
// import { GateModel } from '../../equipment/_models/gate.model';
// import { GateDirection } from '../../equipment/_models/gate-direction.model';
export class Equipconfig {
  public id: Number;
  // public  terminalId: String;
 // public productId: Terminal;
  public terminalIpAddress: String;
  public moduleId: String;
  public editable: String;
  public activationTime: String;
  public deactivationTime: String;
  public actionType: String;
  public version: String;
  public modifiedDateTime: String;
  // public  mode: String;
  public subMode: String;
  public direction: String;
  public aisleMode: String;
  public entryExitOvride: String;
  public timeModeOvride: String;
  public highSecurityMode: String;
  public queLength: String;
  public flapSafetyTime: String;
  public gateResetTime: String;
  public buzzerVolume: String;
  public lightIntensity: String;
  public sensorInactTime: String;
  public gateTriggerId: Number;
  gateTrigger: any;
  // public line: Line;
  // public station: Station;
  // public termID1: GateModel;
  // public termID2: GateModel;
  // public direction1: GateDirection;
  // public direction2: GateDirection;
  // public gateDirection: GateModel;

}
