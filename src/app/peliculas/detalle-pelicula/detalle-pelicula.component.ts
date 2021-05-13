import {Component, OnInit} from '@angular/core';
import {PeliculasService} from '../peliculas.service';
import {ActivatedRoute} from '@angular/router';
import {peliculaDTO} from '../pelicula';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {Coordenada, CoordenadaMensaje} from '../../utilidades/mapa/coordenada';

@Component({
  selector: 'app-detalle-pelicula',
  templateUrl: './detalle-pelicula.component.html',
  styleUrls: ['./detalle-pelicula.component.css']
})
export class DetallePeliculaComponent implements OnInit {

  pelicula: peliculaDTO;
  fechaLanzamiento: Date;
  trailerURL: SafeUrl;
  coordenadas: CoordenadaMensaje[] = [];

  constructor(private peliculasService:PeliculasService,
              private activatedRoute: ActivatedRoute,
              private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.peliculasService.obtenerPorId(params.id).subscribe(pelicula => {
        console.log(pelicula);
        this.pelicula = pelicula;
        this.fechaLanzamiento = new Date(this.pelicula.fechaLanzamiento);
        this.trailerURL = this.generarURLYoutubeEmbed(this.pelicula.trailer);
        this.coordenadas = pelicula.cines.map( cine =>{
          return {longitud: cine.longitud, latitud: cine.latitud, mensaje: cine.nombre}
        });
      })
    })
  }
  generarURLYoutubeEmbed(url: any): SafeUrl{
    if (!url){
      return '';
    }

    var video_id = url.split('v=')[1];
    var posicionAmpersand = video_id.indexOf('&');
    if (posicionAmpersand !== -1){
      video_id = video_id.substring(0,posicionAmpersand);
    }
    return this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${video_id}`)

  }

}
