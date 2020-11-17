import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './pages/home/home.component';
import { CompaniesComponent } from './pages/companies/companies.component';
import { SigninComponent } from './pages/signin/signin.component';
import { ClientComponent } from './pages/login/client/client.component';
import { BusinessComponent } from './pages/login/business/business.component';
import { AdminComponent } from './pages/login/admin/admin.component';
import { ContactComponent } from './pages/contact/contact.component';
import { HelpComponent } from './pages/help/help.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FooterComponent } from './shared/components/footer/footer.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { MuestraEmpresasComponent } from './shared/components/muestra-empresas/muestra-empresas.component';
import { ListaEmpresasComponent } from './shared/components/lista-empresas/lista-empresas.component';
import { CommonLogoComponent } from './shared/components/common-logo/common-logo.component';
import { PlansComponent } from './pages/plans/plans.component';
import { PlanPaymentComponent } from './pages/plan-payment/plan-payment.component';
import { CommonLogoDarkComponent } from './shared/components/common-logo-dark/common-logo-dark.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CompaniesComponent,
    SigninComponent,
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
    CommonLogoDarkComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FontAwesomeModule,
    FormsModule,
  ],
  providers: [
    Title
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
