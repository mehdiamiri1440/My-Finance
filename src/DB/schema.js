import {appSchema, tableSchema} from '@nozbe/watermelondb';

export default appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: 'user',
      columns: [
        {name: 'phone', type: 'string'},
        {name: 'name', type: 'string'},
        {name: 'iban', type: 'number', isOptional: true},
        {name: 'language', type: 'string', isOptional: true, default: 'en'},
        {name: 'password', type: 'number', isOptional: true},
      ],
    }),
    tableSchema({
      name: 'customers',
      columns: [
        {name: 'name', type: 'string', isIndexed: true},
        {name: 'phone', type: 'string', isOptional: true},
        // {name: 'debt_id', type: 'number'},
        // {name: 'indebtedness_id', type: 'number'},
        {name: 'remain', type: 'string', isOptional: true},
        {name: 'user_id', type: 'string', isIndexed: true},
        {name: 'bookCash_id', type: 'string', isIndexed: true},
      ],
    }),

    tableSchema({
      name: 'products',
      columns: [
        {name: 'title', type: 'string'},
        {name: 'description', type: 'string', isOptional: true},
        {name: 'price', type: 'number'},
        {name: 'quantity', type: 'number'},
        {name: 'user_id', type: 'string', isIndexed: true},
        {name: 'bookCash_id', type: 'string'},
        // {name: 'unit_id', type: 'string'},
        // {name: 'entries_id', type: 'number'},
        // {name: 'departure_id', type: 'number'},
      ],
    }),
    tableSchema({
      name: 'expenses',
      columns: [
        {name: 'frequency', type: 'string'},
        {name: 'source', type: 'string'},
        {name: 'amount', type: 'number'},
        {name: 'type', type: 'number'},
        {name: 'date', type: 'number'},
        {name: 'created_at', type: 'number'},
        {name: 'updated_at', type: 'number'},
      ],
    }),
    tableSchema({
      name: 'incomes',
      columns: [
        {name: 'frequency', type: 'string'},
        {name: 'source', type: 'string'},
        {name: 'amount', type: 'number'},
        {name: 'type', type: 'number'},
        {name: 'date', type: 'number'},
        {name: 'created_at', type: 'number'},
        {name: 'updated_at', type: 'number'},
      ],
    }),
    tableSchema({
      name: 'book_cashes',
      columns: [
        {name: 'title', type: 'string'},
        {name: 'total_transactions_amount', type: 'number', default: 0},
        {name: 'remain', type: 'string'},
        {name: 'created_at', type: 'number'},
        {name: 'deleted_at', type: 'number'},
        {name: 'updated_at', type: 'number'},
        {name: 'currency_id', type: 'string'},
        {name: 'user_id', type: 'string', isIndexed: true},
      ],
    }),
    tableSchema({
      name: 'customer_transactions',
      columns: [
        {name: 'description', type: 'string'},
        {name: 'date', type: 'number'},
        {name: 'is_note', type: 'boolean', default: false},
        {name: 'image', type: 'string'},
        {name: 'amount', type: 'number', default: 0},
        {name: 'book_cash_customer_id', type: 'string'},
        {name: 'created_at', type: 'number'},
        {name: 'updated_at', type: 'number'},
      ],
    }),
    tableSchema({
      name: 'customernote',
      columns: [
        {name: 'decription', type: 'string'},
        {name: 'date_at', type: 'number'},
        {name: 'time', type: 'number'},
        {name: 'customers_id', type: 'string', isIndexed: true},
      ],
    }),
    tableSchema({
      name: 'entries',
      columns: [
        {name: 'quantity', type: 'number'},
        {name: 'price', type: 'number'},
        {name: 'description', type: 'string'},
        {name: 'products_id', type: 'number'},
      ],
    }),
    tableSchema({
      name: 'departures',
      columns: [
        {name: 'quantity', type: 'number'},
        {name: 'price', type: 'number'},
        {name: 'description', type: 'string'},
        {name: 'products_id', type: 'number'},
      ],
    }),
    tableSchema({
      name: 'currencies',
      columns: [
        {name: 'title', type: 'string'},
        {name: 'code', type: 'string'},
        {name: 'created_at', type: 'number'},
        {name: 'updated_at', type: 'number'},
      ],
    }),
    tableSchema({
      name: 'book_cash_customers',
      columns: [
        {name: 'name', type: 'string'},
        {name: 'phone', type: 'string'},
        {name: 'created_at', type: 'number'},
        {name: 'updated_at', type: 'number'},
        {
          name: 'customer_total_transactions_amount',
          type: 'number',
          default: 0,
        },
        {name: 'book_cash_id', type: 'string', isIndexed: true},
      ],
    }),

    tableSchema({
      name: 'bank_accounts',
      columns: [
        {name: 'name', type: 'string'},
        {name: 'total_transactions_amount', type: 'number', default: 0},
        {name: 'description', type: 'string'},
        {name: 'created_at', type: 'number'},
        {name: 'deleted_at', type: 'number'},
        {name: 'updated_at', type: 'number'},
        {name: 'user_id', type: 'string', isIndexed: true},
      ],
    }),
    tableSchema({
      name: 'account_transactions',
      columns: [
        {name: 'description', type: 'string'},
        {name: 'date', type: 'number'},
        {name: 'image', type: 'string'},
        {name: 'amount', type: 'number', default: 0},
        {name: 'bank_account_transactions_id', type: 'string'},
        {name: 'created_at', type: 'number'},
        {name: 'updated_at', type: 'number'},
        {name: 'account_type', type: 'string'},
      ],
    }),
    tableSchema({
      name: 'bank_account_transactions',
      columns: [
        {name: 'total_deposit_amount', type: 'number'},
        {name: 'total_withrawel_amount', type: 'number'},
        {name: 'created_at', type: 'number'},
        {name: 'updated_at', type: 'number'},
        {name: 'bank_account_id', type: 'string', isIndexed: true},
      ],
    }),
  ],
});
