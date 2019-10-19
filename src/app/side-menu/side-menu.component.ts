import { Component } from '@angular/core';
import { StateService } from '../services/state.service';
import { appRoutes } from '../../assets/works/structure.json';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent {
  selectedPage;

  constructor(private state: StateService) {
    this.state.currentPage.subscribe(page => (this.selectedPage = page));
  }

  isPortfolio() {
    return this.selectedPage && this.selectedPage.parent === 'portfolio';
  }

  selectPage(page) {
    this.state.navigate(page);
  }

  get portfolioRoutes() {
    return appRoutes.filter(route => route.parent === 'portfolio');
  }
}
