import { Component, inject, OnInit } from '@angular/core';
import { LibrosService } from '../../services/libros.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { HeaderComponent } from "../header/header.component";
import { DataTablesModule } from 'angular-datatables';
import { Config } from 'datatables.net';
import { Subject } from 'rxjs';
import { FooterComponent } from "../footer/footer.component";
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-libros-gestion',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, HeaderComponent, DataTablesModule, FooterComponent],
  templateUrl: './libros-gestion.component.html',
  styleUrl: './libros-gestion.component.css'
})
export class LibrosGestionComponent implements OnInit{
  private librosService = inject(LibrosService);
  private toastrService = inject(ToastrService);
  libros: any[] = [];
  dtoptions: Config={};
  dttrigger: Subject<any>= new Subject<any>();

  constructor() {}

  ngOnInit() {
    this.dtoptions ={
      pagingType: "full",
      lengthMenu: [10,15,20,25],
      
    }
    this.librosService.getLibros().subscribe((libros: any) => {
      this.libros = libros;
      this.dttrigger.next(null);
    });
  }

  delete(id:any, index:any){
    Swal.fire({
      title: "¿Quieres eliminar el libro??",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Libro Eliminado!!",
          icon: "success"
        });
        this.librosService.deleteLibro(id).subscribe((res)=>{
          this.libros.splice(index,1)
        })
      }
    });
    
  }
}
