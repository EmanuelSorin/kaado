import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent {

  constructor(private cookieService: CookieService,private responsive: BreakpointObserver) {}

  isPhone:boolean = false;

  left:boolean = true;

  right:boolean = false;

  ngOnInit() {
    //Handset 600px
    //RESPONSIVE mira si es movil
    this.responsive.observe([Breakpoints.Handset, Breakpoints.Tablet])
    .subscribe(result => {
      if (result.matches) {
        this.isPhone = true;
      }else{
        this.isPhone = false;
      }
    });

    //Miramos si es la primera vez que entran, si existe la cookie es que ya entraron y les mostramos directamente el menu
    if(this.cookieService.check('second-time')){
      this.showRight();
    }else{
      this.cookieService.set('second-time', "true");
      this.showLeft();
    }


  }

  showLeft(){
    this.left = true;
    this.right = false;

    window.scrollTo(0, 0);
  }

  showRight(){
    this.right = true;
    this.left = false;

    window.scrollTo(0, 0);
  }


}
