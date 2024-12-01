import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { LibrosService } from '../../services/libros.service';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from "../footer/footer.component";
import { CategoriasService } from '../../services/categorias.service';

@Component({
  selector: 'app-novedades',
  standalone: true,
  imports: [HeaderComponent, RouterLink, RouterLinkActive, FooterComponent],
  templateUrl: './novedades.component.html',
  styleUrl: './novedades.component.css'
})
export class NovedadesComponent implements OnInit{
  libros: any[] = [];
  idLibro: string | null = null;
  categoria: string = "";
  page: number = 1;

  primero: any[] = [];
  segundo: any[] = [];
  tercero: any[] = [];
  primerMes: string = "10";
  segundoMes: string = "11";
  tercerMes: string = "12";
  año: string = "2024"

  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private librosService = inject(LibrosService);
  private categoriasService = inject(CategoriasService);


  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      this.idLibro = paramMap.get('id');
      if (this.idLibro) {
        this.librosService.getLibrosNovedades(this.idLibro).subscribe((libros: any) => {
          this.libros = libros[0];
          this.primero = [];
          this.segundo = [];
          this.tercero = [];
  
          // Recorremos los libros para clasificarlos
          for (let i = 0; i < this.libros.length; i++) {
            const libro = this.libros[i];
            const fechaPublicacion = libro.fechaPublicacion; // "2024-11-25 19:33:53"
  
            // Extraemos año y mes del formato de fecha
            const regex = /^(\d{4})-(\d{2})/; // Captura "2024" y "11" del inicio de la cadena
            const match = fechaPublicacion.match(regex);
  
            if (match) {
              const año = match[1]; // "2024"
              const mes = match[2]; // "11"
  
              if (año === this.año) {
                if (mes === this.primerMes) {
                  this.primero.push(libro);
                } else if (mes === this.segundoMes) {
                  this.segundo.push(libro);
                } else if (mes === this.tercerMes) {
                  this.tercero.push(libro);
                }
              }
            }
          }
          this.primero.splice(4);
          this.segundo.splice(4)
          this.tercero.splice(4)
        });
  
        this.categoriasService.getCategoria(this.idLibro).subscribe((categorias: any) => {
          this.categoria = categorias.nombre;
        });
      }
    });
  }
 
}
