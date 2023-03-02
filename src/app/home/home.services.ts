import { HttpClient } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import { bucles, Subir, Producto, Modelo } from './home.model';

firebase.initializeApp({
    apiKey: "AIzaSyD-q5ePELtCY7ke63VJf_4Dg4lLeW6pZbI",
    authDomain: "tienda-cellphones.firebaseapp.com",
    databaseURL:"https://tienda-cellphones-default-rtdb.firebaseio.com",
    projectId:"tienda-cellphones",
    storageBucket:"tienda-cellphones.appspot.com"
  });

@Injectable()
export class homeservices implements OnInit
{
    ngOnInit(): void {
        
    }

    storegeRef = firebase.app().storage().ref();

    constructor(private httpcliente:HttpClient){}

    cargar_datos()
    {
        return this.httpcliente.get<Subir>('https://tienda-cellphones-default-rtdb.firebaseio.com/Productos/.json');
    }

    enviar_datos(producto:Subir)
    {
        this.httpcliente.put('https://tienda-cellphones-default-rtdb.firebaseio.com/Productos/.json', producto)
        .subscribe(
            (response) => {
                console.log("Resultado de guardar producto " + response);
            },
            (error) => {
                console.log("Error en guardar producto " + error)
            }
        );
    }

/*     eliminar_datos(url:string)
    {
        this.httpcliente.delete('https://tienda-cellphones-default-rtdb.firebaseio.com/Productos/' + url + '/.json')
        .subscribe(
            (response) => {
                console.log("Resultado de eliminar producto " + response);
            },
            (error) => {
                console.log("Error en eliminar producto " + error)
            }
        );
    } */

    actualizar_datos(producto:Modelo, categoria:number, modelos:number)
    {
        this.httpcliente.put('https://tienda-cellphones-default-rtdb.firebaseio.com/Productos/producto/'+ categoria +'/tipos/' + modelos + '/.json', producto)
        .subscribe(
            (response) => {
                console.log("Resultado de guardar producto " + response);
            },
            (error) => {
                console.log("Error en guardar producto " + error)
            }
        );
    }

    async subirImg(nombre:string, imgbase64:any)
    {
        try
        {
            let respuesta = await this.storegeRef.child("productos/" + nombre).putString(imgbase64,'data_url');
            return respuesta.ref.getDownloadURL();
        }
        catch(error)
        {
            console.log("Error al cargar imagen ", error);
            return null;
        }
    }
}