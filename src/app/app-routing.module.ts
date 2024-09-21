import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KatakanaComponent } from './katakana/katakana.component';
import { HiraganaComponent } from './hiragana/hiragana.component';
import { InicioComponent } from './inicio/inicio.component';
import { KanjiComponent } from './kanji/kanji.component';
import { HiraganaHelpComponent } from './hiragana-help/hiragana-help.component';
import { KatakanaHelpComponent } from './katakana-help/katakana-help.component';
import { KanjiHelpComponent } from './kanji-help/kanji-help.component';
import { KanjiGrammarHelpComponent } from './kanji-grammar-help/kanji-grammar-help.component';
import { KanjiGrammarComponent } from './kanji-grammar/kanji-grammar.component';
import { KanjiVocabHelpComponent } from './kanji-vocab-help/kanji-vocab-help.component';
import { KanjiVocabComponent } from './kanji-vocab/kanji-vocab.component';

const routes: Routes = [
  { path: '',  pathMatch: 'full', component: InicioComponent },
  { path: 'hiragana', component: HiraganaComponent },
  { path: 'katakana', component: KatakanaComponent },
  { path: 'kanji-list', component: KanjiComponent },
  { path: 'hiragana-help', component: HiraganaHelpComponent },
  { path: 'katakana-help', component: KatakanaHelpComponent },
  { path: 'kanji-help', component: KanjiHelpComponent },
  { path: 'vocabulary', component: KanjiVocabComponent },
  { path: 'vocabulary-help', component: KanjiVocabHelpComponent },
  { path: 'grammar', component: KanjiGrammarComponent },
  { path: 'grammar-help', component: KanjiGrammarHelpComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
