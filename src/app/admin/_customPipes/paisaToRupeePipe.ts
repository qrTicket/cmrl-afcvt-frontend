import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: 'paisaToRupee' })
export class PaisaToRupeePipe implements PipeTransform {
    transform(value: any, ...args: any[]) {
        if (isNaN(value)) {
            return ''
        }
        const rupee = value / 100;
        return rupee;
    }
}