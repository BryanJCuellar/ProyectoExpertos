import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LayoutModule } from '@angular/cdk/layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
// Components
import { HomeComponent } from './pages/home/home.component';
import { CompaniesComponent } from './pages/companies/companies.component';
import { SigninComponent } from './pages/signin/signin.component';
import { LoginComponent } from './pages/login/login.component';
import { ClientComponent } from './pages/login/client/client.component';
import { BusinessComponent } from './pages/login/business/business.component';
import { AdminComponent } from './pages/login/admin/admin.component';
import { ContactComponent } from './pages/contact/contact.component';
import { HelpComponent } from './pages/help/help.component';
import { PlansComponent } from './pages/plans/plans.component';
import { PlanPaymentComponent } from './pages/plan-payment/plan-payment.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { BusinessHomeComponent } from './pages/business-home/business-home.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { MuestraEmpresasComponent } from './shared/components/muestra-empresas/muestra-empresas.component';
import { ListaEmpresasComponent } from './shared/components/lista-empresas/lista-empresas.component';
import { CommonLogoComponent } from './shared/components/common-logo/common-logo.component';
import { CommonLogoDarkComponent } from './shared/components/common-logo-dark/common-logo-dark.component';
// Modules
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// Services
import { AuthService } from './services/auth.service';
import { TokenInterceptorService } from './services/token-interceptor.service';
// Guards
import { AuthClientGuard } from './guards/auth-client.guard';
import { AuthBusinessGuard } from './guards/auth-business.guard';
import { AuthAdminGuard } from './guards/auth-admin.guard';
import { CheckLoginGuard } from './guards/check-login.guard';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CompaniesComponent,
    SigninComponent,
    LoginComponent,
    ClientComponent,
    BusinessComponent,
    AdminComponent,
    ContactComponent,
    HelpComponent,
    FooterComponent,
    HeaderComponent,
    NotFoundComponent,
    MuestraEmpresasComponent,
    ListaEmpresasComponent,
    CommonLogoComponent,
    PlansComponent,
    PlanPaymentComponent,
    CommonLogoDarkComponent,
    BusinessHomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    NgbModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    Title,
    AuthService,
    AuthClientGuard,
    AuthBusinessGuard,
    AuthAdminGuard,
    CheckLoginGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
