export interface Order {
  id: number;
  createdAt: string;
  address: string;
  receiver: string;
  contact: string;
  bookTitle: string;
  totalQuantity: number;
  totalPrice: number;
}

// 주문서 작성 페이지에 필요한 데이터를 정의
export interface OrderRequest {
  items: number[];
  totalQuantity: number;
  totalPrice: number;
  representBookTitle: string;
  delivery: {
    address: string;
    receiver: string;
    contact: string;
  };
}

export interface Delivery {
  address: string;
  receiver: string;
  contact: string;
}
