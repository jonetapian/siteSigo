import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-form-alert',
  templateUrl: './form-alert.component.html',
  styleUrls: ['./form-alert.component.css']
})
export class FormAlertComponent implements OnInit {

  @Input() text:string;
  constructor() { }

  ngOnInit() {
  }

}
