import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { appRoutes } from '../../assets/works/structure.json';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  currentPage = new BehaviorSubject(appRoutes[0]);

  constructor() {}

  navigate(page: any) {
    this.currentPage.next(page);
  }

  toLanding() {
    this.navigate(appRoutes[0]);
  }
}
