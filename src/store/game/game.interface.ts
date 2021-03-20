export interface GameListItem {
  id: number;
  title: string;
  url: string;
  price: number;
  memo?: string;
}

export interface GameCreateParams {
  title: string;
  url: string;
  price: number;
  memo?: string;
}
