import {Model} from '@nozbe/watermelondb';
import {date, field, relation} from '@nozbe/watermelondb/decorators';

export default class BookCashCustomers extends Model {
  static table = 'book_cash_customers';

  static associations = {
    customer_transactions: {type: 'has_many', key: 'book_cash_customer_id'},
  };

  @field('name') name;
  @date('created_at') createdAt;
  @date('updated_at') updatedAt;
  @field('customer_total_transactions_amount') customerTotalTransactionsAmount;
  @field('phone') phone;
  @field('book_cash_id') bookCashId;

  @relation('book_cashes', 'book_cash_id') bookCash;
}
