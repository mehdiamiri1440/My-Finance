import {Model} from '@nozbe/watermelondb';
import {date, field, relation} from '@nozbe/watermelondb/decorators';

export default class BankAccountTransactions extends Model {
  static table = 'bank_account_transactions';

  static associations = {
    account_transactions: {
      type: 'has_many',
      key: 'bank_account_transactions_id',
    },
  };

  @field('total_deposit_amount') totalDepositAmount;
  @field('total_withrawel_amount') totalWithrawelAmount;
  @field('bank_account_id') bankAccountId;
  @date('updated_at') updatedAt;
  @date('created_at') createdAt;

  @relation('bank_accounts', 'bank_account_id') bankAcconts;
}
