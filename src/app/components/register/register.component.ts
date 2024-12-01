import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { usuario } from '../../models/usuario.model';
import { UsuariosService } from '../../services/usuarios.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'] // Corregido el nombre de la propiedad
})
export class RegisterComponent implements OnInit {
  private usuariosService = inject(UsuariosService);
  private toastrService = inject(ToastrService);

  nombre: string = '';
  correo: string = '';
  contrasena: string = '';
  confirmarContra: string = '';
  preguntaSeguridad: string = '';
  passwordVisible: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // setInterval(() => this.validarContraseña(), 100);
  }

  addUsu() {
    if (this.nombre === '' || this.contrasena === '' || this.confirmarContra === '') {
      this.toastrService.error('Todos los campos son obligatorios');
      return;
    }

    if (this.contrasena !== this.confirmarContra) {
      this.toastrService.error('Las contraseñas introducidas no coinciden');
      return;
    }

    const regexContra = /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{5,}$/;
    if (!regexContra.test(this.contrasena)) {
      this.toastrService.error('La contraseña no es segura');
      return;
    }

    this.usuariosService.getUsuario(this.nombre).subscribe(data => {
      if (data && data.nombre === this.nombre) {
        this.toastrService.error('El nombre ya existe');
        return;
      }

      const usuario: usuario = {
        nombre: this.nombre,
        contraseña: this.contrasena,
        correo: this.correo,
        admin: false,
        pregunta: this.preguntaSeguridad
      };

      this.usuariosService.register(usuario).subscribe(() => {
        this.toastrService.success('Te has registrado con éxito!!');
        this.router.navigate(['/login']);
      });
    });
  }

  mostrarContrasena() {
    this.passwordVisible = !this.passwordVisible;
  }

  // validarContraseña() {
  //   const regexContra = /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{5,}$/;
  //   if (this.contrasena && !regexContra.test(this.contrasena)) {
  //     this.toastrService.warning('La contraseña no cumple con los requisitos de seguridad');
  //   }
  // }
}

