import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-formas-pago',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './formas-pago.component.html',
  styleUrl: './formas-pago.component.css'
})
export class FormasPagoComponent {

}
