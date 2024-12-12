import { Component, OnInit, inject} from '@angular/core';
import { LibrosService } from '../../services/libros.service';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from "../footer/footer.component";
import { itemCarrito } from '../../models/itemCarrito';
import { libro } from '../../models/libro.model';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { ViewportScroller } from '@angular/common';
import { jwtDecode } from 'jwt-decode';
import { UsuariosService } from '../../services/usuarios.service';
import { usuario } from '../../models/usuario.model';

interface TokenData {
  idUsuario: any;
  nombreUsuario: string;
}

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [HeaderComponent, RouterLink, RouterLinkActive, FooterComponent],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css'
})
export class ProductPageComponent implements OnInit{
  private librosService = inject(LibrosService);
  private route = inject(ActivatedRoute);
  private usuariosService = inject(UsuariosService);
  private toastrService = inject(ToastrService);
  private viewportScroller = inject(ViewportScroller)
  private token = localStorage.getItem('token'); 
  public tokenData: TokenData | null = null; // Inicializa como null
  public idUsuario: string = '';
  usuario: usuario | null = null; // Inicializa como null

  constructor(private translate: TranslateService){
    
  }

  libro: any = {};  
  libros: any[] = [];
  idLibro: string | null = null;

  ngOnInit() {
    this.viewportScroller.scrollToPosition([0, 0]);
    this.idLibro = this.route.snapshot.paramMap.get('id');
    if (this.token) {
      this.tokenData = jwtDecode<TokenData>(this.token); // Asegúrate de que el tipo coincide
      this.idUsuario = this.tokenData.idUsuario[0].id;
      this.usuariosService.getUsuarioByID(this.idUsuario).subscribe((data: any) => {
        this.usuario = data;
        console.log(data);
      });
    }
    else{
      console.log("No hay usuario logeado ahora");
    }
    if (this.idLibro) {
      this.librosService.getLibro(this.idLibro).subscribe((libro: any) => {
        this.libro = libro;
        console.log(libro);
      });
    }
  }

  agregarCarrito(libro: libro){
    let itemCarrito: itemCarrito = {
      id: libro.id,
      titulo: libro.titulo,
      precio: libro.precio,
      portada: libro.portada,
      cantidad: 1
    }
    if (localStorage.getItem("carrito") === null) {
      let carrito: itemCarrito[] = [];
      carrito.push(itemCarrito);
      localStorage.setItem("carrito", JSON.stringify(carrito));
      this.toastrService.success("Producto agregado al carrito");
    }
    else{
      let carritoStorage = localStorage.getItem("carrito") as string;
      let carrito = JSON.parse(carritoStorage);
      let index = -1;
      for (let i = 0; i < carrito.length; i++) {
        let itemC: itemCarrito = carrito[i];
        if (itemCarrito.id === itemC.id) {
          index = i;
          break;
        }
      }
      if (index === -1) {
        carrito.push(itemCarrito);
        localStorage.setItem("carrito", JSON.stringify(carrito));
        this.toastrService.success("Producto agregado al carrito");
      }
      else{
        let itemCarrito: itemCarrito = carrito[index];
        itemCarrito.cantidad++;
        carrito[index] = itemCarrito;
        localStorage.setItem("carrito", JSON.stringify(carrito));
        this.toastrService.success("Producto agregado al carrito");
      }
      
    }
  }
}
