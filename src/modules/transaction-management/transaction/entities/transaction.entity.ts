export class Transaction {
  id: string;
  amount: number;
  date: Date;
  category: string;
  status: string;

  constructor(
    id: string,
    amount: number,
    date: Date,
    category: string,
    status: string,
  ) {
    this.id = id;
    this.amount = amount;
    this.date = date;
    this.category = category;
    this.status = status;
  }
}
