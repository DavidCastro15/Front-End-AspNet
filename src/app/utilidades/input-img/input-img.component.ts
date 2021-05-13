import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {toBase64} from '../utilidades';
import {logger} from 'codelyzer/util/logger';

@Component({
  selector: 'app-input-img',
  templateUrl: './input-img.component.html',
  styleUrls: ['./input-img.component.css']
})
export class InputImgComponent implements OnInit {

  constructor() { }
  imgageBase64: string;
  @Input()
  urlImageActual : string;
  @Output()
  archivoSeleccionado : EventEmitter<File> = new EventEmitter<File>();

  ngOnInit(): void {
  }
  change(event){
    if (event.target.files.length > 0){
      const file : File = event.target.files[0];
      toBase64(file).then((value:string) => this.imgageBase64 = value)
        .catch(error => console.log(error));
      this.archivoSeleccionado.emit(file);
      this.urlImageActual = null;
    }

  }

}
