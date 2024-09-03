import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Componentes
import { HiraganaComponent } from './hiragana/hiragana.component';

//Material
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSidenavModule} from '@angular/material/sidenav';

//Cookies
import { CookieService } from 'ngx-cookie-service';
import { KatakanaComponent } from './katakana/katakana.component';
import { InicioComponent } from './inicio/inicio.component';
import { KanjiComponent } from './kanji/kanji.component';
import { HiraganaHelpComponent } from './hiragana-help/hiragana-help.component';
import { KatakanaHelpComponent } from './katakana-help/katakana-help.component';

@NgModule({
  declarations: [
    AppComponent,
    HiraganaComponent,
    KatakanaComponent,
    InicioComponent,
    KanjiComponent,
    HiraganaHelpComponent,
    KatakanaHelpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatCheckboxModule,
    FontAwesomeModule,
    MatTooltipModule,
    MatSidenavModule,

  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
