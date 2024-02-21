import sqlite3 from 'sqlite3';

export interface trade_table {
    id: number,
    stock_code: string,
    buy_price: number,
    buy_time: string,
    sell_price: number,
    sell_time: string,
    profit_loss: number
}

export default function db_initialize() {
    global.db = new sqlite3.Database('./db/order.db', (err) => {
        if (err) {
            console.error('Error opening database', err);
        } else {
            console.log('Successfully opened/created the database');
        }
    });

    global.db.run(`CREATE TABLE trades (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        stock_code TEXT NOT NULL,
        buy_price REAL NOT NULL,
        buy_time TEXT NOT NULL,
        sell_price REAL,
        sell_time TEXT,
        profit_loss REAL
      )`, (err) => {
        if (err) {
            console.error('Error creating table', err);
        } else {
            console.log('Table created or already exists');
        }
    });

}