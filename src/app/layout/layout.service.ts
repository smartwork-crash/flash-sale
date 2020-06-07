import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  
  cartItemCount = new BehaviorSubject<number>((localStorage.getItem('cart')  && JSON.parse(localStorage.getItem('cart')).length) || 0);
  countListener = this.cartItemCount.asObservable();

  constructor(private http: HttpClient) { }
  
  getCartCount(count) {
    this.cartItemCount.next(count);
  }

  getMenu() {
   return this.http.get('../../assets/layout.json').pipe(map((res:any) => res));
  }
}
