import { Component, OnInit } from '@angular/core';
import $ from 'jquery';

@Component({
  selector: 'app-calcular-frete',
  templateUrl: './calcular-frete.component.html',
  styleUrls: ['./calcular-frete.component.css']
})
export class CalcularFreteComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    
    var form = new FormData();
    form.append("grant_type", "authorization_code");
    form.append("client_id", "{{client_id}}");
    form.append("client_secret", "{{client_secret}}");
    form.append("redirect_uri", "{{callback}}");
    form.append("code", "{{code}}");

    var settings = {
      "url": "{{url}}/oauth/token",
      "method": "POST",
      "timeout": 0,
      "headers": {
        "Accept": "application/json"
      },
      "processData": false,
      "mimeType": "multipart/form-data",
      "contentType": false,
      "data": form
    };

    $.ajax(settings).done(function (response) {
      console.log(response);
    });
  
  }

  

}
