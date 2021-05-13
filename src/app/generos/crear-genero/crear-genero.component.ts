import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {primeraLetraMayuscula} from '../../utilidades/Validadores/primeraLetraMayuscula';
import {generoCreacionDTO} from '../genero';
import {GenerosService} from '../generos.service';
import {parsearErroresAPI} from '../../utilidades/utilidades';

@Component({
  selector: 'app-crear-genero',
  templateUrl: './crear-genero.component.html',
  styleUrls: ['./crear-genero.component.css']
})
export class CrearGeneroComponent {
  errores : string[] = [];

  constructor(private _router: Router,
              private _generosService: GenerosService) {}


  guardarCambios(genero:generoCreacionDTO) {
    this._generosService.crear(genero).subscribe(
      () => {
      this._router.navigate(['/generos']);
    },
      (error) => this.errores = parsearErroresAPI(error)
    );
  }

}

