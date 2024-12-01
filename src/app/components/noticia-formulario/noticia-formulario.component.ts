import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { EtiquetasService } from '../../services/etiquetas.service';
import { CategoriasService } from '../../services/categorias.service';
import { HeaderComponent } from "../header/header.component";
import { SeriesService } from '../../services/series.service';
import { ToastrService } from 'ngx-toastr';
import { NoticiasService } from '../../services/noticias.service';
import { noticia } from '../../models/noticia';

@Component({
  selector: 'app-noticia-formulario',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, HeaderComponent, RouterLink, RouterLinkActive],
  templateUrl: './noticia-formulario.component.html',
  styleUrl: './noticia-formulario.component.css'
})
export class NoticiaFormularioComponent implements OnInit{

  constructor(
    private formBuilder: FormBuilder,
    private noticiasService: NoticiasService,
    private router: Router,
  ){}

  private toastrService = inject(ToastrService);

  formNoticias!: FormGroup;
  @Input()
  modelNoticia!: noticia;

  @Output()
  submitValues:EventEmitter<noticia> = new EventEmitter<noticia>()

  ngOnInit(): void {
    this.formNoticias = this.formBuilder.group({
      titulo: ["", Validators.required],
      contenido: ["", Validators.required],
      autor: ["", Validators.required],
      miniatura: ["", Validators.required],
      extracto: ["", Validators.required],
    });
  
    if (this.modelNoticia !== undefined) {
      this.formNoticias.patchValue(this.modelNoticia);
    }

    console.log(this.formNoticias);
  }

  onSubmit():void{
    this.submitValues.emit(this.formNoticias.value)
  }
}
