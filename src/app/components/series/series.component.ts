import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { HeaderComponent } from "../header/header.component";
import { CommonModule, ViewportScroller } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { FooterComponent } from '../footer/footer.component';
import { SeriesService } from '../../services/series.service';

@Component({
  selector: 'app-series',
  standalone: true,
  imports: [HeaderComponent, RouterLink, RouterLinkActive, NgxPaginationModule, CommonModule, FooterComponent],
  templateUrl: './series.component.html',
  styleUrl: './series.component.css'
})
export class SeriesComponent implements OnInit{
  constructor(private router: Router) {}
  private seriesService = inject(SeriesService);
  private viewportScroller = inject(ViewportScroller);
  series: any[] = [];
  private route = inject(ActivatedRoute);
  idSerie: string | null = null;
  page: number = 1;
  noVolumenes: number = 0;
  categoria: string = "";

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
