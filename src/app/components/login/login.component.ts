import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { usuario } from '../../models/usuario.model';
import { UsuariosService } from '../../services/usuarios.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  private usuariosService = inject(UsuariosService);
  private toastrService = inject(ToastrService);
  nombre: string = '';
  contrasena: string = '';
  passwordVisible: boolean = false;

  constructor(private router: Router){

  }

  ngOnInit(): void {
    
  }

  login(){
    if (this.nombre == '' || this.contrasena == '') {
      this.toastrService.error("Todos los datos deben ser obligatorios")
      return;
    }

    const usuario: usuario = {
      nombre: this.nombre,
      contraseña: this.contrasena,
      correo: "ejemplo@gmail.com",
      admin: false,
      pregunta: "null"
    }

    this.usuariosService.login(usuario).subscribe({
      next: (token) => {
        console.log(token);
        this.router.navigate(['/home']);
        localStorage.setItem("token", JSON.stringify(token))
        this.toastrService.success("Inicio de sesión exitoso")
      },
      error: (err) => {
        this.toastrService.error("El nombre o la contraseña introducidos no son correctos")
      }
    
    })
  } 

  mostrarContrasena() {
    this.passwordVisible = !this.passwordVisible;
  }


}
