import { ErrorHandler } from './../../shared/error-handler/error_handler';
import { Tag } from './model/tag_model';
import { TagService } from './service/tag.service';
import { Component, OnInit } from '@angular/core';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
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
  trash_icon = faTrashAlt;
  constructor(private tag_service:TagService) { }

  ngOnInit() {
    this.getTags();
  }
  newTag(){
    let check_index = this.tag_name.indexOf(",");
    let tag_array:Array<Tag> = new Array<Tag>();
    if(check_index !== -1){
      let tag_name_array = this.tag_name.split(",");
      for(let tag_name of tag_name_array ){
        tag_array.push(this.createTag(tag_name,this.tag_type));
      }
    }else{
      tag_array.push(this.createTag(this.tag_name,this.tag_type));
    }
    for(let tag of tag_array){
      this.tag_service.createTag(tag).catch(error =>{
        error? ErrorHandler.organizaErro(error):null;
      }).then(val =>{
        alert("Nova " + tag.tipo + " " + tag.nome + " adicionada");
        this.tag_name = '';
        this.getTags();
      });
    }

  }
  createTag(tag_name,tag_type){
    let tag = new Tag();
    tag.nome = tag_name;
    tag.tipo = tag_type;
    return tag;
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
  deleteTag(tag){
   this.tag_service.deleteTag(tag);
   delete this.tags_in_db.tamanho[tag.nome];
  }

}
