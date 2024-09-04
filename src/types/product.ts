type Interval = 'month' | 'year';

interface PriceData {
  id: string;
  unit_amount: number;
  currency: string;
  features: string[];
}

export interface Product {
  id: string;
  name: string;
  description: string | null;
  image: string;
  prices: {
    [key in Interval]: PriceData;
  };
}
