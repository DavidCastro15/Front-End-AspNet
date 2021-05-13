import {Component, OnInit} from '@angular/core';
import {generoCreacionDTO, generoDTO} from '../genero';
import {ActivatedRoute, Router} from '@angular/router';
import {GenerosService} from '../generos.service';
import {parsearErroresAPI} from '../../utilidades/utilidades';


@Component({
  selector: 'app-editar-genero',
  templateUrl: './editar-genero.component.html',
  styleUrls: ['./editar-genero.component.css']
})
export class EditarGeneroComponent implements OnInit {

  modelo: generoDTO;
  errores: string[] =[];

  constructor(private _router: Router,
              private generoService: GenerosService,
              private activateRoute: ActivatedRoute) {
  }

  ngOnInit(): void {

    this.activateRoute.params.subscribe(params => {
      this.generoService.obtenerPorId(params.id).subscribe(genero => {
        this.modelo = genero;
      }, () => this._router.navigate(['/generos']));
    });

  }

  guardarCambios(genero: generoCreacionDTO) {
    this.generoService.editar(this.modelo.id, genero).subscribe(
      () => {
        this._router.navigate(['/generos']);
      }, error => this.errores = parsearErroresAPI(error) );

  }

}
