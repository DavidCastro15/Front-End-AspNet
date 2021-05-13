import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {tileLayer, latLng, LeafletMouseEvent, Marker, marker} from 'leaflet';
import {Coordenada, CoordenadaMensaje} from './coordenada';
import {cineDTO} from '../../cines/cine';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {
  capas:Marker<any>[] = [];
  @Output()
  cordenadaSeleccionada: EventEmitter<Coordenada> = new EventEmitter<Coordenada>();
  constructor() { }
  @Input()
  coordenadasIniciales: CoordenadaMensaje[] = [];

  @Input()
  soloLectura : boolean = false;

  ngOnInit(): void {
    this.capas = this.coordenadasIniciales.map((valor) => {
      let marcadador = marker([valor.latitud, valor.longitud]);
      if (valor.mensaje){
        marcadador.bindPopup(valor.mensaje, {autoClose:false,autoPan:false});
      }
      return marcadador;
    }
  );
  }

  options = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    ],
    zoom: 14,
    center: latLng(18.882801016153035, -96.9739279746682)
  };
  manejarClick(event: LeafletMouseEvent){
    const latitud = event.latlng.lat;
    const longitud = event.latlng.lng;
    if (!this.soloLectura){
      this.capas = [];
      this.capas.push(marker([latitud,longitud]));
      this.cordenadaSeleccionada.emit(
        {latitud:latitud, longitud:longitud}
      );
    }


  }

}
