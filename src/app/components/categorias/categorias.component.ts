import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { LibrosService } from '../../services/libros.service';
import { HeaderComponent } from '../header/header.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { CommonModule, ViewportScroller } from '@angular/common';
import { FooterComponent } from '../footer/footer.component';
import { CategoriasService } from '../../services/categorias.service';

@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [HeaderComponent, RouterLink, RouterLinkActive, NgxPaginationModule, CommonModule, FooterComponent],
  templateUrl: './categorias.component.html',
  styleUrl: './categorias.component.css'
})
export class CategoriasComponent  implements OnInit{
  libros: any[] = [];
  idLibro: string | null = null;
  categoria: string = "";
  categoriaID: number = 0;
  page: number = 1;

  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private librosService = inject(LibrosService);
  private categoriasService = inject(CategoriasService);
  private viewportScroller = inject(ViewportScroller)



  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      this.idLibro = paramMap.get('id');
      if (this.idLibro) {
        this.librosService.getLibrosPorCategoria(this.idLibro).subscribe((libros: any) => {
          this.libros = libros[0];
          console.log(libros);
        });
        this.categoriasService.getCategoria(this.idLibro).subscribe((categorias: any) => {
          this.categoria = categorias.nombre;
        });
      }
    });
  }

  onPageChange(page: number): void {
    this.page = page;
    this.viewportScroller.scrollToPosition([0, 0]);
  }
}
