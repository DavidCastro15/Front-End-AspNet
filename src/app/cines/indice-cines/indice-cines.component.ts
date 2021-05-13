import { Component, OnInit } from '@angular/core';
import {generoDTO} from '../../generos/genero';
import {GenerosService} from '../../generos/generos.service';
import {HttpResponse} from '@angular/common/http';
import {PageEvent} from '@angular/material/paginator';
import {cineDTO} from '../cine';
import {CinesService} from '../cines.service';

@Component({
  selector: 'app-indice-cines',
  templateUrl: './indice-cines.component.html',
  styleUrls: ['./indice-cines.component.css']
})
export class IndiceCinesComponent implements OnInit {

  cines:cineDTO[];
  columnasAMostrar = ['id','nombre', 'acciones'];
  cantidadTotalRegitros;
  paginaActual= 1;
  cantidadRegistrosAMostrar = 10;
  constructor(
    private _cinesService:CinesService) { }

  ngOnInit(): void {
    this.cargarRegistros(this.paginaActual, this.cantidadRegistrosAMostrar);

  }

  cargarRegistros(pagina:number, cantidadElementosAMotrar){
    this._cinesService.obtenerTodos(pagina,cantidadElementosAMotrar).subscribe(
      (respuesta: HttpResponse<cineDTO[]>) =>{
        this.cines = respuesta.body;
        this.cantidadTotalRegitros = respuesta.headers.get("cantidadTotalRegistros");
      },
      error => console.error(error));
  }
  actualizarPaginacion(datos:PageEvent){
    this.paginaActual = datos.pageIndex + 1;
    this.cantidadRegistrosAMostrar = datos.pageSize;
    this.cargarRegistros(this.paginaActual, this.cantidadRegistrosAMostrar);
  }

  borrar(id:number){
    this._cinesService.borrar(id).subscribe(
      ()=>{
        this.cargarRegistros(this.paginaActual,this.cantidadRegistrosAMostrar);
      }, error => console.error(error));
  }
}
