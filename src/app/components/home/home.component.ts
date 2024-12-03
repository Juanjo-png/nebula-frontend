import { Component, OnInit, inject } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { LibrosService } from '../../services/libros.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { UsuariosService } from '../../services/usuarios.service';
import { jwtDecode } from 'jwt-decode';
import { libro } from '../../models/libro.model';
import { itemCarrito } from '../../models/itemCarrito';
import { FooterComponent } from '../footer/footer.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { NoticiasService } from '../../services/noticias.service';

interface TokenData {
  idUsuario: any;
  nombreUsuario: string;
}

interface Usuario {
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, RouterLink, RouterLinkActive, FooterComponent, TranslateModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private librosService = inject(LibrosService);
  private usuariosService = inject(UsuariosService);
  private noticiasService = inject(NoticiasService);
  private toastrService = inject(ToastrService);
  private token = localStorage.getItem('token'); 
  public tokenData: TokenData | null = null; // Inicializa como null
  public idUsuario: string = '';
  usuario: Usuario | null = null; // Inicializa como null
  numeroPortada: number = 0;

  constructor(private router: Router, private translate: TranslateService) {
    // Verificar si hay un idioma almacenado en localStorage
    const savedLanguage = localStorage.getItem('appLanguage');
    if (savedLanguage) {
      this.translate.use(savedLanguage); // Usa el idioma almacenado
    } else {
      this.translate.setDefaultLang('es'); // Configura un idioma predeterminado
      this.translate.use('es'); // Usa el idioma predeterminado
      localStorage.setItem('appLanguage', 'es'); // Guarda el idioma predeterminado
    }
  }

  libros: any[] = [];
  noticias: any[] = [];

  ngOnInit() {
    this.numeroPortada = this.obtenerNumeroAleatorio();
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

    this.librosService.getLibrosNovedadesTodas().subscribe((libros: any) => {
      this.libros = libros;
      this.libros.splice(6)
      console.log(this.libros);
    });

    this.noticiasService.getNoticias().subscribe((noticias: any) => {
      this.noticias = noticias;
      console.log(this.noticias);
    });
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

  obtenerNumeroAleatorio(): number {
    return Math.floor(Math.random() * 3) + 1;
  }
}

