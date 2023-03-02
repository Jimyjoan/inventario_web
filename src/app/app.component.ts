import { Component, OnInit } from '@angular/core';
import * as firebase from '@firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'inventario_tienda_adony';

  ngOnInit()
  {
    /* firebase.initializeApp
    (
      {
        apiKey: "AIzaSyD-q5ePELtCY7ke63VJf_4Dg4lLeW6pZbI",
        authDomain: "tienda-cellphones.firebaseapp.com"
      }
    ) */
  }
}
