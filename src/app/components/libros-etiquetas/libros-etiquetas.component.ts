import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { LibrosService } from '../../services/libros.service';
import { HeaderComponent } from '../header/header.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { CommonModule, ViewportScroller } from '@angular/common';
import { FooterComponent } from '../footer/footer.component';
import { EtiquetasService } from '../../services/etiquetas.service';

@Component({
  selector: 'app-libros-etiquetas',
  standalone: true,
  imports: [HeaderComponent, RouterLink, RouterLinkActive, NgxPaginationModule, CommonModule, FooterComponent],
  templateUrl: './libros-etiquetas.component.html',
  styleUrl: './libros-etiquetas.component.css'
})
export class LibrosEtiquetasComponent implements OnInit{
  libros: any[] = [];
  idEtiqueta: string | null = null;
  etiquetaNombre: string = "";
  etiquetaID: number = 0;
  page: number = 1;

  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private librosService = inject(LibrosService);
  private etiquetasService = inject(EtiquetasService);
  private viewportScroller = inject(ViewportScroller)

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      this.idEtiqueta = paramMap.get('id');
      if (this.idEtiqueta) {
        this.librosService.getLibrosPorEtiqueta(this.idEtiqueta).subscribe((libros: any) => {
          this.libros = libros[0];
          console.log(libros);
        });
        this.etiquetasService.getEtiqueta(this.idEtiqueta).subscribe((etiqueta: any) => {
          this.etiquetaNombre = etiqueta.nombre;
        });
      }
    });
  }

  onPageChange(page: number): void {
    this.page = page;
    this.viewportScroller.scrollToPosition([0, 0]);
  }
}
