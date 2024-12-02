import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { LibrosService } from '../../services/libros.service';
import { HeaderComponent } from "../header/header.component";
import { NgxPaginationModule } from 'ngx-pagination';
import { CommonModule } from '@angular/common';
import { FooterComponent } from "../footer/footer.component";
import { SeriesService } from '../../services/series.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [HeaderComponent, RouterLink, RouterLinkActive, NgxPaginationModule, CommonModule, FooterComponent, TranslateModule],
  templateUrl: './catalogo.component.html',
  styleUrl: './catalogo.component.css'
})
export class CatalogoComponent implements OnInit{

  constructor(private router: Router, private translate: TranslateService) {
    // Verificar si hay un idioma almacenado en localStorage
    const savedLanguage = localStorage.getItem('appLanguage');
    if (savedLanguage) {
      this.translate.use(savedLanguage); // Usa el idioma almacenado
    } else {
      this.translate.setDefaultLang('es'); // Configura un idioma predeterminado
      this.translate.use('es'); // Usa el idioma predeterminado
      localStorage.setItem('appLanguage', 'es'); // Guarda el idioma predeterminado
    }
  }
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
