import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../layout.service';
import { Observable } from 'rxjs';
import { User } from '../aside/aside.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public menuObserver$: Observable<any>;
  user: User;
  
  constructor(
    public layoutService: LayoutService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.menuObserver$ = this.layoutService.getMenu();
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigateByUrl('/user')
  }

}
