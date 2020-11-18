export interface Portfolio {
  animations: Animation[];
  branding: Branding[];
  posters: Poster[];
  uiux: Uiux[];
  others: PortfolioItem[];
}

interface Animation extends PortfolioItem {}

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
  details: PortfolioItemDetail;
}

export interface PortfolioItemDetail {
  title: string;
  description: string;
  headerImage: string;
  images: string[];
}
