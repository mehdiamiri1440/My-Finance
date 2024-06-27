import {Model} from '@nozbe/watermelondb';
import {
  field,
  readonly,
  date,
  text,
  relation,
  children,
} from '@nozbe/watermelondb/decorators';

export default class Customers extends Model {
  static table = 'customers';

  static associations = {
    user: {type: 'belongs_to', key: 'user_id'},
    customerdebt: {type: 'has_many', foreignKey: 'customers_id'},
    customernote: {type: 'has_many', foreignKey: 'customers_id'},
  };

  @field('name') name;
  @field('phone') phone;
  @field('remain') remain;

  @children('customerdebt') customerDebt;
  @children('customernote') customerNote;

  @relation('user', 'user_id') user;
}
