import React from 'react';
import {Platform} from 'react-native';
import {Database} from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import migrations from './migrations';
import {dbModels} from './model/index';
import schema from './schema';
import Customers from './model/Customers';
import BookCashes from './model/BookCashes';
import Customerdebt from './model/CustomerTransactions';
import Departures from './model/Departure';
import Entries from './model/Entries';
import Products from './model/Product';
import Currencies from './model/Currencies';
import User from './model/User';
import CustomerNote from './model/customerNote';
import BookCashCustomers from './model/BookCashCustomers';
import BankAccounts from './model/BankAccounts';
import BankAccountTransactions from './model/BankAccountTransactions';
import AccountTransactions from './model/AccountTransactions';
import Incomes from './model/Incomes';
import Expenses from './model/Expenses';

const adapter = new SQLiteAdapter({
  schema,

  dbName: 'MyBudgetApp',
  onSetUpError: error => {
    // Database failed to load -- offer the user to reload the app or log out
  },
});

const database = new Database({
  adapter,
  modelClasses: [
    Customers,
    BookCashes,
    BookCashCustomers,
    Customerdebt,
    Departures,
    Entries,
    Products,
    Currencies,
    User,
    CustomerNote,
    BankAccounts,
    BankAccountTransactions,
    AccountTransactions,
    Incomes,
    Expenses,
  ],
});

const seedData = [
  {title: 'EUR', code: '01'},
  {title: 'USD', code: '02'},
];

async function seedDatabase(index) {
  database.write(async _ => {
    const currenciesCollection = database.get('currencies');
    const currenciesCount = await currenciesCollection.query().fetchCount();

    if (currenciesCount < 2) {
      await currenciesCollection.create(currency => {
        currency.title = seedData[index].title;
        currency.code = seedData[index].code;
      });
    }
  });
}

for (let index = 0; index < seedData.length; index++) {
  seedDatabase(index);
}

export default database;
