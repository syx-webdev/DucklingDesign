import { Component } from "@angular/core";
import { Page } from "../models/page";
import { routes } from "../models/routes";
import { StateService } from "../services/state.service";

@Component({
  selector: "app-mobile-menu",
  templateUrl: "./mobile-menu.component.html",
  styleUrls: ["./mobile-menu.component.scss"],
})
export class MobileMenuComponent {
  public isOpen: boolean = false;

  public constructor(private state: StateService) {}

  public get routes(): any {
    return routes;
  }

  public toggle(): void {
    this.isOpen = !this.isOpen;
  }

  public isMainRoute(route: Page): boolean {
    return route.name.toLowerCase() === route.parent.toLowerCase();
  }

  selectPage(page) {
    this.state.navigate(page);
    this.toggle();
  }

  public selectedPage(page: Page): boolean {
    return this.state.currentPage.getValue().name === page.name;
  }
}
