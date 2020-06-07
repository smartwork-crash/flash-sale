import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../layout.service';
import { Observable } from 'rxjs';
export interface User {
buyer? : boolean,
seller? : boolean
}
@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})
export class AsideComponent implements OnInit {

  user: User;

  public menuObserver$: Observable<any>;

  
  constructor(public layoutService: LayoutService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.menuObserver$ = this.layoutService.getMenu();
  }

}
