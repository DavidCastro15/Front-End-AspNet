import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {generoCreacionDTO, generoDTO} from './genero';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GenerosService {

  private apiUrl = environment.apiUrl+'generos';

  constructor(private _http:HttpClient) { }


  public obtenerTodos(pagina:number, cantidadRegistrosAMostrar:number):Observable<any>{
    let params = new HttpParams();
    params = params.append('pagina',pagina.toString());
    params= params.append('recordsPorPagina', cantidadRegistrosAMostrar.toString());
    return this._http.get<generoDTO[]>(this.apiUrl, {observe:'response',params});
  }

  public crear(genero:generoCreacionDTO){
    return this._http.post(this.apiUrl, genero);
  }

  public obtenerPorId(id:number):Observable<generoDTO>{
    return this._http.get<generoDTO>(`${this.apiUrl}/${id}`);
  }

  public editar(id:number,genero:generoCreacionDTO){
    return this._http.put(`${this.apiUrl}/${id}`,genero);
  }

  public borrar(id:number){
    return this._http.delete(`${this.apiUrl}/${id}`);
  }
}
