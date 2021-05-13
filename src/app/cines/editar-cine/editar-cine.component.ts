import { Component, OnInit } from '@angular/core';
import {cineCreacionDTO, cineDTO} from '../cine';
import {generoCreacionDTO, generoDTO} from '../../generos/genero';
import {ActivatedRoute, Router} from '@angular/router';
import {parsearErroresAPI} from '../../utilidades/utilidades';
import {CinesService} from '../cines.service';

@Component({
  selector: 'app-editar-cine',
  templateUrl: './editar-cine.component.html',
  styleUrls: ['./editar-cine.component.css']
})
export class EditarCineComponent implements OnInit {

  modelo: cineDTO;
  errores: string[] =[];

  constructor(private _router: Router,
              private cineService: CinesService,
              private activateRoute: ActivatedRoute) {
  }

  ngOnInit(): void {

    this.activateRoute.params.subscribe(params => {
      this.cineService.obtenerPorId(params.id).subscribe(cine => {
        this.modelo = cine;
      }, () => this._router.navigate(['/cines']));
    });

  }

  guardarCambios(cine: cineCreacionDTO) {
    this.cineService.editar(this.modelo.id, cine).subscribe(
      () => {
        this._router.navigate(['/cines']);
      }, error => this.errores = parsearErroresAPI(error) );

  }

}
