import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeaturesService {

  constructor(private http: HttpClient) { }

  getSaleDays() {
    return this.http.get('../../assets/sale-days.json').pipe(map(res => res), catchError(error => error));
  }

  getProducts() {
    return this.http.get('../../assets/products.json').pipe(map(res => res), catchError(error => error));
  }

  getDays() {
    return this.http.get('../../assets/days.json').pipe(map(res => res), catchError(error => error));
  }
}
