import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../layout.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  public menuObserver$: Observable<any>;

  constructor(public layoutService: LayoutService) { }

  ngOnInit(): void {
    this.menuObserver$ = this.layoutService.getMenu();
  }

}
