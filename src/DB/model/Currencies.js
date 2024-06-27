import {Model} from '@nozbe/watermelondb';
import {date, field} from '@nozbe/watermelondb/decorators';
import database from '../index.native';

export default class Currencies extends Model {
  static table = 'currencies';

  static associations = {
    currency: {type: 'has_many', key: 'currency_id'},
  };

  @field('title') title;
  @field('code') code;
  @date('created_at') createdAt;
  @date('updated_at') updatedAt;
}
