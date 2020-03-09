import { ErrorHandler } from './../../shared/error-handler/error_handler';
import { Tag } from './model/tag_model';
import { TagService } from './service/tag.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {

  show_insert:boolean = false;
  tag_name:string;
  tag_type:string;
  tags_in_db:any;
  constructor(private tag_service:TagService) { }

  ngOnInit() {
    this.getTags();
  }
  newTag(){
    let new_tag = new Tag();
    new_tag.tipo = this.tag_type;
    new_tag.nome = this.tag_name;
    this.tag_service.createTag(new_tag).catch(error =>{
      error? ErrorHandler.organizaErro(error):null;
    }).then(val =>{
      alert("Nova " + new_tag.tipo + " " + new_tag.nome + " adicionada");
      this.tag_name = '';
      this.getTags();
    });
  }
  showInput(code){
    this.show_insert  = !this.show_insert;
    this.tag_type = this.getInsertType(code)
  }
  getInsertType(code){
    switch (code) {
      case 1:
        return "marca";
      case 2:
        return "cor";
      case 3:
        return "tipo";
      case 4:
        return "tamanho";
    }
  }
  getTags(){
    this.tag_service.getAllTags().then(val =>{
      console.log(val);
      this.tags_in_db = val;
    });
  }
}
