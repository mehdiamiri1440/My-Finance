import {Model} from '@nozbe/watermelondb';
import {
  field,
  readonly,
  date,
  text,
  relation,
} from '@nozbe/watermelondb/decorators';

export default class Entries extends Model {
  static table = 'entries';

  static associations = {
    products: {type: 'belongs_to', foreignKey: 'product_id'},
  };

  @field('quantity') quantity;
  @field('price') price;
  @field('description') description;

  @relation('products', 'products') products;

  // getEntries(){
  //   return {
  //     quantity : this.quantity,
  //     price : this.price,
  //     description : this.description,
  //   }
  // }

  // async deleteEntries() {
  //   await this.markAsDeleted(); // syncable
  //   await this.destroyPermanently(); // permanent
  // }

  // updateEntries = async updatedEntries => {
  //   await this.update(entries => {
  //     entries.quantity = updatedEntries.quantity;
  //     entries.price = updatedEntries.price;
  //     entries.description = updatedEntries.description;
  //   });
  // };
}
