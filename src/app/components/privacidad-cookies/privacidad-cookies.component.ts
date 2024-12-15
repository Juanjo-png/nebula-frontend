import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-privacidad-cookies',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './privacidad-cookies.component.html',
  styleUrl: './privacidad-cookies.component.css'
})
export class PrivacidadCookiesComponent {
  private viewportScroller = inject(ViewportScroller)

  ngOnInit(): void {
    this.viewportScroller.scrollToPosition([0, 0]);
  }
}
