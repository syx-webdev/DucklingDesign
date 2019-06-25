import { Component } from '@angular/core';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent {
  selectedPage: string;
  pages = ['All', 'Branding', 'Webdesign', 'Posters', 'Books', 'Animations'];

  isPortfolio() {
    return this.pages.some(page => page === this.selectedPage);
  }

  selectPage(page: string) {
    this.selectedPage = page;
  }
}
