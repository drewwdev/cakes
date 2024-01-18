export interface Cake {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  availableSizes: string[];
  flavors: string[];
  isAvailable: boolean;
}

export interface OrderItem {
  id: number;
  orderId: number;
  product: Cake;
  quantity: number;
  itemPrice: number;
}

export interface Order {
  id: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  orderDate: Date;
  orderTotal: number;
  status: "Pending" | "Confirmed";
}
