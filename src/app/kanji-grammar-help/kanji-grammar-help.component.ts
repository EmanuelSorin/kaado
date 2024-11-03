import { Component, ElementRef, HostListener } from '@angular/core';
import { Grammar } from '../kanji-grammar/grammar';
import { N1Grammar } from '../kanji-grammar/N1Grammar';
import { N2Grammar } from '../kanji-grammar/N2Grammar';
import { N3Grammar } from '../kanji-grammar/N3Grammar';
import { N4Grammar } from '../kanji-grammar/N4Grammar';
import { N5Grammar } from '../kanji-grammar/N5Grammar';

@Component({
  selector: 'app-kanji-grammar-help',
  templateUrl: './kanji-grammar-help.component.html',
  styleUrls: ['./kanji-grammar-help.component.scss']
})
export class KanjiGrammarHelpComponent {

  isScrolled = false;

  isSearching: boolean = false;

  constructor(private el: ElementRef) { }

  // Detectar el scroll para mostrar o esconder el botón
  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: any) {
    const scrollPosition = this.el.nativeElement.scrollTop;
    this.isScrolled = scrollPosition > 200;
  }

  // Método para hacer scroll hacia arriba
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

    //Conseguimos los array con los distintos kanas
    grammarN5Array: Grammar[] = JSON.parse(N5Grammar).map((item: any) => new Grammar(item.id, item.romaji, item.kana, item.meaning));
    grammarN4Array: Grammar[] = JSON.parse(N4Grammar).map((item: any) => new Grammar(item.id, item.romaji, item.kana, item.meaning));
    grammarN3Array: Grammar[] = JSON.parse(N3Grammar).map((item: any) => new Grammar(item.id, item.romaji, item.kana, item.meaning));
    grammarN2Array: Grammar[] = JSON.parse(N2Grammar).map((item: any) => new Grammar(item.id, item.romaji, item.kana, item.meaning));
    grammarN1Array: Grammar[] = JSON.parse(N1Grammar).map((item: any) => new Grammar(item.id, item.romaji, item.kana, item.meaning));

    kanjiSeleccionado: Grammar[] = this.grammarN5Array;
    opcionSeleccionada: number = 5;

    inputValue: string = '';

    allKanjis = [...this.grammarN5Array, ...this.grammarN4Array, ...this.grammarN3Array, ...this.grammarN2Array, ...this.grammarN1Array];


    searchResults: Grammar[] = [];
  private debounceTimer: any;

    seleccionarKanji(kanjiN: number){
      this.isSearching = false;

      if(kanjiN == 5){ this.kanjiSeleccionado = this.grammarN5Array; this.opcionSeleccionada = 5;}
      if(kanjiN == 4){ this.kanjiSeleccionado = this.grammarN4Array; this.opcionSeleccionada = 4;}
      if(kanjiN == 3){ this.kanjiSeleccionado = this.grammarN3Array; this.opcionSeleccionada = 3;}
      if(kanjiN == 2){ this.kanjiSeleccionado = this.grammarN2Array; this.opcionSeleccionada = 2;}
      if(kanjiN == 1) {this.kanjiSeleccionado = this.grammarN1Array; this.opcionSeleccionada = 1;}
    }


     // Función que se ejecuta cuando el usuario escribe en el input
  buscarKanji(query: string) {
    clearTimeout(this.debounceTimer); // Limpiar el temporizador anterior
    this.debounceTimer = setTimeout(() => {
      this.searchMeaning(query);
    }, 700); // Espera 2 segundos antes de ejecutar la búsqueda
  }

  // Función para buscar en el array de kanji
  searchMeaning(query: string) {
    this.opcionSeleccionada = 0;

    if(query.trim().length == 0){
      this.isSearching = false;
      this.seleccionarKanji(5);
      return;
    }

    this.isSearching = true;
    this.searchResults = []; // Reiniciar resultados de búsqueda
    const searchWord = query.trim().toLowerCase(); // Convertir la palabra a minúsculas para una búsqueda insensible a mayúsculas

    this.allKanjis.forEach((kanji) => {
      const meaningArray = kanji.meaning.split(',').map(item => item.trim().toLowerCase()); // Dividir el campo 'meaning'
      
      meaningArray.push(kanji.romaji);
       // Verificar si alguna palabra del array de meanings contiene el texto de búsqueda
       const hasPartialMatch = meaningArray.some(meaning => meaning.includes(searchWord));

       if (hasPartialMatch) {
         this.searchResults.push(kanji); // Agregar el kanji que coincide con la búsqueda
       }
    });


    this.kanjiSeleccionado = this.searchResults;
  }
}
