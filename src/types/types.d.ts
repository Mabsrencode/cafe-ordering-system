interface MenuItem {
  id?: number;
  name: string;
  description: string;
  price_hot: number;
  price_cold: number;
  category: string;
  image_url: string;
  available: boolean;
  created_at?: string;
}
