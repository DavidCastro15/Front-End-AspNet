import { Component, OnInit } from '@angular/core';
import {generoDTO} from '../../generos/genero';
import {GenerosService} from '../../generos/generos.service';
import {HttpResponse} from '@angular/common/http';
import {PageEvent} from '@angular/material/paginator';
import {ActoresService} from '../actores.service';
import {actorDTO} from '../actor';

@Component({
  selector: 'app-indice-actores',
  templateUrl: './indice-actores.component.html',
  styleUrls: ['./indice-actores.component.css']
})
export class IndiceActoresComponent implements OnInit {


  actores:actorDTO[];
  columnasAMostrar = ['id','nombre', 'acciones'];
  cantidadTotalRegitros;
  paginaActual= 1;
  cantidadRegistrosAMostrar = 10;
  constructor(
    private actoresService:ActoresService) { }

  ngOnInit(): void {
    this.cargarRegistros(this.paginaActual, this.cantidadRegistrosAMostrar);

  }

  cargarRegistros(pagina:number, cantidadElementosAMotrar){
    this.actoresService.obtenerTodos(pagina,cantidadElementosAMotrar).subscribe(
      (respuesta: HttpResponse<actorDTO[]>) =>{
        this.actores = respuesta.body;
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
    this.actoresService.borrar(id).subscribe(
      ()=>{
        this.cargarRegistros(this.paginaActual,this.cantidadRegistrosAMostrar);
      }, error => console.error(error));
  }
}
