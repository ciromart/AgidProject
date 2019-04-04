import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {
  
  constructor(private route: Router) { }

  
  ngOnInit() {
  }

  Gotopage(event){
    console.log(event);
    this.route.navigateByUrl('welcome/dettaglio-verifiche');
  }
}
