export abstract class Helper {
  static shortStringGenerate(value: string, end: number = 2): string {
    return value.substring(0, end).toUpperCase();
  }

  static pluck(array: any[], property: any): any[] {
    return array.map((item) => item[property]);
  }
}
