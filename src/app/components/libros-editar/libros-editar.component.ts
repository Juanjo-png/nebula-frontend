import { Component, inject, OnInit } from '@angular/core';
import { FormularioReactivoComponent } from "../formulario-reactivo/formulario-reactivo.component";
import { CommonModule } from '@angular/common';
import { libro } from '../../models/libro.model';
import { LibrosService } from '../../services/libros.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HeaderComponent } from "../header/header.component";
import { ToastrService } from 'ngx-toastr';
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-libros-editar',
  standalone: true,
  imports: [FormularioReactivoComponent, CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './libros-editar.component.html',
  styleUrl: './libros-editar.component.css'
})
export class LibrosEditarComponent implements OnInit{
  id!: any
  model!: libro;

  constructor(
    private librosService: LibrosService,
    private router: Router,
    private activatedRouter: ActivatedRoute
  ){}

  private toastrService = inject(ToastrService);


  ngOnInit(): void {
    this.id = this.activatedRouter.snapshot.paramMap.get("id")
    this.librosService.getLibroEditar(this.id).subscribe((res)=>{
      this.model = {
        id: res.id,
        titulo: res.titulo,
        categoria: res.categoria,
        etiqueta: res.etiqueta,
        precio: res.precio,
        ISBN: res.ISBN,
        formato: res.formato,
        paginas: res.paginas,
        color: res.color,
        autor: res.autor,
        sinopsis: res.sinopsis,
        serie: res.serie,
        portada: res.portada,
        fechaPublicacion: res.fechaPublicacion,
        avance: res.avance,
      }
    })
  }

  onSubmit(libro: libro) {   
    this.librosService.updateLibro(this.id, libro).subscribe({
      next: () => {
        this.router.navigateByUrl('/libros-gestion');
        this.toastrService.success("¡¡El libro ha sido editado con exito!!")
      },
      error: (error) => {
        console.log(error);
        this.toastrService.error("Algo ha ido mal...")
      },
    });
  }
}
