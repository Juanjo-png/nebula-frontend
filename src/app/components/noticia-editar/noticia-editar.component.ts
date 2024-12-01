import { Component, inject, OnInit } from '@angular/core';
import { FormularioReactivoComponent } from "../formulario-reactivo/formulario-reactivo.component";
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { HeaderComponent } from "../header/header.component";
import { ToastrService } from 'ngx-toastr';
import { FooterComponent } from "../footer/footer.component";
import { noticia } from '../../models/noticia';
import { NoticiasService } from '../../services/noticias.service';
import { NoticiaFormularioComponent } from "../noticia-formulario/noticia-formulario.component";

@Component({
  selector: 'app-noticia-editar',
  standalone: true,
  imports: [FormularioReactivoComponent, CommonModule, HeaderComponent, FooterComponent, NoticiaFormularioComponent],
  templateUrl: './noticia-editar.component.html',
  styleUrl: './noticia-editar.component.css'
})
export class NoticiaEditarComponent implements OnInit{
  id!: any
  model!: noticia;

  constructor(
    private noticiasService: NoticiasService,
    private router: Router,
    private activatedRouter: ActivatedRoute
  ){}

  private toastrService = inject(ToastrService);


  ngOnInit(): void {
    this.id = this.activatedRouter.snapshot.paramMap.get("id")
    this.noticiasService.getNoticia(this.id).subscribe((res)=>{
      this.model = {
        id: res.id,
        titulo: res.titulo,
        contenido: res.contenido,
        fecha: res.fecha,
        autor: res.autor,
        extracto: res.extracto,
        miniatura: res.miniatura,
      }
    })
  }

  onSubmit(noticia: noticia) {   
    this.noticiasService.updateNoticia(this.id, noticia).subscribe({
      next: () => {
        this.router.navigateByUrl('/noticias-gestion');
        this.toastrService.success("¡¡La noticia ha sido actualizada con exito!!")
      },
      error: (error) => {
        console.log(error);
        this.toastrService.error("Algo ha ido mal...")
      },
    });
  }
}

