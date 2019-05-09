import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
   AuthModule,
   AuthWellKnownEndpoints,
   OidcConfigService,
   OidcSecurityService,
   OpenIDImplicitFlowConfiguration,
} from 'angular-auth-oidc-client';


//thirdy lsupport library
import {TranslateLoader, TranslateModule, TranslateCompiler} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateMessageFormatCompiler} from 'ngx-translate-messageformat-compiler';

import { LoginComponent } from './login/login.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { DettaglioVerificheComponent } from './dettaglio-verifiche/dettaglio-verifiche.component';
import { RouterModule } from '@angular/router';
import { ProfiloComponent } from './profilo/profilo.component';
import { HomeComponent } from './home/home.component';
import { AutoLoginComponent } from './auto-login/auto-login.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { NavigationComponent } from './navigation/navigation.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';

export function loadConfig(oidcConfigService: OidcConfigService) {
   console.log('APP_INITIALIZER STARTING');
   return () => oidcConfigService.load_using_stsServer('https://accounts.google.com');
}

@NgModule({
   declarations: [
      AppComponent,
      LoginComponent,
      WelcomePageComponent,
      DettaglioVerificheComponent,
      ProfiloComponent,
      ForbiddenComponent,
      HomeComponent,
      AutoLoginComponent,
      NavigationComponent,
      UnauthorizedComponent

      
   ],
   imports: [
      FormsModule,
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      RouterModule,
      AuthModule.forRoot(),
      TranslateModule.forRoot({
         loader: {
             provide: TranslateLoader,
             useFactory: HttpLoaderFactory,
             deps: [HttpClient]
         }
     })
 ],
 providers: [
   OidcConfigService,
   {
       provide: APP_INITIALIZER,
       useFactory: loadConfig,
       deps: [OidcConfigService],
       multi: true,
   },
 ],
  bootstrap: [AppComponent]
})
export class AppModule {
   constructor(
      private oidcSecurityService: OidcSecurityService,
      private oidcConfigService: OidcConfigService,
  ) {
      this.oidcConfigService.onConfigurationLoaded.subscribe(() => {

          const openIDImplicitFlowConfiguration = new OpenIDImplicitFlowConfiguration();
          openIDImplicitFlowConfiguration.stsServer = 'https://accounts.google.com';
          openIDImplicitFlowConfiguration.redirect_url = 'http://localhost:4200/welcome/qualifiche';
          openIDImplicitFlowConfiguration.client_id =
              '728431663132-337jt7vjeg3iq5hgv56l2028fr4r33me.apps.googleusercontent.com';
          openIDImplicitFlowConfiguration.response_type = 'id_token token';
          openIDImplicitFlowConfiguration.scope = 'openid email profile';
          openIDImplicitFlowConfiguration.post_logout_redirect_uri = 'http://localhost:4200/Unauthorized';
          openIDImplicitFlowConfiguration.post_login_route = '/welcome/qualifiche';
          openIDImplicitFlowConfiguration.forbidden_route = '/Forbidden';
          openIDImplicitFlowConfiguration.unauthorized_route = '/Unauthorized';
          openIDImplicitFlowConfiguration.trigger_authorization_result_event = true;
          openIDImplicitFlowConfiguration.log_console_warning_active = true;
          openIDImplicitFlowConfiguration.log_console_debug_active = true;
          openIDImplicitFlowConfiguration.max_id_token_iat_offset_allowed_in_seconds = 20;

          const authWellKnownEndpoints = new AuthWellKnownEndpoints();
          authWellKnownEndpoints.setWellKnownEndpoints(this.oidcConfigService.wellKnownEndpoints);

          this.oidcSecurityService.setupModule(openIDImplicitFlowConfiguration, authWellKnownEndpoints);

      });

      console.log('APP STARTING');
  }
}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
