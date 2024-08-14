export abstract class Helper {
  static shortStringGenerate(value: string, end: number = 2): string {
    return value.substring(0, end).toUpperCase();
  }

  static pluck(array: any[], property: any): any[] {
    return array.map((item) => item[property]);
  }

  static stringUniqueName(string: string | null): string | null {
    if (string === null) return null;

    string = string.toLowerCase();
    string = this.removeAccents(string);
    string = this.removeSpecialCharacters(string);

    return string.replace(/[\s-]+/g, '-');
  }

  static removeSpecialCharacters(string: string | null): string | null {
    if (string === null) return null;

    return string.replace(/[^A-Za-z0-9\s-]/g, '');
  }

  static removeAccents(string: string | null): string | null {
    if (string === null) return null;

    const accentsMap: { [key: string]: string } = {
      À: 'a',
      Á: 'a',
      Ã: 'a',
      Â: 'a',
      É: 'e',
      Ê: 'e',
      Í: 'i',
      Ó: 'o',
      Õ: 'o',
      Ô: 'o',
      Ú: 'u',
      Ü: 'u',
      Ç: 'c',
      à: 'a',
      á: 'a',
      ã: 'a',
      â: 'a',
      é: 'e',
      ê: 'e',
      í: 'i',
      ó: 'o',
      õ: 'o',
      ô: 'o',
      ú: 'u',
      ü: 'u',
      ç: 'c',
    };

    return string
      .split('')
      .map((char) => accentsMap[char] || char)
      .join('');
  }
}
