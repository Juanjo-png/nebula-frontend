import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { jwtDecode } from "jwt-decode";


interface TokenData {
  idUsuario: any;
  nombreUsuario: string;
  admin: any;
}


export const authAdminGuard: CanActivateFn = (route, state) => {
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
    console.log('Token Decodificado:', tokenData);

    // Obtener el ID del token
    const idUsuarioToken = tokenData.idUsuario?.[0]?.id?.toString() || null;
    console.log('ID Usuario Token:', idUsuarioToken);

    // Obtener el rol de admin del token
    const isAdmin = tokenData.admin?.[0]?.admin ?? null;
    console.log('Admin:', isAdmin);

    // Validar rol de administrador
    if (isAdmin !== 1) {
      console.log('Acceso denegado: No es administrador');
      router.navigate(['/home']);
      return false;
    }

    // Todo está bien
    console.log('Acceso concedido');
    return true;
  } catch (error) {
    console.error('Error al decodificar el token:', error);
    router.navigate(['/home']);
    return false;
  }

  return true;
};
