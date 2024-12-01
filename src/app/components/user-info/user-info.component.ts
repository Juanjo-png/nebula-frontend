import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { UsuariosService } from '../../services/usuarios.service';
import { jwtDecode } from 'jwt-decode';
import { usuario } from '../../models/usuario.model';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";

interface TokenData {
  nombreUsuario: string;
}

@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterLink, RouterLinkActive],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.css'
})
export class UserInfoComponent implements OnInit{
  private usuariosService = inject(UsuariosService);
  private token = localStorage.getItem('token'); 
  public tokenData: TokenData | null = null; // Inicializa como null
  public nombre: string = '';
  usuario: usuario | null = null; // Inicializa como null

  constructor(private router: Router) {}

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("carrito");
    this.router.navigate(['/home']);
  }

  ngOnInit() {
    if (this.token) {
      this.tokenData = jwtDecode<TokenData>(this.token); 
      this.nombre = this.tokenData.nombreUsuario;
      this.usuariosService.getUsuario(this.nombre).subscribe((data: any) => {
        this.usuario = data;
        console.log(this.usuario);
      });
    }
  }
}
