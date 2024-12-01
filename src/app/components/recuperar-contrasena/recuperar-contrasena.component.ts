import { Component, inject, Inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { usuario } from '../../models/usuario.model';
import { UsuariosService } from '../../services/usuarios.service';
import { FormularioUsuarioComponent } from '../formulario-usuario/formulario-usuario.component';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-recuperar-contrasena',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink, RouterLinkActive],
  templateUrl: './recuperar-contrasena.component.html',
  styleUrl: './recuperar-contrasena.component.css'
})
export class RecuperarContrasenaComponent implements OnInit {
  private toastrService = inject(ToastrService);
  formActualizar: FormGroup;
  usuarioId!: string;
  passwordVisible = false;

  mostrarContrasena() {
    this.passwordVisible = !this.passwordVisible;
  }

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuariosService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.formActualizar = this.fb.group({
      nuevaContraseña: ['', [Validators.required]],
      repetirContraseña: ['', [Validators.required,]],
    });
  }

  ngOnInit(): void {
    this.usuarioId = this.route.snapshot.paramMap.get('id') || '';
  }

  passwordsMatch(group: FormGroup): { [key: string]: boolean } | null {
    const contraseña = group.get('nuevaContraseña')?.value;
    const repetirContraseña = group.get('repetirContraseña')?.value;

    return contraseña === repetirContraseña ? null : { noMatch: true };
  }

  onSubmit(): void {
      const nuevaContraseña = this.formActualizar.get('nuevaContraseña')?.value;
      const repetirContraseña = this.formActualizar.get('repetirContraseña')?.value;

      if (nuevaContraseña != repetirContraseña) {
        this.toastrService.error('Las contraseñas no son iguales');
        return
      }

      let regexContra = /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{5,}$/
      if (!regexContra.test(nuevaContraseña)) {
        this.toastrService.error('La contraseña debe tener 6 carácteres, una mayuscula y un número');
        return
      }
  
      this.usuarioService.getUsuarioByID(this.usuarioId).subscribe({
        next: (usuario) => {
          const usuarioActualizado = {
            ...usuario, 
            contraseña: nuevaContraseña 
          };
  
          this.usuarioService.updateUsuarioContra(this.usuarioId, usuarioActualizado).subscribe({
            next: (response) => {
              this.toastrService.success('Contraseña actualizada correctamente.');
              this.router.navigate(['/usuarios']);
            },
            error: (err) => {
              console.error('Error al actualizar el usuario:', err);
              this.toastrService.error('Hubo un problema al actualizar la contraseña.');
            }
          });
        },
        error: (err) => {
          console.error('Error al obtener datos del usuario:', err);
          this.toastrService.error('No se pudo cargar la información del usuario.');
        }
      });
  }
}


