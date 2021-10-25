import { Controller, Delete, Get, Patch, Post, Put } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Controller('first')
export class FirstController {
  @Get('')
  showGet(): string {
    console.log('GET');
    return 'GET';
  }

  @Post('')
  showPost(): string {
    console.log('Post');
    return 'Post';
  }

  @Put('')
  showPut(): string {
    console.log('Put');
    return 'Put';
  }

  @Patch('')
  showPatch(): string {
    console.log('Patch');
    return 'Patch';
  }

  @Delete('')
  showDelete(): string {
    console.log('Delete');
    return 'Delete';
  }

  @Get('observable')
  playWithObservable() {
    const observable = new Observable<number>((observer) => {
      let i = 5;
      setInterval(() => {
        if (!i) {
          observer.complete();
        }
        observer.next(i--);
      }, 1500);
    });
    observable.subscribe((val) => {
      console.log(val);
    });
    observable
      .pipe(
        map((data) => data * 3),
        filter((x) => x % 2 === 0),
      )
      .subscribe(
        (data) => {
          console.log(`Je viens de recevoir la valeur ${data}`);
        },
        (erreur) => {
          console.log('j ai une erreur');
        },
        () => {
          console.log('fin du traitement');
        },
      );
    return of(2, 5, 4);
  }
}
