import { Component, OnInit } from '@angular/core';
import { FormularioUsuarioComponent } from "../formulario-usuario/formulario-usuario.component";
import { usuario } from '../../models/usuario.model';
import { UsuariosService } from '../../services/usuarios.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-usuarios-editar',
  standalone: true,
  imports: [FormularioUsuarioComponent, CommonModule],
  templateUrl: './usuarios-editar.component.html',
  styleUrl: './usuarios-editar.component.css'
})
export class UsuariosEditarComponent implements OnInit{
  id!: any
  model!: usuario;

  constructor(
    private usuariosService: UsuariosService,
    private router: Router,
    private activatedRouter: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.id = this.activatedRouter.snapshot.paramMap.get("id")
    this.usuariosService.getUsuarioByID(this.id).subscribe((res)=>{
      this.model = {
        id: res.id,
        nombre: res.nombre,
        correo: res.correo,
        contraseña: res.contraseña,
        admin: res.admin,
        pregunta: res.pregunta
      }
    })
  }

  onSubmit(usuario: usuario) {   
    this.usuariosService.updateUsuario(this.id, usuario).subscribe({
      next: () => {
        this.router.navigateByUrl('/home');
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
