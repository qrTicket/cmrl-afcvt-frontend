import {
    Component,
    OnInit,
    AfterViewInit,
    OnDestroy,
    ViewChild,
    ElementRef,
} from "@angular/core";
import { Subscription, interval } from "rxjs";
//import { GeneralmsgService } from "../../station/_services/generalmsg.service";

@Component({
    selector: "app-central-alarms",
    templateUrl: "./central-alarms.component.html",
    styleUrls: ["./central-alarms.component.scss"],
})
export class CentralAlarmsComponent
    implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild("generalmsg") general_msg: ElementRef;
    @ViewChild("alarm") alarm: ElementRef;
    @ViewChild("configuration") configuration: ElementRef;
    @ViewChild("transaction") transaction: ElementRef;
    @ViewChild("ntp", { static: true }) ntp: ElementRef;
    @ViewChild("database", { static: true }) db: ElementRef;
    subs: Subscription[] = [];

    value: Boolean = false;
    constructor(
        //private generalService: GeneralmsgService
        ) {}

    ngOnInit() {}
    generalMsgList() {
        const general = this.general_msg.nativeElement;
        const alarm = this.alarm.nativeElement;
        const configuration = this.configuration.nativeElement;
        const transaction = this.transaction.nativeElement;
        const ntp = this.ntp.nativeElement;
        const db = this.db.nativeElement;

        /*this.subs.push(
            this.generalService.getGeneralMsg().subscribe((res) => {
                const {
                    ALARM,
                    CONFIGURATION,
                    GENERAL_MESSAGE,
                    TRANSACTION,
                    NTP,
                    DATABASE,
                } = res;

                if (ALARM) {
                    alarm.className = "green";
                } else {
                    alarm.className = "red";
                }
                if (CONFIGURATION) {
                    configuration.className = "green";
                } else {
                    configuration.className = "red";
                }

                if (TRANSACTION) {
                    transaction.className = "green";
                } else {
                    transaction.className = "red";
                }

                if (GENERAL_MESSAGE) {
                    general.className = "green";
                } else {
                    general.className = "red";
                }

                if (NTP) {
                    ntp.className = "green";
                } else {
                    ntp.className = "red";
                }
                if (DATABASE) {
                    db.className = "green";
                } else {
                    db.className = "red";
                }
            })
        );*/
    }
    ngAfterViewInit() {
        this.subs.push(
            interval(5000).subscribe(() => {
                this.generalMsgList(); 
            })
        );
    }
    ngOnDestroy() {
        this.subs.forEach((subs) => subs.unsubscribe());
    }
}
