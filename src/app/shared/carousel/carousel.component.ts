import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {

  @Input() images:any;
  @Input() show_captions:boolean;
  @Input() width:any;

  @Input() height:any;

  constructor() { }

  ngOnInit() {
  }

}
