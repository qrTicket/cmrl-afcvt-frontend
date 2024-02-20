import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ErrorService } from '../_services/error.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
    message: any;
    constructor(private errorService: ErrorService, private toastr:ToastrService) { }

    ngOnInit() {
      // this.subscription = this.errorService.getAlert()
      //     .subscribe(message => {
      //         switch (message && message.type) {
      //             case 'success':
      //                 message.cssClass = 'alert alert-success';
      //                 break;
      //             case 'error':
      //                 message.cssClass = 'alert alert-danger';
      //                 break;
      //         }

      //         this.message = message;
      //     });
          this.subscription = this.errorService.getAlert().subscribe({
            next:(res)=>{
              if(res.status === "0"){
                  this.toastr.error(res.data,'Error!')
              }
              else if(res.status === "1"){
                switch (res && res.type) {
                  case 'success':
                      res.cssClass = 'alert alert-success';
                      break;
                  case 'error':
                      res.cssClass = 'alert alert-danger';
                      break;
              }
              }
            },
            error:(err)=>{
                this.toastr.error(err.error.data,'Error!')
            }
          })
        }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
