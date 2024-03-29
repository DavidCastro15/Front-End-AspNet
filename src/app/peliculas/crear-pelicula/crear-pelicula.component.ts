import { Component, OnInit } from '@angular/core';
import {peliculaCreacionDTO} from '../pelicula';
import {PeliculasService} from '../peliculas.service';
import {MultipleSelectorModel} from '../../utilidades/selector-multiple/multipleSelectorModel';
import {parsearErroresAPI} from '../../utilidades/utilidades';

@Component({
  selector: 'app-crear-pelicula',
  templateUrl: './crear-pelicula.component.html',
  styleUrls: ['./crear-pelicula.component.css']
})
export class CrearPeliculaComponent implements OnInit {
  generosNoSeleccionados: MultipleSelectorModel[];
  cinesNoSeleccionados: MultipleSelectorModel[];
  errores:string[] = [];
  constructor( private peliculasService:PeliculasService) { }

  ngOnInit(): void {
    this.peliculasService.postGet().subscribe(
      resultado =>{

        this.generosNoSeleccionados = resultado.generos.map( genero =>{
          return <MultipleSelectorModel>{llave: genero.id, valor: genero.nombre}
        });

        this.cinesNoSeleccionados = resultado.cines.map( cines =>{
          return <MultipleSelectorModel>{llave: cines.id, valor: cines.nombre}
        });

      }, error => console.error(error));
  }
  guardarCambios(pelicula:peliculaCreacionDTO){
    this.peliculasService.crear(pelicula).subscribe(res=>{
      console.log(res);
    }, error => this.errores = parsearErroresAPI(error));
  }

}
