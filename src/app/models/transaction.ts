export class Transaction {
  id?: number;
  sender?: number;
  receiver?: number;
  totalAmount?: number;
  paidTotalAmount?: number;
}

export class TransactionResponse {
  content?: Transaction[];
  number?: number;
  size?: number;
  totalElements?: number;
}
