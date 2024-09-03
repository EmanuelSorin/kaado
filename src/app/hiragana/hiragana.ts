
export class Hiragana {
  kana: string;
  romaji: string;
  estado: boolean = true;


  constructor(kana: string, romaji: string) {
    this.kana = kana;
    this.romaji = romaji;
  }
}

export const hiraganaJson = `[
  { "kana": "あ", "romaji": "a" },
  { "kana": "い", "romaji": "i" },
  { "kana": "う", "romaji": "u" },
  { "kana": "え", "romaji": "e" },
  { "kana": "お", "romaji": "o" },
  { "kana": "か", "romaji": "ka" },
  { "kana": "き", "romaji": "ki" },
  { "kana": "く", "romaji": "ku" },
  { "kana": "け", "romaji": "ke" },
  { "kana": "こ", "romaji": "ko" },
  { "kana": "さ", "romaji": "sa" },
  { "kana": "し", "romaji": "shi" },
  { "kana": "す", "romaji": "su" },
  { "kana": "せ", "romaji": "se" },
  { "kana": "そ", "romaji": "so" },
  { "kana": "た", "romaji": "ta" },
  { "kana": "ち", "romaji": "chi" },
  { "kana": "つ", "romaji": "tsu" },
  { "kana": "て", "romaji": "te" },
  { "kana": "と", "romaji": "to" },
  { "kana": "な", "romaji": "na" },
  { "kana": "に", "romaji": "ni" },
  { "kana": "ぬ", "romaji": "nu" },
  { "kana": "ね", "romaji": "ne" },
  { "kana": "の", "romaji": "no" },
  { "kana": "は", "romaji": "ha" },
  { "kana": "ひ", "romaji": "hi" },
  { "kana": "ふ", "romaji": "fu" },
  { "kana": "へ", "romaji": "he" },
  { "kana": "ほ", "romaji": "ho" },
  { "kana": "ま", "romaji": "ma" },
  { "kana": "み", "romaji": "mi" },
  { "kana": "む", "romaji": "mu" },
  { "kana": "め", "romaji": "me" },
  { "kana": "も", "romaji": "mo" },
  { "kana": "や", "romaji": "ya" },
  { "kana": "ゆ", "romaji": "yu" },
  { "kana": "よ", "romaji": "yo" },
  { "kana": "ら", "romaji": "ra" },
  { "kana": "り", "romaji": "ri" },
  { "kana": "る", "romaji": "ru" },
  { "kana": "れ", "romaji": "re" },
  { "kana": "ろ", "romaji": "ro" },
  { "kana": "わ", "romaji": "wa" },
  { "kana": "を", "romaji": "wo" },
  { "kana": "ん", "romaji": "n" }
]`;


export const hiraganaDakutenJson = `
[
    { "kana": "が", "romaji": "ga" },
    { "kana": "ぎ", "romaji": "gi" },
    { "kana": "ぐ", "romaji": "gu" },
    { "kana": "げ", "romaji": "ge" },
    { "kana": "ご", "romaji": "go" },
    { "kana": "ざ", "romaji": "za" },
    { "kana": "じ", "romaji": "ji" },
    { "kana": "ず", "romaji": "zu" },
    { "kana": "ぜ", "romaji": "ze" },
    { "kana": "ぞ", "romaji": "zo" },
    { "kana": "だ", "romaji": "da" },
    { "kana": "ぢ", "romaji": "ji" },
    { "kana": "づ", "romaji": "zu" },
    { "kana": "で", "romaji": "de" },
    { "kana": "ど", "romaji": "do" },
    { "kana": "ば", "romaji": "ba" },
    { "kana": "び", "romaji": "bi" },
    { "kana": "ぶ", "romaji": "bu" },
    { "kana": "べ", "romaji": "be" },
    { "kana": "ぼ", "romaji": "bo" },
    { "kana": "ぱ", "romaji": "pa" },
    { "kana": "ぴ", "romaji": "pi" },
    { "kana": "ぷ", "romaji": "pu" },
    { "kana": "ぺ", "romaji": "pe" },
    { "kana": "ぽ", "romaji": "po" }
]
`;

export const hiraganaCombinationJson = `
[
    { "kana": "きゃ", "romaji": "kya" },
    { "kana": "きゅ", "romaji": "kyu" },
    { "kana": "きょ", "romaji": "kyo" },
    { "kana": "しゃ", "romaji": "sha" },
    { "kana": "しゅ", "romaji": "shu" },
    { "kana": "しょ", "romaji": "sho" },
    { "kana": "ちゃ", "romaji": "cha" },
    { "kana": "ちゅ", "romaji": "chu" },
    { "kana": "ちょ", "romaji": "cho" },
    { "kana": "にゃ", "romaji": "nya" },
    { "kana": "にゅ", "romaji": "nyu" },
    { "kana": "にょ", "romaji": "nyo" },
    { "kana": "ひゃ", "romaji": "hya" },
    { "kana": "ひゅ", "romaji": "hyu" },
    { "kana": "ひょ", "romaji": "hyo" },
    { "kana": "みゃ", "romaji": "mya" },
    { "kana": "みゅ", "romaji": "myu" },
    { "kana": "みょ", "romaji": "myo" },
    { "kana": "りゃ", "romaji": "rya" },
    { "kana": "りゅ", "romaji": "ryu" },
    { "kana": "りょ", "romaji": "ryo" },
    { "kana": "ぎゃ", "romaji": "gya" },
    { "kana": "ぎゅ", "romaji": "gyu" },
    { "kana": "ぎょ", "romaji": "gyo" },
    { "kana": "じゃ", "romaji": "ja" },
    { "kana": "じゅ", "romaji": "ju" },
    { "kana": "じょ", "romaji": "jo" },
    { "kana": "びゃ", "romaji": "bya" },
    { "kana": "びゅ", "romaji": "byu" },
    { "kana": "びょ", "romaji": "byo" },
    { "kana": "ぴゃ", "romaji": "pya" },
    { "kana": "ぴゅ", "romaji": "pyu" },
    { "kana": "ぴょ", "romaji": "pyo" }
]
`;
