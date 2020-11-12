import { Component } from "@angular/core";
import { StateService } from "../services/state.service";
import { routes } from "../models/routes";

@Component({
  selector: "dd-side-menu",
  templateUrl: "./side-menu.component.html",
  styleUrls: ["./side-menu.component.scss"],
})
export class SideMenuComponent {
  selectedPage;

  constructor(private state: StateService) {
    this.state.currentPage.subscribe((page) => (this.selectedPage = page));
  }

  isPortfolio() {
    return this.selectedPage && this.selectedPage.parent === "portfolio";
  }

  selectPage(page) {
    if (page === 'about')
      page = routes.find((route) => route.parent === "about")
    this.state.navigate(page);
  }

  get portfolioRoutes() {
    return routes.filter((route) => route.parent === "portfolio");
  }
}
