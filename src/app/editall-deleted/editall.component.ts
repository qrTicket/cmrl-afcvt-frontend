import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editall',
  templateUrl: './editall.component.html',
  styleUrls: ['./editall.component.scss']
})
export class EditallComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log("editall component loaded");
  }

}
