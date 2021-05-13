import {Component, Input, OnInit} from '@angular/core';
import {MultipleSelectorModel} from './multipleSelectorModel';

@Component({
  selector: 'app-selector-multiple',
  templateUrl: './selector-multiple.component.html',
  styleUrls: ['./selector-multiple.component.css']
})
export class SelectorMultipleComponent implements OnInit {

  @Input()
  Seleccionados: MultipleSelectorModel[] = [];

  @Input()
  NoSeleccionados: MultipleSelectorModel[] = [];
  constructor() { }

  ngOnInit(): void {
  }

  seleccionar(item:MultipleSelectorModel,index:number){
    this.Seleccionados.push(item);
    this.NoSeleccionados.splice(index, 1);


  }
  deseleccionar(item:MultipleSelectorModel,index:number){
    this.NoSeleccionados.push(item);
    this.Seleccionados.splice(index, 1);

  }


  seleccionarTodo(){
    this.Seleccionados.push(...this.NoSeleccionados);
    this.NoSeleccionados = [];
    //this.NoSeleccionados.length = 0;

  }

  deseleccionarTodo(){
    this.NoSeleccionados.push(...this.Seleccionados);
    this.Seleccionados = [];
    //this.Seleccionados.length = 0;
  }
}
