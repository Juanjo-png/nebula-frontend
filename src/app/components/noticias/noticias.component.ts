import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NoticiasService } from '../../services/noticias.service';

@Component({
  selector: 'app-noticias',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterLink, RouterLinkActive],
  templateUrl: './noticias.component.html',
  styleUrl: './noticias.component.css'
})
export class NoticiasComponent implements OnInit{
  private noticiasService = inject(NoticiasService);
  noticias: any[] = [];


  ngOnInit(): void {
    this.noticiasService.getNoticias().subscribe((noticias: any) => {
      this.noticias = noticias;
      console.log(this.noticias);
    });
  }
}
