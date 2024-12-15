import { ViewportScroller } from '@angular/common';
import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-acerca',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './acerca.component.html',
  styleUrl: './acerca.component.css'
})
export class AcercaComponent {
  private viewportScroller = inject(ViewportScroller)

  ngOnInit(): void {
    this.viewportScroller.scrollToPosition([0, 0]);
  }
}
