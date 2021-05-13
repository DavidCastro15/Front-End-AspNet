import { Component, OnInit } from '@angular/core';
import {PeliculasService} from '../peliculas/peliculas.service';
import {peliculaDTO} from '../peliculas/pelicula';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  peliculasEnCines:peliculaDTO[];
  peliculasProximosEstrenos:peliculaDTO[];

  constructor( private peliculasService:PeliculasService) { }


  ngOnInit(): void {
    this.peliculasService.obtenerLandingPage().subscribe( landingPage => {
      this.peliculasEnCines = landingPage.enCines;
      this.peliculasProximosEstrenos = landingPage.proximosEstrenos;
    })
  }


}
