import {Model} from '@nozbe/watermelondb';
import {date, field, relation} from '@nozbe/watermelondb/decorators';

export default class BankAccounts extends Model {
  static table = 'bank_accounts';

  static associations = {
    // user: {type: 'belongs_to', foreignKey: 'user_id'},
    // currency: {type: 'belongs_to', foreignKey: 'currency_id'},
    bank_account_transactions: {type: 'has_many', foreignKey: 'bank_account_id'},
  };

  @field('name') name;
  @field('total_transactions_amount') totalTransactionsAmount;
  @date('created_at') createdAt;
  @date('updated_at') updatedAt;
  @field('description') description;
  @date('deleted_at') deletedAt;
  @field('user_id') userId;

  @relation('user', 'user_id') user;
  @relation('currencies', 'currency_id') currency_id;
}
