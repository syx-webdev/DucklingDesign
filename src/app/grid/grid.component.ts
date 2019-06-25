import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
})
export class GridComponent implements OnInit {
  grid = [];
  isReversed = false;
  sizes = ['1', '2', '3'];
  colors = ['blue', 'red'];
  types = ['slide', 'circle'];
  directions = ['top', 'right', 'bottom', 'left'];

  constructor() {}

  ngOnInit() {
    this.gridInit();
    this.generate();
  }

  gridInit() {
    const initialGrid = [];
    for (let i = 0; i < 8; i++) {
      const row = [];
      for (let j = 0; j < 8; j++) {
        row.push({});
      }
      initialGrid.push(row);
    }
    this.grid = [...initialGrid];
  }

  getRandomItem(array: string[]) {
    return array[this.getRandom(array.length)];
  }

  getRandom(length: number) {
    return Math.floor(Math.random() * length);
  }

  generate() {
    this.gridInit();
    let circlesLeft = [0, 1, 2][Math.floor(Math.random() * 3)];
    for (let i = 0; i < 6; i++) {
      const row = Math.floor(Math.random() * 8);
      const col = Math.floor(Math.random() * 8);
      const item = this.grid[row][col];
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
    }
  }

  getAnimationClasses(item: any) {
    return item.type === 'square'
      ? `${item.color} ${item.type} w${item.width}-h${item.height}-d${item.delay}`
      : `${item.color} ${item.type}-d${item.delay}`;
  }

  getItemClasses(item: any) {
    return item;
  }

  reverse() {
    this.isReversed = true;
  }

  navigateTo() {
    this.reverse();
  }
}
