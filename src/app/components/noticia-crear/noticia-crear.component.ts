import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { ToastrService } from 'ngx-toastr';
import { noticia } from '../../models/noticia';
import { NoticiasService } from '../../services/noticias.service';
import { NoticiaFormularioComponent } from "../noticia-formulario/noticia-formulario.component";

@Component({
  selector: 'app-noticia-crear',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, NoticiaFormularioComponent],
  templateUrl: './noticia-crear.component.html',
  styleUrl: './noticia-crear.component.css'
})
export class NoticiaCrearComponent{
  constructor(
    private noticiasService: NoticiasService,
    private router: Router
  ){
    
  }

  private toastrService = inject(ToastrService);

  onSubmit(noticia: noticia) {
    const fechaActual = new Date();
    const formatoFecha = fechaActual.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    noticia.fecha = formatoFecha; // Asigna la fecha con el formato deseado

  console.log('Noticia enviada con fecha:', noticia);
    console.log('Noticia enviada con fecha:', noticia);
    this.noticiasService.crearNoticia(noticia).subscribe({
      next: () => {
        this.router.navigateByUrl("/noticias-gestion");
        this.toastrService.success("¡¡La noticia ha sido creada con éxito!!");
      },
      error: (error) => {
        console.error('Error al crear la noticia:', error);
        this.toastrService.error("Algo ha ido mal...");
      }
    });
  }
  
}
