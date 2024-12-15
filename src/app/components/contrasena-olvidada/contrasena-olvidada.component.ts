import { Component, inject, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UsuariosService } from '../../services/usuarios.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contrasena-olvidada',
  standalone: true,
  imports: [RouterLink, FormsModule, RouterLinkActive],
  templateUrl: './contrasena-olvidada.component.html',
  styleUrl: './contrasena-olvidada.component.css'
})
export class ContrasenaOlvidadaComponent implements OnInit{
  private usuariosService = inject(UsuariosService);
  private toastrService = inject(ToastrService);
  nombre: string = '';
  preguntaSeguridad: string = '';
  passwordVisible: boolean = false;
  existeUsuario: number = 0;

  constructor(private router: Router){

  }

  ngOnInit(): void {
  }

  comprobarPregunta(){
    if (this.nombre == '' || this.preguntaSeguridad == '') {
      this.toastrService.error("Todos los datos deben ser obligatorios")
      return;
    }

    this.usuariosService.recuperarContra(this.nombre, this.preguntaSeguridad).subscribe((usuario: any) => {
      if (usuario) {
        this.existeUsuario = 1;
        console.log(usuario);
        this.router.navigate([`/recuperar-contraseña/${usuario[0].id}`]);
      }
      else{
        this.toastrService.error("El usuario o la pregunta no coinciden")
        return
      }
    })

    
  }

  mostrarContrasena() {
    this.passwordVisible = !this.passwordVisible;
  }
}
