import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NoticiasService } from '../../services/noticias.service';
import { ViewportScroller } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-noticias',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterLink, RouterLinkActive, TranslateModule],
  templateUrl: './noticias.component.html',
  styleUrl: './noticias.component.css'
})
export class NoticiasComponent implements OnInit{
  private noticiasService = inject(NoticiasService);
  noticias: any[] = [];
  private viewportScroller = inject(ViewportScroller)

  constructor(private translate: TranslateService) {
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

  ngOnInit(): void {
    this.viewportScroller.scrollToPosition([0, 0]);
    this.noticiasService.getNoticias().subscribe((noticias: any) => {
      this.noticias = noticias;
      console.log(this.noticias);
    });
  }
}
