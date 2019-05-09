import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { DettaglioVerificheComponent } from './dettaglio-verifiche/dettaglio-verifiche.component';
import { ProfiloComponent } from './profilo/profilo.component';
import { VerificheComponent} from './verifiche/verifiche.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'welcome/qualifiche', 
    component: WelcomePageComponent,
      children: [
        {path: '', redirectTo: 'welcome/qualifiche', pathMatch: 'full'},
    ]
  },
  { path: 'verifiche', component: VerificheComponent},
  { path: 'dettaglio-verifiche', component: DettaglioVerificheComponent},
  { path: 'profilo', component: ProfiloComponent}



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
