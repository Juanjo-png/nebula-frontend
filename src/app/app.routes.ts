import { Routes } from '@angular/router';
import { CanActivate, Router } from '@angular/router';
import { authGuard } from './utils/auth.guard';
import { authUsuarioGuard } from './utils/auth-usuario.guard';
import { authAdminGuard } from './utils/auth-admin.guard';

export const routes: Routes = [
    {
        path: 'home',
        loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent)
    },
    {
        path: 'libros/:id',
        loadComponent: () => import('./components/product-page/product-page.component').then(m => m.ProductPageComponent)
    },
    {
        path: 'login',
        loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent), canActivate:[authGuard]
    },
    {
        path: 'register',
        loadComponent: () => import('./components/register/register.component').then(m => m.RegisterComponent), canActivate:[authGuard]
    },
    {
        path: 'userInfo',
        loadComponent: () => import('./components/user-page/user-page.component').then(m => m.UserPageComponent)
    },
    {
        path: 'libros-gestion',
        loadComponent: () => import('./components/libros-gestion/libros-gestion.component').then(m => m.LibrosGestionComponent), canActivate:[authAdminGuard]
    },
    {
        path: 'libros-crear',
        loadComponent: () => import('./components/libros-crear/libros-crear.component').then(m => m.LibrosCrearComponent), canActivate:[authAdminGuard]
    },
    {
        path: 'libros-editar/:id',
        loadComponent: () => import('./components/libros-editar/libros-editar.component').then(m => m.LibrosEditarComponent), canActivate:[authAdminGuard]
    },
    {
        path: 'catalogo',
        loadComponent: () => import('./components/catalogo/catalogo.component').then(m => m.CatalogoComponent)
    },
    {
        path: 'serie/:id',
        loadComponent: () => import('./components/serie/serie.component').then(m => m.SerieComponent)
    },
    {
        path: 'categoria/:id',
        loadComponent: () => import('./components/categorias/categorias.component').then(m => m.CategoriasComponent)
    },
    {
        path: 'novedades/:id',
        loadComponent: () => import('./components/novedades/novedades.component').then(m => m.NovedadesComponent)
    },
    {
        path: 'carrito',
        loadComponent: () => import('./components/carrito/carrito.component').then(m => m.CarritoComponent)
    },
    {
        path: 'usuario-editar/:id',
        loadComponent: () => import('./components/usuarios-editar/usuarios-editar.component').then(m => m.UsuariosEditarComponent), canActivate:[authUsuarioGuard]
    },
    {
        path: 'pagina-pagos/:id',
        loadComponent: () => import('./components/pagos-pagina/pagos-pagina.component').then(m => m.PagosPaginaComponent)
    },
    {
        path: 'aviso-legal',
        loadComponent: () => import('./components/aviso-legal/aviso-legal.component').then(m => m.AvisoLegalComponent)
    },
    {
        path: 'politica-privacidad',
        loadComponent: () => import('./components/politica-privacidad/politica-privacidad.component').then(m => m.PoliticaPrivacidadComponent)
    },
    {
        path: 'series/:id',
        loadComponent: () => import('./components/series/series.component').then(m => m.SeriesComponent)
    },
    {
        path: 'envios',
        loadComponent: () => import('./components/envios/envios.component').then(m => m.EnviosComponent), canActivate:[authAdminGuard]
    },
    {
        path: 'envios/:id',
        loadComponent: () => import('./components/envio-productos/envio-productos.component').then(m => m.EnvioProductosComponent)
    },
    {
        path: 'adelanto/:id',
        loadComponent: () => import('./components/adelanto/adelanto.component').then(m => m.AdelantoComponent)
    },
    {
        path: 'contraseña-olvidada',
        loadComponent: () => import('./components/contrasena-olvidada/contrasena-olvidada.component').then(m => m.ContrasenaOlvidadaComponent), canActivate:[authGuard]
    },
    {
        path: 'recuperar-contraseña/:id',
        loadComponent: () => import('./components/recuperar-contrasena/recuperar-contrasena.component').then(m => m.RecuperarContrasenaComponent)
    },
    {
        path: 'buscar/:id',
        loadComponent: () => import('./components/buscar-libros/buscar-libros.component').then(m => m.BuscarLibrosComponent)
    },
    {
        path: 'noticias',
        loadComponent: () => import('./components/noticias/noticias.component').then(m => m.NoticiasComponent)
    },
    {
        path: 'noticias/:id',
        loadComponent: () => import('./components/noticia/noticia.component').then(m => m.NoticiaComponent)
    },
    {
        path: 'noticiasTodas',
        loadComponent: () => import('./components/todas-noticias/todas-noticias.component').then(m => m.TodasNoticiasComponent)
    },
    {
        path: 'userInfo/:id',
        loadComponent: () => import('./components/user-info/user-info.component').then(m => m.UserInfoComponent), canActivate:[authUsuarioGuard]
    },
    {
        path: 'enviosUsuario/:id',
        loadComponent: () => import('./components/user-envios/user-envios.component').then(m => m.UserEnviosComponent), canActivate:[authUsuarioGuard]
    },
    {
        path: 'noticias-gestion',
        loadComponent: () => import('./components/noticias-gestion/noticias-gestion.component').then(m => m.NoticiasGestionComponent), canActivate:[authAdminGuard]
    },
    {
        path: 'noticia-crear',
        loadComponent: () => import('./components/noticia-crear/noticia-crear.component').then(m => m.NoticiaCrearComponent), canActivate:[authAdminGuard]
    },
    {
        path: 'noticia-editar/:id',
        loadComponent: () => import('./components/noticia-editar/noticia-editar.component').then(m => m.NoticiaEditarComponent), canActivate:[authAdminGuard]
    },
    {
        path: 'formas-pago',
        loadComponent: () => import('./components/formas-pago/formas-pago.component').then(m => m.FormasPagoComponent)
    },
    {
        path: 'envio-editar/:id',
        loadComponent: () => import('./components/envios-editar/envios-editar.component').then(m => m.EnviosEditarComponent), canActivate:[authAdminGuard]
    },
    {
        path: 'etiquetas/:id',
        loadComponent: () => import('./components/libros-etiquetas/libros-etiquetas.component').then(m => m.LibrosEtiquetasComponent)
    },
    {
        path: 'etiquetas-todas',
        loadComponent: () => import('./components/etiquetas-todas/etiquetas-todas.component').then(m => m.EtiquetasTodasComponent)
    },
    {
        path: 'acerca',
        loadComponent: () => import('./components/acerca/acerca.component').then(m => m.AcercaComponent)
    },
    {
        path: 'cookies',
        loadComponent: () => import('./components/privacidad-cookies/privacidad-cookies.component').then(m => m.PrivacidadCookiesComponent)
    },
    {
        path: 'error',
        loadComponent: () => import('./components/error404/error404.component').then(m => m.Error404Component)
    },
    {
        path:'',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path:'**',
        redirectTo: '/error',
        pathMatch: 'full'
     },
];
