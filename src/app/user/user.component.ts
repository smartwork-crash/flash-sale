import { Component, OnInit } from '@angular/core';
import {User} from '../layout/aside/aside.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user: string[] = ['Seller', 'Buyer'];
  userType: string;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onUserSelected(value) {
    this.userType = value;
  }

  assignUserType() {
    if(this.userType) {
      let user: User = this.userType === 'Seller' ? {seller: true} : {buyer : true};
      localStorage.setItem('user',JSON.stringify(user));
      this.userType === 'Seller' ? this.router.navigateByUrl('/sell-product') : this.router.navigateByUrl('/buy-product');

    }
  }

}
