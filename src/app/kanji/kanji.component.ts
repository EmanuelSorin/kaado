import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Kanji } from './kanji';
import { kanjiN5 } from './kanjiN5';
import * as stringSimilarity from 'string-similarity';
import { kanjiN1 } from './kanjiN1';
import { kanjiN2 } from './kanjiN2';
import { kanjiN3 } from './kanjiN3';
import { kanjiN4 } from './kanjiN4';
import Swal from 'sweetalert2'
import { MatTooltip } from '@angular/material/tooltip';


@Component({
  selector: 'app-kanji',
  templateUrl: './kanji.component.html',
  styleUrls: ['./kanji.component.scss']
})
export class KanjiComponent {
  constructor(private cookieService: CookieService, private responsive: BreakpointObserver) {}

  @ViewChild('typeGameInput') typeGameInput: ElementRef;
  @ViewChild('tooltipTypeGameAdvice', { static: false }) tooltip: MatTooltip;

  //Conseguimos los array con los distintos kanas
  kanjiN5Array: Kanji[] = JSON.parse(kanjiN5).map((item: any) => new Kanji(item.id, item.kanji, item.onyomi_text, item.onyomi_kana, item.kunyomi_text, item.kunyomi_kana, item.meaning));
  kanjiN4Array: Kanji[] = JSON.parse(kanjiN4).map((item: any) => new Kanji(item.id, item.kanji, item.onyomi_text, item.onyomi_kana, item.kunyomi_text, item.kunyomi_kana, item.meaning));
  kanjiN3Array: Kanji[] = JSON.parse(kanjiN3).map((item: any) => new Kanji(item.id, item.kanji, item.onyomi_text, item.onyomi_kana, item.kunyomi_text, item.kunyomi_kana, item.meaning));
  kanjiN2Array: Kanji[] = JSON.parse(kanjiN2).map((item: any) => new Kanji(item.id, item.kanji, item.onyomi_text, item.onyomi_kana, item.kunyomi_text, item.kunyomi_kana, item.meaning));
  kanjiN1Array: Kanji[] = JSON.parse(kanjiN1).map((item: any) => new Kanji(item.id, item.kanji, item.onyomi_text, item.onyomi_kana, item.kunyomi_text, item.kunyomi_kana, item.meaning));


  //Opciones de kanji
  kanjiN5: boolean = true;
  kanjiN4: boolean = false;
  kanjiN3: boolean = false;
  kanjiN2: boolean = false;
  kanjiN1: boolean = false;

  kanaCopiaArray: Kanji[] = [];
  kanaArray : Kanji[] = [];


  //Opcion que se muestra para adivinar
  adivinar: Kanji;

  //Opciones que puede adivinar el usuario
  options: Kanji[];

  //Booleano para cuando acierta
  success:boolean = false;

  //Nivel de dificultad, facil = 1, normal=2 y dificil=3
  level:number = 2;


  //Numero de veces que acierta consecutivamente
  racha: number;
  best: number;

  cardGameStreak:number;
  typeGameStreak: number;

  cardGameBest: number;
  typeGameBest: number;

  //Que se muestra para adivinar kana o romaji
  queAdivina: string;

  //
  cardGame:boolean = true;
  typeGame:boolean = false;
  typeGameFail:boolean = false;
  typeGameFailShake:boolean=false;
  typeGameShowKanaValue : boolean =false;

  streakFailShake:boolean = false;

  //Emotes para mostrar cuando acierta
  emoteArray :string[] = ['🔥','💯','😎','💪','👌','✌️','😄','🎉','✨','💥'] ;
  showEmoteArray:string[] = [];

  // Añadir una firma de índice
  [key: string]: any;

  showYomi: boolean = true;
  showStreak: boolean = true;

  //Variables para responsive
  isPhone: boolean = false;

  menuLateral: boolean = false;

  typeCardCorrect: boolean = false;

  //Eventos para ver el desplazamiento del movil
  private touchStartX: number = 0;
  private touchEndX: number = 0;


  //Variables SLIDER
  isModalOpen = false;
  minKanjiN5:number = 1;
  maxKanjiN5 :number = this.kanjiN5Array.length;
  sliderErrorN5: string;
  minKanjiN4:number = 1;
  maxKanjiN4 :number = this.kanjiN4Array.length;
  sliderErrorN4: string;
  minKanjiN3:number = 1;
  maxKanjiN3 :number = this.kanjiN3Array.length;
  sliderErrorN3: string;
  minKanjiN2:number = 1;
  maxKanjiN2 :number = this.kanjiN2Array.length;
  sliderErrorN2: string;
  minKanjiN1:number = 1;
  maxKanjiN1 :number = this.kanjiN1Array.length;
  sliderErrorN1: string;



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

    this.setCookies();

    //Llamamos para conseguir los kana
    this.setKanaArray();

  }

  async resolver(seleccionado: Kanji){
    if(seleccionado == this.adivinar){


        this.cardGameStreak++;
        this.cookieService.set('kanji-cardGameStreak', this.cardGameStreak.toString());

         //Cada 3 seguidas correctas mostrar emote
        if(this.cardGameStreak % 3 == 0){
          this.showEmoteArray.push( this.emoteArray[Math.floor(Math.random() * this.emoteArray.length)]);
        }


      //Mostramos el tick verde 0.5 segundos
      this.success = true;
      await new Promise(f => setTimeout(f, 500));
      this.success = false;

      this.nuevoKana();


    }else{
      if(this.cardGameStreak > this.cardGameBest){
        this.cookieService.set('kanji-cardGameBest', this.cardGameStreak.toString());
        this.cardGameBest=this.cardGameStreak;
      }
      if(this.typeGameStreak > 0){
        this.animationStreakLose();
      }
      this.cardGameStreak = 0;
      this.cookieService.set('kanji-cardGameStreak', this.cardGameStreak.toString());
      this.success = false;
      seleccionado.estado = false;
    }
  }

  //Funcion que decide si mostrar kana o romaji en los Card
  toogleQueAdivina(){
    if(this.queAdivina == 'kana'){
      this.queAdivina = 'romaji';
      this.cookieService.set('kanji-queAdivina', "romaji");
    }else{
      this.queAdivina = 'kana';
      this.cookieService.set('kanji-queAdivina', "kana");
    }
    this.setKanaArray();
  }

  //Funcion que decide que kanas mostrar, main, dakuten o combination
  toogleKanaOptions(variableName: string, event: Event): void{
    if(variableName == 'kanjiN5' && !this.kanjiN4 && !this.kanjiN3 && !this.kanjiN2 && !this.kanjiN1 ){
      //Si quiere deseleccionar kanjiN5 y las demas no estan marcadas no se permite
      event.preventDefault();
      return;
    }

    this.cookieService.set("kanji-"+variableName, (!this[variableName]).toString());
    this[variableName] = !this[variableName];

    if(!this.kanjiN5 && !this.kanjiN4 && !this.kanjiN3 && !this.kanjiN2 && !this.kanjiN1){
      this.kanjiN5 = true;
      this.cookieService.set('kanji-kanjiN5', "true");

    }

    this.setKanaArray();
  }

   //Funcion que muestra u oculta onyomi y konyomi
   toogleYomi(): void{
    if(this.showYomi){
      this.showYomi = false;
      this.cookieService.set('kanji-showYomi', "false");
    }else{
      this.showYomi = true;
      this.cookieService.set('kanji-showYomi', "true");
    }
  }

    //Funcion que muestra u oculta streak y best
    toogleStreak(): void{
      if(this.showStreak){
        this.showStreak = false;
        this.cookieService.set('kanji-showStreak', "false");
      }else{
        this.showStreak = true;
        this.cookieService.set('kanji-showStreak', "true");
      }
    }

  //Funcion para cambiar la dificultad, 1= facil , 2=medio , 3=dificil
  changeLevel(level:number){
    if(level != 1 && level != 2 && level != 3){
      //No puede ser, no hay otro nivel (error codigo) se pone por defecto el normal (2)
      this.level=2;
    }else{
      this.level=level;
      this.setKanaArray();
    }

    this.cookieService.set('kanji-level', level.toString());
  }


  setKanaArray(){
    this.kanaArray = [];

    //Añadir mainKata o dakuten o combination
    if(this.kanjiN5){      
      if((this.maxKanjiN5 - this.minKanjiN5) < 8){
        this.kanaArray = [ ... this.kanaArray, ...this.kanjiN5Array];
      }else{
        this.kanaArray = [ ... this.kanaArray, ...this.kanjiN5Array.slice(this.minKanjiN5-1,this.maxKanjiN5)];
      }    
    }

    if(this.kanjiN4){
      if((this.maxKanjiN4 - this.minKanjiN4) < 8){
        this.kanaArray = [ ... this.kanaArray, ...this.kanjiN4Array];
      }else{
        this.kanaArray = [ ... this.kanaArray, ...this.kanjiN4Array.slice(this.minKanjiN4-1,this.maxKanjiN4)];
      }     
    }

    if(this.kanjiN3){
      if((this.maxKanjiN3 - this.minKanjiN3) < 8){
        this.kanaArray = [ ... this.kanaArray, ...this.kanjiN3Array];
      }else{
        this.kanaArray = [ ... this.kanaArray, ...this.kanjiN3Array.slice(this.minKanjiN3-1,this.maxKanjiN3)];
      }  
    }

    if(this.kanjiN2){
      if((this.maxKanjiN2 - this.minKanjiN2) < 8){
        this.kanaArray = [ ... this.kanaArray, ...this.kanjiN2Array];
      }else{
        this.kanaArray = [ ... this.kanaArray, ...this.kanjiN2Array.slice(this.minKanjiN2-1,this.maxKanjiN2)];
      } 
    } 

    if(this.kanjiN1){
      if((this.maxKanjiN1 - this.minKanjiN1) < 8){
        this.kanaArray = [ ... this.kanaArray, ...this.kanjiN1Array];
      }else{
        this.kanaArray = [ ... this.kanaArray, ...this.kanjiN1Array.slice(this.minKanjiN1-1,this.maxKanjiN1)];
      } 
    }


    //Me hago una copia de kanaArray
    this.kanaCopiaArray = this.kanaArray;

    //Llamo para sacar un nuevo kana con la nueva configuracion ?
    this.nuevoKana();
  }


  //Funcion para conseguir los kanas para adivinar
  nuevoKana(){
    this.typeCardCorrect = false;

    //Dificultad para ver cuantos kanas consigues
    let numeroKanas = 4;
    if(this.level == 1) numeroKanas=2;
    if(this.level == 2) numeroKanas=4;
    if(this.level == 3) numeroKanas=9;

    //Si kanaCopiaArray llega a 0 se vuelve a copiar del original
    if(this.kanaCopiaArray.length == 0){
      this.kanaCopiaArray = this.kanaArray;
    }

    //Inicializo el array con las opciones
    let randomElements :Kanji[] = [];

    //Comprobar si kanaCopiaArray tiene suficientes kanas para sacar
    if(this.kanaCopiaArray.length < numeroKanas){
      //No tiene suficientes kanas, entonces conseguimos las que tiene y rellenamos con otros kanas del array original

      //Consigo uno random para adivinar de los que quedan en kanaCopiaArray
      this.adivinar = this.kanaCopiaArray[Math.floor(Math.random() * this.kanaCopiaArray.length)];
      //Quito el que adivina de kanaCopiaArray para que no vuelva a salir
      this.kanaCopiaArray = this.kanaCopiaArray.filter(kana => kana !==  this.adivinar);


      //Consigo randoms del array original para rellenar las opciones
       randomElements = [];
      //A las opciones le añado el a adivinar
      randomElements.push(this.adivinar);

      //Consigo kanas random del array original que no sean el mismo que adivino
      while(randomElements.length < numeroKanas){
        const kanaRandom = this.getRandomElements( this.kanaArray, 1)[0];
        if( ! randomElements.find(kana => kana == kanaRandom)){
          randomElements.push( kanaRandom );
        }
      }
      randomElements = this.shuffleArray(randomElements);

    }else{
      //Conseguir random x kanas
       randomElements = this.getRandomElements( this.kanaCopiaArray, numeroKanas);

      //Despues de conseguir random los kanas elegimos uno random para adivinar
      this.adivinar = randomElements[Math.floor(Math.random() * randomElements.length)];

      //Quito el que adivina de kanaCopiaArray para que no vuelva a salir
      this.kanaCopiaArray = this.kanaCopiaArray.filter(kana => kana !==  this.adivinar);
    }

    //Cambio el estado a los kanas para que no salgan en rojo
    for (let i = 0; i < randomElements.length; i++) {
      randomElements[i].estado=true;
    }

    this.options = randomElements;
  }


  //Funcion para elegir el modo de Card
  changeToCardGame(){
    this.cardGame = true;
    this.typeGame = false;

    //Variables que miran si has fallado en typeGame
    this.typeGameFail=false;
    this.typeGameFailShake=false;

    this.streakFailShake = false;

    this.cookieService.set('kanji-cardGame','true');
    this.cookieService.set('kanji-typeGame', 'false');
  }

  //Funcion para elegir el modo de Type
  changeToTypeGame(){
    this.cardGame = false;
    this.typeGame = true;

    //Variables que miran si has fallado en typeGame
    this.typeGameFail=false;
    this.typeGameFailShake=false;

    this.streakFailShake = false;

    this.cookieService.set('kanji-cardGame','false');
    this.cookieService.set('kanji-typeGame', 'true');
  }


  areSimilar(str1: string, str2: string): boolean {
    return this.compareStrings(str1, str2);
  }
  compareStrings(str1: string, str2: string, threshold: number = 0.85): boolean {
    const similarity = stringSimilarity.compareTwoStrings(str1, str2);
    return similarity >= threshold;
  }


  //Funcion que se ejecuta al pulsar enter en el modo Type para adivinar el kana
  async adivinarTypeGame(event: Event){

    this.typeGameInput.nativeElement.focus();
    const inputElement = event.target as HTMLInputElement;
    const inputValue = this.typeGameInput.nativeElement.value;

    if(inputValue == ''){
      return;
    }

    const meanings= this.adivinar.meaning.toLowerCase().split(",");

    let similar = false;
    for(const meaning of meanings){
      if(this.areSimilar(inputValue.toLowerCase() , meaning.trim().toLowerCase())){
        similar = true
      }
    }

    if(similar){
      //Acerto el kana, sumar racha y pasar al siguiente
      this.typeGameStreak++;
      this.cookieService.set('kanji-typeGameStreak', this.typeGameStreak.toString());

      this.success = true;
      this.typeGameFail = false;

      await new Promise(f => setTimeout(f, 500));
      this.success = false;

      //Cada 3 seguidas correctas mostrar emote
      if(this.typeGameStreak % 3 == 0){
        this.showEmoteArray.push( this.emoteArray[Math.floor(Math.random() * this.emoteArray.length)]);
      }

      this.typeCardCorrect = true;

      //this.nuevoKana();
    }else{
      //Indicar que fallo, reiniciar racha
      if(this.typeGameStreak > this.typeGameBest){
        this.cookieService.set('kanji-typeGameBest', this.typeGameStreak.toString());
        this.typeGameBest=this.typeGameStreak;
      }

      this.typeGameFail = true;

      //Hacer el efect de shake cada vez que falla
      this.typeGameFailShake = false;
      await new Promise(f => setTimeout(f, 100));
      this.typeGameFailShake = true;

      if(this.typeGameStreak > 0){
        this.animationStreakLose();
      }


      this.typeCardCorrect = false;
      this.success = false;
      this.typeGameStreak= 0;
      this.cookieService.set('kanji-typeGameStreak', this.typeGameStreak.toString());
    }
    this.typeGameShowKanaValue = false;
    this.typeGameInput.nativeElement.value = '';
    this.typeGameInput.nativeElement.focus();
  }

  typeGameSkipKana(){
    if(this.typeGameStreak > this.typeGameBest){
      this.cookieService.set('kanji-typeGameBest', this.typeGameStreak.toString());
      this.typeGameBest=this.typeGameStreak;
    }

    if(this.typeGameStreak > 0){
      this.animationStreakLose();
    }

    this.success = false;
    this.typeGameStreak= 0;
    this.cookieService.set('kanji-typeGameStreak', this.typeGameStreak.toString());
    this.typeGameFail = false;
    this.typeGameFailShake = false;
    this.typeGameShowKanaValue = false;

    this.nuevoKana();
  }

  typeGameShowKana(){
    if(this.typeGameStreak > this.typeGameBest){
      this.cookieService.set('kanji-typeGameBest', this.typeGameStreak.toString());
      this.typeGameBest=this.typeGameStreak;
    }

    if(this.typeGameStreak > 0){
      this.animationStreakLose();
    }

    this.success = false;
    this.typeGameStreak= 0;
    this.cookieService.set('kanji-typeGameStreak', this.typeGameStreak.toString());
    this.typeGameFail = false;
    this.typeGameFailShake = false;

    //this.nuevoKana();
    this.typeGameShowKanaValue = true;
  }

  async animationStreakLose(){
    this.streakFailShake = true;
    await new Promise(f => setTimeout(f,500));
    this.streakFailShake = false;

  }

  showMenuLateral(){
    this.menuLateral = true;
  }

  hideMenuLateral(){
    this.menuLateral = false;
  }

  onTouchStart(event: TouchEvent) {
    this.touchStartX=0;
    this.touchEndX=0;
    this.touchStartX = event.changedTouches[0].screenX;
  }

  onTouchMove(event: TouchEvent) {
    this.touchEndX = event.changedTouches[0].screenX;
  }

  onTouchEnd(event: TouchEvent) {
    if(this.touchEndX == 0){
      return;
    }

    const threshold = 50; // Mínima distancia para ser considerado un swipe
    const swipeDistance = this.touchStartX - this.touchEndX;

    // Si la distancia es mayor al umbral y es un swipe hacia la izquierda
    if (swipeDistance > threshold) {
      this.hideMenuLateral();
    }
  }

  kanjiInfo(kanji: Kanji, event: Event){
    event.stopPropagation();
    Swal.fire({
      heightAuto: false,
      showCancelButton: true,
      showConfirmButton: false,
      cancelButtonText: 'Close',
      title: kanji.kanji,
      html: ` <div class="onyomi">
              <div class="title">Onyomi</div>
              <div class="text">${kanji.onyomi_text ? kanji.onyomi_text : " - "}</div>
              <div class="kana">${kanji.onyomi_kana ? kanji.onyomi_kana : " - "}</div>
            </div>
            <div class="kunyomi">
             <div class="title">Kunyomi</div>
              <div class="text">${kanji.kunyomi_text ? kanji.kunyomi_text : " - "}</div>
             <div class="kana">${kanji.kunyomi_kana ? kanji.kunyomi_kana : " - "}</div>
            </div>`,
      customClass: {
        popup: 'custom-popup',
              title: 'swalKanjiInfoTitle',
              htmlContainer: 'swalYomi'
      }
    })
  }





  setCookies(){

    //COOKIES DE LOS TIPOS DE KANJI QUE APARECEN
    if(this.cookieService.check('kanji-kanjiN5')){
      this.kanjiN5 =(this.cookieService.get('kanji-kanjiN5') === "true");
    }else{
      this.cookieService.set('kanji-kanjiN5', "true");
      this.kanjiN5 = true;
    }

    if(this.cookieService.check('kanji-kanjiN4')){
      this.kanjiN4 = (this.cookieService.get('kanji-kanjiN4') === "true");
    }else{
      this.cookieService.set('kanji-kanjiN4', "false");
      this.kanjiN4 = false;
    }

    if(this.cookieService.check('kanji-kanjiN3')){
      this.kanjiN3 = (this.cookieService.get('kanji-kanjiN3') === "true");
    }else{
      this.cookieService.set('kanji-kanjiN3', "false");
      this.kanjiN3 = false;
    }

    if(this.cookieService.check('kanji-kanjiN2')){
      this.kanjiN2 = (this.cookieService.get('kanji-kanjiN2') === "true");
    }else{
      this.cookieService.set('kanji-kanjiN2', "false");
      this.kanjiN2 = false;
    }

    if(this.cookieService.check('kanji-kanjiN1')){
      this.kanjiN1 = (this.cookieService.get('kanji-kanjiN1') === "true");
    }else{
      this.cookieService.set('kanji-kanjiN1', "false");
      this.kanjiN1 = false;
    }


    //COOKIES DEL NIVEL - 2 es medium
    if(this.cookieService.check('kanji-level')){
      this.level = Number(this.cookieService.get('kanji-level'));
    }else{
      this.cookieService.set('kanji-level', "2");
      this.level = 2;
    }

    //COOKIES DEL TIPO QUE ADIVINA
    if(this.cookieService.check('kanji-queAdivina')){
      this.queAdivina = this.cookieService.get('kanji-queAdivina');
    }else{
      this.cookieService.set('kanji-queAdivina', "kana");
      this.queAdivina = 'kana';
    }

    //COOKIES DE LA PUNTUACION INDIVIDUAL ENTRE CARD Y TYPE GAME
    //Miramos si existe la cookie con el Streak y Best de los modos Card y Type
    if(this.cookieService.check('kanji-cardGameStreak')){
      this.cardGameStreak = Number(this.cookieService.get('kanji-cardGameStreak'));
    }else{
      this.cookieService.set('kanji-cardGameStreak', "0");
      this.cardGameStreak = 0;
    }
    if(this.cookieService.check('kanji-cardGameBest')){
      this.cardGameBest = Number(this.cookieService.get('kanji-cardGameBest'));
    }else{
      this.cookieService.set('kanji-cardGameBest', "0");
      this.cardGameBest = 0;
    }

    if(this.cookieService.check('kanji-typeGameStreak')){
      this.typeGameStreak = Number(this.cookieService.get('kanji-typeGameStreak'));
    }else{
      this.cookieService.set('kanji-typeGameStreak', "0");
      this.typeGameStreak = 0;
    }

    if(this.cookieService.check('kanji-typeGameBest')){
      this.typeGameBest = Number(this.cookieService.get('kanji-typeGameBest'));
    }else{
      this.cookieService.set('kanji-typeGameBest', "0");
      this.typeGameBest = 0;
    }

    //Definimos que tipo de juego quiere, si seleccionar cartas o escribir la solucion
    //Por defecto elegimos la opcion de cartas
    if(this.cookieService.check('kanji-cardGame')){
      this.cardGame = (this.cookieService.get('kanji-cardGame') == 'true');
    }else{
      this.cookieService.set('kanji-cardGame', "true");
      this.cardGame = true;
    }
    if(this.cookieService.check('kanji-typeGame')){
      this.typeGame = (this.cookieService.get('kanji-typeGame')  == 'true');
    }else{
      this.cookieService.set('kanji-typeGame', "false");
      this.typeGame = false;
    }

    //COOKIES PARA OCULTAR PUNTUACION
    if(this.cookieService.check('kanji-showStreak')){
      this.showStreak = (this.cookieService.get('kanji-showStreak') === "true");
    }else{
      this.cookieService.set('kanji-showStreak', "true");
      this.showStreak = true;
    }

     //COOKIES PARA OCULTAR YOMI
     if(this.cookieService.check('kanji-showYomi')){
      this.showYomi = (this.cookieService.get('kanji-showYomi') === "true");
    }else{
      this.cookieService.set('kanji-showYomi', "true");
      this.showYomi = true;
    }
  }


  toogletooltipTypeGameAdvice() {
    this.tooltip.toggle();
  }


  //Funcion para conseguir elementos random de un array
   getRandomElements<T>(array: T[], numElements: number): T[] {
    // Hacemos una copia del array original para no modificarlo
    let arrayCopy =[];
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

  shuffleArray(array : Kanji[]) {
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
    if ((this.maxKanjiN5 - this.minKanjiN5) < 8) {
     //No puedes guardar
      this.sliderErrorN5="The difference between the minimum and maximum must be at least 9. All kanji will be shown.";
      return;
    }else{
      this.sliderErrorN5="";
    }

    if ((this.maxKanjiN4 - this.minKanjiN4) < 8) {
      //No puedes guardar
       this.sliderErrorN4="The difference between the minimum and maximum must be at least 9. All kanji will be shown.";
       return;
     }else{
       this.sliderErrorN4="";
     }

     if ((this.maxKanjiN3 - this.minKanjiN3) < 8) {
      //No puedes guardar
       this.sliderErrorN3="The difference between the minimum and maximum must be at least 9. All kanji will be shown";
       return;
     }else{
       this.sliderErrorN3="";
     }

     if ((this.maxKanjiN2 - this.minKanjiN2) < 8) {
      //No puedes guardar
       this.sliderErrorN2="The difference between the minimum and maximum must be at least 9. All kanji will be shown";
       return;
     }else{
       this.sliderErrorN2="";
     }

     if ((this.maxKanjiN1 - this.minKanjiN1) < 8) {
      //No puedes guardar
       this.sliderErrorN1="The difference between the minimum and maximum must be at least 9. All kanji will be shown";
       return;
     }else{
       this.sliderErrorN1="";
     }


    this.closeModal();
    this.setKanaArray();
    
  }

  minusMin(kanjiN: number){
   if(kanjiN == 5){
    if(this.minKanjiN5 > 1){
      this.minKanjiN5--;
    }
   }

   if(kanjiN == 4){
    if(this.minKanjiN4 > 1){
      this.minKanjiN4--;
    }
   }

   if(kanjiN == 3){
    if(this.minKanjiN3 > 1){
      this.minKanjiN3--;
    }
   }

   if(kanjiN == 2){
    if(this.minKanjiN2 > 1){
      this.minKanjiN2--;
    }
   }

   if(kanjiN == 1){
    if(this.minKanjiN1 > 1){
      this.minKanjiN1--;
    }
   }
  }

  plusMin(kanjiN: number){
    if(kanjiN == 5){
      if(this.minKanjiN5 < this.kanjiN5Array.length && this.minKanjiN5 < this.maxKanjiN5){
        this.minKanjiN5++;
      }
    }

    if(kanjiN == 4){
      if(this.minKanjiN4 < this.kanjiN4Array.length && this.minKanjiN4 < this.maxKanjiN4){
        this.minKanjiN4++;
      }
    }

    if(kanjiN == 3){
      if(this.minKanjiN3 < this.kanjiN3Array.length && this.minKanjiN3 < this.maxKanjiN3){
        this.minKanjiN3++;
      }
    }

    if(kanjiN == 2){
      if(this.minKanjiN2 < this.kanjiN2Array.length && this.minKanjiN2 < this.maxKanjiN2){
        this.minKanjiN2++;
      }
    }

    if(kanjiN == 1){
      if(this.minKanjiN1 < this.kanjiN1Array.length && this.minKanjiN1 < this.maxKanjiN1){
        this.minKanjiN1++;
      }
    }
  }

  minusMax(kanjiN: number){
    if(kanjiN == 5){
      if(this.maxKanjiN5 > 1 && this.maxKanjiN5 > this.minKanjiN5){
        this.maxKanjiN5--;
      }
    }

    if(kanjiN == 4){
      if(this.maxKanjiN4 > 1 && this.maxKanjiN4 > this.minKanjiN4){
        this.maxKanjiN4--;
      }
    }

    if(kanjiN == 3){
      if(this.maxKanjiN3 > 1 && this.maxKanjiN3 > this.minKanjiN3){
        this.maxKanjiN3--;
      }
    }

    if(kanjiN == 2){
      if(this.maxKanjiN2 > 1 && this.maxKanjiN2 > this.minKanjiN2){
        this.maxKanjiN2--;
      }
    }

    if(kanjiN == 1){
      if(this.maxKanjiN1 > 1 && this.maxKanjiN1 > this.minKanjiN1){
        this.maxKanjiN1--;
      }
    }
  }

  plusMax(kanjiN: number){
    if(kanjiN == 5){
      if(this.maxKanjiN5 < this.kanjiN5Array.length){
        this.maxKanjiN5++;
      }
    }

    if(kanjiN == 4){
      if(this.maxKanjiN4 < this.kanjiN4Array.length){
        this.maxKanjiN4++;
      }
    }

    if(kanjiN == 3){
      if(this.maxKanjiN3 < this.kanjiN3Array.length){
        this.maxKanjiN3++;
      }
    }

    if(kanjiN == 2){
      if(this.maxKanjiN2 < this.kanjiN2Array.length){
        this.maxKanjiN2++;
      }
    }

    if(kanjiN == 1){
      if(this.maxKanjiN1 < this.kanjiN1Array.length){
        this.maxKanjiN1++;
      }
    }
  }

}
