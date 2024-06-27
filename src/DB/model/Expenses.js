import {Model} from '@nozbe/watermelondb';
import {field, date} from '@nozbe/watermelondb/decorators';

export default class Expenses extends Model {
  static table = 'expenses';

  static associations = {
    // book_cashes: {type: 'has_many', foreignKey: 'user_id'},
  };

  @field('source') source;
  @field('amount') amount;
  @field('type') type;
  @field('frequency') frequency;
  @field('date') date;
  @date('created_at') createdAt;
  @date('updated_at') updatedAt;
}
