import { Component, inject } from '@angular/core';
import { libro } from '../../models/libro.model';
import { Router } from '@angular/router';
import { LibrosService } from '../../services/libros.service';
import { FormularioReactivoComponent } from '../formulario-reactivo/formulario-reactivo.component';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-libros-crear',
  standalone: true,
  imports: [FormularioReactivoComponent, HeaderComponent, FooterComponent],
  templateUrl: './libros-crear.component.html',
  styleUrl: './libros-crear.component.css'
})
export class LibrosCrearComponent {
  constructor(
    private librosService: LibrosService,
    private router: Router
  ){
    
  }

  private toastrService = inject(ToastrService);

  onSubmit(libro:libro){
    console.log(libro);
    this.librosService.crearLibro(libro).subscribe({
      next:()=>{
        this.router.navigateByUrl("/libros-gestion");
        this.toastrService.success("¡¡El libro ha sido creado con exito!!")
      },
      error: (error) =>{
        console.log(error);
        this.toastrService.error("Algo ha ido mal...")
      }
    })
  }
}
