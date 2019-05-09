import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-profilo',
  templateUrl: './profilo.component.html',
  styleUrls: ['./profilo.component.scss']
})
export class ProfiloComponent implements OnInit {

  

  model: any = {};
  var1: any;

  constructor() { }

  ngOnInit() {
    this.model.name = "Mario";
    this.model.cognome = "Rossi";
    this.model.email = "mario_rossi@gmail.com";
    
    this.model.data_nasc = new Date(2013, 9, 22);
    var datepipe=new DatePipe('en-US');
    this.model.data_nasc=datepipe.transform(this.model.data_nasc,'dd-MM-yyyy');
    this.function();
    

  
    /*var datenow=new Date();
    console.log(datenow);
    var datepipe=new DatePipe('en-US');
    this.max_date=datepipe.transform(datenow,'yyyy-MM-dd');*/
  }

  

  cambia_pass(){
    if(this.model.password1 != "password")
    {
       alert('.alert');
       this.var1 = 1;
       
    }
    else
    {
      if(this.model.password2 != this.model.password3)
       alert('Password non corrispondenti');
      else
       alert('Password cambiata');
    }
  }
  

  function() {
    
    
      
    window.addEventListener('load', function() {
      var forms = document.getElementsByClassName('needs-validation');
      var validation = Array.prototype.filter.call(forms, function(form) {
        
        form.classList.add('was-validated');
      });
    }, false);
   
  }

}
