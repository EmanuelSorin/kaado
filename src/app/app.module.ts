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
import {MatTabsModule} from '@angular/material/tabs';

//Cookies
import { CookieService } from 'ngx-cookie-service';
import { KatakanaComponent } from './katakana/katakana.component';
import { InicioComponent } from './inicio/inicio.component';
import { KanjiComponent } from './kanji/kanji.component';
import { HiraganaHelpComponent } from './hiragana-help/hiragana-help.component';
import { KatakanaHelpComponent } from './katakana-help/katakana-help.component';
import { KanjiHelpComponent } from './kanji-help/kanji-help.component';
import { FormsModule } from '@angular/forms';
import { KanjiGrammarComponent } from './kanji-grammar/kanji-grammar.component';
import { KanjiVocabComponent } from './kanji-vocab/kanji-vocab.component';
import { KanjiVocabHelpComponent } from './kanji-vocab-help/kanji-vocab-help.component';
import { KanjiGrammarHelpComponent } from './kanji-grammar-help/kanji-grammar-help.component';
import {MatSliderModule} from '@angular/material/slider';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    HiraganaComponent,
    KatakanaComponent,
    InicioComponent,
    KanjiComponent,
    HiraganaHelpComponent,
    KatakanaHelpComponent,
    KanjiHelpComponent,
    KanjiGrammarComponent,
    KanjiVocabComponent,
    KanjiVocabHelpComponent,
    KanjiGrammarHelpComponent
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
    MatTabsModule,
    FormsModule,
    MatSliderModule,
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy},CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
