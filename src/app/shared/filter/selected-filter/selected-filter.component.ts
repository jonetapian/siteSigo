import { Tag } from './../../../paginas/tags/model/tag_model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-selected-filter',
  templateUrl: './selected-filter.component.html',
  styleUrls: ['./selected-filter.component.css']
})
export class SelectedFilterComponent implements OnInit {

  @Input() tag:Tag;
  @Output() removed = new EventEmitter();
  close_icon = faTimesCircle;
  constructor() { }

  ngOnInit() {
  }
  removeTag(){
    this.removed.emit();
  }

}
