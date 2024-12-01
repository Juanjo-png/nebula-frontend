import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { LibrosService } from '../../services/libros.service';
import { HeaderComponent } from "../header/header.component";
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-serie',
  standalone: true,
  imports: [HeaderComponent, RouterLink, RouterLinkActive, NgxPaginationModule, CommonModule, FooterComponent],
  templateUrl: './serie.component.html',
  styleUrl: './serie.component.css'
})
export class SerieComponent implements OnInit{
  constructor(private router: Router) {}
  private librosService = inject(LibrosService);
  libros: any[] = [];
  private route = inject(ActivatedRoute);
  idLibro: string | null = null;
  page: number = 1;
  id_Categoria: string = "";
  nombreSerie: string = "";
  nombreCategoria: string = "";

  ngOnInit() {
    this.idLibro = this.route.snapshot.paramMap.get('id');
    if (this.idLibro) {
      this.librosService.getLibrosPorSerie(this.idLibro).subscribe((libros: any) => {
        this.libros = libros[0];
        console.log(libros);
      });
      this.librosService.getSerie(this.idLibro).subscribe((serie: any) => {
        this.id_Categoria = serie[0][0].id_Categoria
        this.nombreSerie = serie[0][0].nombre;
        this.nombreCategoria = serie[0][0].categoria;
      });
    }
  }
}
