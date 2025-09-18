import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textTrim',
  standalone: true,
})
export class TextTrimPipe implements PipeTransform {

  transform(title: string, limit: number): string {
    return title.split(' ').slice(0, limit).join(' ');
  }

}
