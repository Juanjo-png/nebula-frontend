import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { EnviosService } from '../../services/envios.service';
import { CommonModule } from '@angular/common';
import { envio } from '../../models/envio.model';
import { Config } from 'datatables.net';
import { Subject } from 'rxjs';
import { DataTablesModule } from 'angular-datatables';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-envios',
  standalone: true,
  imports: [HeaderComponent, CommonModule, DataTablesModule, RouterLink, RouterLinkActive, FooterComponent],
  templateUrl: './envios.component.html',
  styleUrl: './envios.component.css'
})
export class EnviosComponent implements OnInit{
  private enviosService = inject(EnviosService);
  envios: any[] = [];
  dtoptions: Config={};
  dttrigger: Subject<any>= new Subject<any>();

  constructor() {}

  ngOnInit() {
    this.dtoptions ={
      pagingType: "full",
      lengthMenu: [10,15,20,25]
      
    }
    this.enviosService.getEnvios().subscribe((envios: any) => {
      this.envios = envios;
      this.dttrigger.next(null);
      console.log(this.envios);
    });
  }

  cancelar(id:any, index:any){
    Swal.fire({
      title: "¿Quieres cancelar el envio?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#81689D",
      cancelButtonColor: "#dd6161",
      cancelButtonText: "No Cancelar",
      confirmButtonText: "Cancelar Envio"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "¡¡Envio Cancelado!!",
          icon: "success"
        });
        this.enviosService.cancelarEnvio(id).subscribe((res)=>{
          
        })
      }
    });
  }

  delete(id:any, index:any){
    Swal.fire({
      title: "¿Quieres eliminar el envio?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#81689D",
      cancelButtonColor: "#dd6161",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Eliminar"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "¡¡Envio Eliminado!!",
          icon: "success"
        });
        this.enviosService.deleteEnvio(id).subscribe((res)=>{
          this.envios.splice(index,1)
        })
      }
    });
  }

}
