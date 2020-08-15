import { Component } from "@angular/core";
import { StateService } from "../services/state.service";

@Component({
  selector: "app-landing",
  templateUrl: "./landing.component.html",
  styleUrls: ["./landing.component.scss"],
})
export class LandingComponent {
  currentPage;

  constructor(private state: StateService) {
    this.state.currentPage.subscribe((page) => (this.currentPage = page));
  }
}
