import { Component, ElementRef, HostListener } from '@angular/core';
import { Kanji } from '../kanji/kanji';
import { kanjiN1 } from '../kanji/kanjiN1';
import { kanjiN2 } from '../kanji/kanjiN2';
import { kanjiN3 } from '../kanji/kanjiN3';
import { kanjiN4 } from '../kanji/kanjiN4';
import { kanjiN5 } from '../kanji/kanjiN5';

@Component({
  selector: 'app-kanji-help',
  templateUrl: './kanji-help.component.html',
  styleUrls: ['./kanji-help.component.scss']
})
export class KanjiHelpComponent {

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
    kanjiN5Array: Kanji[] = JSON.parse(kanjiN5).map((item: any) => new Kanji(item.id, item.kanji, item.onyomi_text, item.onyomi_kana, item.kunyomi_text, item.kunyomi_kana, item.meaning));
    kanjiN4Array: Kanji[] = JSON.parse(kanjiN4).map((item: any) => new Kanji(item.id, item.kanji, item.onyomi_text, item.onyomi_kana, item.kunyomi_text, item.kunyomi_kana, item.meaning));
    kanjiN3Array: Kanji[] = JSON.parse(kanjiN3).map((item: any) => new Kanji(item.id, item.kanji, item.onyomi_text, item.onyomi_kana, item.kunyomi_text, item.kunyomi_kana, item.meaning));
    kanjiN2Array: Kanji[] = JSON.parse(kanjiN2).map((item: any) => new Kanji(item.id, item.kanji, item.onyomi_text, item.onyomi_kana, item.kunyomi_text, item.kunyomi_kana, item.meaning));
    kanjiN1Array: Kanji[] = JSON.parse(kanjiN1).map((item: any) => new Kanji(item.id, item.kanji, item.onyomi_text, item.onyomi_kana, item.kunyomi_text, item.kunyomi_kana, item.meaning));

    kanjiSeleccionado: Kanji[] = this.kanjiN5Array;
    opcionSeleccionada: number = 5;

    inputValue: string = '';

    allKanjis = [...this.kanjiN5Array, ...this.kanjiN4Array, ...this.kanjiN3Array, ...this.kanjiN2Array, ...this.kanjiN1Array];


    searchResults: Kanji[] = [];
  private debounceTimer: any;

    seleccionarKanji(kanjiN: number){
      this.isSearching = false;

      if(kanjiN == 5){ this.kanjiSeleccionado = this.kanjiN5Array; this.opcionSeleccionada = 5;}
      if(kanjiN == 4){ this.kanjiSeleccionado = this.kanjiN4Array; this.opcionSeleccionada = 4;}
      if(kanjiN == 3){ this.kanjiSeleccionado = this.kanjiN3Array; this.opcionSeleccionada = 3;}
      if(kanjiN == 2){ this.kanjiSeleccionado = this.kanjiN2Array; this.opcionSeleccionada = 2;}
      if(kanjiN == 1) {this.kanjiSeleccionado = this.kanjiN1Array; this.opcionSeleccionada = 1;}
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
      meaningArray.push(kanji.kunyomi_text);
      meaningArray.push(kanji.onyomi_text);

       // Verificar si alguna palabra del array de meanings contiene el texto de búsqueda
       const hasPartialMatch = meaningArray.some(meaning => meaning.includes(searchWord));

       if (hasPartialMatch) {
         this.searchResults.push(kanji); // Agregar el kanji que coincide con la búsqueda
       }
    });


    this.kanjiSeleccionado = this.searchResults;
  }
}
