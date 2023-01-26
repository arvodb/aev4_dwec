import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { HTTPSDictionaryapiDev } from '../interfaces/response';
import { Definition } from '../interfaces/response';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(public http: HttpClient) { }

  public url: string = 'https://api.dictionaryapi.dev/api/v2/entries/en/';

  public getResponseJuego(palabra: string): Observable<HTTPSDictionaryapiDev[]> {
    return this.http.get<HTTPSDictionaryapiDev[]>(this.url + palabra);
  }
}
