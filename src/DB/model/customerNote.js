import {Model} from '@nozbe/watermelondb';
import {
  field,
  readonly,
  date,
  text,
  relation,
  children,
} from '@nozbe/watermelondb/decorators';

export default class CustomerNote extends Model {
  static table = 'customernote';

  static associations = {
    customers: {type: 'belongs_to', key: 'customers_id'},
  };

  @field('description') description;
  @date('date_at') dateAt;
  @field('time') time;

  @relation('customers', 'customers_id') customers;

  // getCustomers(){
  //   return {
  //     name : this.name,
  //     phone : this.phone,
  //   }
  // }

  // async deleteCustomers() {
  //   await this.markAsDeleted(); // syncable
  //   await this.destroyPermanently(); // permanent
  // }

  // updateCustomers = async updatedCustomers => {
  //   await this.update(customers => {
  //     customers.name = updatedCustomers.name;
  //     customers.phone = updatedCustomers.phone;
  //   });
  // };
}
