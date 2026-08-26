/**
 * Opens the browser's print dialogue. The print stylesheet in
 * CarbonFootprintCalculator.module.scss decides what ends up on the page.
 */
export class PrintService {
  public static print(): void {
    if (typeof window !== 'undefined' && typeof window.print === 'function') {
      window.print();
    }
  }
}
