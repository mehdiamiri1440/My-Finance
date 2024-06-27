import {Model} from '@nozbe/watermelondb';
import {
  field,
  readonly,
  date,
  text,
  relation,
  children,
} from '@nozbe/watermelondb/decorators';

export default class Products extends Model {
  static table = 'products';

  static associations = {
    user: {type: 'belongs_to', key: 'user_id'},
    book_cash: {type: 'belongs_to', key: 'book_cash_id'},
    entries: {type: 'has_many', foreignKey: 'product_id'},
    departures: {type: 'has_many', foreignKey: 'product_id'},
  };

  @field('title') title;
  @field('description') description;
  @field('price') price;
  @field('quantity') quantity;

  @relation('user', 'user_id') user;
  @relation('book_cash', 'book_cash_id') bookCashId;

  @children('entries') entries;
  @children('departures') departures;

  // getProducts() {
  //   return {
  //     title: this.title,
  //     description: this.description,
  //     price: this.price,
  //     quantity: this.quantity,
  //   };
  // }

  // async addEntries(quantity, price, description) {
  //   return this.collections.get('customers').create(entries => {
  //     entries.products.set(this);
  //     entries.quantity = quantity;
  //     entries.price = price;
  //     entries.description = description;
  //   });
  // }

  // async addDepartures(quantity, price, description) {
  //   return this.collections.get('customers').create(departures => {
  //     departures.products.set(this);
  //     departures.quantity = quantity;
  //     departures.price = price;
  //     departures.description = description;
  //   });
  // }

  // updateProducts = async updatedProducts => {
  //   await this.update(products => {
  //     products.title = updatedProducts.title;
  //     products.remain = updatedProducts.remain;
  //   });
  // };

  // async deleteAllDepartures() {
  //   await this.departures.destroyAllPermanently();
  // }
  // async deleteAllEntries() {
  //   await this.entries.destroyAllPermanently();
  // }

  // async deleteProducts() {
  //   await this.markAsDeleted(); // syncable
  //   await this.destroyPermanently(); // permanent
  //   await this.deleteAllDepartures(); // syncable
  //   await this.deleteAllEntries(); // syncable
  // }
}
