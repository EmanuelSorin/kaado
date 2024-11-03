import { Component, ElementRef, ViewChild } from '@angular/core';
import { Vocab } from './vocab';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatTooltip } from '@angular/material/tooltip';
import { CookieService } from 'ngx-cookie-service';
import * as stringSimilarity from 'string-similarity';
import { N2VocabNouns, N2VocabVerbs, N2VocabAdverbs, N2VocabAdjectives, N2VocabParticles } from './N2Vocab';
import { N3VocabNouns, N3VocabVerbs, N3VocabAdverbs, N3VocabAdjectives, N3VocabParticles } from './N3Vocab';
import { N4VocabNouns, N4VocabVerbs, N4VocabAdverbs, N4VocabAdjectives, N4VocabParticles, N4VocabPreNounAdjectives, N4VocabKatakanaWords } from './N4Vocab';
import { N5VocabNouns, N5VocabVerbs, N5VocabAdverbs, N5VocabAdjectives, N5VocabParticles, N5VocabPreNounAdjectives, N5VocabKatakanaWords } from './N5Vocab';

@Component({
  selector: 'app-kanji-vocab',
  templateUrl: './kanji-vocab.component.html',
  styleUrls: ['./kanji-vocab.component.scss']
})
export class KanjiVocabComponent {
  constructor(private cookieService: CookieService, private responsive: BreakpointObserver) { }

  @ViewChild('typeGameInput') typeGameInput: ElementRef;
  @ViewChild('tooltipTypeGameAdvice', { static: false }) tooltip: MatTooltip;

  //Conseguimos los array con los distintos kanas
  //Conseguimos los array con los distintos kanas
  vocabN5NounArray: Vocab[] = JSON.parse(N5VocabNouns).map((item: any) => new Vocab(item.id, "noun", item.noun, item.romaji, item.kana, item.meaning));
  vocabN5VerbArray: Vocab[] = JSON.parse(N5VocabVerbs).map((item: any) => new Vocab(item.id, "verb", item.verb, item.romaji, item.kana, item.meaning));
  vocabN5AdverbArray: Vocab[] = JSON.parse(N5VocabAdverbs).map((item: any) => new Vocab(item.id, "adverb", "", item.romaji, item.kana, item.meaning));
  vocabN5AdjectiveArray: Vocab[] = JSON.parse(N5VocabAdjectives).map((item: any) => new Vocab(item.id, "adjective", item.adjective, item.romaji, item.kana, item.meaning));
  vocabN5ParticleArray: Vocab[] = JSON.parse(N5VocabParticles).map((item: any) => new Vocab(item.id, "particle", "", item.romaji, item.kana, item.meaning));
  vocabN5PreNounAdjectiveArray: Vocab[] = JSON.parse(N5VocabPreNounAdjectives).map((item: any) => new Vocab(item.id, "preNounAdjective", "", item.romaji, item.kana, item.meaning));
  vocabN5KatakanaArray: Vocab[] = JSON.parse(N5VocabKatakanaWords).map((item: any) => new Vocab(item.id, "katakana", "", item.romaji, item.kana, item.meaning));

  vocabN4NounArray: Vocab[] = JSON.parse(N4VocabNouns).map((item: any) => new Vocab(item.id, "noun", item.noun, item.romaji, item.kana, item.meaning));
  vocabN4VerbArray: Vocab[] = JSON.parse(N4VocabVerbs).map((item: any) => new Vocab(item.id, "verb", item.verb, item.romaji, item.kana, item.meaning));
  vocabN4AdverbArray: Vocab[] = JSON.parse(N4VocabAdverbs).map((item: any) => new Vocab(item.id, "adverb", "", item.romaji, item.kana, item.meaning));
  vocabN4AdjectiveArray: Vocab[] = JSON.parse(N4VocabAdjectives).map((item: any) => new Vocab(item.id, "adjective", item.adjective, item.romaji, item.kana, item.meaning));
  vocabN4ParticleArray: Vocab[] = JSON.parse(N4VocabParticles).map((item: any) => new Vocab(item.id, "particle", "", item.romaji, item.kana, item.meaning));
  vocabN4PreNounAdjectiveArray: Vocab[] = JSON.parse(N4VocabPreNounAdjectives).map((item: any) => new Vocab(item.id, "preNounAdjective", "", item.romaji, item.kana, item.meaning));
  vocabN4KatakanaArray: Vocab[] = JSON.parse(N4VocabKatakanaWords).map((item: any) => new Vocab(item.id, "katakana", "", item.romaji, item.kana, item.meaning));

  vocabN3NounArray: Vocab[] = JSON.parse(N3VocabNouns).map((item: any) => new Vocab(item.id, "noun", item.noun, item.romaji, item.kana, item.meaning));
  vocabN3VerbArray: Vocab[] = JSON.parse(N3VocabVerbs).map((item: any) => new Vocab(item.id, "verb", item.verb, item.romaji, item.kana, item.meaning));
  vocabN3AdverbArray: Vocab[] = JSON.parse(N3VocabAdverbs).map((item: any) => new Vocab(item.id, "adverb", "", item.romaji, item.kana, item.meaning));
  vocabN3AdjectiveArray: Vocab[] = JSON.parse(N3VocabAdjectives).map((item: any) => new Vocab(item.id, "adjective", item.adjective, item.romaji, item.kana, item.meaning));
  vocabN3ParticleArray: Vocab[] = JSON.parse(N3VocabParticles).map((item: any) => new Vocab(item.id, "particle", "", item.romaji, item.kana, item.meaning));

  vocabN2NounArray: Vocab[] = JSON.parse(N2VocabNouns).map((item: any) => new Vocab(item.id, "noun", item.noun, item.romaji, item.kana, item.meaning));
  vocabN2VerbArray: Vocab[] = JSON.parse(N2VocabVerbs).map((item: any) => new Vocab(item.id, "verb", item.verb, item.romaji, item.kana, item.meaning));
  vocabN2AdverbArray: Vocab[] = JSON.parse(N2VocabAdverbs).map((item: any) => new Vocab(item.id, "adverb", "", item.romaji, item.kana, item.meaning));
  vocabN2AdjectiveArray: Vocab[] = JSON.parse(N2VocabAdjectives).map((item: any) => new Vocab(item.id, "adjective", item.adjective, item.romaji, item.kana, item.meaning));
  vocabN2ParticleArray: Vocab[] = JSON.parse(N2VocabParticles).map((item: any) => new Vocab(item.id, "particle", "", item.romaji, item.kana, item.meaning));


  totalN5: number = this.vocabN5NounArray.length + this.vocabN5VerbArray.length + this.vocabN5AdverbArray.length + this.vocabN5AdjectiveArray.length + this.vocabN5ParticleArray.length + this.vocabN5PreNounAdjectiveArray.length + this.vocabN5KatakanaArray.length;
  totalN4: number = this.vocabN4NounArray.length + this.vocabN4VerbArray.length + this.vocabN4AdverbArray.length + this.vocabN4AdjectiveArray.length + this.vocabN4ParticleArray.length + this.vocabN4PreNounAdjectiveArray.length + this.vocabN4KatakanaArray.length;
  totalN3: number = this.vocabN3NounArray.length + this.vocabN3VerbArray.length + this.vocabN3AdverbArray.length + this.vocabN3AdjectiveArray.length + this.vocabN3ParticleArray.length;
  totalN2: number = this.vocabN2NounArray.length + this.vocabN2VerbArray.length + this.vocabN2AdverbArray.length + this.vocabN2AdjectiveArray.length + this.vocabN2ParticleArray.length;

  totalNoun: number;
  totalVerb: number;
  totalAdverb: number;
  totalAdjective: number;
  totalParticle: number;
  totalPreNounAdjective: number;
  totalKatakana: number;

  totalN5Noun = this.vocabN5NounArray.length;
  totalN5Verb = this.vocabN5VerbArray.length;
  totalN5Adverb = this.vocabN5AdverbArray.length;
  totalN5Adjective = this.vocabN5AdjectiveArray.length;
  totalN5Particle = this.vocabN5ParticleArray.length;
  totalN5PreNounAdjective = this.vocabN5PreNounAdjectiveArray.length;
  totalN5Katakana = this.vocabN5KatakanaArray.length;

  totalN4Noun = this.vocabN4NounArray.length;
  totalN4Verb = this.vocabN4VerbArray.length;
  totalN4Adverb = this.vocabN4AdverbArray.length;
  totalN4Adjective = this.vocabN4AdjectiveArray.length;
  totalN4Particle = this.vocabN4ParticleArray.length;
  totalN4PreNounAdjective = this.vocabN4PreNounAdjectiveArray.length;
  totalN4Katakana = this.vocabN4KatakanaArray.length;

  totalN3Noun = this.vocabN3NounArray.length;
  totalN3Verb = this.vocabN3VerbArray.length;
  totalN3Adverb = this.vocabN3AdverbArray.length;
  totalN3Adjective = this.vocabN3AdjectiveArray.length;
  totalN3Particle = this.vocabN3ParticleArray.length;

  totalN2Noun = this.vocabN2NounArray.length;
  totalN2Verb = this.vocabN2VerbArray.length;
  totalN2Adverb = this.vocabN2AdverbArray.length;
  totalN2Adjective = this.vocabN2AdjectiveArray.length;
  totalN2Particle = this.vocabN2ParticleArray.length;


  //Variables SLIDER
  isModalOpen = false;
  sliderN5Error: string;
  sliderN4Error: string;
  sliderN3Error: string;
  sliderN2Error: string;

  minVocabN5Noun: number = 1;
  maxVocabN5Noun: number = this.totalN5Noun;
  minVocabN5Verb: number = 1;
  maxVocabN5Verb: number = this.totalN5Verb;
  minVocabN5Adverb: number = 1;
  maxVocabN5Adverb: number = this.totalN5Adverb;
  minVocabN5Adjective: number = 1;
  maxVocabN5Adjective: number = this.totalN5Adjective;
  minVocabN5Particle: number = 1;
  maxVocabN5Particle: number = this.totalN5Particle;
  minVocabN5PreNounAdjective: number = 1;
  maxVocabN5PreNounAdjective: number = this.totalN5PreNounAdjective;
  minVocabN5Katakana: number = 1;
  maxVocabN5Katakana: number = this.totalN5Katakana;

  minVocabN4Noun: number = 1;
  maxVocabN4Noun: number = this.totalN4Noun;
  minVocabN4Verb: number = 1;
  maxVocabN4Verb: number = this.totalN4Verb;
  minVocabN4Adverb: number = 1;
  maxVocabN4Adverb: number = this.totalN4Adverb;
  minVocabN4Adjective: number = 1;
  maxVocabN4Adjective: number = this.totalN4Adjective;
  minVocabN4Particle: number = 1;
  maxVocabN4Particle: number = this.totalN4Particle;
  minVocabN4PreNounAdjective: number = 1;
  maxVocabN4PreNounAdjective: number = this.totalN4PreNounAdjective;
  minVocabN4Katakana: number = 1;
  maxVocabN4Katakana: number = this.totalN4Katakana;

  minVocabN3Noun: number = 1;
  maxVocabN3Noun: number = this.totalN3Noun;
  minVocabN3Verb: number = 1;
  maxVocabN3Verb: number = this.totalN3Verb;
  minVocabN3Adverb: number = 1;
  maxVocabN3Adverb: number = this.totalN3Adverb;
  minVocabN3Adjective: number = 1;
  maxVocabN3Adjective: number = this.totalN3Adjective;
  minVocabN3Particle: number = 1;
  maxVocabN3Particle: number = this.totalN3Particle;


  minVocabN2Noun: number = 1;
  maxVocabN2Noun: number = this.totalN2Noun;
  minVocabN2Verb: number = 1;
  maxVocabN2Verb: number = this.totalN2Verb;
  minVocabN2Adverb: number = 1;
  maxVocabN2Adverb: number = this.totalN2Adverb;
  minVocabN2Adjective: number = 1;
  maxVocabN2Adjective: number = this.totalN2Adjective;
  minVocabN2Particle: number = 1;
  maxVocabN2Particle: number = this.totalN2Particle;


  //Opciones de kanji
  vocabN: number[] = [];
  vocabOption: string[] = []; //noun , verb , adverb , adjective , particle , preNounAdjective , katakana

  kanaCopiaArray: Vocab[] = [];
  kanaArray: Vocab[] = [];

  //Opcion que se muestra para adivinar
  adivinar: Vocab;

  //Opciones que puede adivinar el usuario
  options: Vocab[];

  //Booleano para cuando acierta
  success: boolean = false;

  //Nivel de dificultad, facil = 1, normal=2 y dificil=3
  level: number = 2;


  //Numero de veces que acierta consecutivamente
  racha: number;
  best: number;

  cardGameStreak: number;
  typeGameStreak: number;

  cardGameBest: number;
  typeGameBest: number;

  //Que se muestra para adivinar kana o romaji
  queAdivina: string;

  //
  cardGame: boolean = true;
  typeGame: boolean = false;
  typeGameFail: boolean = false;
  typeGameFailShake: boolean = false;
  typeGameShowKanaValue: boolean = false;

  streakFailShake: boolean = false;

  //Emotes para mostrar cuando acierta
  emoteArray: string[] = ['🔥', '💯', '😎', '💪', '👌', '✌️', '😄', '🎉', '✨', '💥'];
  showEmoteArray: string[] = [];

  // Añadir una firma de índice
  //[key: string]: any;

  showYomi: boolean = true;
  showStreak: boolean = true;

  //Variables para responsive
  isPhone: boolean = false;

  menuLateral: boolean = false;

  typeCardCorrect: boolean = false;

  //Eventos para ver el desplazamiento del movil
  private touchStartX: number = 0;
  private touchEndX: number = 0;

  ngOnInit() {
    this.menuLateral = false;
    //Handset 600px
    //RESPONSIVE mira si es movil
    this.responsive.observe([Breakpoints.Handset, Breakpoints.Tablet])
      .subscribe(result => {

        if (result.matches) {
          this.isPhone = true;
        } else {
          this.isPhone = false;
        }

      });

    this.setCookies();
    this.sumarTotales();
    //Llamamos para conseguir los kana
    this.setKanaArray();

  }

  async resolver(seleccionado: Vocab) {
    if (seleccionado == this.adivinar) {


      this.cardGameStreak++;
      this.cookieService.set('vocab-cardGameStreak', this.cardGameStreak.toString());

      //Cada 3 seguidas correctas mostrar emote
      if (this.cardGameStreak % 3 == 0) {
        this.showEmoteArray.push(this.emoteArray[Math.floor(Math.random() * this.emoteArray.length)]);
      }


      //Mostramos el tick verde 0.5 segundos
      this.success = true;
      await new Promise(f => setTimeout(f, 500));
      this.success = false;

      this.nuevoKana();


    } else {
      if (this.cardGameStreak > this.cardGameBest) {
        this.cookieService.set('vocab-cardGameBest', this.cardGameStreak.toString());
        this.cardGameBest = this.cardGameStreak;
      }
      if (this.typeGameStreak > 0) {
        this.animationStreakLose();
      }
      this.cardGameStreak = 0;
      this.cookieService.set('vocab-cardGameStreak', this.cardGameStreak.toString());
      this.success = false;
      seleccionado.estado = false;
    }
  }

  //Funcion que decide si mostrar kana o romaji en los Card
  toogleQueAdivina() {
    if (this.queAdivina == 'kana') {
      this.queAdivina = 'romaji';
      this.cookieService.set('vocab-queAdivina', "romaji");
    } else {
      this.queAdivina = 'kana';
      this.cookieService.set('vocab-queAdivina', "kana");
    }
    this.setKanaArray();
  }


  sumarTotales() {

    this.totalNoun = 0;
    this.totalVerb = 0;
    this.totalAdverb = 0;
    this.totalAdjective = 0;
    this.totalParticle = 0;
    this.totalPreNounAdjective = 0;
    this.totalKatakana = 0;

    if (this.vocabN.includes(5)) {
      this.totalNoun += this.totalN5Noun;
      this.totalVerb += this.totalN5Verb;
      this.totalAdverb += this.totalN5Adverb;
      this.totalAdjective += this.totalN5Adjective;
      this.totalParticle += this.totalN5Particle;
      this.totalPreNounAdjective += this.totalN5PreNounAdjective;
      this.totalKatakana += this.totalN5Katakana;
    }

    if (this.vocabN.includes(4)) {
      this.totalNoun += this.totalN4Noun;
      this.totalVerb += this.totalN4Verb;
      this.totalAdverb += this.totalN4Adverb;
      this.totalAdjective += this.totalN4Adjective;
      this.totalParticle += this.totalN4Particle;
      this.totalPreNounAdjective += this.totalN4PreNounAdjective;
      this.totalKatakana += this.totalN4Katakana;
    }

    if (this.vocabN.includes(3)) {
      this.totalNoun += this.totalN3Noun;
      this.totalVerb += this.totalN3Verb;
      this.totalAdverb += this.totalN3Adverb;
      this.totalAdjective += this.totalN3Adjective;
      this.totalParticle += this.totalN3Particle;
    }

    if (this.vocabN.includes(2)) {
      this.totalNoun += this.totalN2Noun;
      this.totalVerb += this.totalN2Verb;
      this.totalAdverb += this.totalN2Adverb;
      this.totalAdjective += this.totalN2Adjective;
      this.totalParticle += this.totalN2Particle;
    }

  }
  //Funcion que decide que kanas mostrar, main, dakuten o combination
  // toogleKanaOptions(variableName: string, event: Event): void{
  //   if(variableName == 'grammarN5' && !this.grammarN4 && !this.grammarN3 && !this.grammarN2 && !this.grammarN1 ){
  //     //Si quiere deseleccionar grammarN5 y las demas no estan marcadas no se permite
  //     event.preventDefault();
  //     return;
  //   }

  //   this.cookieService.set("vocab-"+variableName, (!this[variableName]).toString());
  //   this[variableName] = !this[variableName];

  //   if(!this.grammarN5 && !this.grammarN4 && !this.grammarN3 && !this.grammarN2 && !this.grammarN1){
  //     this.grammarN5 = true;
  //     this.cookieService.set('vocab-grammarN5', "true");

  //   }

  //   this.setKanaArray();
  // }

  toogleVocabN(n: string, event: Event) {
    if (this.vocabN.includes(+n)) {
      //El check esta marcado, lo desmarcamos
      if (this.vocabN.length == 1 && +n == 5) {
        //Es el ultimo check marcado y es N5,  no lo dejamos desmarcar
        event.preventDefault();
        return;
      } else {
        //Desmarcamos la opcion
        this.cookieService.set("vocab-N" + n, "false");
        this.vocabN.splice(this.vocabN.indexOf(+n), 1);

        //Si desmarca la ultima opcion le ponemos por defecto marcado N5
        if (this.vocabN.length == 0) {
          this.cookieService.set("vocab-N5", "true");
          this.vocabN.push(5);
        }
      }
    } else {
      this.cookieService.set("vocab-N" + n, "true");
      //Lo marcamos
      this.vocabN.push(+n);
    }
    this.sumarTotales();
    this.setKanaArray();
  }

  toogleVocabOption(option: string, event: Event) {

    if (this.vocabOption.includes(option)) {
      //El check esta marcado, lo desmarcamos  
      if (this.vocabOption.length == 1 && option == 'noun') {
        event.preventDefault();
        return;
      } else {
        this.cookieService.set("vocab-option-" + option, "false");
        this.vocabOption.splice(this.vocabOption.indexOf(option), 1);
        if (this.vocabOption.length == 0) {
          this.cookieService.set("vocab-option-noun", "true");
          this.vocabOption.push('noun');
        }
      }
    } else {
      //Lo marcamos
      this.cookieService.set("vocab-option-" + option, "true");
      this.vocabOption.push(option);
    }

    //TODO: Añadir codigo para cambiar las cookies

    this.setKanaArray();
  }



  //Funcion que muestra u oculta onyomi y konyomi
  toogleYomi(): void {
    if (this.showYomi) {
      this.showYomi = false;
      this.cookieService.set('vocab-showYomi', "false");
    } else {
      this.showYomi = true;
      this.cookieService.set('vocab-showYomi', "true");
    }
  }

  //Funcion que muestra u oculta streak y best
  toogleStreak(): void {
    if (this.showStreak) {
      this.showStreak = false;
      this.cookieService.set('vocab-showStreak', "false");
    } else {
      this.showStreak = true;
      this.cookieService.set('vocab-showStreak', "true");
    }
  }

  //Funcion para cambiar la dificultad, 1= facil , 2=medio , 3=dificil
  changeLevel(level: number) {

    this.cookieService.set('vocab-level', level.toString());

    if (level != 1 && level != 2 && level != 3) {
      //No puede ser, no hay otro nivel (error codigo) se pone por defecto el normal (2)
      this.level = 2;
    } else {

      // if(level == 3){
      //   if(this.vocabOption.includes('preNounAdjective') && this.vocabOption.length == 1){
      //     if(this.vocabN.length != 1){
      //       this.level = level;
      //       this.setKanaArray();

      //       return
      //     }else{
      //       this.level = 2;
      //       this.setKanaArray();
      //     }
      //   }
      // }



      this.level = level;
      this.setKanaArray();
    }

  
  }


  setKanaArray() {
    this.kanaArray = [];

    if (this.vocabN.includes(5)) {
      if (this.vocabOption.includes('noun')) {
        this.kanaArray = [... this.kanaArray, ...this.vocabN5NounArray];
      }
      if (this.vocabOption.includes('verb')) {
        this.kanaArray = [... this.kanaArray, ...this.vocabN5VerbArray];
      }
      if (this.vocabOption.includes('adverb')) {
        this.kanaArray = [... this.kanaArray, ...this.vocabN5AdverbArray];
      }
      if (this.vocabOption.includes('adjective')) {
        this.kanaArray = [... this.kanaArray, ...this.vocabN5AdjectiveArray];
      }
      if (this.vocabOption.includes('particle')) {
        this.kanaArray = [... this.kanaArray, ...this.vocabN5ParticleArray];
      }
      if (this.vocabOption.includes('preNounAdjective')) {
        this.kanaArray = [... this.kanaArray, ...this.vocabN5PreNounAdjectiveArray];
      }
      if (this.vocabOption.includes('katakana')) {
        this.kanaArray = [... this.kanaArray, ...this.vocabN5KatakanaArray];
      }
    }

    if (this.vocabN.includes(4)) {
      if (this.vocabOption.includes('noun')) {
        this.kanaArray = [... this.kanaArray, ...this.vocabN4NounArray];
      }
      if (this.vocabOption.includes('verb')) {
        this.kanaArray = [... this.kanaArray, ...this.vocabN4VerbArray];
      }
      if (this.vocabOption.includes('adverb')) {
        this.kanaArray = [... this.kanaArray, ...this.vocabN4AdverbArray];
      }
      if (this.vocabOption.includes('adjective')) {
        this.kanaArray = [... this.kanaArray, ...this.vocabN4AdjectiveArray];
      }
      if (this.vocabOption.includes('particle')) {
        this.kanaArray = [... this.kanaArray, ...this.vocabN4ParticleArray];
      }
      if (this.vocabOption.includes('preNounAdjective')) {
        this.kanaArray = [... this.kanaArray, ...this.vocabN4PreNounAdjectiveArray];
      }
      if (this.vocabOption.includes('katakana')) {
        this.kanaArray = [... this.kanaArray, ...this.vocabN4KatakanaArray];
      }
    }

    if (this.vocabN.includes(3)) {
      if (this.vocabOption.includes('noun')) {
        this.kanaArray = [... this.kanaArray, ...this.vocabN3NounArray];
      }
      if (this.vocabOption.includes('verb')) {
        this.kanaArray = [... this.kanaArray, ...this.vocabN3VerbArray];
      }
      if (this.vocabOption.includes('adverb')) {
        this.kanaArray = [... this.kanaArray, ...this.vocabN3AdverbArray];
      }
      if (this.vocabOption.includes('adjective')) {
        this.kanaArray = [... this.kanaArray, ...this.vocabN3AdjectiveArray];
      }
      if (this.vocabOption.includes('particle')) {
        this.kanaArray = [... this.kanaArray, ...this.vocabN3ParticleArray];
      }
    }

    if (this.vocabN.includes(2)) {
      if (this.vocabOption.includes('noun')) {
        this.kanaArray = [... this.kanaArray, ...this.vocabN2NounArray];
      }
      if (this.vocabOption.includes('verb')) {
        this.kanaArray = [... this.kanaArray, ...this.vocabN2VerbArray];
      }
      if (this.vocabOption.includes('adverb')) {
        this.kanaArray = [... this.kanaArray, ...this.vocabN2AdverbArray];
      }
      if (this.vocabOption.includes('adjective')) {
        this.kanaArray = [... this.kanaArray, ...this.vocabN2AdjectiveArray];
      }
      if (this.vocabOption.includes('particle')) {
        this.kanaArray = [... this.kanaArray, ...this.vocabN2ParticleArray];
      }
    }


    //Me hago una copia de kanaArray
    this.kanaCopiaArray = this.kanaArray;

    if(this.level == 3 && this.kanaArray.length < 9){
      this.changeLevel(2);
    }
    if(this.level == 2 && this.kanaArray.length < 4){
      this.changeLevel(1);
    }

    //Llamo para sacar un nuevo kana con la nueva configuracion ?
    this.nuevoKana();
  }


  //Funcion para conseguir los kanas para adivinar
  nuevoKana() {
    this.typeCardCorrect = false;

    //Dificultad para ver cuantos kanas consigues
    let numeroKanas = 4;
    if (this.level == 1) numeroKanas = 2;
    if (this.level == 2) numeroKanas = 4;
    if (this.level == 3) numeroKanas = 9;

    //Si kanaCopiaArray llega a 0 se vuelve a copiar del original
    if (this.kanaCopiaArray.length == 0) {
      this.kanaCopiaArray = this.kanaArray;
    }

    //Inicializo el array con las opciones
    let randomElements: Vocab[] = [];

    //Comprobar si kanaCopiaArray tiene suficientes kanas para sacar
    if (this.kanaCopiaArray.length < numeroKanas) {
      //No tiene suficientes kanas, entonces conseguimos las que tiene y rellenamos con otros kanas del array original

      //Consigo uno random para adivinar de los que quedan en kanaCopiaArray
      this.adivinar = this.kanaCopiaArray[Math.floor(Math.random() * this.kanaCopiaArray.length)];
      //Quito el que adivina de kanaCopiaArray para que no vuelva a salir
      this.kanaCopiaArray = this.kanaCopiaArray.filter(kana => kana !== this.adivinar);


      //Consigo randoms del array original para rellenar las opciones
      randomElements = [];
      //A las opciones le añado el a adivinar
      randomElements.push(this.adivinar);

      //Consigo kanas random del array original que no sean el mismo que adivino
      while (randomElements.length < numeroKanas) {
        const kanaRandom = this.getRandomElements(this.kanaArray, 1)[0];
        if (!randomElements.find(kana => kana == kanaRandom)) {
          randomElements.push(kanaRandom);
        }
      }
      randomElements = this.shuffleArray(randomElements);

    } else {
      //Conseguir random x kanas
      randomElements = this.getRandomElements(this.kanaCopiaArray, numeroKanas);

      //Despues de conseguir random los kanas elegimos uno random para adivinar
      this.adivinar = randomElements[Math.floor(Math.random() * randomElements.length)];

      //Quito el que adivina de kanaCopiaArray para que no vuelva a salir
      this.kanaCopiaArray = this.kanaCopiaArray.filter(kana => kana !== this.adivinar);
    }

    //Cambio el estado a los kanas para que no salgan en rojo
    for (let i = 0; i < randomElements.length; i++) {
      randomElements[i].estado = true;
    }

    this.options = randomElements;
  }


  //Funcion para elegir el modo de Card
  changeToCardGame() {
    this.cardGame = true;
    this.typeGame = false;

    //Variables que miran si has fallado en typeGame
    this.typeGameFail = false;
    this.typeGameFailShake = false;

    this.streakFailShake = false;

    this.cookieService.set('vocab-cardGame', 'true');
    this.cookieService.set('vocab-typeGame', 'false');
  }

  //Funcion para elegir el modo de Type
  changeToTypeGame() {
    this.cardGame = false;
    this.typeGame = true;

    //Variables que miran si has fallado en typeGame
    this.typeGameFail = false;
    this.typeGameFailShake = false;

    this.streakFailShake = false;

    this.cookieService.set('vocab-cardGame', 'false');
    this.cookieService.set('vocab-typeGame', 'true');
  }


  areSimilar(str1: string, str2: string): boolean {
    return this.compareStrings(str1, str2);
  }
  compareStrings(str1: string, str2: string, threshold: number = 0.85): boolean {
    const similarity = stringSimilarity.compareTwoStrings(str1, str2);
    return similarity >= threshold;
  }


  //Funcion que se ejecuta al pulsar enter en el modo Type para adivinar el kana
  async adivinarTypeGame(event: Event) {

    this.typeGameInput.nativeElement.focus();
    const inputElement = event.target as HTMLInputElement;
    const inputValue = this.typeGameInput.nativeElement.value;

    if (inputValue == '') {
      return;
    }

    const meanings = this.adivinar.meaning.toLowerCase().split(";");

    let similar = false;
    for (const meaning of meanings) {
      if (this.areSimilar(inputValue.toLowerCase(), meaning.trim().toLowerCase())) {
        similar = true
      }
    }

    if (similar) {
      //Acerto el kana, sumar racha y pasar al siguiente
      this.typeGameStreak++;
      this.cookieService.set('vocab-typeGameStreak', this.typeGameStreak.toString());

      this.success = true;
      this.typeGameFail = false;

      await new Promise(f => setTimeout(f, 500));
      this.success = false;

      //Cada 3 seguidas correctas mostrar emote
      if (this.typeGameStreak % 3 == 0) {
        this.showEmoteArray.push(this.emoteArray[Math.floor(Math.random() * this.emoteArray.length)]);
      }

      this.typeCardCorrect = true;

      //this.nuevoKana();
    } else {
      //Indicar que fallo, reiniciar racha
      if (this.typeGameStreak > this.typeGameBest) {
        this.cookieService.set('vocab-typeGameBest', this.typeGameStreak.toString());
        this.typeGameBest = this.typeGameStreak;
      }

      this.typeGameFail = true;

      //Hacer el efect de shake cada vez que falla
      this.typeGameFailShake = false;
      await new Promise(f => setTimeout(f, 100));
      this.typeGameFailShake = true;

      if (this.typeGameStreak > 0) {
        this.animationStreakLose();
      }


      this.typeCardCorrect = false;
      this.success = false;
      this.typeGameStreak = 0;
      this.cookieService.set('vocab-typeGameStreak', this.typeGameStreak.toString());
    }
    this.typeGameShowKanaValue = false;
    this.typeGameInput.nativeElement.value = '';
    this.typeGameInput.nativeElement.focus();
  }

  typeGameSkipKana() {
    if (this.typeGameStreak > this.typeGameBest) {
      this.cookieService.set('vocab-typeGameBest', this.typeGameStreak.toString());
      this.typeGameBest = this.typeGameStreak;
    }

    if (this.typeGameStreak > 0) {
      this.animationStreakLose();
    }

    this.success = false;
    this.typeGameStreak = 0;
    this.cookieService.set('vocab-typeGameStreak', this.typeGameStreak.toString());
    this.typeGameFail = false;
    this.typeGameFailShake = false;
    this.typeGameShowKanaValue = false;

    this.nuevoKana();
  }

  typeGameShowKana() {
    if (this.typeGameStreak > this.typeGameBest) {
      this.cookieService.set('vocab-typeGameBest', this.typeGameStreak.toString());
      this.typeGameBest = this.typeGameStreak;
    }

    if (this.typeGameStreak > 0) {
      this.animationStreakLose();
    }

    this.success = false;
    this.typeGameStreak = 0;
    this.cookieService.set('vocab-typeGameStreak', this.typeGameStreak.toString());
    this.typeGameFail = false;
    this.typeGameFailShake = false;

    //this.nuevoKana();
    this.typeGameShowKanaValue = true;
  }

  async animationStreakLose() {
    this.streakFailShake = true;
    await new Promise(f => setTimeout(f, 500));
    this.streakFailShake = false;

  }

  showMenuLateral() {
    this.menuLateral = true;
  }

  hideMenuLateral() {
    this.menuLateral = false;
  }

  onTouchStart(event: TouchEvent) {
    this.touchStartX = 0;
    this.touchEndX = 0;
    this.touchStartX = event.changedTouches[0].screenX;
  }

  onTouchMove(event: TouchEvent) {
    this.touchEndX = event.changedTouches[0].screenX;
  }

  onTouchEnd(event: TouchEvent) {
    if (this.touchEndX == 0) {
      return;
    }

    const threshold = 50; // Mínima distancia para ser considerado un swipe
    const swipeDistance = this.touchStartX - this.touchEndX;

    // Si la distancia es mayor al umbral y es un swipe hacia la izquierda
    if (swipeDistance > threshold) {
      this.hideMenuLateral();
    }
  }




  setCookies() {

    // if(this.cookieService.check('grammar-grammarN5')){
    //   this.grammarN5 =(this.cookieService.get('grammar-grammarN5') === "true");
    // }else{
    //   this.cookieService.set('grammar-grammarN5', "true");
    //   this.grammarN5 = true;
    // }

    //COOKIES DE LOS TIPOS DE KANJI QUE APARECEN
    if (this.cookieService.check('vocab-N5')) {
      if (this.cookieService.get('vocab-N5') === "true") {
        this.vocabN.push(5);
      }
    } else {
      this.cookieService.set('vocab-N5', "true");
      this.vocabN.push(5);
    }

    if (this.cookieService.check('vocab-N4')) {
      if (this.cookieService.get('vocab-N4') === "true") {
        this.vocabN.push(4);
      }
    } else {
      this.cookieService.set('vocab-N4', "false");
    }

    if (this.cookieService.check('vocab-N3')) {
      if (this.cookieService.get('vocab-N3') === "true") {
        this.vocabN.push(3);
      }
    } else {
      this.cookieService.set('vocab-N3', "false");
    }

    if (this.cookieService.check('vocab-N2')) {
      if (this.cookieService.get('vocab-N2') === "true") {
        this.vocabN.push(2);
      }
    } else {
      this.cookieService.set('vocab-N2', "false");
    }

    //VOCABULARY OPTIONS
    if (this.cookieService.check('vocab-option-noun')) {
      if (this.cookieService.get('vocab-option-noun') === "true") {
        this.vocabOption.push("noun");
      }
    } else {
      this.cookieService.set('vocab-option-noun', "true");
      this.vocabOption.push("noun");
    }

    if (this.cookieService.check('vocab-option-verb')) {
      if (this.cookieService.get('vocab-option-verb') === "true") {
        this.vocabOption.push("verb");
      }
    } else {
      this.cookieService.set('vocab-option-verb', "false");
    }

    if (this.cookieService.check('vocab-option-adverb')) {
      if (this.cookieService.get('vocab-option-adverb') === "true") {
        this.vocabOption.push("adverb");
      }
    } else {
      this.cookieService.set('vocab-option-adverb', "false");
    }

    if (this.cookieService.check('vocab-option-adjective')) {
      if (this.cookieService.get('vocab-option-adjective') === "true") {
        this.vocabOption.push("adjective");
      }
    } else {
      this.cookieService.set('vocab-option-adjective', "false");
    }

    if (this.cookieService.check('vocab-option-particle')) {
      if (this.cookieService.get('vocab-option-particle') === "true") {
        this.vocabOption.push("particle");
      }
    } else {
      this.cookieService.set('vocab-option-particle', "false");
    }

    if (this.cookieService.check('vocab-option-preNounAdjective')) {
      if (this.cookieService.get('vocab-option-preNounAdjective') === "true") {
        this.vocabOption.push("preNounAdjective");
      }
    } else {
      this.cookieService.set('vocab-option-preNounAdjective', "false");
    }

    if (this.cookieService.check('vocab-option-katakana')) {
      if (this.cookieService.get('vocab-option-katakana') === "true") {
        this.vocabOption.push("katakana");
      }
    } else {
      this.cookieService.set('vocab-option-katakana', "false");
    }




    //COOKIES DEL NIVEL - 2 es medium
    if (this.cookieService.check('vocab-level')) {
      this.level = Number(this.cookieService.get('vocab-level'));
    } else {
      this.cookieService.set('vocab-level', "2");
      this.level = 2;
    }

    //COOKIES DEL TIPO QUE ADIVINA
    if (this.cookieService.check('vocab-queAdivina')) {
      this.queAdivina = this.cookieService.get('vocab-queAdivina');
    } else {
      this.cookieService.set('vocab-queAdivina', "kana");
      this.queAdivina = 'kana';
    }

    //COOKIES DE LA PUNTUACION INDIVIDUAL ENTRE CARD Y TYPE GAME
    //Miramos si existe la cookie con el Streak y Best de los modos Card y Type
    if (this.cookieService.check('vocab-cardGameStreak')) {
      this.cardGameStreak = Number(this.cookieService.get('vocab-cardGameStreak'));
    } else {
      this.cookieService.set('vocab-cardGameStreak', "0");
      this.cardGameStreak = 0;
    }
    if (this.cookieService.check('vocab-cardGameBest')) {
      this.cardGameBest = Number(this.cookieService.get('vocab-cardGameBest'));
    } else {
      this.cookieService.set('vocab-cardGameBest', "0");
      this.cardGameBest = 0;
    }

    if (this.cookieService.check('vocab-typeGameStreak')) {
      this.typeGameStreak = Number(this.cookieService.get('vocab-typeGameStreak'));
    } else {
      this.cookieService.set('vocab-typeGameStreak', "0");
      this.typeGameStreak = 0;
    }

    if (this.cookieService.check('vocab-typeGameBest')) {
      this.typeGameBest = Number(this.cookieService.get('vocab-typeGameBest'));
    } else {
      this.cookieService.set('vocab-typeGameBest', "0");
      this.typeGameBest = 0;
    }

    //Definimos que tipo de juego quiere, si seleccionar cartas o escribir la solucion
    //Por defecto elegimos la opcion de cartas
    if (this.cookieService.check('vocab-cardGame')) {
      this.cardGame = (this.cookieService.get('vocab-cardGame') == 'true');
    } else {
      this.cookieService.set('vocab-cardGame', "true");
      this.cardGame = true;
    }
    if (this.cookieService.check('vocab-typeGame')) {
      this.typeGame = (this.cookieService.get('vocab-typeGame') == 'true');
    } else {
      this.cookieService.set('vocab-typeGame', "false");
      this.typeGame = false;
    }

    //COOKIES PARA OCULTAR PUNTUACION
    if (this.cookieService.check('vocab-showStreak')) {
      this.showStreak = (this.cookieService.get('vocab-showStreak') === "true");
    } else {
      this.cookieService.set('vocab-showStreak', "true");
      this.showStreak = true;
    }

    //COOKIES PARA OCULTAR YOMI
    if (this.cookieService.check('vocab-showYomi')) {
      this.showYomi = (this.cookieService.get('vocab-showYomi') === "true");
    } else {
      this.cookieService.set('vocab-showYomi', "true");
      this.showYomi = true;
    }
  }


  toogletooltipTypeGameAdvice() {
    this.tooltip.toggle();
  }


  //Funcion para conseguir elementos random de un array
  getRandomElements<T>(array: T[], numElements: number): T[] {
    // Hacemos una copia del array original para no modificarlo
    let arrayCopy = [];
    arrayCopy = [...array];
    const result: T[] = [];

    for (let i = 0; i < numElements; i++) {
      if (arrayCopy.length === 0) {
        break; // Si no hay más elementos, terminamos el bucle
      }

      const randomIndex = Math.floor(Math.random() * arrayCopy.length);
      const element = arrayCopy.splice(randomIndex, 1)[0];
      result.push(element);
    }

    return result;
  }

  shuffleArray(array: Vocab[]) {
    var m = array.length, t, i;

    while (m) {
      i = Math.floor(Math.random() * m--);
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }

    return array;
  }



  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }


  validateRange() {

    // Si la diferencia es menor a la mínima permitida, ajustamos los valores
    if (((this.maxVocabN5Noun - this.minVocabN5Noun) < 8) || ((this.maxVocabN5Verb - this.minVocabN5Verb) < 8) || ((this.maxVocabN5Adverb - this.minVocabN5Adverb) < 8) || ((this.maxVocabN5Adjective - this.minVocabN5Adjective) < 8)
      || ((this.maxVocabN5Particle - this.minVocabN5Particle) < 8) || ((this.maxVocabN5Katakana - this.minVocabN5Katakana) < 8)) {
      //No puedes guardar
      this.sliderN5Error = "The difference between the minimum and maximum must be at least 9. All vocab will be shown.";
      return;
    } else {
      this.sliderN5Error = "";
    }

    if (((this.maxVocabN4Noun - this.minVocabN4Noun) < 8) || ((this.maxVocabN4Verb - this.minVocabN4Verb) < 8) || ((this.maxVocabN4Adverb - this.minVocabN4Adverb) < 8) || ((this.maxVocabN4Adjective - this.minVocabN4Adjective) < 8)
      || ((this.maxVocabN4Particle - this.minVocabN4Particle) < 8) || ((this.maxVocabN4Katakana - this.minVocabN4Katakana) < 8)) {
      //No puedes guardar
      this.sliderN4Error = "The difference between the minimum and maximum must be at least 9. All vocab will be shown.";
      return;
    } else {
      this.sliderN4Error = "";
    }


    if (((this.maxVocabN3Noun - this.minVocabN3Noun) < 8) || ((this.maxVocabN3Verb - this.minVocabN3Verb) < 8) || ((this.maxVocabN3Adverb - this.minVocabN3Adverb) < 8) || ((this.maxVocabN3Adjective - this.minVocabN3Adjective) < 8)
      || ((this.maxVocabN3Particle - this.minVocabN3Particle) < 8) ) {
      //No puedes guardar
      this.sliderN3Error = "The difference between the minimum and maximum must be at least 9. All vocab will be shown.";
      return;
    } else {
      this.sliderN3Error = "";
    }


    if (((this.maxVocabN2Noun - this.minVocabN2Noun) < 8) || ((this.maxVocabN2Verb - this.minVocabN2Verb) < 8) || ((this.maxVocabN2Adverb - this.minVocabN2Adverb) < 8) || ((this.maxVocabN2Adjective - this.minVocabN2Adjective) < 8)
      || ((this.maxVocabN2Particle - this.minVocabN2Particle) < 8)) {
      //No puedes guardar
      this.sliderN2Error = "The difference between the minimum and maximum must be at least 9. All vocab will be shown.";
      return;
    } else {
      this.sliderN2Error = "";
    }




    this.closeModal();
    this.setKanaArray();

  }

  minusMin(kanjiN: number, type: string) {
    if (kanjiN == 5 && type == 'noun') {
      if (this.minVocabN5Noun > 1) {
        this.minVocabN5Noun--;
      }
    }
    if (kanjiN == 5 && type == 'verb') {
      if (this.minVocabN5Verb > 1) {
        this.minVocabN5Verb--;
      }
    }
    if (kanjiN == 5 && type == 'adverb') {
      if (this.minVocabN5Adverb > 1) {
        this.minVocabN5Adverb--;
      }
    }
    if (kanjiN == 5 && type == 'adjective') {
      if (this.minVocabN5Adjective > 1) {
        this.minVocabN5Adjective--;
      }
    }
    if (kanjiN == 5 && type == 'particle') {
      if (this.minVocabN5Particle > 1) {
        this.minVocabN5Particle--;
      }
    }
    if (kanjiN == 5 && type == 'katakana') {
      if (this.minVocabN5Katakana > 1) {
        this.minVocabN5Katakana--;
      }
    }


    //N4
    if (kanjiN == 4 && type == 'noun') {
      if (this.minVocabN4Noun > 1) {
        this.minVocabN4Noun--;
      }
    }
    if (kanjiN == 4 && type == 'verb') {
      if (this.minVocabN4Verb > 1) {
        this.minVocabN4Verb--;
      }
    }
    if (kanjiN == 4 && type == 'adverb') {
      if (this.minVocabN4Adverb > 1) {
        this.minVocabN4Adverb--;
      }
    }
    if (kanjiN == 4 && type == 'adjective') {
      if (this.minVocabN4Adjective > 1) {
        this.minVocabN4Adjective--;
      }
    }
    if (kanjiN == 4 && type == 'particle') {
      if (this.minVocabN4Particle > 1) {
        this.minVocabN4Particle--;
      }
    }
    if (kanjiN == 4 && type == 'katakana') {
      if (this.minVocabN4Katakana > 1) {
        this.minVocabN4Katakana--;
      }
    }



    //N3
    if (kanjiN == 3 && type == 'noun') {
      if (this.minVocabN3Noun > 1) {
        this.minVocabN3Noun--;
      }
    }
    if (kanjiN == 3 && type == 'verb') {
      if (this.minVocabN3Verb > 1) {
        this.minVocabN3Verb--;
      }
    }
    if (kanjiN == 3 && type == 'adverb') {
      if (this.minVocabN3Adverb > 1) {
        this.minVocabN3Adverb--;
      }
    }
    if (kanjiN == 3 && type == 'adjective') {
      if (this.minVocabN3Adjective > 1) {
        this.minVocabN3Adjective--;
      }
    }
    if (kanjiN == 3 && type == 'particle') {
      if (this.minVocabN3Particle > 1) {
        this.minVocabN3Particle--;
      }
    }




    //N2
    if (kanjiN == 2 && type == 'noun') {
      if (this.minVocabN2Noun > 1) {
        this.minVocabN2Noun--;
      }
    }
    if (kanjiN == 2 && type == 'verb') {
      if (this.minVocabN2Verb > 1) {
        this.minVocabN2Verb--;
      }
    }
    if (kanjiN == 2 && type == 'adverb') {
      if (this.minVocabN2Adverb > 1) {
        this.minVocabN2Adverb--;
      }
    }
    if (kanjiN == 2 && type == 'adjective') {
      if (this.minVocabN2Adjective > 1) {
        this.minVocabN2Adjective--;
      }
    }
    if (kanjiN == 2 && type == 'particle') {
      if (this.minVocabN2Particle > 1) {
        this.minVocabN2Particle--;
      }
    }


  }

  plusMin(kanjiN: number, type: string) {
    // if(kanjiN == 5){
    //   if(this.minKanjiN5 < this.kanjiN5Array.length && this.minKanjiN5 < this.maxKanjiN5){
    //     this.minKanjiN5++;
    //   }
    // }

    if (kanjiN == 5 && type == 'noun') {
      if (this.minVocabN5Noun < this.totalN5Noun && this.minVocabN5Noun < this.maxVocabN5Noun) {
        this.minVocabN5Noun++;
      }
    }
    if (kanjiN == 5 && type == 'verb') {
      if (this.minVocabN5Verb < this.totalN5Verb && this.minVocabN5Verb < this.maxVocabN5Verb) {
        this.minVocabN5Verb++;
      }
    }
    if (kanjiN == 5 && type == 'adverb') {
      if (this.minVocabN5Adverb < this.totalN5Adverb && this.minVocabN5Adverb < this.maxVocabN5Adverb) {
        this.minVocabN5Adverb++;
      }
    }
    if (kanjiN == 5 && type == 'adjective') {
      if (this.minVocabN5Adjective < this.totalN5Adjective && this.minVocabN5Adjective < this.maxVocabN5Adjective) {
        this.minVocabN5Adjective++;
      }
    }
    if (kanjiN == 5 && type == 'particle') {
      if (this.minVocabN5Particle < this.totalN5Particle && this.minVocabN5Particle < this.maxVocabN5Particle) {
        this.minVocabN5Particle++;
      }
    }
    if (kanjiN == 5 && type == 'katakana') {
      if (this.minVocabN5Katakana < this.totalN5Katakana && this.minVocabN5Katakana < this.maxVocabN5Katakana) {
        this.minVocabN5Katakana++;
      }
    }



    //N4
    if (kanjiN == 4 && type == 'noun') {
      if (this.minVocabN4Noun < this.totalN4Noun && this.minVocabN4Noun < this.maxVocabN4Noun) {
        this.minVocabN4Noun++;
      }
    }
    if (kanjiN == 4 && type == 'verb') {
      if (this.minVocabN4Verb < this.totalN4Verb && this.minVocabN4Verb < this.maxVocabN4Verb) {
        this.minVocabN4Verb++;
      }
    }
    if (kanjiN == 4 && type == 'adverb') {
      if (this.minVocabN4Adverb < this.totalN4Adverb && this.minVocabN4Adverb < this.maxVocabN4Adverb) {
        this.minVocabN4Adverb++;
      }
    }
    if (kanjiN == 4 && type == 'adjective') {
      if (this.minVocabN4Adjective < this.totalN4Adjective && this.minVocabN4Adjective < this.maxVocabN4Adjective) {
        this.minVocabN4Adjective++;
      }
    }
    if (kanjiN == 4 && type == 'particle') {
      if (this.minVocabN4Particle < this.totalN4Particle && this.minVocabN4Particle < this.maxVocabN4Particle) {
        this.minVocabN4Particle++;
      }
    }
    if (kanjiN == 4 && type == 'katakana') {
      if (this.minVocabN4Katakana < this.totalN4Katakana && this.minVocabN4Katakana < this.maxVocabN4Katakana) {
        this.minVocabN4Katakana++;
      }
    }




    //N3
    if (kanjiN == 3 && type == 'noun') {
      if (this.minVocabN3Noun < this.totalN3Noun && this.minVocabN3Noun < this.maxVocabN3Noun) {
        this.minVocabN3Noun++;
      }
    }
    if (kanjiN == 3 && type == 'verb') {
      if (this.minVocabN3Verb < this.totalN3Verb && this.minVocabN3Verb < this.maxVocabN3Verb) {
        this.minVocabN3Verb++;
      }
    }
    if (kanjiN == 3 && type == 'adverb') {
      if (this.minVocabN3Adverb < this.totalN3Adverb && this.minVocabN3Adverb < this.maxVocabN3Adverb) {
        this.minVocabN3Adverb++;
      }
    }
    if (kanjiN == 3 && type == 'adjective') {
      if (this.minVocabN3Adjective < this.totalN3Adjective && this.minVocabN3Adjective < this.maxVocabN3Adjective) {
        this.minVocabN3Adjective++;
      }
    }
    if (kanjiN == 3 && type == 'particle') {
      if (this.minVocabN3Particle < this.totalN3Particle && this.minVocabN3Particle < this.maxVocabN3Particle) {
        this.minVocabN3Particle++;
      }
    }




    //N2
    if (kanjiN == 2 && type == 'noun') {
      if (this.minVocabN2Noun < this.totalN2Noun && this.minVocabN2Noun < this.maxVocabN2Noun) {
        this.minVocabN2Noun++;
      }
    }
    if (kanjiN == 2 && type == 'verb') {
      if (this.minVocabN2Verb < this.totalN2Verb && this.minVocabN2Verb < this.maxVocabN2Verb) {
        this.minVocabN2Verb++;
      }
    }
    if (kanjiN == 2 && type == 'adverb') {
      if (this.minVocabN2Adverb < this.totalN2Adverb && this.minVocabN2Adverb < this.maxVocabN2Adverb) {
        this.minVocabN2Adverb++;
      }
    }
    if (kanjiN == 2 && type == 'adjective') {
      if (this.minVocabN2Adjective < this.totalN2Adjective && this.minVocabN2Adjective < this.maxVocabN2Adjective) {
        this.minVocabN2Adjective++;
      }
    }
    if (kanjiN == 2 && type == 'particle') {
      if (this.minVocabN2Particle < this.totalN2Particle && this.minVocabN2Particle < this.maxVocabN2Particle) {
        this.minVocabN2Particle++;
      }
    }




  }

  minusMax(kanjiN: number, type: string) {
    // if(kanjiN == 5){
    //   if(this.maxKanjiN5 > 1 && this.maxKanjiN5 > this.minKanjiN5){
    //     this.maxKanjiN5--;
    //   }
    // }

    if (kanjiN == 5 && type == 'noun') {
      if (this.maxVocabN5Noun > 1 && this.maxVocabN5Noun > this.minVocabN5Noun) {
        this.maxVocabN5Noun--;
      }
    }
    if (kanjiN == 5 && type == 'verb') {
      if (this.maxVocabN5Verb > 1 && this.maxVocabN5Verb > this.minVocabN5Verb) {
        this.maxVocabN5Verb--;
      }
    }
    if (kanjiN == 5 && type == 'adverb') {
      if (this.maxVocabN5Adverb > 1 && this.maxVocabN5Adverb > this.minVocabN5Adverb) {
        this.maxVocabN5Adverb--;
      }
    }
    if (kanjiN == 5 && type == 'adjective') {
      if (this.maxVocabN5Adjective > 1 && this.maxVocabN5Adjective > this.minVocabN5Adjective) {
        this.maxVocabN5Adjective--;
      }
    }
    if (kanjiN == 5 && type == 'particle') {
      if (this.maxVocabN5Particle > 1 && this.maxVocabN5Particle > this.minVocabN5Particle) {
        this.maxVocabN5Particle--;
      }
    }
    if (kanjiN == 5 && type == 'katakana') {
      if (this.maxVocabN5Katakana > 1 && this.maxVocabN5Katakana > this.minVocabN5Katakana) {
        this.maxVocabN5Katakana--;
      }
    }



    //N4

    if (kanjiN == 4 && type == 'noun') {
      if (this.maxVocabN4Noun > 1 && this.maxVocabN4Noun > this.minVocabN4Noun) {
        this.maxVocabN4Noun--;
      }
    }
    if (kanjiN == 4 && type == 'verb') {
      if (this.maxVocabN4Verb > 1 && this.maxVocabN4Verb > this.minVocabN4Verb) {
        this.maxVocabN4Verb--;
      }
    }
    if (kanjiN == 4 && type == 'adverb') {
      if (this.maxVocabN4Adverb > 1 && this.maxVocabN4Adverb > this.minVocabN4Adverb) {
        this.maxVocabN4Adverb--;
      }
    }
    if (kanjiN == 4 && type == 'adjective') {
      if (this.maxVocabN4Adjective > 1 && this.maxVocabN4Adjective > this.minVocabN4Adjective) {
        this.maxVocabN4Adjective--;
      }
    }
    if (kanjiN == 4 && type == 'particle') {
      if (this.maxVocabN4Particle > 1 && this.maxVocabN4Particle > this.minVocabN4Particle) {
        this.maxVocabN4Particle--;
      }
    }
    if (kanjiN == 4 && type == 'katakana') {
      if (this.maxVocabN4Katakana > 1 && this.maxVocabN4Katakana > this.minVocabN4Katakana) {
        this.maxVocabN4Katakana--;
      }
    }




    //N3

    if (kanjiN == 3 && type == 'noun') {
      if (this.maxVocabN3Noun > 1 && this.maxVocabN3Noun > this.minVocabN3Noun) {
        this.maxVocabN3Noun--;
      }
    }
    if (kanjiN == 3 && type == 'verb') {
      if (this.maxVocabN3Verb > 1 && this.maxVocabN3Verb > this.minVocabN3Verb) {
        this.maxVocabN3Verb--;
      }
    }
    if (kanjiN == 3 && type == 'adverb') {
      if (this.maxVocabN3Adverb > 1 && this.maxVocabN3Adverb > this.minVocabN3Adverb) {
        this.maxVocabN3Adverb--;
      }
    }
    if (kanjiN == 3 && type == 'adjective') {
      if (this.maxVocabN3Adjective > 1 && this.maxVocabN3Adjective > this.minVocabN3Adjective) {
        this.maxVocabN3Adjective--;
      }
    }
    if (kanjiN == 3 && type == 'particle') {
      if (this.maxVocabN3Particle > 1 && this.maxVocabN3Particle > this.minVocabN3Particle) {
        this.maxVocabN3Particle--;
      }
    }




    //N2

    if (kanjiN == 2 && type == 'noun') {
      if (this.maxVocabN2Noun > 1 && this.maxVocabN2Noun > this.minVocabN2Noun) {
        this.maxVocabN2Noun--;
      }
    }
    if (kanjiN == 2 && type == 'verb') {
      if (this.maxVocabN2Verb > 1 && this.maxVocabN2Verb > this.minVocabN2Verb) {
        this.maxVocabN2Verb--;
      }
    }
    if (kanjiN == 2 && type == 'adverb') {
      if (this.maxVocabN2Adverb > 1 && this.maxVocabN2Adverb > this.minVocabN2Adverb) {
        this.maxVocabN2Adverb--;
      }
    }
    if (kanjiN == 2 && type == 'adjective') {
      if (this.maxVocabN2Adjective > 1 && this.maxVocabN2Adjective > this.minVocabN2Adjective) {
        this.maxVocabN2Adjective--;
      }
    }
    if (kanjiN == 2 && type == 'particle') {
      if (this.maxVocabN2Particle > 1 && this.maxVocabN2Particle > this.minVocabN2Particle) {
        this.maxVocabN2Particle--;
      }
    }


  }

  plusMax(kanjiN: number, type: string) {
    // if(kanjiN == 5){
    //   if(this.maxKanjiN5 < this.kanjiN5Array.length){
    //     this.maxKanjiN5++;
    //   }
    // }
    if (kanjiN == 5 && type == 'noun') {
      if (this.maxVocabN5Noun < this.totalN5Noun) {
        this.maxVocabN5Noun++;
      }
    }
    if (kanjiN == 5 && type == 'verb') {
      if (this.maxVocabN5Verb < this.totalN5Verb) {
        this.maxVocabN5Verb++;
      }
    }
    if (kanjiN == 5 && type == 'adverb') {
      if (this.maxVocabN5Adverb < this.totalN5Adverb) {
        this.maxVocabN5Adverb++;
      }
    }
    if (kanjiN == 5 && type == 'adjective') {
      if (this.maxVocabN5Adjective < this.totalN5Adjective) {
        this.maxVocabN5Adjective++;
      }
    }
    if (kanjiN == 5 && type == 'particle') {
      if (this.maxVocabN5Particle < this.totalN5Particle) {
        this.maxVocabN5Particle++;
      }
    }
    if (kanjiN == 5 && type == 'katakana') {
      if (this.maxVocabN5Katakana < this.totalN5Katakana) {
        this.maxVocabN5Katakana++;
      }
    }


    //N4
    if (kanjiN == 4 && type == 'noun') {
      if (this.maxVocabN4Noun < this.totalN4Noun) {
        this.maxVocabN4Noun++;
      }
    }
    if (kanjiN == 4 && type == 'verb') {
      if (this.maxVocabN4Verb < this.totalN4Verb) {
        this.maxVocabN4Verb++;
      }
    }
    if (kanjiN == 4 && type == 'adverb') {
      if (this.maxVocabN4Adverb < this.totalN4Adverb) {
        this.maxVocabN4Adverb++;
      }
    }
    if (kanjiN == 4 && type == 'adjective') {
      if (this.maxVocabN4Adjective < this.totalN4Adjective) {
        this.maxVocabN4Adjective++;
      }
    }
    if (kanjiN == 4 && type == 'particle') {
      if (this.maxVocabN4Particle < this.totalN4Particle) {
        this.maxVocabN4Particle++;
      }
    }
    if (kanjiN == 4 && type == 'katakana') {
      if (this.maxVocabN4Katakana < this.totalN4Katakana) {
        this.maxVocabN4Katakana++;
      }
    }




    //N3
    if (kanjiN == 3 && type == 'noun') {
      if (this.maxVocabN3Noun < this.totalN3Noun) {
        this.maxVocabN3Noun++;
      }
    }
    if (kanjiN == 3 && type == 'verb') {
      if (this.maxVocabN3Verb < this.totalN3Verb) {
        this.maxVocabN3Verb++;
      }
    }
    if (kanjiN == 3 && type == 'adverb') {
      if (this.maxVocabN3Adverb < this.totalN3Adverb) {
        this.maxVocabN3Adverb++;
      }
    }
    if (kanjiN == 3 && type == 'adjective') {
      if (this.maxVocabN3Adjective < this.totalN3Adjective) {
        this.maxVocabN3Adjective++;
      }
    }
    if (kanjiN == 3 && type == 'particle') {
      if (this.maxVocabN3Particle < this.totalN3Particle) {
        this.maxVocabN3Particle++;
      }
    }




    //N2
    if (kanjiN == 2 && type == 'noun') {
      if (this.maxVocabN2Noun < this.totalN2Noun) {
        this.maxVocabN2Noun++;
      }
    }
    if (kanjiN == 2 && type == 'verb') {
      if (this.maxVocabN2Verb < this.totalN2Verb) {
        this.maxVocabN2Verb++;
      }
    }
    if (kanjiN == 2 && type == 'adverb') {
      if (this.maxVocabN2Adverb < this.totalN2Adverb) {
        this.maxVocabN2Adverb++;
      }
    }
    if (kanjiN == 2 && type == 'adjective') {
      if (this.maxVocabN2Adjective < this.totalN2Adjective) {
        this.maxVocabN2Adjective++;
      }
    }
    if (kanjiN == 2 && type == 'particle') {
      if (this.maxVocabN2Particle < this.totalN2Particle) {
        this.maxVocabN2Particle++;
      }
    }

  }
}
