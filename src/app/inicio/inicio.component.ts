import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent {

  constructor(private router: Router,private responsive: BreakpointObserver) {}

  isPhone:boolean = false;

  ngOnInit() {
    //Handset 600px
    //RESPONSIVE mira si es movil
    this.responsive.observe(Breakpoints.Handset)
    .subscribe(result => {

      if (result.matches) {
        this.isPhone = true;
      }else{
        this.isPhone = false;
      }

    });
  }

}
