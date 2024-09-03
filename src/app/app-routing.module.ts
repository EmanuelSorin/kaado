import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KatakanaComponent } from './katakana/katakana.component';
import { HiraganaComponent } from './hiragana/hiragana.component';
import { InicioComponent } from './inicio/inicio.component';
import { KanjiComponent } from './kanji/kanji.component';
import { HiraganaHelpComponent } from './hiragana-help/hiragana-help.component';
import { KatakanaHelpComponent } from './katakana-help/katakana-help.component';

const routes: Routes = [
  { path: '',  pathMatch: 'full', component: InicioComponent },
  { path: 'hiragana', component: HiraganaComponent },
  { path: 'katakana', component: KatakanaComponent },
  { path: 'kanji', component: KanjiComponent },
  { path: 'hiragana-help', component: HiraganaHelpComponent },
  { path: 'katakana-help', component: KatakanaHelpComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
