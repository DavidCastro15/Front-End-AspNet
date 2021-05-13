import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {landingPageDTO, peliculaCreacionDTO, peliculaDTO, peliculaPostGet, peliculPutGet} from './pelicula';
import {formatearFecha} from '../utilidades/utilidades';
@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  constructor(private http:HttpClient) { }
  private apiURL = environment.apiUrl + 'peliculas';

  public obtenerLandingPage():Observable<landingPageDTO>{
    return this.http.get<landingPageDTO>(this.apiURL);
  }
  public obtenerPorId(id:number):Observable<peliculaDTO>{
    return this.http.get<peliculaDTO>(`${this.apiURL}/${id}`);

  }
  public postGet():Observable<peliculaPostGet>{
    return this.http.get<peliculaPostGet>(`${this.apiURL}/postget`);
  }
  public putGet(id:number):Observable<peliculPutGet>{
    return this.http.get<peliculPutGet>(`${this.apiURL}/putget/${id}`);
  }
  public crear(pelicula:peliculaCreacionDTO){
  const formData = this.ConstruirFormData(pelicula);
  return this.http.post(this.apiURL, formData);
  }

  public editar(id:number,pelicula:peliculaCreacionDTO){
    const formData = this.ConstruirFormData(pelicula);
    return this.http.put(`${this.apiURL}/${id}`, formData);
  }
  private ConstruirFormData(pelicula:peliculaCreacionDTO):FormData{
    const formData = new FormData();

    formData.append('titulo', pelicula.titulo);
    formData.append('resumen', pelicula.resumen);
    formData.append('trailer', pelicula.trailer);
    formData.append('enCines', String(pelicula.enCines));
    if (pelicula.fechaLanzamiento){
      formData.append('fechaLanzamiento', formatearFecha(pelicula.fechaLanzamiento));
    }

    if (pelicula.poster){
      formData.append('poster', pelicula.poster);
    }
    formData.append('generosIds',JSON.stringify(pelicula.generosIds));
    formData.append('cinesIds',JSON.stringify(pelicula.cinesIds));
    formData.append('actores', JSON.stringify(pelicula.actores));

    return formData;
  }
}
