import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { libro } from '../../models/libro.model';
import { LibrosService } from '../../services/libros.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { EtiquetasService } from '../../services/etiquetas.service';
import { CategoriasService } from '../../services/categorias.service';
import { HeaderComponent } from "../header/header.component";
import { SeriesService } from '../../services/series.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-formulario-reactivo',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, HeaderComponent, RouterLink, RouterLinkActive],
  templateUrl: './formulario-reactivo.component.html',
  styleUrl: './formulario-reactivo.component.css'
})
export class FormularioReactivoComponent implements OnInit{
  etiquetas: any[] = [];
  categorias: any[] = [];
  series: any[] = [];
  selectedValue?: string;     

  constructor(
    private formBuilder: FormBuilder,
    private librosService: LibrosService,
    private etiquetasService: EtiquetasService,
    private categoriasService: CategoriasService,
    private seriesService: SeriesService,
    private router: Router,
  ){}

  private toastrService = inject(ToastrService);

  formLibros!: FormGroup;
  @Input()
  modelLibro!: libro;

  @Output()
  submitValues:EventEmitter<libro> = new EventEmitter<libro>()

  ngOnInit(): void {
    this.formLibros = this.formBuilder.group({
      titulo: ["", Validators.required],
      categoria: ["", Validators.required],
      etiqueta: ["", Validators.required],
      precio: ["", Validators.required],
      ISBN: ["", Validators.required],
      formato: ["", Validators.required],
      paginas: ["", Validators.required],
      color: ["", Validators.required],
      autor: ["", Validators.required],
      sinopsis: ["", Validators.required],
      serie: ["", Validators.required],
      portada: ["", Validators.required],
    });
  
    if (this.modelLibro !== undefined) {
      this.formLibros.patchValue(this.modelLibro);
    }

    console.log(this.formLibros);
  
    this.etiquetasService.getEtiquetas().subscribe((etiquetas: any) => {
      this.etiquetas = etiquetas;
      if (this.modelLibro && this.modelLibro.etiqueta) {
        this.formLibros.controls['etiqueta'].setValue(this.modelLibro.etiqueta);
      }
    });
  
    this.categoriasService.getCategorias().subscribe((categorias: any) => {
      this.categorias = categorias;
      if (this.modelLibro && this.modelLibro.categoria) {
        this.formLibros.controls['categoria'].setValue(this.modelLibro.categoria);
      }
    });

    this.seriesService.getTodasSeries().subscribe((series: any) => {
      this.series = series;
      if (this.modelLibro && this.modelLibro.serie) {
        this.formLibros.controls['serie'].setValue(this.modelLibro.serie);
      }
    });
  }

  onSubmit():void{
    this.submitValues.emit(this.formLibros.value)
  }

}
