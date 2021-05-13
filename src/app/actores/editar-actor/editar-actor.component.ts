import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {actorCreacionDTO, actorDTO} from '../actor';
import {generoCreacionDTO} from '../../generos/genero';
import {parsearErroresAPI} from '../../utilidades/utilidades';
import {ActoresService} from '../actores.service';

@Component({
  selector: 'app-editar-actor',
  templateUrl: './editar-actor.component.html',
  styleUrls: ['./editar-actor.component.css']
})
export class EditarActorComponent implements OnInit {
  modelo: actorDTO;
  errores: string[] =[];

  constructor(private _router: Router,
              private actoresService: ActoresService,
              private activateRoute: ActivatedRoute) {
  }

  ngOnInit(): void {

    this.activateRoute.params.subscribe(params => {
      this.actoresService.obtenerPorId(params.id).subscribe(actor => {
        this.modelo = actor;
      }, () => this._router.navigate(['/generos']));
    });

  }

  guardarCambios(actor: actorCreacionDTO) {
    this.actoresService.editar(this.modelo.id, actor).subscribe(
      () => {
        this._router.navigate(['/actores']);
      }, error => this.errores = parsearErroresAPI(error) );

  }

}
