import { Tag } from './../../paginas/tags/model/tag_model';
import { TagService } from './../../paginas/tags/service/tag.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  selected_filter:string = "default";
  tags:Array<Tag> = new Array<Tag>();
  show_options:boolean =false;
  filter_options:Array<any> = new Array<any>();
  selected_tags:Array<Tag> = new Array<Tag>();
  @Output() filter_selected = new EventEmitter();
  @Output() filter_removed = new EventEmitter();

  constructor(private tag_service:TagService) { }

  ngOnInit() {
    this.getAlltags();
  }
  getAlltags(){
    this.tag_service.getAllTags().then(res =>{
      this.tags = res;
      console.log(res);
    });
  }
  selectedFilterChanged(event){
    switch (event.target.value) {
      case "marca":

        break;

      default:
        break;
    }
  }
  filterSelected(selected_tag){
    console.log(selected_tag);
    let index = this.selected_tags.indexOf(selected_tag);
    if(index === -1){
      this.selected_tags.push(selected_tag);
      this.filter_selected.emit(selected_tag);
    }

  }
  removeTag(index){
    this.filter_removed.emit(this.selected_tags[index]);
    this.selected_tags.splice(index,1);
  }
}
