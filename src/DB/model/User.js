import {Model} from '@nozbe/watermelondb';
import {field, children} from '@nozbe/watermelondb/decorators';

export default class User extends Model {
  static table = 'user';

  static associations = {
    book_cashes: {type: 'has_many', foreignKey: 'user_id'},
  };

  @field('name') name;
  @field('phone') phone;
  @field('iban') iban;
  @field('language') language;
  @field('password') password;
}
