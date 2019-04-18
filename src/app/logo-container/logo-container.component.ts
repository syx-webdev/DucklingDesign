import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-logo-container',
  templateUrl: './logo-container.component.html',
  styleUrls: ['./logo-container.component.scss']
})
export class LogoContainerComponent implements OnInit {
  @Input() bw = false;

  constructor() {}

  ngOnInit() {}
}
