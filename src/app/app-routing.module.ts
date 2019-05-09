import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { DettaglioVerificheComponent } from './dettaglio-verifiche/dettaglio-verifiche.component';
import { ProfiloComponent } from './profilo/profilo.component';
import { HomeComponent } from './home/home.component';
import { AutoLoginComponent } from './auto-login/auto-login.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';


const routes: Routes = [
  
 //{ path: 'home', component: HomeComponent },
 {  path:'', component: WelcomePageComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'welcome/qualifiche',
    component: WelcomePageComponent,
    children: [
      { path: '', redirectTo: 'welcome/qualifiche', pathMatch: 'full' },
    ]
  },
  { path: 'dettaglio-verifiche', component: DettaglioVerificheComponent },
  { path: 'profilo', component: ProfiloComponent },
  { path: 'autologin', component: AutoLoginComponent },
  { path: 'Forbidden', component: ForbiddenComponent },
  { path: 'Unauthorized', component: UnauthorizedComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
