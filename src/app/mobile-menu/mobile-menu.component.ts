import { Component } from "@angular/core";
import { DomSanitizer } from '@angular/platform-browser';
import { Page } from "../models/page";
import { routes } from "../models/routes";
import { StateService } from "../services/state.service";

@Component({
  selector: "dd-mobile-menu",
  templateUrl: "./mobile-menu.component.html",
  styleUrls: ["./mobile-menu.component.scss"],
})
export class MobileMenuComponent {
  public isOpen: boolean = false;
  public page: Page = undefined;

  public constructor(
    private state: StateService,
    private sanitizer: DomSanitizer
  ) {
    this.state.currentPage.subscribe((page: Page) => this.page = page);
  }

  public get routes(): any {
    return routes;
  }

  public getDelay(index: number): any {
    return this.sanitizer.bypassSecurityTrustStyle(`--delay:${index}`);
  }

  public toggle(): void {
    this.isOpen = !this.isOpen;
  }

  public isMainRoute(route: Page): boolean {
    return route.name.toLowerCase() === route.parent.toLowerCase();
  }

  public selectPage(page): void {
    this.state.navigate(page);
    this.toggle();
  }

  public selectedPage(page: Page): boolean {
    return this.state.currentPage.getValue().name === page.name;
  }
}
