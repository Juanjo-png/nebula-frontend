import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = new Router(); 
  const token = localStorage.getItem('token');

  if (token != undefined) {
    console.log("Acceso denegado");
    router.navigate(['/home']);
    return false;
  }

  return true;
};

