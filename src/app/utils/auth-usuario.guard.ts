import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { jwtDecode } from "jwt-decode";

interface TokenData {
  idUsuario: any;
  nombreUsuario: string;
}

export const authUsuarioGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');
  const idUsuarioRuta = route.paramMap.get('id');

  if (!token) {
    console.log('Acceso denegado: No hay token');
    router.navigate(['/home']);
    return false;
  }

  try {
    const tokenData = jwtDecode<TokenData>(token);
    const idUsuarioToken =
    tokenData.idUsuario && tokenData.idUsuario[0]?.id ? tokenData.idUsuario[0].id.toString(): null // Asegúrate de que sea string para comparar con idUsuarioRuta: null;
    console.log(idUsuarioRuta+" : "+idUsuarioToken);

    if (idUsuarioRuta !== idUsuarioToken) {
      console.log('Acceso denegado: ID no coincide');
      router.navigate(['/home']);
      return false;
    }
  } catch (error) {
    console.error('Error al decodificar el token:', error);
    router.navigate(['/home']);
    return false;
  }

  return true;
};

