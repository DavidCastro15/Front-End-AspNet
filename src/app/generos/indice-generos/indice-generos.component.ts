import { Component, OnInit } from '@angular/core';
import {GenerosService} from '../generos.service';
import {generoDTO} from '../genero';
import {HttpResponse} from '@angular/common/http';
import {PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-indice-generos',
  templateUrl: './indice-generos.component.html',
  styleUrls: ['./indice-generos.component.css']
})
export class IndiceGenerosComponent implements OnInit {

  generos:generoDTO[];
  columnasAMostrar = ['id','nombre', 'acciones'];
  cantidadTotalRegitros;
  paginaActual= 1;
  cantidadRegistrosAMostrar = 10;
  constructor(
    private generoService:GenerosService) { }

  ngOnInit(): void {
    this.cargarRegistros(this.paginaActual, this.cantidadRegistrosAMostrar);

  }

  cargarRegistros(pagina:number, cantidadElementosAMotrar){
    this.generoService.obtenerTodos(pagina,cantidadElementosAMotrar).subscribe(
      (respuesta: HttpResponse<generoDTO[]>) =>{
        this.generos = respuesta.body;
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
    this.generoService.borrar(id).subscribe(
      ()=>{
        this.cargarRegistros(this.paginaActual,this.cantidadRegistrosAMostrar);
      }, error => console.error(error));
  }
}
