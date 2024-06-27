import {Model} from '@nozbe/watermelondb';
import {date, field, relation} from '@nozbe/watermelondb/decorators';

export default class BookCashes extends Model {
  static table = 'book_cashes';

  static associations = {
    // user: {type: 'belongs_to', foreignKey: 'user_id'},
    // currency: {type: 'belongs_to', foreignKey: 'currency_id'},
    book_cash_customers: {type: 'has_many', foreignKey: 'book_cash_id'},
  };

  @field('title') title;
  @date('created_at') createdAt;
  @date('updated_at') updatedAt;
  @date('deleted_at') deletedAt;
  @field('total_transactions_amount') totalTransactionsAmount;
  @field('remain') remain;
  @field('user_id') userId;

  @relation('user', 'user_id') user;
  @relation('currencies', 'currency_id') currency_id;
}
