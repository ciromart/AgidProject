import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dettaglio-verifiche',
  templateUrl: './dettaglio-verifiche.component.html',
  styleUrls: ['./dettaglio-verifiche.component.scss']
})
export class DettaglioVerificheComponent implements OnInit {
  disable: boolean;
  model: any= {};
  disable1: boolean;
  constructor(private route: Router) { }

  
  ngOnInit() {
    this.disable=true;
    this.disable1=true;
  }

/*   Gotopage(event){
    console.log(event);
    /* this.route.navigateByUrl(''); 
}*/
   setError(){
    this.disable=false;
   }
   confirmChange(event){
     console.log('event',event)
     this.disable=true;
     this.model.input1=event;
   }
   setError1(){
    this.disable1=false;
   }
   confirmChange1(event){
     console.log('event',event)
     this.disable1=true;
     this.model.input2=event;
   }
}
