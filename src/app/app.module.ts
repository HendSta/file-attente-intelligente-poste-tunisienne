import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ChefDashboardComponent } from './chef-dashboard/chef-dashboard.component';
import { AgentDashboardComponent } from './agent-dashboard/agent-dashboard.component';
import { ClientDashboardComponent } from './client-dashboard/client-dashboard.component';
import { CreeCompteComponent } from './cree-compte/cree-compte.component';
import { AdminNavbarComponent } from './admin-navbar/admin-navbar.component';
import { MonCompteComponent } from './mon-compte/mon-compte.component';
import { ModifierCompteAdminComponent } from './modifier-compte-admin/modifier-compte-admin.component';
import { BureauPosteComponent } from './bureau-poste/bureau-poste.component';
import { ModifierBureauPosteComponent } from './modifier-bureau-poste/modifier-bureau-poste.component';
import { ChefNavbarComponent } from './chef-navbar/chef-navbar.component';
import { MoncompteChefComponent } from './moncompte-chef/moncompte-chef.component';
import { AgentNavbarComponent } from './agent-navbar/agent-navbar.component';
import { ClientNavbarComponent } from './client-navbar/client-navbar.component';
import { MoncompteClientComponent } from './moncompte-client/moncompte-client.component';
import { ModifiercompteClientComponent } from './modifiercompte-client/modifiercompte-client.component';
import { EmployesAdminComponent } from './employes-admin/employes-admin.component';
import { ModifierEmployeComponent } from './modifier-employe/modifier-employe.component';
import { AjouterEmployeComponent } from './ajouter-employe/ajouter-employe.component';
import { EmployesChefComponent } from './employes-chef/employes-chef.component';
import { PointagesComponent } from './pointages/pointages.component';
import { PrendreticketComponent } from './prendreticket/prendreticket.component';
import { StatistiquesComponent } from './statistiques/statistiques.component';
import { WelcomepageComponent } from './welcomepage/welcomepage.component';
import { AfficheTicketComponent } from './affiche-ticket/affiche-ticket.component';
import { AppelClientComponent } from './appel-client/appel-client.component';
import { GuichetsComponent } from './guichets/guichets.component';
import { AjouterGuichetComponent } from './ajouter-guichet/ajouter-guichet.component';

// Import des locales pour le support multilingue
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import localeAr from '@angular/common/locales/ar';

// Import du service de traduction
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';

import { NgChartsModule } from 'ng2-charts';


// Fonction pour charger les fichiers de traduction
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

// Enregistrement des locales pour le support multilingue
registerLocaleData(localeFr);
registerLocaleData(localeAr);



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    SigninComponent,
    AdminDashboardComponent,
    ChefDashboardComponent,
    AgentDashboardComponent,
    ClientDashboardComponent,
    CreeCompteComponent,
    AdminNavbarComponent,
    MonCompteComponent,
    ModifierCompteAdminComponent,
    BureauPosteComponent,
    ModifierBureauPosteComponent,
    ChefNavbarComponent,
    MoncompteChefComponent,
    AgentNavbarComponent,
    ClientNavbarComponent,
    MoncompteClientComponent,
    ModifiercompteClientComponent,
    EmployesAdminComponent,
    ModifierEmployeComponent,
    AjouterEmployeComponent,
    EmployesChefComponent,
    PointagesComponent,
    PrendreticketComponent,
    StatistiquesComponent,
    WelcomepageComponent,
    AfficheTicketComponent,
    AppelClientComponent,
    GuichetsComponent,
    AjouterGuichetComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgChartsModule,
    TranslateModule.forRoot({
      defaultLanguage: 'ar-SA', // Langue par défaut
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'fr' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
