import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { HeaderComponent } from "../header/header.component";
import { CommonModule, ViewportScroller } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { FooterComponent } from '../footer/footer.component';
import { SeriesService } from '../../services/series.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-series',
  standalone: true,
  imports: [HeaderComponent, RouterLink, RouterLinkActive, NgxPaginationModule, CommonModule, FooterComponent, TranslateModule],
  templateUrl: './series.component.html',
  styleUrl: './series.component.css'
})
export class SeriesComponent implements OnInit{
  private seriesService = inject(SeriesService);
  private viewportScroller = inject(ViewportScroller);
  series: any[] = [];
  private route = inject(ActivatedRoute);
  idSerie: string | null = null;
  page: number = 1;
  noVolumenes: number = 0;
  categoria: string = "";

  constructor(private router: Router, private translate: TranslateService) {
    // Verificar si hay un idioma almacenado en localStorage
    const savedLanguage = localStorage.getItem('appLanguage');
    if (savedLanguage) {
      this.translate.use(savedLanguage); // Usa el idioma almacenado
    } else {
      this.translate.setDefaultLang('es'); // Configura un idioma predeterminado
      this.translate.use('es'); // Usa el idioma predeterminado
      localStorage.setItem('appLanguage', 'es'); // Guarda el idioma predeterminado
    }
  }

  ngOnInit() {
    this.viewportScroller.scrollToPosition([0, 0]);
    this.idSerie = this.route.snapshot.paramMap.get('id');
    if (this.idSerie != "0" && this.idSerie != null) {
      this.seriesService.getSeries(this.idSerie).subscribe((series: any) => {
        this.series = series;
        console.log(series);
        this.categoria = this.series[0].categoria;
        this.noVolumenes;
      });      
    }
    else{
      this.seriesService.getTodasSeries().subscribe((series: any) => {
        this.series = series;
        console.log(series);
        this.categoria = "Todas la series";
        this.noVolumenes;
      });   
    }
  }

  onPageChange(page: number): void {
    this.page = page;
    this.viewportScroller.scrollToPosition([0, 0]); // Desplaza al inicio de la página
  }

}
