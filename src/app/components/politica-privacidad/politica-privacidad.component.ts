import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-politica-privacidad',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './politica-privacidad.component.html',
  styleUrl: './politica-privacidad.component.css'
})
export class PoliticaPrivacidadComponent implements OnInit{
  private viewportScroller = inject(ViewportScroller)

  ngOnInit(): void {
    this.viewportScroller.scrollToPosition([0, 0]);
  }
}
