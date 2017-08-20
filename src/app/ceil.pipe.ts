import {Pipe, PipeTransform} from '@angular/core';

/*
 * Get the ceiling of a value.
 */

@Pipe({name: 'ceil'})
export class CeilPipe implements PipeTransform {
    transform(value: number): number {
        return Math.ceil(value);
    }
}

