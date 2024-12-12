import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { libro } from '../../models/libro.model';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { HeaderComponent } from "../header/header.component";
import { ToastrService } from 'ngx-toastr';
import { EnviosService } from '../../services/envios.service';
import { envio } from '../../models/envio.model';

@Component({
  selector: 'app-envios-formulario',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, HeaderComponent, RouterLink, RouterLinkActive],
  templateUrl: './envios-formulario.component.html',
  styleUrl: './envios-formulario.component.css'
})
export class EnviosFormularioComponent implements OnInit{
  selectedValue?: string;     

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
  ){}

  private enviosService = inject(EnviosService);
  private toastrService = inject(ToastrService);

  formEnvios!: FormGroup;
  @Input()
  modelEnvio!: envio;

  @Output()
  submitValues:EventEmitter<envio> = new EventEmitter<envio>()

  ngOnInit(): void {
    this.formEnvios = this.formBuilder.group({
      nombre: ["", Validators.required],
      comunidad: ["", Validators.required],
      provincia: ["", Validators.required],
      codigoPostal: ["", Validators.required],
      estado: ["", Validators.required],
      direccion: ["", Validators.required],
    });
  
    if (this.modelEnvio !== undefined) {
      this.formEnvios.patchValue(this.modelEnvio);
    }

    console.log(this.formEnvios);
  
    if (this.modelEnvio && this.modelEnvio.comunidad) {
      this.formEnvios.controls['comunidad'].setValue(this.modelEnvio.comunidad);
    }

    if (this.modelEnvio && this.modelEnvio.provincia) {
      this.formEnvios.controls['provincia'].setValue(this.modelEnvio.provincia);
    }

    if (this.modelEnvio && this.modelEnvio.estado) {
      this.formEnvios.controls['estado'].setValue(this.modelEnvio.estado);
    }
    
  }

  onSubmit():void{
    this.submitValues.emit(this.formEnvios.value)
  }

}
