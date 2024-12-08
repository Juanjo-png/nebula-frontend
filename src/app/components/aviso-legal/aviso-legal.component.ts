import { Component, inject, OnInit } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { HeaderComponent } from "../header/header.component";
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-aviso-legal',
  standalone: true,
  imports: [FooterComponent, HeaderComponent],
  templateUrl: './aviso-legal.component.html',
  styleUrl: './aviso-legal.component.css'
})
export class AvisoLegalComponent implements OnInit{
  private viewportScroller = inject(ViewportScroller)

  ngOnInit(): void {
    this.viewportScroller.scrollToPosition([0, 0]);
  }
}
