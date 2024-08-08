export abstract class Helper {
  static shortStringGenerate(value: string, end: number = 2): string {
    return value.substring(0, end).toUpperCase();
  }
}
