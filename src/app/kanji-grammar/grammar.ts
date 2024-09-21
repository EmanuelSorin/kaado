
export class Grammar {
  id: number;
  romaji: string;
  kana: string;
  meaning: string;
  estado: boolean = true;

  constructor(id: number, romaji: string, kana: string, meaning: string) {
    this.id = id;
    this.romaji = romaji;
    this.kana = kana;
    this.meaning = meaning;
  }
}
