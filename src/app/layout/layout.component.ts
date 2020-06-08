import { Component, OnInit, ElementRef, Renderer2, AfterViewInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements AfterViewInit {

  @ViewChild('wrapper') wrap : ElementRef 

  constructor(
    private renderer: Renderer2,
  ) { }

  ngAfterViewInit() {
    let section = this.wrap.nativeElement;
    // this.renderer.setStyle(section, 'height', screen.availHeight+'px')
  }

}
