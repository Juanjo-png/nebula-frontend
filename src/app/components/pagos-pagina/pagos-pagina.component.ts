import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { PagosService } from '../../services/pagos.service';
import {environment} from "../../environments/environment";
import { EnviosService } from '../../services/envios.service';
import { envio } from '../../models/envio.model';
import { data, error } from 'jquery';
import { jwtDecode } from 'jwt-decode';
import { async } from 'rxjs';
import { UsuariosService } from '../../services/usuarios.service';
import { itemCarrito } from '../../models/itemCarrito';
import { FooterComponent } from "../footer/footer.component";
import Swal from 'sweetalert2';

declare global {
  interface Window {
    Stripe?: any;
  }
}

interface TokenData {
  idUsuario: any;
  nombreUsuario: string;
}



@Component({
  selector: 'app-pagos-pagina',
  standalone: true,
  imports: [HeaderComponent, ReactiveFormsModule, RouterLink, RouterLinkActive, FooterComponent],
  templateUrl: './pagos-pagina.component.html',
  styleUrl: './pagos-pagina.component.css'
})
export class PagosPaginaComponent implements OnInit{
  private readonly STRIPE!: any; //TODO: window.Stripe
  private elementStripe!: any;
  cardNumber: any;
  cardCvv: any;
  cardExp: any;
  direccion: string = "";
  form: FormGroup = new FormGroup({})
  id!: string;
  orderData!: any;
  private enviosService = inject(EnviosService);

  token = localStorage.getItem('token'); 
  public tokenData: TokenData | null = null; 
  public idUsuario: string = '';
  listaItemsCarrito: string = '';


  constructor(private fb: FormBuilder,
              private router: Router,
              private cd: ChangeDetectorRef,
              private pagosService: PagosService, private route: ActivatedRoute) {
    this.STRIPE = window.Stripe(environment.stripe_pk);
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    this.form = this.fb.group({
      amount: ['', [Validators.required, Validators.min(1), Validators.max(100000)]],
      direccion: ['', [Validators.required, Validators.minLength(5)]],
      codPostal: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
      comunidad: ['', [Validators.required]],
      provincia: ['', [Validators.required]],
      cardNumber: [false, [Validators.required, Validators.requiredTrue]],
      cardCvv: [false, [Validators.required, Validators.requiredTrue]],
      cardExp: [false, [Validators.required, Validators.requiredTrue]],
    });    

    if (this.token) {
      this.tokenData = jwtDecode<TokenData>(this.token); 
      this.idUsuario = this.tokenData.idUsuario[0].id;
    }

    const carritoStorage = localStorage.getItem("carrito");
    if (carritoStorage) {
      this.listaItemsCarrito = JSON.parse(carritoStorage);
    }

    this.loadDetail();
    this.createStripeElement();
}


  loadDetail(): void {
    this.pagosService.getOrderDetail(this.id).subscribe(({data}) => {
      this.orderData = data;
      if (data.status.includes('succe')) {
        this.form.disable()
      }
      this.form.patchValue({
        amount: data.amount
      })
    })
  }

  private createStripeElement = () => {
    const style = {
      base: {
        color: '#000000',
        fontWeight: 400,
        fontFamily: '\'Poppins\', sans-serif',
        fontSize: '20px',
        '::placeholder': {
          color: '#E3E2EC',
        },
      },
      invalid: {
        color: '#dc3545',
      },
    };

    //TODO: SDK de Stripe inicia la generacion de elementos
    this.elementStripe = this.STRIPE.elements({
      fonts: [
        {
          cssSrc:
            'https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400&display=swap',
        },
      ],
    });

    //TODO: SDK Construimos los inputs de tarjeta, cvc, fecha con estilos
    const cardNumber = this.elementStripe.create('cardNumber', {
      placeholder: '4242 4242 4242 4242',
      style,
      classes: {
        base: 'form-control'
      },
    });
    const cardExp = this.elementStripe.create('cardExpiry', {
      placeholder: 'MM/AA',
      style,
      classes: {
        base: 'form-control'
      },
    });
    const cardCvc = this.elementStripe.create('cardCvc', {
      placeholder: '000',
      style,
      classes: {
        base: 'form-control'
      },
    });

    //TODO: SDK Montamos los elementos en nuestros DIV identificados on el #id
    cardNumber.mount('#card');
    cardExp.mount('#exp');
    cardCvc.mount('#cvc');

    this.cardNumber = cardNumber;
    this.cardExp = cardExp;
    this.cardCvv = cardCvc;

    //TODO: Escuchamos los eventos del SDK
    this.cardNumber.addEventListener('change', this.onChangeCard.bind(this));
    this.cardExp.addEventListener('change', this.onChangeExp.bind(this));
    this.cardCvv.addEventListener('change', this.onChangeCvv.bind(this));

  }

  async initPay(): Promise<any> {
    try {
      // Validar que todos los campos estén completos
      const direccion = this.form.get("direccion")?.value;
      const codigoPostal = this.form.get("codPostal")?.value;
      const comunidad = this.form.get("comunidad")?.value;
      const provincia = this.form.get("provincia")?.value;
  
      if (!direccion || !codigoPostal || !comunidad || !provincia) {
        Swal.fire({
          icon: "error",
          title: "Datos incompletos",
          text: "Por favor, completa todos los campos requeridos antes de proceder con el pago.",
          showConfirmButton: true,
        });
        this.form.enable(); // Asegúrate de que el formulario permanezca editable
        return; // Detenemos el flujo de pago
      }
  
      // Desactivar el formulario mientras se realiza el pago
      this.form.disable();
  
      // Generar un token con Stripe
      const { token } = await this.STRIPE.createToken(this.cardNumber);
  
      // Enviar el token al backend
      const { data } = await this.pagosService.sendPayment(token.id, this.id);
  
      // Manejar el pago con el client_secret recibido
      this.STRIPE.handleCardPayment(data.client_secret)
        .then(async () => {
          Swal.fire({
            icon: "success",
            title: "¡Pago realizado con éxito!",
            showConfirmButton: false,
            timer: 1500,
          });
  
          // Confirmar la orden con Stripe
          await this.pagosService.confirmOrder(this.id);
  
          // Crear el envío
          const envio: envio = {
            nombre: this.generarSecuenciaAleatoria(),
            direccion: direccion,
            estado: "Empaquetando",
            productos: JSON.stringify(this.listaItemsCarrito),
            usuario: Number(this.idUsuario),
            codigoPostal: codigoPostal,
            comunidad: comunidad,
            provincia: provincia,
          };
  
          this.enviosService.crearEnvio(envio).subscribe({
            next: () => {
              localStorage.removeItem("carrito");
              this.router.navigate(['/home']);
            },
            error: (error) => {
              console.log(error);
            },
          });
        })
        .catch(() => {
          Swal.fire({
            icon: "error",
            title: "Error en el pago",
            text: "Hubo un problema con el pago. Por favor, inténtalo de nuevo.",
            showConfirmButton: true,
          });
          this.form.enable();
        });
    } catch (e) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Algo salió mal durante el proceso de pago. Por favor, inténtalo de nuevo.",
        showConfirmButton: true,
      });
      this.form.enable();
    }
  }
  

  onChangeCard({error}: any) {
    this.form.patchValue({cardNumber: !error});
  }

  onChangeCvv({error}: any) {
    this.form.patchValue({cardCvv: !error});
  }

  onChangeExp({error}: any) {
    this.form.patchValue({cardExp: !error});
  }

  generarSecuenciaAleatoria() {
    let secuencia = '';
    for (let i = 0; i < 10; i++) {
        secuencia += Math.floor(Math.random() * 10); // Genera un número aleatorio del 0 al 9
    }
    return secuencia;
}

}
