export class Kanji {
    id: number;
    kanji: string;
    onyomi_text: string;
    onyomi_kana: string;
    kunyomi_text: string;
    kunyomi_kana: string;
    meaning: string;
  estado: boolean = true;


  constructor(id: number, kanji: string, onyomi_text: string, onyomi_kana: string,kunyomi_text: string, kunyomi_kana: string, meaning: string) {
    this.id = id;
    this.kanji = kanji;
    this.onyomi_text = onyomi_text;
    this.onyomi_kana = onyomi_kana;
    this.kunyomi_text = kunyomi_text;
    this.kunyomi_kana = kunyomi_kana;
    this.meaning = meaning;
  }
}
