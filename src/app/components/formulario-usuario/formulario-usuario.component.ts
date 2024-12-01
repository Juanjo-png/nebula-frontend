import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-formulario-usuario',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './formulario-usuario.component.html',
  styleUrl: './formulario-usuario.component.css'
})
export class FormularioUsuarioComponent implements OnInit{
  idUsuario: string | null = null;
  private route = inject(ActivatedRoute);

  constructor(
    private formBuilder: FormBuilder,
    private usuariosService: UsuariosService,
    private router: Router,
  ){}

  formUsuarios!: FormGroup;
  @Input()
  modelUsuario!: usuario;

  @Output()
  submitValues:EventEmitter<usuario> = new EventEmitter<usuario>()

  ngOnInit(): void {
    this.idUsuario = this.route.snapshot.paramMap.get('id');
    this.formUsuarios = this.formBuilder.group({
      nombre:["",Validators.required],
      correo:[""],
    })
    if(this.modelUsuario !== undefined){
      this.formUsuarios.patchValue(this.modelUsuario)
    }
  }

  onSubmit():void{
    this.submitValues.emit(this.formUsuarios.value)
  }
}
