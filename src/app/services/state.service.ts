import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import * as routes from "../../assets/routes.json";

@Injectable({
  providedIn: "root",
})
export class StateService {
  pageData = new BehaviorSubject(undefined);
  currentPage = new BehaviorSubject(routes[0]);

  constructor(private http: HttpClient) {
    this.http
      .get(
        "https://dl.dropboxusercontent.com/s/r7a0c6vi8by94bq/structure.json?dl=1"
      )
      .subscribe((json) => {
        this.pageData.next(json);
      });
  }

  navigate(page: any) {
    this.currentPage.next(page);
  }

  toLanding() {
    this.navigate(routes[0]);
  }
}
