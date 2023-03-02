import { AfterViewChecked, AfterViewInit, Component, OnInit, QueryList, Renderer2, ViewChildren } from '@angular/core';
import { NgForm } from '@angular/forms';
import { homeservices } from './home.services';
import { Subir, Producto, Tipo, Modelo } from './home.model';
import { Router } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('input_boton', [
      state('true', style({
        background: ''
      })),
      state('false', style({
        background: ''
      }))
    ]),
  ]
})
export class HomeComponent implements OnInit, AfterViewInit
{
  @ViewChildren('lista_modelos') lista_modelos:QueryList<any>;

  prueba:string="";

  ngAfterViewInit(): void 
  {
    this.lista_modelos.changes.subscribe( modelos => modelos.forEach((lista: { nativeElement: any; }) =>
    {
      this.render2.addClass(lista.nativeElement, 'tipos_div_none');
      this.componenteModelo.push(lista);
    }));
  }

  ngOnInit(): void
  {
    this.pedirdatos();
  }

  //#region Variables
  entraruna:boolean = true;
  componenteModelo:any[] = [];

  constructor(private services:homeservices, private router:Router, private render2:Renderer2) {}

  //datos para poder subir
  categoria:string = "";
  tipoProducto:string = "";
  productModelo:string = "";

  //twuwaybinding para cargar datos
  modelo:string = "";
  precio:number;
  cantidad:number;
  especificacion:string = "";
  actualizarDato:boolean = false;

  //nueva categoria
  newcategoria:string = "";
  newcategoriainput:string = "";
  newcategoriainputPH:string = "+";
  
  //nuevo tipos
  newcatipoinput:string = "";
  newtiposinputPH:string = "+";

  //clase
  subir:Subir = {producto: []};
  producto:Producto[] = [];
  tipo:Modelo[] = [];
  
  //imagen
  text:string = "";
  url:any[] = [];
  evento:any;

  parabucle:string;
  urlbucle:any[] = [];
  opcion:boolean = true;

  //ESTILOS
  blur = {'filter':'blur(-px)'};
  ocultar = {'visibility': 'hidden'};
  ocultarPH = true;
  ocultarProduct = false;
  ocultarCrud = false;
  indicelista:number = 0;
  ReadOnly:boolean = true;
  urldelapp:string = "";

  //indices para eliminar
  indice1:number = 0;
  indice2:number = 0;
  indice3:number = 0;
  //#endregion
  
  //#region C.R.U.D
  eliminarProducto(indice:number, espec:string)
  {
    this.ocultarProduct = false;
    if(espec == "categoria")
    {
      this.producto.splice(indice, 1);
      this.tipo = [];
    }
    else if(espec == "tipos")
    {
      this.producto[this.indice1].tipos.splice(indice, 1);
      this.tipo = [];
    }
    else if(espec == "modelos")
    {
      this.producto[this.indice1].tipos[this.indice2].modelos.splice(indice, 1);
      this.tipo.splice(indice, 1);
    }
    this.subir = {producto : this.producto};
    this.actualizarDatos(this.subir);
    this.services.enviar_datos(this.subir);
  }
  pedirdatos()
  {
    this.services.cargar_datos()
    .subscribe(
      (producto:Subir) =>
      {
        this.actualizarDatos(producto);
      }
    )
  }
  actualizarDatos(producto:Subir)
  {
    this.subir = producto;
    if (this.subir.producto !== undefined && this.subir.producto !== null)
    {
      this.producto = this.subir.producto.filter(produc => produc != undefined && produc != null);
    }
  }
  nuevaCategoria()
  {
    this.producto.push
    (
      {
        'nombre' : this.newcategoriainput,
        'imagen' : '',
        'tipos' : []
      }
    );
    this.componenteModelo = [];
    this.tipoProducto = "";
    this.productModelo  = "";
    this.categoria = "";
    this.urldelapp = "";

    this.subir = {producto : this.producto}
    this.services.enviar_datos(this.subir);
    this.newcategoriainput = "";
    
  }
  actualizar()
  {
    this.services.enviar_datos(this.subir);
    this.ReadOnly = true;
  }
  nuevoTipo(indice:number)
  {
    this.producto[indice].tipos.push
    (
      {
        'nombre' : this.newcatipoinput,
        'imagen' : '',
        'modelos' : []
      }
    );
    this.productModelo  = "";
    this.tipoProducto = "";
    this.urldelapp = this.categoria + " / ";
    this.subir = {producto : this.producto}
    this.services.enviar_datos(this.subir);
    this.newcatipoinput = "";
  }
  //#endregion
  
  //#region stilo

  quitarPHCat()
  {
    if(this.ocultarPH)
    {
      this.newcategoriainputPH = "";
    }
    if(this.ocultarPH == false)
    {
      this.newcategoriainputPH = "+";
    }
    this.ocultarPH = !this.ocultarPH;
  }
  quitarPHTip()
  {
    if(this.ocultarPH)
    {
      this.newtiposinputPH = "";
    }
    if(this.ocultarPH == false)
    {
      this.newtiposinputPH = "+";
    }
    this.ocultarPH = !this.ocultarPH;
  }
  quitarSoloLectura(opcion:boolean)
  {
    this.ReadOnly = opcion;
  }
  ponerCategoria(palabra:string, indice:number)
  {
    this.lista_modelos.changes.subscribe( modelos => modelos.forEach((lista: { nativeElement: any; }, index:number) => this.componenteModelo[index]=lista ));
    this.render2.removeClass(this.componenteModelo[indice].nativeElement, 'tipos_div_none');
    this.componenteModelo.forEach((lista:any, index:Number) => 
    {
      if (index !== indice) this.render2.addClass(lista.nativeElement, 'tipos_div_none');
    });
    this.tipo = [];
    this.indice1 = indice;
    this.tipoProducto = "";
    this.productModelo  = "";
    this.categoria = palabra;
    this.urldelapp = this.categoria + " / " + "" + "";
  }
  ponerTipo(nombre:string, index:number)
  {
    if(this.producto[this.indice1].tipos[index].modelos !== undefined)
    {
      for (let i = 0; i < this.producto[this.indice1].tipos[index].modelos.length; i++)
      {
        this.tipo = this.producto[this.indice1].tipos[index].modelos;
      }
    }
    else
    {
      this.tipo = [];
    }
    this.ocultarCrud = false;
    this.ocultarProduct = true;
    this.indice2 = index;
    this.productModelo  = "";
    this.tipoProducto = nombre;
    this.urldelapp = this.categoria + " / " + this.tipoProducto + " / " + "";
  }
  ponerModelo(dato:string, producto:Modelo, indice:number)
  {
    this.ocultarCrud = true;
    this.modelo = producto.modelo;
    this.precio = producto.precio;
    this.cantidad = producto.cantidad;
    this.especificacion = producto.especificacion;
    this.actualizarDato = true;

    this.indice3 = indice;
    this.productModelo = dato;
    this.urldelapp = this.categoria + " / " + this.tipoProducto + " / " + dato;
  }
  click_partetrasera()
  {
    this.blur = {'filter':'blur(0px)'};
    this.ocultar = {'visibility': 'hidden'};
  }
  //#endregion
  
  //#region Imagen y subida de dato
  imagen(evento:any)
  {
    this.evento = evento;
    for (let index = 0; index < evento.target.files.length; index++)
    {
      this.text = this.text + " " + evento.target.files[index].name;
    }
  }
  nuevoModelo(form:NgForm)
  {
    this.blur = {'filter':'blur(3px)'};
    this.ocultar = {'visibility': 'visible'};

    if (this.actualizarDato)
    {
      this.opcion = true;
      this.urlbucle = this.producto[this.indice1].tipos[this.indice2].modelos[this.indice3].img;
    }
    else if (this.actualizarDato === false)
    {
      this.opcion = true;
      let img_cargada:number = 0;
      let archivos = this.evento.target.files;

      let modelo = form.value.modelo;
      let espec = form.value.especificacion;
      let precio = form.value.precio;
      let cantidad = form.value.cantidad;
      this.parabucle = modelo;

      for (let index = 0; index < this.evento.target.files.length; index++) 
      {
        let reader = new FileReader();
        reader.readAsDataURL(archivos[index]);

        reader.onload = () =>
        {
          this.urlbucle[index] = reader.result;
        };

        reader.onloadend = () => {
          this.services.subirImg(modelo + index, reader.result).then(urlImage => {
            this.url[index] = urlImage;
            img_cargada =+ img_cargada;
            if (img_cargada == index)
            {
              this.tipo.push
              (
                {
                  "modelo": modelo,
                  "img": this.url,
                  "especificacion": espec,
                  "precio": precio,
                  "cantidad": cantidad
                }
              );
              this.producto[this.indice1].tipos[this.indice2] =
              {
                nombre: this.tipoProducto,
                imagen: '',
                modelos: this.tipo
              };
              this.subir = {producto : this.producto};
              this.services.enviar_datos(this.subir);
            };
          })
        }
      }
    }
  }
  //#endregion
}