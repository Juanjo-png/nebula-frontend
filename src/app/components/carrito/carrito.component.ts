import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { itemCarrito } from '../../models/itemCarrito';
import { CommonModule } from '@angular/common';
import { PagosService } from '../../services/pagos.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [HeaderComponent, CommonModule],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export class CarritoComponent implements OnInit {
  listaItemsCarrito: itemCarrito[] = [];
  private pagosService = inject(PagosService);
  private toastrService = inject(ToastrService);
  total: number = 0;
  noItems: number = 0;
  subtotal: number = 0;

  constructor(private router: Router){}


  ngOnInit(): void {
    const carritoStorage = localStorage.getItem("carrito");
    if (carritoStorage) {
      this.listaItemsCarrito = JSON.parse(carritoStorage);
      this.contarProductos();
      this.calcularTotal();
    }
  }

  generarOrdenPago() {
    try {
      const testData = {
        name: 'Test Order',
        amount: this.total,
      };

      this.pagosService.generateOrder(testData)
        .subscribe(({ data }) => {
          console.log("Solicitud realizada");
          console.log(data);
          this.router.navigate([`pagina-pagos/${data?.localizator}`])
        });

    } catch (e) {
      console.log("Algo fue mal");
    }
  }

  contarProductos() {
    this.noItems = this.listaItemsCarrito.length;
  }


  cambiarCantidad(index: number, cambio: number) {
    const item = this.listaItemsCarrito[index];
    item.cantidad += cambio;
    if (item.cantidad < 1) {
      item.cantidad = 1;
    }
    this.calcularTotal();
    localStorage.setItem("carrito", JSON.stringify(this.listaItemsCarrito));
  }

  calcularTotal() {
    this.total = this.listaItemsCarrito.reduce(
      (acc, item) => acc + item.cantidad * item.precio,
      0
    );
    this.total = parseFloat(this.total.toFixed(2))
  }

  eliminarProducto(index: number) {
    Swal.fire({
      title: "¿Quieres eliminar el producto del carrito?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#81689D",
      cancelButtonColor: "#dd6161",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Eliminar"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "¡¡Producto Eliminado!!",
          icon: "success"
        });
        this.listaItemsCarrito.splice(index, 1);
        this.calcularTotal();
        localStorage.setItem("carrito", JSON.stringify(this.listaItemsCarrito));
        this.contarProductos()
      }
    });
  }

  vaciarCarrito() {
    Swal.fire({
      title: "¿Quieres vaciar el carrito?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Vaciar Carrito"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "¡¡Carrito Vacio!!",
          icon: "success"
        });
        this.total = 0;
        this.listaItemsCarrito = [];
        localStorage.removeItem("carrito");
        this.contarProductos()
      }
    });
    
  }
}
