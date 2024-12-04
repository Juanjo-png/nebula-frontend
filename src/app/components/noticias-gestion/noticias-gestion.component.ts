import { Component, inject, OnInit } from '@angular/core';
import { LibrosService } from '../../services/libros.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { HeaderComponent } from "../header/header.component";
import { DataTablesModule } from 'angular-datatables';
import { Config } from 'datatables.net';
import { Subject } from 'rxjs';
import { FooterComponent } from "../footer/footer.component";
import { ToastrService } from 'ngx-toastr';
import { NoticiasService } from '../../services/noticias.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-noticias-gestion',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, HeaderComponent, DataTablesModule, FooterComponent],
  templateUrl: './noticias-gestion.component.html',
  styleUrl: './noticias-gestion.component.css'
})
export class NoticiasGestionComponent implements OnInit{
  private noticiasService = inject(NoticiasService);
  private toastrService = inject(ToastrService);
  noticias: any[] = [];
  dtoptions: Config={};
  dttrigger: Subject<any>= new Subject<any>();

  constructor() {}

  ngOnInit() {
    this.dtoptions ={
      pagingType: "full",
      lengthMenu: [10,15,20,25],
      scrollX: true,
    }
    this.noticiasService.getNoticias().subscribe((noticias: any) => {
      this.noticias = noticias;
      this.dttrigger.next(null);
    });
  }

  delete(id:any, index:any){
    Swal.fire({
      title: "¿Quieres eliminar la noticia?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#81689D",
      cancelButtonColor: "#dd6161",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Eliminar"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "¡¡Noticia Eliminada!!",
          icon: "success"
        });
        this.noticiasService.deleteNoticia(id).subscribe((res)=>{
          this.noticias.splice(index,1)
          this.toastrService.success("Noticia eliminada con exito");
        })
      }
    });
    
  }
}
