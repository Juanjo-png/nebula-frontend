import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { EnviosService } from '../../services/envios.service';
import { CommonModule } from '@angular/common';
import { Config } from 'datatables.net';
import { Subject } from 'rxjs';
import { DataTablesModule } from 'angular-datatables';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { envio } from '../../models/envio.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-envios',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CommonModule, DataTablesModule, RouterLink, RouterLinkActive],
  templateUrl: './user-envios.component.html',
  styleUrl: './user-envios.component.css'
})
export class UserEnviosComponent implements OnInit{
  private enviosService = inject(EnviosService);
  private route = inject(ActivatedRoute);
  envios: envio[] = [];
  idUsu: string | null = null;
  dtoptions: Config={};
  dttrigger: Subject<any>= new Subject<any>();

  constructor(private router: Router) {}

  ngOnInit() {
      this.dtoptions ={
        pagingType: "full",
        lengthMenu: [10,15,20,25],
        scrollX: true,
      }
      this.idUsu = this.route.snapshot.paramMap.get('id');
      if (this.idUsu) {
        this.enviosService.getEnvioPorUsuario(this.idUsu).subscribe((data: any) => {
          this.envios = data;
          console.log(this.envios);
        });
      }
    }

    delete(id:any, index:any){
      Swal.fire({
        title: "¿Quieres cancelar el envio?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Cancelar Envio"
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "¡¡Envio cancelado!!",
            text: "Tu envio ha sido cancelado con exito",
            icon: "success"
          });
          this.enviosService.cancelarEnvio(id).subscribe((res)=>{
            this.envios.splice(index,1)
          })
        }
      });
    }
  }
