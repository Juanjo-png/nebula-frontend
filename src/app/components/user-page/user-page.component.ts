import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from '../../services/usuarios.service';
import { jwtDecode } from 'jwt-decode';
import { usuario } from '../../models/usuario.model';

interface TokenData {
  nombreUsuario: string;
}

@Component({
  selector: 'app-user-page',
  standalone: true,
  imports: [],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.css'
})
export class UserPageComponent implements OnInit{
  private usuariosService = inject(UsuariosService);
  private token = localStorage.getItem('token'); 
  public tokenData: TokenData | null = null; // Inicializa como null
  public nombre: string = '';
  usuario: usuario | null = null; // Inicializa como null

  constructor(private router: Router) {}

  ngOnInit() {
    if (this.token) {
      this.tokenData = jwtDecode<TokenData>(this.token); // Asegúrate de que el tipo coincide
      this.nombre = this.tokenData.nombreUsuario;
      this.usuariosService.getUsuario(this.nombre).subscribe((data: any) => {
        this.usuario = data;
        console.log(this.usuario);
      });
    }
    else{
      // this.router.navigate(['/home']);
    }
  }

}
