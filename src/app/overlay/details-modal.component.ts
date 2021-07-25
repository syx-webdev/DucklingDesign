import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { PortfolioItem } from '../models/portfolio';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'dd-details-modal',
  templateUrl: './details-modal.component.html',
  styleUrls: ['./details-modal.component.scss']
})
export class DetailsModalComponent implements OnDestroy {

  @Input() item: PortfolioItem;
  @Output() onClose: EventEmitter<void> = new EventEmitter();

  constructor(private _sanitizer: DomSanitizer) {
    window.addEventListener('keydown', this.keydownHandler);
  }

  public keydownHandler = (event: KeyboardEvent, component = this): void => {
    if (event.key === 'Escape') {
      component.close();
    }
  }

  public getVideoUrl(video: string): any {
    const url: string = `https://www.youtube.com/embed/${video}?playlist=${video}&autoplay=1&loop=1&controls=0&showinfo=0`
    return this._sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  public close(): void {
    this.onClose.emit();
  }

  public ngOnDestroy(): void {
    window.removeEventListener('keydown', this.keydownHandler);
  }
}
