import { Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { bucles } from '../home.model';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {

  @Input() style_visibility = {};
  @Input() producto:string;
  @Input() imagen:any[] = [];
  @Input() opcion:boolean;

  @Output() mensaje = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }
  
  ocultar()
  {
    this.mensaje.emit();
  }
}
