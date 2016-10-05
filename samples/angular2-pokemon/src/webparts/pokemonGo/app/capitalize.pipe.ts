import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "capitalize"
})
export class CapitalizePipe implements PipeTransform {
  transform(value: string): string {
    return value.charAt(0).toUpperCase() + value.substr(1);
  }
}