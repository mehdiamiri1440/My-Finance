import {Model} from '@nozbe/watermelondb';
import {field, relation, date} from '@nozbe/watermelondb/decorators';

export default class AccountTransactions extends Model {
  static table = 'account_transactions';

  static associations = {
    account_transactions: {
      type: 'belongs_to',
      key: 'bank_account_transactions_id',
    },
  };

  @field('description') description;
  @date('date') date;
  @field('image') image;
  @field('amount') amount;
  @date('created_at') createdAt;
  @date('updated_at') updatedAt;
  @field('bank_account_transactions_id') bankAccountId;

  @relation('bank_account_transactions', 'bank_account_transactions_id')
  accountTransactions;
}
