export interface Order {
  id: number;
  created_at: string;
  address: string;
  receiver: string;
  contact: string;
  book_title: string;
  represent_book_title: string;
  total_quantity: number;
  total_price: number;
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

export interface OrderDetailItem {
  book_id: number;
  title: string;
  author: string;
  price: number;
  quantity: number;
}

export interface OrderListItem extends Order {
  detail?: OrderDetailItem[];
}
