import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBreed } from '../interfaces/interfaces';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseCatsUrl: string = 'https://api.thecatapi.com/v1/images/search';
  baseBreedsUrl: string = 'https://api.thecatapi.com/v1/breeds'
  headers: HttpHeaders;
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders()
    .set('x-api-key',(localStorage.getItem('apiKey') as string))
   }

  getRandomCats(): Observable<any> {
    return this.http.get<any>(`${this.baseCatsUrl}?limit=10`)
  }

  getCatBreeds(): Observable<IBreed[]> {
    return this.http.get<IBreed[]>(`${this.baseBreedsUrl}`,{headers: this.headers})
      .pipe(
        map((cats: IBreed[]) => cats.map(cat => ({ name: cat.name, id: cat.id })))
      )
  }

  getCatNameValue(): Observable<string[]> {
    return this.getCatBreeds().pipe(
      map((breeds: any) => {
        return breeds.map((breed: any) => breed.name);
      })
    )
  }

  getBreed(breed: string, limit: string) {
    return this.http.get(`${this.baseCatsUrl}?breed_ids=${breed}&limit=${limit}`,{headers: this.headers})
  }
}
