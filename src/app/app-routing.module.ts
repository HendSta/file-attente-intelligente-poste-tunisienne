import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SigninComponent } from './signin/signin.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ChefDashboardComponent } from './chef-dashboard/chef-dashboard.component';
import { AgentDashboardComponent } from './agent-dashboard/agent-dashboard.component';
import { ClientDashboardComponent } from './client-dashboard/client-dashboard.component';
import { CreeCompteComponent } from './cree-compte/cree-compte.component';
import { AuthGuard } from './guards/auth.guard';
import { MonCompteComponent } from './mon-compte/mon-compte.component';
import { ModifierCompteAdminComponent } from './modifier-compte-admin/modifier-compte-admin.component';
import { BureauPosteComponent } from './bureau-poste/bureau-poste.component';
import { ModifierBureauPosteComponent } from './modifier-bureau-poste/modifier-bureau-poste.component';
import { MoncompteChefComponent } from './moncompte-chef/moncompte-chef.component';
import { MoncompteClientComponent } from './moncompte-client/moncompte-client.component';
import { ModifiercompteClientComponent } from './modifiercompte-client/modifiercompte-client.component';
import { EmployesAdminComponent } from './employes-admin/employes-admin.component';
import { ModifierEmployeComponent } from './modifier-employe/modifier-employe.component';
import { AjouterEmployeComponent } from './ajouter-employe/ajouter-employe.component';
import { EmployesChefComponent } from './employes-chef/employes-chef.component';
import { PointagesComponent } from './pointages/pointages.component';
import { PrendreticketComponent } from './prendreticket/prendreticket.component';
import { StatistiquesComponent } from './statistiques/statistiques.component';
import { AfficheTicketComponent } from './affiche-ticket/affiche-ticket.component';
import { AppelClientComponent } from './appel-client/appel-client.component';
import { GuichetsComponent } from './guichets/guichets.component';
import { AjouterGuichetComponent } from './ajouter-guichet/ajouter-guichet.component';

const routes: Routes = [{path:'',component:HomeComponent},
  {path:'signin',component:SigninComponent},
  {
    path: 'admin',
    component: AdminDashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'moncompte', component: MonCompteComponent },
      { path: 'modifier-compte-admin', component: ModifierCompteAdminComponent },
      { path: 'bureauposte', component: BureauPosteComponent },
      { path: 'modifier-bureau-poste', component: ModifierBureauPosteComponent },
      { path: 'employes', component: EmployesAdminComponent },
      { path: 'guichets', component: GuichetsComponent },
      { path: 'pointages', component: PointagesComponent },
      { path: 'statistiques', component: StatistiquesComponent },
      { path: 'ajouter-employe', component: AjouterEmployeComponent },
      { path: 'ajouter-guichet', component: AjouterGuichetComponent },
      { path: 'modifier-employe/:cin', component: ModifierEmployeComponent },


      // Ajoutez d'autres routes ici
    ]
  },
  {
    path: 'chef',
    component: ChefDashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'moncompte-chef', component: MoncompteChefComponent },
      { path: 'employes-chef', component: EmployesChefComponent },
      { path: 'statistiques', component: StatistiquesComponent },
      // Ajoutez d'autres routes ici
    ]
  },
  {
    path: 'agent',
    component: AgentDashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'moncompte-chef', component: MoncompteChefComponent },
      { path: 'appelClient', component: AppelClientComponent },
      // Ajoutez d'autres routes ici
    ]
  },
  {
    path: 'client',
    component: ClientDashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'moncompte-client', component: MoncompteClientComponent },
      { path: 'modifiercompte-client', component: ModifiercompteClientComponent },
      { path: 'prendreticket', component: PrendreticketComponent },
      { path: 'affiche-ticket/:numTicket', component: AfficheTicketComponent },
      // Ajoutez d'autres routes ici
    ]
  },
  {path:'creerCompte',component:CreeCompteComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
