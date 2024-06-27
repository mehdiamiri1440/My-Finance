import {Model} from '@nozbe/watermelondb';
import {
  field,
  readonly,
  date,
  text,
  relation,
} from '@nozbe/watermelondb/decorators';

export default class Departures extends Model {
  static table = 'departures';

  static associations = {
    products: {type: 'belongs_to', foreignKey: 'product_id'},
  };

  @field('quantity') quantity;
  @field('price') price;
  @field('description') description;

  @relation('products', 'products_id') products;

  // getDepartures(){
  //   return {
  //     quantity : this.quantity,
  //     price : this.price,
  //     description : this.description,
  //   }
  // }

  // async deleteDepartures() {
  //   await this.markAsDeleted(); // syncable
  //   await this.destroyPermanently(); // permanent
  // }

  // updateDepartures = async updatedDepartures => {
  //   await this.update(departures => {
  //     departures.quantity = updatedDepartures.quantity;
  //     departures.price = updatedDepartures.price;
  //     departures.description = updatedDepartures.description;
  //   });
  // };
}
