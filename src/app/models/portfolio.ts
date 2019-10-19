export interface Portfolio {
  animations: Animation[];
  books: Book[];
  branding: Branding[];
  posters: Poster[];
  uiux: Uiux[];
}

interface Animation extends PortfolioItem {}

interface Book extends PortfolioItem {}

interface Branding extends PortfolioItem {}

interface Poster extends PortfolioItem {}

interface Uiux extends PortfolioItem {}

export interface PortfolioItem {
  name: string;
  category: string;
  thumbnail: string;
  gridPosition: {
    row: number;
    col: number;
  };
}
