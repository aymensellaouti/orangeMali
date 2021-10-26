import { Controller, Delete, Get, Patch, Post, Put } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { LoggerService } from "../utils/logger/logger.service";
import { SayHelloService } from "../utils/say-hello/say-hello.service";

@Controller('first')
export class FirstController {
  constructor(
    private loggerService: LoggerService,
    private sayHello: SayHelloService,
  ) {}
  @Get('')
  showGet(): string {
    this.sayHello.hello();
    this.loggerService.logger('GET');
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
