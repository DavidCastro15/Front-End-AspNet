import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {cineCreacionDTO, cineDTO} from './cine';
import {Observable} from 'rxjs';
import {generoCreacionDTO, generoDTO} from '../generos/genero';

@Injectable({
  providedIn: 'root'
})
export class CinesService {
  private apiUrl = environment.apiUrl+'cines';

  constructor(private _http:HttpClient) { }

  public obtenerTodos(pagina:number, cantidadRegistrosAMostrar:number):Observable<any>{
    let params = new HttpParams();
    params = params.append('pagina',pagina.toString());
    params= params.append('recordsPorPagina', cantidadRegistrosAMostrar.toString());
    return this._http.get<cineDTO[]>(this.apiUrl, {observe:'response',params});
  }

  public crear(cine:cineCreacionDTO){
    return this._http.post(this.apiUrl, cine);
  }

  public borrar(id:number){
    return this._http.delete(`${this.apiUrl}/${id}`);
  }

  public obtenerPorId(id:number):Observable<cineDTO>{
    return this._http.get<cineDTO>(`${this.apiUrl}/${id}`);
  }

  public editar(id:number,cine:cineCreacionDTO){
    return this._http.put(`${this.apiUrl}/${id}`,cine);
  }
}
