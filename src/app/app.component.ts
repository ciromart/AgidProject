import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Survey, SurveyModel, SurveyNG, SurveyWindowNG, StylesManager } from '../assets/surveyjs/packages/survey-angular/survey.angular';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { OidcSecurityService, AuthorizationResult, AuthorizationState } from 'angular-auth-oidc-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'rationalproject';
  survey: any;
  model: any = {};
  appHeaderItems = [];
  selectedHeaderItemIndex;
  selectedSubNavItemIndex;
  constructor(private translate: TranslateService, private route: Router, public oidcSecurityService: OidcSecurityService,
    private router: Router
  ) {
    if (this.oidcSecurityService.moduleSetup) {
      this.onOidcModuleSetup();
    } else {
      this.oidcSecurityService.onModuleSetup.subscribe(() => {
        this.onOidcModuleSetup();
      });
    }

    this.oidcSecurityService.onAuthorizationResult.subscribe(
      (authorizationResult: AuthorizationResult) => {
        this.onAuthorizationResultComplete(authorizationResult);
      });

    translate.setDefaultLang('en');
  }




  ngOnInit() {

  }


  switchLanguage(language: string) {
    this.survey.locale = language;
    this.survey.render();
    this.translate.use(language).subscribe(resp => {
      console.log('resp', resp);
    });
  }

  /*  login() {
     if (this.model.username == undefined || this.model.password == undefined || this.model.username == '' || this.model.password == '') {
       alert('Compilare i campi \'Username\' e \'Password\' ');
     } else {
       if (this.model.username == "admin" && this.model.password == "password") {
         this.route.navigate(['home']);
       }
     }
   } */
  /*  constructor(public oidcSecurityService: OidcSecurityService,
     private router: Router
 ) {
     if (this.oidcSecurityService.moduleSetup) {
         this.onOidcModuleSetup();
     } else {
         this.oidcSecurityService.onModuleSetup.subscribe(() => {
             this.onOidcModuleSetup();
         });
     }
 
     this.oidcSecurityService.onAuthorizationResult.subscribe(
         (authorizationResult: AuthorizationResult) => {
             this.onAuthorizationResultComplete(authorizationResult);
         });
 } */



  ngOnDestroy(): void {
  }

  login() {
    console.log('start login');
    this.oidcSecurityService.authorize();
    /* if (this.model.username == undefined || this.model.password == undefined || this.model.username == '' || this.model.password == '') {
      alert('Compilare i campi \'Username\' e \'Password\' ');
    } else {
      if (this.model.username == "admin" && this.model.password == "password") {
        this.route.navigate(['home']);
      }
    } */
  }

  refreshSession() {
    console.log('start refreshSession');
    this.oidcSecurityService.authorize();
  }

  logout() {
    console.log('start logoff');
    this.oidcSecurityService.logoff();
  }

  private onOidcModuleSetup() {
    console.log('on module setup');
    if (window.location.hash) {
      this.oidcSecurityService.authorizedImplicitFlowCallback();
    } else {
      if ('/autologin' !== window.location.pathname) {
        this.write('redirect', window.location.pathname);
      }
      console.log('AppComponent:onModuleSetup');
      this.oidcSecurityService.getIsAuthorized().subscribe((authorized: boolean) => {
        if (!authorized) {
          this.router.navigate(['/autologin']);
        }
      });
    }
  }

  private onAuthorizationResultComplete(authorizationResult: AuthorizationResult) {

    const path = this.read('redirect');
    console.log(path ,'after const pèath')
    console.log('Auth result received AuthorizationState:'
      + authorizationResult.authorizationState
      + ' validationResult:' + authorizationResult.validationResult);

    if (authorizationResult.authorizationState === AuthorizationState.authorized) {
      console.log(path ,': path relativo a AppComponent.componmenmt')
      this.router.navigate([path]);
    } else {
      this.router.navigate(['/Unauthorized']);
    }
  }

  private read(key: string): any {
    const data = localStorage.getItem(key);
    if (data != null) {
      return JSON.parse(data);
    }

    return;
  }

  private write(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }
}
