import { Routes } from '@angular/router';

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
        loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent)
    },
    {
        path: 'register',
        loadComponent: () => import('./components/register/register.component').then(m => m.RegisterComponent)
    },
    {
        path: 'userInfo',
        loadComponent: () => import('./components/user-page/user-page.component').then(m => m.UserPageComponent)
    },
    {
        path: 'libros-gestion',
        loadComponent: () => import('./components/libros-gestion/libros-gestion.component').then(m => m.LibrosGestionComponent)
    },
    {
        path: 'libros-crear',
        loadComponent: () => import('./components/libros-crear/libros-crear.component').then(m => m.LibrosCrearComponent)
    },
    {
        path: 'libros-editar/:id',
        loadComponent: () => import('./components/libros-editar/libros-editar.component').then(m => m.LibrosEditarComponent)
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
        loadComponent: () => import('./components/usuarios-editar/usuarios-editar.component').then(m => m.UsuariosEditarComponent)
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
        loadComponent: () => import('./components/envios/envios.component').then(m => m.EnviosComponent)
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
        loadComponent: () => import('./components/contrasena-olvidada/contrasena-olvidada.component').then(m => m.ContrasenaOlvidadaComponent)
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
        loadComponent: () => import('./components/user-info/user-info.component').then(m => m.UserInfoComponent)
    },
    {
        path: 'enviosUsuario/:id',
        loadComponent: () => import('./components/user-envios/user-envios.component').then(m => m.UserEnviosComponent)
    },
    {
        path: 'noticias-gestion',
        loadComponent: () => import('./components/noticias-gestion/noticias-gestion.component').then(m => m.NoticiasGestionComponent)
    },
    {
        path: 'noticia-crear',
        loadComponent: () => import('./components/noticia-crear/noticia-crear.component').then(m => m.NoticiaCrearComponent)
    },
    {
        path: 'noticia-editar/:id',
        loadComponent: () => import('./components/noticia-editar/noticia-editar.component').then(m => m.NoticiaEditarComponent)
    },
    {
        path: 'formas-pago',
        loadComponent: () => import('./components/formas-pago/formas-pago.component').then(m => m.FormasPagoComponent)
    },
    {
        path: 'envio-editar/:id',
        loadComponent: () => import('./components/envios-editar/envios-editar.component').then(m => m.EnviosEditarComponent)
    },
    {
        path: 'etiquetas/:id',
        loadComponent: () => import('./components/libros-etiquetas/libros-etiquetas.component').then(m => m.LibrosEtiquetasComponent)
    },
    {
        path:'',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path:'**',
        redirectTo: '/home',
        pathMatch: 'full'
     },
];
