import { Component, ElementRef, ViewChild } from '@angular/core';
import { Katakana, katakanaCombinationJson, katakanaDakutenJson, katakanaJson } from './katakana';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout'

@Component({
  selector: 'app-katakana',
  templateUrl: './katakana.component.html',
  styleUrls: ['./katakana.component.scss']
})
export class KatakanaComponent {
  constructor(private cookieService: CookieService,private router: Router, private responsive: BreakpointObserver) {}

  @ViewChild('typeGameInput') typeGameInput: ElementRef;

  //Conseguimos los array con los distintos kanas
  katakanaArray: Katakana[] = JSON.parse(katakanaJson).map((item: any) => new Katakana(item.kana, item.romaji));
  katakanaDakutenArray: Katakana[] = JSON.parse(katakanaDakutenJson).map((item: any) => new Katakana(item.kana, item.romaji));
  katakanaCombinationArray: Katakana[] = JSON.parse(katakanaCombinationJson).map((item: any) => new Katakana(item.kana, item.romaji));

  kanaCopiaArray: Katakana[] = [];
  kanaArray : Katakana[] = [];

  //Sliders de kana
  mainKana: boolean =true;
  dakutenKana: boolean = false;
  combinationKana: boolean = false;

  //Opcion que se muestra para adivinar
  adivinar: Katakana;

  //Opciones que puede adivinar el usuario
  options: Katakana[];

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

  showStreak: boolean = true;

  // Añadir una firma de índice
  [key: string]: any;


  //Variables para responsive
  isPhone: boolean = false;

  menuLateral: boolean = false;

  //Eventos para ver el desplazamiento del movil
  private touchStartX: number = 0;
  private touchEndX: number = 0;

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

  async resolver(seleccionado: Katakana){
    if(seleccionado == this.adivinar){


        this.cardGameStreak++;
        this.cookieService.set('katakana-cardGameStreak', this.cardGameStreak.toString());

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
        this.cookieService.set('ckatakana-ardGameBest', this.cardGameStreak.toString());
        this.cardGameBest=this.cardGameStreak;
      }
      if(this.typeGameStreak > 0){
        this.animationStreakLose();
      }
      this.cardGameStreak = 0;
      this.cookieService.set('katakana-cardGameStreak', this.cardGameStreak.toString());
      this.success = false;
      seleccionado.estado = false;
    }
  }

  //Funcion que decide si mostrar kana o romaji en los Card
  toogleQueAdivina(){
    if(this.queAdivina == 'kana'){
      this.queAdivina = 'romaji';
      this.cookieService.set('katakana-queAdivina', "romaji");
    }else{
      this.queAdivina = 'kana';
      this.cookieService.set('katakana-queAdivina', "kana");
    }
    this.setKanaArray();
  }

  //Funcion que decide que kanas mostrar, main, dakuten o combination
  toogleKanaOptions(variableName: string, event: Event): void{
    if(variableName == 'mainKana' && !this.dakutenKana && !this.combinationKana ){
      //Si quiere deseleccionar mainKana y las demas no estan marcadas no se permite
      event.preventDefault();
      return;
    }

    this.cookieService.set("katakana-"+variableName, (!this[variableName]).toString());

    this[variableName] = !this[variableName];

    if(!this.mainKana && !this.dakutenKana && !this.combinationKana){
      this.mainKana = true;
      this.cookieService.set('katakana-mainKana', "true");
    }

    this.setKanaArray();
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

    this.cookieService.set('katakana-level', level.toString());
  }


  setKanaArray(){
    this.kanaArray = [];

    //Añadir mainKata o dakuten o combination
    if(this.mainKana){
      this.kanaArray = [ ... this.kanaArray, ...this.katakanaArray];
    }
    if(this.dakutenKana){
      this.kanaArray = [ ... this.kanaArray, ...this.katakanaDakutenArray];
    }
    if(this.combinationKana){
      this.kanaArray = [ ... this.kanaArray, ...this.katakanaCombinationArray];
    }

    //Me hago una copia de kanaArray
    this.kanaCopiaArray = this.kanaArray;

    //Llamo para sacar un nuevo kana con la nueva configuracion ?
    this.nuevoKana();
  }


  //Funcion para conseguir los kanas para adivinar
  nuevoKana(){

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
    let randomElements :Katakana[] = [];

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

    this.cookieService.set('katakana-cardGame','true');
    this.cookieService.set('katakana-typeGame', 'false');
  }

  //Funcion para elegir el modo de Type
  changeToTypeGame(){
    this.cardGame = false;
    this.typeGame = true;

    //Variables que miran si has fallado en typeGame
    this.typeGameFail=false;
    this.typeGameFailShake=false;

    this.streakFailShake = false;

    this.cookieService.set('katakana-cardGame','false');
    this.cookieService.set('katakana-typeGame', 'true');
  }

  //Funcion que se ejecuta al pulsar enter en el modo Type para adivinar el kana
  async adivinarTypeGame(event: Event){

    this.typeGameInput.nativeElement.focus();
   // const inputElement = event.target as HTMLInputElement;
    const inputValue =  this.typeGameInput.nativeElement.value;

    if(inputValue == ''){
      return;
    }

    if(inputValue.toLowerCase() == this.adivinar.romaji.toLowerCase()){
      //Acerto el kana, sumar racha y pasar al siguiente
      this.typeGameStreak++;
      this.cookieService.set('katakana-typeGameStreak', this.typeGameStreak.toString());

      this.success = true;
      this.typeGameFail = false;

      await new Promise(f => setTimeout(f, 500));
      this.success = false;

      //Cada 3 seguidas correctas mostrar emote
      if(this.typeGameStreak % 3 == 0){
        this.showEmoteArray.push( this.emoteArray[Math.floor(Math.random() * this.emoteArray.length)]);
      }

      this.nuevoKana();
    }else{
      //Indicar que fallo, reiniciar racha
      if(this.typeGameStreak > this.typeGameBest){
        this.cookieService.set('katakana-typeGameBest', this.typeGameStreak.toString());
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

      this.success = false;
      this.typeGameStreak= 0;
      this.cookieService.set('katakana-typeGameStreak', this.typeGameStreak.toString());
    }
    this.typeGameShowKanaValue = false;
    this.typeGameInput.nativeElement.value = '';

      this.typeGameInput.nativeElement.focus();

  }

  typeGameSkipKana(){
    if(this.typeGameStreak > this.typeGameBest){
      this.cookieService.set('katakana-typeGameBest', this.typeGameStreak.toString());
      this.typeGameBest=this.typeGameStreak;
    }

    if(this.typeGameStreak > 0){
      this.animationStreakLose();
    }

    this.success = false;
    this.typeGameStreak= 0;
    this.cookieService.set('katakana-typeGameStreak', this.typeGameStreak.toString());
    this.typeGameFail = false;
    this.typeGameFailShake = false;
    this.typeGameShowKanaValue = false;

    this.nuevoKana();
  }

  typeGameShowKana(){
    if(this.typeGameStreak > this.typeGameBest){
      this.cookieService.set('katakana-typeGameBest', this.typeGameStreak.toString());
      this.typeGameBest=this.typeGameStreak;
    }

    if(this.typeGameStreak > 0){
      this.animationStreakLose();
    }

    this.success = false;
    this.typeGameStreak= 0;
    this.cookieService.set('katakana-typeGameStreak', this.typeGameStreak.toString());
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
    this.touchEndX=0;
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

 //Funcion que muestra u oculta streak y best
 toogleStreak(): void{
  if(this.showStreak){
    this.showStreak = false;
    this.cookieService.set('katakana-showStreak', "false");

  }else{
    this.showStreak = true;
    this.cookieService.set('katakana-showStreak', "true");

  }
}





setCookies(){

  //COOKIES DE LOS TIPOS DE KANA QUE APARECEN
  if(this.cookieService.check('katakana-mainKana')){
    this.mainKana =(this.cookieService.get('katakana-mainKana') === "true");
  }else{
    this.cookieService.set('katakana-mainKana', "true");
    this.mainKana = true;
  }
  if(this.cookieService.check('katakana-dakutenKana')){
    this.dakutenKana = (this.cookieService.get('katakana-dakutenKana') === "true");
  }else{
    this.cookieService.set('katakana-dakutenKana', "false");
    this.dakutenKana = false;
  }
  if(this.cookieService.check('katakana-combinationKana')){
    this.combinationKana = (this.cookieService.get('katakana-combinationKana') === "true");
  }else{
    this.cookieService.set('katakana-combinationKana', "false");
    this.combinationKana = false;
  }


  //COOKIES DEL NIVEL - 2 es medium
  if(this.cookieService.check('katakana-level')){
    this.level = Number(this.cookieService.get('katakana-level'));
  }else{
    this.cookieService.set('katakana-level', "2");
    this.level = 2;
  }

  //COOKIES DEL TIPO QUE ADIVINA
  if(this.cookieService.check('katakana-queAdivina')){
    this.queAdivina = this.cookieService.get('katakana-queAdivina');
  }else{
    this.cookieService.set('katakana-queAdivina', "kana");
    this.queAdivina = 'kana';
  }

  //COOKIES DE LA PUNTUACION INDIVIDUAL ENTRE CARD Y TYPE GAME
  //Miramos si existe la cookie con el Streak y Best de los modos Card y Type
  if(this.cookieService.check('katakana-cardGameStreak')){
    this.cardGameStreak = Number(this.cookieService.get('katakana-cardGameStreak'));
  }else{
    this.cookieService.set('katakana-cardGameStreak', "0");
    this.cardGameStreak = 0;
  }
  if(this.cookieService.check('katakana-cardGameBest')){
    this.cardGameBest = Number(this.cookieService.get('katakana-cardGameBest'));
  }else{
    this.cookieService.set('katakana-cardGameBest', "0");
    this.cardGameBest = 0;
  }

  if(this.cookieService.check('katakana-typeGameStreak')){
    this.typeGameStreak = Number(this.cookieService.get('katakana-typeGameStreak'));
  }else{
    this.cookieService.set('katakana-typeGameStreak', "0");
    this.typeGameStreak = 0;
  }

  if(this.cookieService.check('katakana-typeGameBest')){
    this.typeGameBest = Number(this.cookieService.get('katakana-typeGameBest'));
  }else{
    this.cookieService.set('katakana-typeGameBest', "0");
    this.typeGameBest = 0;
  }

  //Definimos que tipo de juego quiere, si seleccionar cartas o escribir la solucion
  //Por defecto elegimos la opcion de cartas
  if(this.cookieService.check('katakana-cardGame')){
    this.cardGame = (this.cookieService.get('katakana-cardGame') == 'true');
  }else{
    this.cookieService.set('katakana-cardGame', "true");
    this.cardGame = true;
  }
  if(this.cookieService.check('katakana-typeGame')){
    this.typeGame = (this.cookieService.get('katakana-typeGame')  == 'true');
  }else{
    this.cookieService.set('katakana-typeGame', "false");
    this.typeGame = false;
  }

  //COOKIES PARA OCULTAR PUNTUACION
  if(this.cookieService.check('katakana-showStreak')){
    this.showStreak = (this.cookieService.get('katakana-showStreak') === "true");
  }else{
    this.cookieService.set('katakana-showStreak', "true");
    this.showStreak = true;
  }
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

  shuffleArray(array : Katakana[]) {
    var m = array.length, t, i;

    while (m) {
     i = Math.floor(Math.random() * m--);
     t = array[m];
     array[m] = array[i];
     array[i] = t;
    }

   return array;
 }
}
