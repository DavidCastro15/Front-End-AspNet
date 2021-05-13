import {generoDTO} from '../generos/genero';
import {cineDTO} from '../cines/cine';
import {actorDTO, actorPeliculaDTO} from '../actores/actor';


export interface peliculaCreacionDTO{
  titulo: string;
  resumen: string;
  enCines: boolean;
  fechaLanzamiento: Date;
  trailer: string;
  poster: File;
  generosIds: number[];
  actores: actorPeliculaDTO[];
  cinesIds: number[];
}
export interface peliculaDTO{
  id:number;
  titulo: string;
  resumen: string;
  enCines: boolean;
  fechaLanzamiento: Date;
  trailer: string;
  poster: string;
  personaje:string;
  generos:generoDTO[];
  actores:actorDTO[];
  cines: cineDTO[];

}
export interface  peliculaPostGet{
  generos: generoDTO[];
  cines: cineDTO[];
}
export interface landingPageDTO{
  enCines : peliculaDTO[];
  proximosEstrenos: peliculaDTO[];
}
export interface peliculPutGet{
  pelicula:peliculaDTO;
  generosSeleccionados:generoDTO[];
  generosNoSeleccionados:generoDTO[];
  cinesSeleccionados:cineDTO[];
  cinesNoSeleccionados:cineDTO[];
  actores: actorPeliculaDTO[];
}
