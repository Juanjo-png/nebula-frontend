import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { LibrosService } from '../../services/libros.service';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-buscar-libros',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, HeaderComponent, FooterComponent, NgxPaginationModule, CommonModule],
  templateUrl: './buscar-libros.component.html',
  styleUrl: './buscar-libros.component.css'
})
export class BuscarLibrosComponent implements OnInit{
  private librosService = inject(LibrosService);
  private route = inject(ActivatedRoute);

  libros: any[] = [];
  busqueda: string | null = null;
  page: number = 1;

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      this.busqueda = this.route.snapshot.paramMap.get('id');
    if (this.busqueda) {
      this.librosService.getBuscarLibros(this.busqueda).subscribe((libros: any) => {
        this.libros = libros;
        console.log(libros);
      });
    }
    })
    
  }
}
