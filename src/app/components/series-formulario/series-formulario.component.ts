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
import { serie } from '../../models/serie.envio';

@Component({
  selector: 'app-series-formulario',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, HeaderComponent, RouterLink, RouterLinkActive],
  templateUrl: './series-formulario.component.html',
  styleUrl: './series-formulario.component.css'
})
export class SeriesFormularioComponent implements OnInit{
  etiquetas: any[] = [];
  categorias: any[] = [];
  series: any[] = [];
  selectedValue?: string;     

  constructor(
    private formBuilder: FormBuilder,
    private categoriasService: CategoriasService,
  ){}

  private toastrService = inject(ToastrService);

  formSeries!: FormGroup;
  @Input()
  modelSerie!: serie;

  @Output()
  submitValues:EventEmitter<serie> = new EventEmitter<serie>()

  ngOnInit(): void {
    this.formSeries = this.formBuilder.group({
      nombre: ["", Validators.required],
      categoria: ["", Validators.required],
      portada: ["", Validators.required],
    });
  
    if (this.modelSerie !== undefined) {
      this.formSeries.patchValue(this.modelSerie);
    }

    console.log(this.formSeries);
  
    this.categoriasService.getCategorias().subscribe((categorias: any) => {
      this.categorias = categorias;
      if (this.modelSerie && this.modelSerie.categoria) {
        this.formSeries.controls['categoria'].setValue(this.modelSerie.categoria);
      }
    });
  }

  onSubmit():void{
    this.submitValues.emit(this.formSeries.value)
  }
}
