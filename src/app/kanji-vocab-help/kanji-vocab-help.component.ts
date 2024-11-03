import { Component, ElementRef, HostListener } from '@angular/core';
import { Vocab } from '../kanji-vocab/vocab';
import { N5VocabAdjectives, N5VocabAdverbs, N5VocabKatakanaWords, N5VocabNouns, N5VocabParticles, N5VocabPreNounAdjectives, N5VocabVerbs } from '../kanji-vocab/N5Vocab';
import { Grammar } from '../kanji-grammar/grammar';
import { N4VocabNouns, N4VocabVerbs, N4VocabAdverbs, N4VocabAdjectives, N4VocabParticles, N4VocabPreNounAdjectives, N4VocabKatakanaWords } from '../kanji-vocab/N4Vocab';
import { N2VocabNouns, N2VocabVerbs, N2VocabAdverbs, N2VocabAdjectives, N2VocabParticles } from '../kanji-vocab/N2Vocab';
import { N3VocabNouns, N3VocabVerbs, N3VocabAdverbs, N3VocabAdjectives, N3VocabParticles } from '../kanji-vocab/N3Vocab';

@Component({
  selector: 'app-kanji-vocab-help',
  templateUrl: './kanji-vocab-help.component.html',
  styleUrls: ['./kanji-vocab-help.component.scss']
})
export class KanjiVocabHelpComponent {

  
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
    vocabN5NounArray: Vocab[] = JSON.parse(N5VocabNouns).map((item: any) => new Vocab(item.id,"noun", item.noun,item.romaji, item.kana, item.meaning));
    vocabN5VerbArray: Vocab[] = JSON.parse(N5VocabVerbs).map((item: any) => new Vocab(item.id,"verb", item.verb,item.romaji, item.kana, item.meaning));
    vocabN5AdverbArray: Vocab[] = JSON.parse(N5VocabAdverbs).map((item: any) => new Vocab(item.id,"adverb", "",item.romaji, item.kana, item.meaning));
    vocabN5AdjectiveArray: Vocab[] = JSON.parse(N5VocabAdjectives).map((item: any) => new Vocab(item.id,"adjective", item.adjective,item.romaji, item.kana, item.meaning));
    vocabN5ParticleArray: Vocab[] = JSON.parse(N5VocabParticles).map((item: any) => new Vocab(item.id,"particle", "",item.romaji, item.kana, item.meaning));
    vocabN5PreNounAdjectiveArray: Vocab[] = JSON.parse(N5VocabPreNounAdjectives).map((item: any) => new Vocab(item.id,"preNounAdjective", "",item.romaji, item.kana, item.meaning));
    vocabN5KatakanaArray: Vocab[] = JSON.parse(N5VocabKatakanaWords).map((item: any) => new Vocab(item.id,"katakana", "",item.romaji, item.kana, item.meaning));

    vocabN4NounArray: Vocab[] = JSON.parse(N4VocabNouns).map((item: any) => new Vocab(item.id,"noun", item.noun,item.romaji, item.kana, item.meaning));
    vocabN4VerbArray: Vocab[] = JSON.parse(N4VocabVerbs).map((item: any) => new Vocab(item.id,"verb", item.verb,item.romaji, item.kana, item.meaning));
    vocabN4AdverbArray: Vocab[] = JSON.parse(N4VocabAdverbs).map((item: any) => new Vocab(item.id,"adverb", "",item.romaji, item.kana, item.meaning));
    vocabN4AdjectiveArray: Vocab[] = JSON.parse(N4VocabAdjectives).map((item: any) => new Vocab(item.id,"adjective", item.adjective,item.romaji, item.kana, item.meaning));
    vocabN4ParticleArray: Vocab[] = JSON.parse(N4VocabParticles).map((item: any) => new Vocab(item.id,"particle", "",item.romaji, item.kana, item.meaning));
    vocabN4PreNounAdjectiveArray: Vocab[] = JSON.parse(N4VocabPreNounAdjectives).map((item: any) => new Vocab(item.id,"preNounAdjective", "",item.romaji, item.kana, item.meaning));
    vocabN4KatakanaArray: Vocab[] = JSON.parse(N4VocabKatakanaWords).map((item: any) => new Vocab(item.id,"katakana", "",item.romaji, item.kana, item.meaning));

    vocabN3NounArray: Vocab[] = JSON.parse(N3VocabNouns).map((item: any) => new Vocab(item.id,"noun", item.noun,item.romaji, item.kana, item.meaning));
    vocabN3VerbArray: Vocab[] = JSON.parse(N3VocabVerbs).map((item: any) => new Vocab(item.id,"verb", item.verb,item.romaji, item.kana, item.meaning));
    vocabN3AdverbArray: Vocab[] = JSON.parse(N3VocabAdverbs).map((item: any) => new Vocab(item.id,"adverb", "",item.romaji, item.kana, item.meaning));
    vocabN3AdjectiveArray: Vocab[] = JSON.parse(N3VocabAdjectives).map((item: any) => new Vocab(item.id,"adjective", item.adjective,item.romaji, item.kana, item.meaning));
    vocabN3ParticleArray: Vocab[] = JSON.parse(N3VocabParticles).map((item: any) => new Vocab(item.id,"particle", "",item.romaji, item.kana, item.meaning));
 
    vocabN2NounArray: Vocab[] = JSON.parse(N2VocabNouns).map((item: any) => new Vocab(item.id,"noun", item.noun,item.romaji, item.kana, item.meaning));
    vocabN2VerbArray: Vocab[] = JSON.parse(N2VocabVerbs).map((item: any) => new Vocab(item.id,"verb", item.verb,item.romaji, item.kana, item.meaning));
    vocabN2AdverbArray: Vocab[] = JSON.parse(N2VocabAdverbs).map((item: any) => new Vocab(item.id,"adverb", "",item.romaji, item.kana, item.meaning));
    vocabN2AdjectiveArray: Vocab[] = JSON.parse(N2VocabAdjectives).map((item: any) => new Vocab(item.id,"adjective", item.adjective,item.romaji, item.kana, item.meaning));
    vocabN2ParticleArray: Vocab[] = JSON.parse(N2VocabParticles).map((item: any) => new Vocab(item.id,"particle", "",item.romaji, item.kana, item.meaning));
 


    kanjiSeleccionado: Vocab[] = this.vocabN5NounArray;

    inputValue: string = '';

    allKanjis = [...this.vocabN5NounArray, ...this.vocabN5VerbArray, ...this.vocabN5AdverbArray, ...this.vocabN5AdjectiveArray, ...this.vocabN5ParticleArray, ...this.vocabN5PreNounAdjectiveArray,...this.vocabN5KatakanaArray,
      ...this.vocabN4NounArray, ...this.vocabN4VerbArray, ...this.vocabN4AdverbArray, ...this.vocabN4AdjectiveArray, ...this.vocabN4ParticleArray, ...this.vocabN4PreNounAdjectiveArray,...this.vocabN4KatakanaArray,
      ...this.vocabN3NounArray, ...this.vocabN3VerbArray, ...this.vocabN3AdverbArray, ...this.vocabN3AdjectiveArray, ...this.vocabN3ParticleArray,
      ...this.vocabN2NounArray, ...this.vocabN2VerbArray, ...this.vocabN2AdverbArray, ...this.vocabN2AdjectiveArray, ...this.vocabN2ParticleArray
    ];


  n5Length = this.vocabN5NounArray.length + this.vocabN5VerbArray.length + this.vocabN5AdverbArray.length + this.vocabN5AdjectiveArray.length + this.vocabN5ParticleArray.length + this.vocabN5PreNounAdjectiveArray.length + this.vocabN5KatakanaArray.length;
  n4Length = this.vocabN4NounArray.length + this.vocabN4VerbArray.length + this.vocabN4AdverbArray.length + this.vocabN4AdjectiveArray.length + this.vocabN4ParticleArray.length + this.vocabN4PreNounAdjectiveArray.length + this.vocabN4KatakanaArray.length;
  n3Length = this.vocabN3NounArray.length + this.vocabN3VerbArray.length + this.vocabN3AdverbArray.length + this.vocabN3AdjectiveArray.length + this.vocabN3ParticleArray.length;
  n2Length = this.vocabN2NounArray.length + this.vocabN2VerbArray.length + this.vocabN2AdverbArray.length + this.vocabN2AdjectiveArray.length + this.vocabN2ParticleArray.length;

  nounLength:number;
  verbLength:number;
  adverbLength:number;
  adjectiveLength:number;
  particleLength:number;
  preNounAdjectiveLength:number;
  katakanaLength:number;


  searchResults: Vocab[] = [];
  private debounceTimer: any;

  nivel:number =  5;
  tipo:string = "noun";

  
  ngOnInit() {
    this.seleccionarNivel(5);
   // this.seleccionarResultados(this.nivel,this.tipo);
  }
  

  seleccionarNivel(nivel: number){    
    this.nivel=nivel;

    if(nivel == 5){
      this.nounLength = this.vocabN5NounArray.length;
      this.verbLength = this.vocabN5VerbArray.length;
      this.adverbLength = this.vocabN5AdverbArray.length;
      this.adjectiveLength = this.vocabN5AdjectiveArray.length;
      this.particleLength = this.vocabN5ParticleArray.length;
      this.preNounAdjectiveLength = this.vocabN5PreNounAdjectiveArray.length;
      this.katakanaLength = this.vocabN5KatakanaArray.length;
    }

    if(nivel == 4){
      this.nounLength = this.vocabN4NounArray.length;
      this.verbLength = this.vocabN4VerbArray.length;
      this.adverbLength = this.vocabN4AdverbArray.length;
      this.adjectiveLength = this.vocabN4AdjectiveArray.length;
      this.particleLength = this.vocabN4ParticleArray.length;
      this.preNounAdjectiveLength = this.vocabN4PreNounAdjectiveArray.length;
      this.katakanaLength = this.vocabN4KatakanaArray.length;
    }

    if(nivel == 3){
      this.nounLength = this.vocabN3NounArray.length;
      this.verbLength = this.vocabN3VerbArray.length;
      this.adverbLength = this.vocabN3AdverbArray.length;
      this.adjectiveLength = this.vocabN3AdjectiveArray.length;
      this.particleLength = this.vocabN3ParticleArray.length;
    }

    if(nivel == 2){
      this.nounLength = this.vocabN2NounArray.length;
      this.verbLength = this.vocabN2VerbArray.length;
      this.adverbLength = this.vocabN2AdverbArray.length;
      this.adjectiveLength = this.vocabN2AdjectiveArray.length;
      this.particleLength = this.vocabN2ParticleArray.length;
    }

    this.seleccionarResultados(nivel, 'noun');
  }

  seleccionarResultados(nivel: number, tipo:string){
      this.isSearching = false;

      this.nivel=nivel;
      this.tipo=tipo;

      if(nivel == 5 && tipo =='noun') this.kanjiSeleccionado = this.vocabN5NounArray; 
      if(nivel == 5 && tipo =='verb') this.kanjiSeleccionado = this.vocabN5VerbArray;
      if(nivel == 5 && tipo =='adverb') this.kanjiSeleccionado = this.vocabN5AdverbArray;
      if(nivel == 5 && tipo =='adjective') this.kanjiSeleccionado = this.vocabN5AdjectiveArray; 
      if(nivel == 5 && tipo =='particle') this.kanjiSeleccionado = this.vocabN5ParticleArray; 
      if(nivel == 5 && tipo =='preNounAdjective') this.kanjiSeleccionado = this.vocabN5PreNounAdjectiveArray;
      if(nivel == 5 && tipo =='katakana') this.kanjiSeleccionado = this.vocabN5KatakanaArray; 

      if(nivel == 4 && tipo =='noun') this.kanjiSeleccionado = this.vocabN4NounArray; 
      if(nivel == 4 && tipo =='verb') this.kanjiSeleccionado = this.vocabN4VerbArray;
      if(nivel == 4 && tipo =='adverb') this.kanjiSeleccionado = this.vocabN4AdverbArray;
      if(nivel == 4 && tipo =='adjective') this.kanjiSeleccionado = this.vocabN4AdjectiveArray;
      if(nivel == 4 && tipo =='particle') this.kanjiSeleccionado = this.vocabN4ParticleArray;
      if(nivel == 4 && tipo =='preNounAdjective') this.kanjiSeleccionado = this.vocabN4PreNounAdjectiveArray;
      if(nivel == 4 && tipo =='katakana') this.kanjiSeleccionado = this.vocabN4KatakanaArray;

      if(nivel == 3 && tipo =='noun') this.kanjiSeleccionado = this.vocabN3NounArray;
      if(nivel == 3 && tipo =='verb') this.kanjiSeleccionado = this.vocabN3VerbArray;
      if(nivel == 3 && tipo =='adverb') this.kanjiSeleccionado = this.vocabN3AdverbArray;
      if(nivel == 3 && tipo =='adjective') this.kanjiSeleccionado = this.vocabN3AdjectiveArray;
      if(nivel == 3 && tipo =='particle') this.kanjiSeleccionado = this.vocabN3ParticleArray;

      if(nivel == 2 && tipo =='noun') this.kanjiSeleccionado = this.vocabN2NounArray;
      if(nivel == 2 && tipo =='verb') this.kanjiSeleccionado = this.vocabN2VerbArray;
      if(nivel == 2 && tipo =='adverb') this.kanjiSeleccionado = this.vocabN2AdverbArray;
      if(nivel == 2 && tipo =='adjective') this.kanjiSeleccionado = this.vocabN2AdjectiveArray;
      if(nivel == 2 && tipo =='particle') this.kanjiSeleccionado = this.vocabN2ParticleArray;
        
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
    this.nivel=0;
    this.tipo="";

    if(query.trim().length == 0){
      this.isSearching = false;
      this.seleccionarResultados(5,'noun');
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
