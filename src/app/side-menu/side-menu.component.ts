import { Component } from "@angular/core";
import { StateService } from "../services/state.service";
import * as routes from "../../assets/routes.json";

@Component({
  selector: "app-side-menu",
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
    this.state.navigate(page);
  }

  get portfolioRoutes() {
    if (!routes)
      return [];
    return routes.filter((route) => route.parent === "portfolio");
  }
}
