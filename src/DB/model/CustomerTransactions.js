import {Model} from '@nozbe/watermelondb';
import {field, relation, date} from '@nozbe/watermelondb/decorators';

export default class CustomerTransactions extends Model {
  static table = 'customer_transactions';

  static associations = {
    customer_transactions: {type: 'belongs_to', key: 'book_cash_customer_id'},
  };

  @field('is_note') is_note;
  @field('description') description;
  @field('image') image;
  @field('amount') amount;
  @date('created_at') createdAt;
  @date('updated_at') updatedAt;
  @date('date') date;
  @field('book_cash_customer_id') bookCashCustomerId;

  @relation('book_cash_customers', 'book_cash_customer_id') bookCashCustomer;
}
