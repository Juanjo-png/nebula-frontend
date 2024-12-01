import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { EnviosService } from '../../services/envios.service';
import { CommonModule } from '@angular/common';
import { envio } from '../../models/envio.model';
import { Config } from 'datatables.net';
import { Subject } from 'rxjs';
import { DataTablesModule } from 'angular-datatables';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-envio-productos',
  standalone: true,
  imports: [HeaderComponent, CommonModule, DataTablesModule, RouterLink, RouterLinkActive, FooterComponent],
  templateUrl: './envio-productos.component.html',
  styleUrl: './envio-productos.component.css'
})
export class EnvioProductosComponent implements OnInit{
  libros: any[] = [];
  private enviosService = inject(EnviosService);
  private route = inject(ActivatedRoute);
  idEnvio: string | null = null;
  dtoptions: Config={};
  dttrigger: Subject<any>= new Subject<any>();


  constructor() {}

  ngOnInit(): void {
    this.dtoptions ={
      pagingType: "full",
      lengthMenu: [10,15,20,25],
      scrollX: true,
    }
    this.idEnvio = this.route.snapshot.paramMap.get('id');
    if (this.idEnvio) {
      this.enviosService.getEnvio(this.idEnvio).subscribe((envio: any) => {
        this.libros = JSON.parse(envio.productos)
        console.log(this.libros);
      });
    }
  }


}
