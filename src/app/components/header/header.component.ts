import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { UsuariosService } from '../../services/usuarios.service';
import { jwtDecode } from "jwt-decode";
import { usuario } from '../../models/usuario.model';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface TokenData {
  idUsuario: any;
  nombreUsuario: string;
}

interface Usuario {
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, TranslateModule, FormsModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'] // Aquí deberías usar 'styleUrls' en lugar de 'styleUrl'
})
export class HeaderComponent implements OnInit{
  private usuariosService = inject(UsuariosService);
  token = localStorage.getItem('token'); 
  public tokenData: TokenData | null = null; // Inicializa como null
  public idUsuario: string = '';
  public isAdmin: boolean = false;
  usuario: usuario | null = null; // Inicializa como null
  noCarrito: number = 0;
  busqueda: string = '';
  barraVisible: boolean = false; 
  isSidebarOpen: boolean = false;
  
  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }


  constructor(private router: Router, private translate: TranslateService) {
    this.translate.setDefaultLang('es');
    this.translate.use('es'); // Establece el idioma inicial
  }

  ngOnInit() {
    if (this.token) {
      this.tokenData = jwtDecode<TokenData>(this.token); // Asegúrate de que el tipo coincide
      this.idUsuario = this.tokenData.idUsuario[0].id;
      this.usuariosService.getUsuarioByID(this.idUsuario).subscribe((data: any) => {
        this.usuario = data;
        this.isAdmin = data.Admin
      });
    }
    setInterval(() => this.contarCarrito(), 100);
  }

  contarCarrito(){
    const data = localStorage.getItem('carrito');
    const array = data ? JSON.parse(data) : [];
    this.noCarrito = array.length;
  }

  mostrarBarra(){
    this.barraVisible = !this.barraVisible;
    let barraOculta = document.querySelector(".barraOculta");
    let barraMostrar = document.querySelector(".barraMostrar");
    if (barraOculta) {
      barraOculta.classList.remove("barraOculta")
      barraOculta.classList.add("barraMostrar")
    }
    if (barraMostrar) {
      barraMostrar.classList.remove("barraMostrar")
      barraMostrar.classList.add("barraOculta")
    }
  }

  buscar(){
    this.router.navigate([`/buscar/${this.busqueda}`]);
    let barraMostrar = document.querySelector(".barraMostrar");
    if (barraMostrar) {
      barraMostrar.classList.remove("barraMostrar")
      barraMostrar.classList.add("barraOculta")
    }
  }
}


