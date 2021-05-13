import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-input-markdown',
  templateUrl: './input-markdown.component.html',
  styleUrls: ['./input-markdown.component.css']
})
export class InputMarkdownComponent implements OnInit {
  @Input()
  contenidoMarkdown = '';

  constructor() { }
  @Output()
  changeMarkdown: EventEmitter<string> = new EventEmitter<string>();

  @Input()
  placeHolderTextArea: string = 'Texto';
  ngOnInit(): void {
  }

}
