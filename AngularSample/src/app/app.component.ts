import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'AngularSample';

  minhaPromise(nome: string): Promise<string> {
    return new Promise((resolve, reject) => {
      if (nome === 'Daniel') {
        setTimeout(() => {
          resolve('Seja bem vindo ' + nome);
        }, 1000);
      } else {
        reject('Deu problema.');
      }
    });
  }

  minhaObservable(nome: string): Observable<string> {
    return new Observable((subscriber) => {
      if (nome === 'Daniel') {
        subscriber.next('Olá Daniel ');
        subscriber.complete();
      } else {
        subscriber.error('Deu erro');
      }

      subscriber.next('Olá');
    });
  }

  ngOnInit(): void {
    this.minhaPromise('jose')
      .then((result) => console.log(result))
      .catch((error) => console.log(error));

    this.minhaObservable('').subscribe(
      (result) => console.log(result),
      (erro) => console.log(erro)
    );

    const observer = {
      next: (valor: any) => console.log('Next: ', valor),
      error: (erro: any) => console.log('Erro: ', erro),
      complete: () => console.log('Complete: FIM!')
    };

    this.minhaObservable('Daniels').subscribe(observer);    
  }
}

export class Usuario {
  nome?: string;
  email?: string;
}