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
    this.responsive.observe(Breakpoints.Handset)
    .subscribe(result => {

      if (result.matches) {
        this.isPhone = true;
      }else{
        this.isPhone = false;
      }

    });



   this.mainKana = true;
   this.dakutenKana = false;
   this.combinationKana = false;


    if(this.cookieService.get('level')){
      this.level = Number(this.cookieService.get('level'));
    }else{
      this.cookieService.set('level', "2");
      this.level = 2;
    }
   // this.level=2;

    if(this.cookieService.get('queAdivina')){
      this.queAdivina = this.cookieService.get('queAdivina');
    }else{
      this.cookieService.set('queAdivina', "kana");
      this.queAdivina = 'kana';
    }
   // this.queAdivina = 'kana';

    //Miramos si existe la cookie con el Streak y Best de los modos Card y Type
    if(this.cookieService.get('cardGameStreak')){
      this.cardGameStreak = Number(this.cookieService.get('cardGameStreak'));
    }else{
      this.cookieService.set('cardGameStreak', "0");
      this.cardGameStreak = 0;
    }
    if(this.cookieService.get('cardGameBest')){
      this.cardGameBest = Number(this.cookieService.get('cardGameBest'));
    }else{
      this.cookieService.set('cardGameBest', "0");
      this.cardGameBest = 0;
    }

    if(this.cookieService.get('typeGameStreak')){
      this.typeGameStreak = Number(this.cookieService.get('typeGameStreak'));
    }else{
      this.cookieService.set('typeGameStreak', "0");
      this.typeGameStreak = 0;
    }

    if(this.cookieService.get('typeGameBest')){
      this.typeGameBest = Number(this.cookieService.get('typeGameBest'));
    }else{
      this.cookieService.set('typeGameBest', "0");
      this.typeGameBest = 0;
    }

    //Definimos que tipo de juego quiere, si seleccionar cartas o escribir la solucion
    //Por defecto elegimos la opcion de cartas
    if(this.cookieService.get('cardGame')){
      this.cardGame = (this.cookieService.get('cardGame') == 'true');
    }else{
      this.cookieService.set('cardGame', "true");
      this.cardGame = true;
    }
    if(this.cookieService.get('typeGame')){
      this.typeGame = (this.cookieService.get('typeGame')  == 'true');
    }else{
      this.cookieService.set('typeGame', "false");
      this.typeGame = false;
    }
    // this.cardGame = true;
    // this.typeGame = false;

    //Llamamos para conseguir los kana
    this.nuevoKana();

  }

  async resolver(seleccionado: Katakana){
    if(seleccionado == this.adivinar){


        this.cardGameStreak++;
        this.cookieService.set('cardGameStreak', this.cardGameStreak.toString());

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
        this.cookieService.set('cardGameBest', this.cardGameStreak.toString());
        this.cardGameBest=this.cardGameStreak;
      }
      if(this.typeGameStreak > 0){
        this.animationStreakLose();
      }
      this.cardGameStreak = 0;
      this.cookieService.set('cardGameStreak', this.cardGameStreak.toString());
      this.success = false;
      seleccionado.estado = false;
    }
  }

  //Funcion que decide si mostrar kana o romaji en los Card
  toogleQueAdivina(){
    if(this.queAdivina == 'kana'){
      this.queAdivina = 'romaji';
      this.cookieService.set('queAdivina', "romaji");
    }else{
      this.queAdivina = 'kana';
      this.cookieService.set('queAdivina', "kana");
    }
    this.nuevoKana();
  }

  //Funcion que decide que kanas mostrar, main, dakuten o combination
  toogleKanaOptions(variableName: string, event: Event): void{
    if(variableName == 'mainKana' && !this.dakutenKana && !this.combinationKana ){
      //Si quiere deseleccionar mainKana y las demas no estan marcadas no se permite
      event.preventDefault();
      return;
    }

    this[variableName] = !this[variableName];

    if(!this.mainKana && !this.dakutenKana && !this.combinationKana){
      this.mainKana = true;
    }

    this.nuevoKana();
  }

  //Funcion para cambiar la dificultad, 1= facil , 2=medio , 3=dificil
  changeLevel(level:number){
    if(level != 1 && level != 2 && level != 3){
      //No puede ser, no hay otro nivel (error codigo) se pone por defecto el normal (2)
      this.level=2;
    }else{
      this.level=level;
      this.nuevoKana();
    }

    this.cookieService.set('level', level.toString());
  }


  //Funcion para conseguir los kanas para adivinar
  nuevoKana(){
    let kanaArray : Katakana[] = [];

    //Añadir mainKata o dakuten o combination
    if(this.mainKana){
      kanaArray = [ ...kanaArray, ...this.katakanaArray];
    }
    if(this.dakutenKana){
      kanaArray = [ ...kanaArray, ...this.katakanaDakutenArray];
    }
    if(this.combinationKana){
      kanaArray = [ ...kanaArray, ...this.katakanaCombinationArray];
    }

    //Dificultad
    let numeroKanas = 4;
    if(this.level == 1) numeroKanas=2;
    if(this.level == 2) numeroKanas=4;
    if(this.level == 3) numeroKanas=9;

    //Conseguir random x kanas
    const randomElements = this.getRandomElements(kanaArray, numeroKanas);

    //Despues de conseguir random los kanas elegimos uno random para adivinar
    this.adivinar = randomElements[Math.floor(Math.random() * randomElements.length)];

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

    this.cookieService.set('cardGame','true');
    this.cookieService.set('typeGame', 'false');
  }

  //Funcion para elegir el modo de Type
  changeToTypeGame(){
    this.cardGame = false;
    this.typeGame = true;

    //Variables que miran si has fallado en typeGame
    this.typeGameFail=false;
    this.typeGameFailShake=false;

    this.streakFailShake = false;

    this.cookieService.set('cardGame','false');
    this.cookieService.set('typeGame', 'true');
  }

  //Funcion que se ejecuta al pulsar enter en el modo Type para adivinar el kana
  async adivinarTypeGame(event: Event){
    const inputElement = event.target as HTMLInputElement;
    const inputValue = inputElement.value;

    if(inputValue == ''){
      return;
    }

    if(inputValue.toLowerCase() == this.adivinar.romaji.toLowerCase()){
      //Acerto el kana, sumar racha y pasar al siguiente
      this.typeGameStreak++;
      this.cookieService.set('typeGameStreak', this.typeGameStreak.toString());

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
        this.cookieService.set('typeGameBest', this.typeGameStreak.toString());
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
      this.cookieService.set('typeGameStreak', this.typeGameStreak.toString());
    }
    this.typeGameShowKanaValue = false;
    this.typeGameInput.nativeElement.value = '';
  }

  typeGameSkipKana(){
    if(this.typeGameStreak > this.typeGameBest){
      this.cookieService.set('typeGameBest', this.typeGameStreak.toString());
      this.typeGameBest=this.typeGameStreak;
    }

    if(this.typeGameStreak > 0){
      this.animationStreakLose();
    }

    this.success = false;
    this.typeGameStreak= 0;
    this.cookieService.set('typeGameStreak', this.typeGameStreak.toString());
    this.typeGameFail = false;
    this.typeGameFailShake = false;
    this.typeGameShowKanaValue = false;

    this.nuevoKana();
  }

  typeGameShowKana(){
    if(this.typeGameStreak > this.typeGameBest){
      this.cookieService.set('typeGameBest', this.typeGameStreak.toString());
      this.typeGameBest=this.typeGameStreak;
    }

    if(this.typeGameStreak > 0){
      this.animationStreakLose();
    }

    this.success = false;
    this.typeGameStreak= 0;
    this.cookieService.set('typeGameStreak', this.typeGameStreak.toString());
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
    console.log("AA");
    this.menuLateral = true;
  }

  hideMenuLateral(){
    this.menuLateral = false;
  }

  onTouchStart(event: TouchEvent) {
    this.touchStartX = event.changedTouches[0].screenX;
  }

  onTouchMove(event: TouchEvent) {
    this.touchEndX = event.changedTouches[0].screenX;
  }

  onTouchEnd(event: TouchEvent) {
    const threshold = 50; // Mínima distancia para ser considerado un swipe
    const swipeDistance = this.touchStartX - this.touchEndX;

    // Si la distancia es mayor al umbral y es un swipe hacia la izquierda
    if (swipeDistance > threshold) {
      this.hideMenuLateral();
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
}
