import { EnviosFormularioComponent } from "../envios-formulario/envios-formulario.component";
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { HeaderComponent } from "../header/header.component";
import { ToastrService } from 'ngx-toastr';
import { FooterComponent } from "../footer/footer.component";
import { envio } from "../../models/envio.model";
import { EnviosService } from "../../services/envios.service";

@Component({
  selector: 'app-envios-editar',
  standalone: true,
  imports: [EnviosFormularioComponent, CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './envios-editar.component.html',
  styleUrl: './envios-editar.component.css'
})
export class EnviosEditarComponent implements OnInit{
  id!: any
  model!: envio;

  constructor(
    private enviosService: EnviosService,
    private router: Router,
    private activatedRouter: ActivatedRoute
  ){}

  private toastrService = inject(ToastrService);


  ngOnInit(): void {
    this.id = this.activatedRouter.snapshot.paramMap.get("id")
    this.enviosService.getEnvio(this.id).subscribe((res)=>{
      this.model = {
        id: res.id,
        nombre: res.nombre,
        direccion: res.direccion,
        comunidad: res.Comunidad,
        provincia: res.provincia,
        codigoPostal: res.codigoPostal,
        productos: res.productos,
        usuario: res.usuario,
        estado: res.estado,
      }
    })
  }

  onSubmit(envio: envio) {   
    this.enviosService.updateEnvio(this.id, envio).subscribe({
      next: () => {
        this.router.navigateByUrl('/envios');
        this.toastrService.success("¡¡El envio ha sido actualizado con exito!!")
      },
      error: (error) => {
        console.log(error);
        this.toastrService.error("Algo ha ido mal...")
      },
    });
  }
}
