import { Component } from '@angular/core';
import { StateService } from '../services/state.service';

@Component({
  selector: 'dd-logo-container',
  templateUrl: './logo-container.component.html',
  styleUrls: ['./logo-container.component.scss'],
})
export class LogoContainerComponent {
  bw = false;

  constructor(private state: StateService) {
    this.state.currentPage.subscribe((page) => (this.bw = !this.isPortfolio(page.name)));
  }

  isPortfolio(page: string) {
    return page === 'Landing';
  }

  toLanding() {
    this.state.toLanding();
  }
}
