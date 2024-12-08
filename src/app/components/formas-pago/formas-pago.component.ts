import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-formas-pago',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './formas-pago.component.html',
  styleUrl: './formas-pago.component.css'
})
export class FormasPagoComponent implements OnInit{
  private viewportScroller = inject(ViewportScroller)

  ngOnInit(): void {
    this.viewportScroller.scrollToPosition([0, 0]);
  }
}
