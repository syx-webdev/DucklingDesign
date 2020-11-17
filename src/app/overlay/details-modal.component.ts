import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { PortfolioItem } from '../models/portfolio';

@Component({
  selector: 'dd-details-modal',
  templateUrl: './details-modal.component.html',
  styleUrls: ['./details-modal.component.scss']
})
export class DetailsModalComponent implements OnDestroy {

  @Input() item: PortfolioItem;
  @Output() onClose: EventEmitter<void> = new EventEmitter();

  constructor() {
    window.addEventListener("keydown", this.keydownHandler);
  }

  public keydownHandler = (event: KeyboardEvent, component = this): void => {
    if (event.key === 'Escape')
      component.close();
  }

  public close(): void {
    this.onClose.emit();
  }

  public ngOnDestroy(): void {
    window.removeEventListener("keydown", this.keydownHandler);
  }
}
