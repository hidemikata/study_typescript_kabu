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

export interface inago_table {
    id: number,
    stock_code: string,
}

export interface ita_keta_more {
    id: number,
    stock_code: string,
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
        interval_id TEXT NOT NULL,
        buy_price REAL NOT NULL,
        buy_time TEXT NOT NULL,
        sell_price REAL,
        sell_time TEXT,
        profit_loss REAL
      )`, (err) => {
        if (err) {
            console.error('Error creating table 1', err);
        } else {
            console.log('Table created or already exists 1');
        }
    });

    global.db.run(`CREATE TABLE inago (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        stock_code TEXT NOT NULL
      )`, (err) => {
        if (err) {
            console.error('Error creating table 2', err);
        } else {
            console.log('Table created or already exists 2');
        }
    });

    global.db.run(`CREATE TABLE ita_keta_more (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        stock_code TEXT NOT NULL
      )`, (err) => {
        if (err) {
            console.error('Error creating table 3', err);
        } else {
            console.log('Table created or already exists 3');
        }
    });

    global.db.run(`CREATE TABLE ita_keta_more_price (
        id INTEGER PRIMARY KEY,
        stock_code TEXT NOT NULL,
        current_price REAL NOT NULL,
        price_time TEXT NOT NULL
      )`, (err) => {
        if (err) {
            console.error('Error creating table 3', err);
        } else {
            console.log('Table created or already exists 3');
        }
    });

}