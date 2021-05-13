import { Component, OnInit } from '@angular/core';
import {peliculaCreacionDTO, peliculaDTO} from '../pelicula';
import {PeliculasService} from '../peliculas.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MultipleSelectorModel} from '../../utilidades/selector-multiple/multipleSelectorModel';
import {actorPeliculaDTO} from '../../actores/actor';

@Component({
  selector: 'app-editar-pelicula',
  templateUrl: './editar-pelicula.component.html',
  styleUrls: ['./editar-pelicula.component.css']
})
export class EditarPeliculaComponent implements OnInit {

  cinesSeleccionados: MultipleSelectorModel[];
  cinesNoSeleccionados: MultipleSelectorModel[];
  generosSeleccionados: MultipleSelectorModel[];
  generosNoSeleccionados: MultipleSelectorModel[];


  actoresSeleccionados:actorPeliculaDTO[];
  modelo: peliculaDTO;

  constructor(private peliculasService:PeliculasService,
              private router:Router,
              private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params =>{
      this.peliculasService.putGet(params.id).subscribe(peliculaPutGet =>{
        this.modelo = peliculaPutGet.pelicula;
        this.generosNoSeleccionados = peliculaPutGet.generosNoSeleccionados.map( genero =>{
          return <MultipleSelectorModel>{llave: genero.id, valor: genero.nombre}
        });

        this.generosSeleccionados = peliculaPutGet.generosSeleccionados.map( genero =>{
          return <MultipleSelectorModel>{llave: genero.id, valor: genero.nombre}
        });


        this.cinesSeleccionados = peliculaPutGet.cinesSeleccionados.map( cines =>{
          return <MultipleSelectorModel>{llave: cines.id, valor: cines.nombre}
        });

        this.cinesNoSeleccionados = peliculaPutGet.cinesNoSeleccionados.map( cines =>{
          return <MultipleSelectorModel>{llave: cines.id, valor: cines.nombre}
        });

        this.actoresSeleccionados = peliculaPutGet.actores;
      })
    })
  }
  guardarCambios(pelicula:peliculaCreacionDTO){
    this.peliculasService.editar(this.modelo.id,pelicula)
      .subscribe(()=> this.router.navigate(['/pelicula/'+this.modelo.id]))
  }

}
