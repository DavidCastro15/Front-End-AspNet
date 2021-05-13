import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {peliculaCreacionDTO, peliculaDTO} from '../pelicula';
import {MultipleSelectorModel} from '../../utilidades/selector-multiple/multipleSelectorModel';
import {actorPeliculaDTO} from '../../actores/actor';

@Component({
  selector: 'app-formulario-pelicula',
  templateUrl: './formulario-pelicula.component.html',
  styleUrls: ['./formulario-pelicula.component.css']
})
export class FormularioPeliculaComponent implements OnInit {
  form:FormGroup;

  @Output()
  OnSubmit: EventEmitter<peliculaCreacionDTO> = new EventEmitter<peliculaCreacionDTO>();

  @Input()
  modelo:peliculaDTO;

  @Input()
  generosSeleccionados:MultipleSelectorModel[] = [];

  @Input()
  generosNoSeleccionados: MultipleSelectorModel[]= []

  @Input()
  cinesSeleccionados:MultipleSelectorModel[] = [];

  @Input()
  cinesNoSeleccionados:MultipleSelectorModel[] = [];

  @Input()
  actoresSeleccionados: actorPeliculaDTO[] = [];

  @Input()

  errores:string[] =[];

  imagenCambiada = false;
  constructor(private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      titulo: [
        '',
        {
          validators:[Validators.required]
        }
      ],
      resumen: '',
      enCines: false,
      trailer: '',
      fechaLanzamiento: '',
      poster: '',
      generosIds: '',
      cinesIds: '',
      actores: ''
    });

    if (this.modelo !== undefined){
      this.form.patchValue(this.modelo);
    }
  }

  archivoSeleccionado(archivo:File){
    this.form.get('poster').setValue(archivo);
    this.imagenCambiada = true;
  }
  changeMarkdown(texto){
    this.form.get('resumen').setValue(texto)
  }
  guardarCambios(){
    //console.log(this.generosSeleccionados);
    const generosId = this.generosSeleccionados.map(val => val.llave);
    this.form.get('generosIds').setValue(generosId)

    const cinesIds = this.cinesSeleccionados.map(val => val.llave);
    this.form.get('cinesIds').setValue(cinesIds)

    const actores = this.actoresSeleccionados.map(val => {
      return {id: val.id, personaje: val.personaje}
    });

    this.form.get('actores').setValue(actores);

    if (!this.imagenCambiada){
      this.form.patchValue({'poster':null});
    }

    this.OnSubmit.emit(this.form.value);
  }

}
