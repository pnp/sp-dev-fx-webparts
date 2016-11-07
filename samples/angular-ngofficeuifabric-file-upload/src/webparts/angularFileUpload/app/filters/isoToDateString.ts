export class IsoToDateString {
  static filter() {
    return (value: string): string => {
      return (<any>String).format("{0:yyyy}-{0:MM}-{0:dd}", new Date(value));
    }
  }
}