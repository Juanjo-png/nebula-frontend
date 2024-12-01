import { Component, AfterViewInit, inject, OnInit } from '@angular/core';
import { AdelantosService } from '../../services/adelantos.service';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { LightgalleryModule } from 'lightgallery/angular';
import lgZoom from 'lightgallery/plugins/zoom';
import { BeforeSlideDetail } from 'lightgallery/lg-events';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import lightGallery from 'lightgallery';

@Component({
  selector: 'app-adelanto',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, LightgalleryModule, CommonModule, FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './adelanto.component.html',
  styleUrl: './adelanto.component.css'
})
export class AdelantoComponent implements OnInit {
  private adelantosService = inject(AdelantosService);
  private route = inject(ActivatedRoute);
  paginas: any[] = [];
  idLibro: string | null = null;
  lightGalleryElement: any;

  ngOnInit() {
    this.idLibro = this.route.snapshot.paramMap.get('id');
    if (this.idLibro) {
      this.adelantosService.getAdelanto(this.idLibro).subscribe((paginas: any) => {
        this.paginas = paginas
        console.log(this.paginas);
      });
    }
  }

  settings = {
    counter: false,  // Desactiva el contador de imágenes
    plugins: [lgZoom],  // Agrega el plugin de zoom si lo necesitas
  };
  
  onBeforeSlide = (detail: BeforeSlideDetail): void => {
    const { index, prevIndex } = detail;
    console.log('Imagen actual:', index, 'Imagen anterior:', prevIndex);
  };  
}
