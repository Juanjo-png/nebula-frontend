import { CommonModule, ViewportScroller } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { CategoriasService } from '../../services/categorias.service';
import { LibrosService } from '../../services/libros.service';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { EtiquetasService } from '../../services/etiquetas.service';

@Component({
  selector: 'app-etiquetas-todas',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterLink, RouterLinkActive, CommonModule, NgxPaginationModule],
  templateUrl: './etiquetas-todas.component.html',
  styleUrl: './etiquetas-todas.component.css'
})
export class EtiquetasTodasComponent implements OnInit{
  etiquetas: any[] = [];
  page: number = 1;

  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private librosService = inject(LibrosService);
  private etiquetasService = inject(EtiquetasService);
  private viewportScroller = inject(ViewportScroller)



  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
        this.etiquetasService.getEtiquetas().subscribe((etiquetas: any) => {
          this.etiquetas = etiquetas;
        });
    });
  }

  onPageChange(page: number): void {
    this.page = page;
    this.viewportScroller.scrollToPosition([0, 0]);
  }
}
