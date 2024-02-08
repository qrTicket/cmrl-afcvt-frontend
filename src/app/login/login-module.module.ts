import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsModalRef, BsModalService, ModalModule } from 'ngx-bootstrap/modal';



@NgModule({
  declarations: [ ],
  imports: [
    CommonModule,
    ModalModule.forRoot()
  ],
  providers: [ 
    BsModalRef, 
    BsModalService
  ]
})
export class LoginModuleModule { }
