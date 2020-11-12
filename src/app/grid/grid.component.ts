import { Component } from '@angular/core';
import { Page } from '../models/page';
import { PortfolioItem } from '../models/portfolio';
import { StateService } from '../services/state.service';

@Component({
  selector: 'dd-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
})
export class GridComponent {
  currentPage: Page;
  portfolioItems = [];
  gridItems = [];
  isReversed = false;
  sizes = ['1', '2', '3'];
  colors = ['blue', 'red'];
  types = ['slide', 'circle'];
  directions = ['top', 'right', 'bottom', 'left'];
  gridSize = {rows: 8, columns: 8};

  aboutItems: any[] = [
    {
      col: 0,
      row: 0,
      width: 4,
      height: 1,
      type: "text",
      text: "Hi! My name is Kinga Czuczor.\nI'm a graphic designer.",
      style: {
        fontWeight: 700,
        fontSize: '20px',
        paddingLeft: '24px'
      }
    },
    {
      col: 7,
      row: 0,
      width: 1,
      height: 1,
      type: "image",
      imageUrl: "assets/img/duck.png",
      imageSize: "50"
    },
    {
      col: 0,
      row: 1,
      width: 2,
      height: 2,
      type: "text",
      text: "I create\nanimations,\nbrandings,\nUX/UI designs,\nartbooks,\nposters",
      style: {
        fontSize: '17px',
        paddingLeft: '24px'
      }
    },
    {
      col: 0,
      row: 6,
      width: 2,
      height: 2,
      type: "image",
      imageUrl: "assets/img/Kinga.png",
      imageSize: "100"
    },
    {
      col: 4,
      row: 6,
      width: 4,
      height: 1,
      type: "text",
      text: "czuczor.kinga96@gmail.com",
      iconUrl: "assets/img/email.svg",
      style: {
        fontWeight: 700,
        fontSize: '20px',
      }
    },
    {
      col: 4,
      row: 7,
      width: 3,
      height: 1,
      type: "text",
      text: "+3630/6958584",
      iconUrl: "assets/img/phone.svg",
      style: {
        fontWeight: 700,
        fontSize: '20px',
      }
    },
    {
      col: 7,
      row: 7,
      width: 1,
      height: 1,
      type: "image",
      style: {
        backgroundColor: "#E51A22"
      }
    }
  ];


  constructor(private state: StateService) {
    this.state.pageData.subscribe((data: any) => {
      if (!!data) {
        this.portfolioItems = data['works'];
      }
    });
    this.state.currentPage.subscribe((page: any) => {
      const fromPage = this.currentPage;
      if (!!fromPage) {
        this.reverse(fromPage);
      }
      setTimeout(
        () => {
          this.currentPage = page;
          if (this.currentPage.parent === 'landing') {
            this.generate();
          } else {
            this.portfolioItems.forEach(
              (item) => (item.delay = this.getRandomDelay())
            );
          }
        },
        fromPage && fromPage.parent === 'landing' ? 1000 : 500
      );
    });
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

  public getAboutItemClasses(item: any): string {
    return `w${item.width}-h${item.height} ${item.type}`;
  }

  public getRandomDelay() {
    return `d${this.getRandomItem(this.sizes)}`;
  }

  public reverse(fromPage: Page) {
    this.isReversed = true;
    setTimeout(
      () => {
        this.isReversed = false;
      },
      fromPage.parent === 'landing' ? 1000 : 500
    );
  }

  getDimension(dimension: string) {
    return new Array(this.gridSize[dimension]).fill({});
  }

  public getItem(row: number, col: number): any {
    switch (this.currentPage.name) {
      case 'Landing':
        return this.getAnimatedItem(row, col);
      case 'About':
        return this.getAboutItem(row, col);
      default:
        return this.getPortfolioItem(row, col);
    }
  }

  getAnimatedItem(row: number, col: number) {
    return this.gridItems.find((item) => item.row === row && item.col === col);
  }

  getPortfolioItem(row: number, col: number) {
    return this.portfolioItems.find(
      (item) => item.gridPosition.row === row && item.gridPosition.col === col
    );
  }

  public getAboutItem(row: number, col: number): any {
    return this.aboutItems.find(item => item.row === row && item.col === col);
  }

  isVisiblePortfolioItem(item: PortfolioItem) {
    return this.currentPage
      ? this.currentPage.name === 'All' ||
      this.currentPage.name === item.category
      : false;
  }

  openPortfolioItem(event, item: any) {
    console.log(event);
  }

  getThumbnail(name: string) {
    return `assets/img/project-thumbnails/${name}`;
  }
}
