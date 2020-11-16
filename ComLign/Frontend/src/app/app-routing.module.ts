import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CompaniesComponent } from './pages/companies/companies.component';
import { SigninComponent } from './pages/signin/signin.component';
import { ClientComponent } from './pages/login/client/client.component';
import { BusinessComponent } from './pages/login/business/business.component';
import { AdminComponent } from './pages/login/admin/admin.component';
import { ContactComponent } from './pages/contact/contact.component';
import { HelpComponent } from './pages/help/help.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

const routes: Routes = [
  {path: '', component: HomeComponent, data: {title: 'ComLign'}},
  {path: 'home', component: HomeComponent, data: {title: 'ComLign - Inicio'}},
  {path: 'info-companies', component: CompaniesComponent, data: {title: 'ComLign - Empresas'}},
  {path: 'signin', component: SigninComponent, data: {title: 'ComLign - Registrarse '}},
  {path: 'login-client', component: ClientComponent, data: {title: 'ComLign - Iniciar Sesión'}},
  {path: 'login-business', component: BusinessComponent, data: {title: 'ComLign - Iniciar Sesión'}},
  {path: 'login-admin', component: AdminComponent, data: {title: 'ComLign - Iniciar Sesión'}},
  {path: 'contact', component: ContactComponent, data: {title: 'ComLign - Contáctanos'}},
  {path: 'help', component: HelpComponent, data: {title: 'ComLign - Centro de Ayuda'}},
  {path: '**', component: NotFoundComponent, data: {title: '404: Page Not Found -- ComLign'}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }