import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { NoticiasService } from '../../services/noticias.service';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-noticia',
  standalone: true,
  imports: [FooterComponent, HeaderComponent, RouterLink, RouterLinkActive],
  templateUrl: './noticia.component.html',
  styleUrl: './noticia.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class NoticiaComponent implements OnInit {
  private noticiasService = inject(NoticiasService);
  private route = inject(ActivatedRoute);

  noticia: any = {};  
  idNoticia: string | null = null;

  ngOnInit() {
    this.idNoticia = this.route.snapshot.paramMap.get('id');
    if (this.idNoticia) {
      this.noticiasService.getNoticia(this.idNoticia).subscribe((noticia: any) => {
        this.noticia = noticia;
        console.log(noticia);
      });
    }
  }
}
