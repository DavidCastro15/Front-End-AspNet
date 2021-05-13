import { Component, OnInit } from '@angular/core';
import {cineCreacionDTO} from '../cine';
import {Router} from '@angular/router';
import {GenerosService} from '../../generos/generos.service';
import {generoCreacionDTO} from '../../generos/genero';
import {parsearErroresAPI} from '../../utilidades/utilidades';
import {CinesService} from '../cines.service';

@Component({
  selector: 'app-crear-cine',
  templateUrl: './crear-cine.component.html',
  styleUrls: ['./crear-cine.component.css']
})
export class CrearCineComponent {

  errores : string[] = [];

  constructor(private _router: Router,
              private _cinesService: CinesService) {}


  guardarCambios(cine:cineCreacionDTO) {
    this._cinesService.crear(cine).subscribe(
      () => {
        this._router.navigate(['/cines']);
      },
      (error) => this.errores = parsearErroresAPI(error)
    );
  }
}
