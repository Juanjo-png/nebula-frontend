import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { LibrosService } from '../../services/libros.service';
import { HeaderComponent } from "../header/header.component";
import { NgxPaginationModule } from 'ngx-pagination';
import { CommonModule } from '@angular/common';
import { FooterComponent } from "../footer/footer.component";
import { SeriesService } from '../../services/series.service';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [HeaderComponent, RouterLink, RouterLinkActive, NgxPaginationModule, CommonModule, FooterComponent],
  templateUrl: './catalogo.component.html',
  styleUrl: './catalogo.component.css'
})
export class CatalogoComponent implements OnInit{
  constructor(private router: Router) {}
  private librosService = inject(LibrosService);
  private seriesService = inject(SeriesService)
  libros: any[] = [];
  page: number = 1;

  ngOnInit() {
    this.librosService.getLibros().subscribe((libros: any) => {
      this.libros = libros;
      console.log(this.libros);
    });
  }
}
