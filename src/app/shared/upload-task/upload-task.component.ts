import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { ProdutosService } from '../../produtos/service/produtos.service';
import { tap, finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Component, OnInit, Input, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';

@Component({
  selector: 'app-upload-task',
  templateUrl: './upload-task.component.html',
  styleUrls: ['./upload-task.component.css']
})
export class UploadTaskComponent implements OnInit {


  @Input() file: File;
  @Input() recebeProdutos;
  @Output() removerFoto = new EventEmitter();
  @Output() enviarUrl = new EventEmitter();
  @Output() foto_removida = new EventEmitter();

  key: string = '';

  uploadPercent: Observable<number>;
  downloadURL: string;
  snapshot: Observable<any>;
  task: AngularFireUploadTask;
  complete: boolean;
  caminhoImagem: string;
  delete_icon = faTimesCircle;
  data = new Date();

  constructor(private storage: AngularFireStorage, private produtosService: ProdutosService) { }

  ngOnInit() {
    this.upload();
  }

  upload() {
    if(this.recebeProdutos.nome){
      this.complete = false;
      const path = 'imagens/' + this.recebeProdutos.nome + "/" + this.file.name + this.data.getTime();

      const fileRef = this.storage.ref(path);

      this.task = this.storage.upload(path, this.file)
      this.uploadPercent = this.task.percentageChanges();

      this.task.then(up => {
        fileRef.getDownloadURL().subscribe(url => {
          this.complete = true
          this.caminhoImagem = url;
          this.enviarUrl.emit(url);

        })
      })
    }else{
      alert("É preciso adicionar um nome ao seu produto");
    }

  }

  deletarFoto(url, file: File){
    this.produtosService.deletarFoto(url, this.key, this.recebeProdutos);
    console.log("deletado")
    this.foto_removida.emit();

  }


  isActive(task){
    return task.state === 'running' && task.bytesTransferred < task.totalBytes;
  }
}
