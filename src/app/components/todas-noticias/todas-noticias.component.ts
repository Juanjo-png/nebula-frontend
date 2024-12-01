import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NoticiasService } from '../../services/noticias.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todas-noticias',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterLink, RouterLinkActive, NgxPaginationModule, CommonModule],
  templateUrl: './todas-noticias.component.html',
  styleUrl: './todas-noticias.component.css'
})
export class TodasNoticiasComponent implements OnInit{
  private noticiasService = inject(NoticiasService);
  noticias: any[] = [];
  page: number = 1;

  ngOnInit(): void {
    this.noticiasService.getNoticias().subscribe((noticias: any) => {
      this.noticias = noticias;
    });
  }
}
