import { Component, OnInit } from '@angular/core';
import {actorCreacionDTO} from '../actor';
import {ActoresService} from '../actores.service';
import {Router} from '@angular/router';
import {parsearErroresAPI} from '../../utilidades/utilidades';

@Component({
  selector: 'app-crear-actor',
  templateUrl: './crear-actor.component.html',
  styleUrls: ['./crear-actor.component.css']
})
export class CrearActorComponent implements OnInit {

  errores = [];

  constructor(private actoresService:ActoresService,
              private  router:Router) { }

  ngOnInit(): void {
  }
  guardarCambios(actor: actorCreacionDTO){
    this.actoresService.crear(actor).subscribe(( )=> {
      this.router.navigate(['/actores'])
    }, errores => this.errores = parsearErroresAPI(errores));

  }

}
