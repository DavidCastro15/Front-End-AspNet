import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {actorCreacionDTO, actorDTO, actorPeliculaDTO} from './actor';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {formatearFecha} from '../utilidades/utilidades';
import {Observable} from 'rxjs';
import {generoCreacionDTO, generoDTO} from '../generos/genero';

@Injectable({
  providedIn: 'root'
})
export class ActoresService {

  private apiURL = environment.apiUrl + 'actores';

  constructor(private _http: HttpClient) {
  }

  public obtenerTodos(pagina:number, cantidadRegistrosAMostrar:number):Observable<any>{
    let params = new HttpParams();
    params = params.append('pagina',pagina.toString());
    params= params.append('recordsPorPagina', cantidadRegistrosAMostrar.toString());
    return this._http.get<actorDTO[]>(this.apiURL, {observe:'response',params});
  }

  public crear(actor: actorCreacionDTO) {
    const formData = this.construirFormData(actor);
    return this._http.post(this.apiURL, formData);

  }

  private construirFormData(actor: actorCreacionDTO): FormData {
    const formData = new FormData();
    formData.append('nombre', actor.nombre);
    if (actor.biografia) {
      formData.append('biografia', actor.biografia);
    }
    if (actor.fechaNacimiento) {
      formData.append('fechaNacimiento', formatearFecha(actor.fechaNacimiento));
    }
    if (actor.foto) {
      formData.append('foto', actor.foto);
    }
    return formData;
  }

  public borrar(id:number){
    return this._http.delete(`${this.apiURL}/${id}`);
  }

  public obtenerPorNombre(nombre:string):Observable<actorPeliculaDTO[]>{
    const headers = new HttpHeaders('Content-Type: application/json');
    return this._http.post<actorPeliculaDTO[]>(`${this.apiURL}/buscarPorNombre`,
      JSON.stringify(nombre),{headers});

  }
  public obtenerPorId(id:number):Observable<actorDTO>{
    return this._http.get<actorDTO>(`${this.apiURL}/${id}`);
  }

  public editar(id:number,actor:actorCreacionDTO){
    const formData = this.construirFormData(actor);
    return this._http.put(`${this.apiURL}/${id}`, formData);
  }


}
