import { Component } from "@angular/core";
import { Page } from "../models/page";
import { StateService } from "../services/state.service";

@Component({
  selector: "app-landing",
  templateUrl: "./landing.component.html",
  styleUrls: ["./landing.component.scss"],
})
export class LandingComponent {
  currentPage: Page;

  constructor(private state: StateService) {
    this.state.currentPage.subscribe((page) => (this.currentPage = page));
  }
}
