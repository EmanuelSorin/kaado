
export class Vocab {
  id: number;
  type: string;
  type_content: string;
  romaji: string;
  kana: string;
  meaning: string;
  estado: boolean = true;

  constructor(id: number,type:string,type_content:string, romaji: string, kana: string, meaning: string) {
    this.id = id;
    this.type = type;
    this.type_content = type_content;
    this.romaji = romaji;
    this.kana = kana;
    this.meaning = meaning;
  }
}
