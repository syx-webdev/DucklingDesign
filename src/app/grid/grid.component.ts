import { ChangeDetectorRef, Component } from '@angular/core';
import { works } from '../../assets/works/structure.json';
import { PortfolioItem } from '../models/portfolio.js';
import { StateService } from '../services/state.service';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
})
export class GridComponent {
  currentPage;
  portfolioItems = [];
  gridItems = [];
  isReversed = false;
  sizes = ['1', '2', '3'];
  colors = ['blue', 'red'];
  types = ['slide', 'circle'];
  directions = ['top', 'right', 'bottom', 'left'];
  gridSize = { rows: 8, columns: 8 };

  constructor(private state: StateService, private changeDetector: ChangeDetectorRef) {
    this.state.currentPage.subscribe((page: any) => {
      const fromPage = this.currentPage;
      // if (fromPage && (fromPage.parent === 'portfolio' && page.parent === 'portfolio')) {
        if (fromPage) {
          this.reverse(fromPage);
        }
        setTimeout(
          () => {
            this.currentPage = page;
            if (this.currentPage.parent === 'landing') {
              this.generate();
            } else {
              this.portfolioItems.forEach(item => (item.delay = this.getRandomDelay()));
            }
          },
          fromPage && fromPage.parent === 'landing' ? 1000 : 500,
        );
    });
    this.portfolioItems = works;
  }

  getRandomItem(array: any) {
    return array[this.getRandom(array.length)];
  }

  getRandom(length: number) {
    return Math.floor(Math.random() * length);
  }

  generate() {
    this.gridItems = [];
    let circlesLeft = [0, 1, 2][Math.floor(Math.random() * 3)];
    for (let i = 0; i < 6; i++) {
      const item: any = {};
      item.row = Math.floor(Math.random() * this.gridSize.rows);
      item.col = Math.floor(Math.random() * this.gridSize.columns);
      item.color = this.getRandomItem(this.colors);
      item.direction = this.getRandomItem(this.directions);
      item.delay = this.getRandomItem(this.sizes);
      if (circlesLeft > 0) {
        item.type = 'circle';
        circlesLeft--;
      } else {
        item.type = 'square';
        item.width = this.getRandomItem(this.sizes);
        item.height = this.getRandomItem(this.sizes);
      }
      this.gridItems.push(item);
    }
  }

  getAnimationClasses(item: any) {
    return item
      ? item.type === 'square'
        ? `${item.color} ${item.type} w${item.width}-h${item.height}-d${item.delay}`
        : `${item.color} ${item.type}-d${item.delay}`
      : '';
  }

  getRandomDelay() {
    return `d${this.getRandomItem(this.sizes)}`;
  }

  reverse(fromPage: any) {
    this.isReversed = true;
    setTimeout(
      () => {
        this.isReversed = false;
      },
      fromPage.parent === 'landing' ? 1000 : 500,
    );
  }

  // TODO: Remove when real content added
  randomImage() {
    return 'https://picsum.photos/200/200';
  }

  getDimension(dimension: string) {
    const array = [];
    for (let i = 0; i < this.gridSize[dimension]; i++) {
      array.push({});
    }
    return array;
  }

  getAnimatedItem(row: number, col: number) {
    return this.gridItems.find(item => item.row === row && item.col === col);
  }

  getPortfolioItem(row: number, col: number) {
    return this.portfolioItems.find(item => item.gridPosition.row === row && item.gridPosition.col === col);
  }

  isVisiblePortfolioItem(item: PortfolioItem) {
    return this.currentPage ? this.currentPage.name === 'All' || this.currentPage.name === item.category : false;
  }

  openPortfolioItem(event, item: any) {
    console.log(event);
  }

  getThumbnail(name: string) {
    return `assets/img/project-thumbnails/${name}`;
  }
}
